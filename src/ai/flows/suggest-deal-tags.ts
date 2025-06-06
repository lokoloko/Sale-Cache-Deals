// src/ai/flows/suggest-deal-tags.ts
// This file is machine generated - changes may be lost. (Note: This comment seems to be from the original scaffold, can be reviewed)
// 🔧 This file can be manually edited to refine the AI behavior for tag suggestion.

'use server'; // This directive marks the module's functions as callable from Server Components and Server Actions.

/**
 * @fileOverview Provides AI-powered suggestions for relevant tags and a summary for user-submitted deals.
 * This file defines a Genkit flow that uses an AI model to generate tags and a brief description.
 *
 * - suggestDealTags - Exported async function that invokes the Genkit flow.
 * - SuggestDealTagsInput - 🔍 Zod schema and TypeScript type for the input to the flow. Defines data UI provides.
 * - SuggestDealTagsOutput - 🔍 Zod schema and TypeScript type for the output from the flow. Defines data UI receives.
 */

import {ai} from '@/ai/genkit'; // Genkit AI instance.
import {z} from 'genkit'; // Zod for schema definition and validation.

// --- Input Schema Definition ---
/**
 * @const SuggestDealTagsInputSchema
 * @description Zod schema for the input required by the `suggestDealTags` flow.
 * // 🔍 This schema dictates the data structure the UI form (e.g., SubmitDealForm) must send.
 */
const SuggestDealTagsInputSchema = z.object({
  productName: z.string().describe('The name of the product being offered in the deal.'),
  productDescription: z.string().describe('A detailed description of the product and the deal itself.'),
  category: z.string().describe('The category of the product (e.g., firearms, accessories, ammunition).'),
});

// TypeScript type inferred from the Zod schema.
export type SuggestDealTagsInput = z.infer<typeof SuggestDealTagsInputSchema>;

// --- Output Schema Definition ---
/**
 * @const SuggestDealTagsOutputSchema
 * @description Zod schema for the output produced by the `suggestDealTags` flow.
 * // 🔍 This schema defines the data structure the UI will receive (suggested tags and a summary).
 */
const SuggestDealTagsOutputSchema = z.object({
  tags: z.array(z.string()).describe('An array of relevant tags for the deal, to improve categorization and searchability.'),
  description: z.string().describe('A short summary or alternative description of the deal, potentially for display purposes or further AI processing.'),
});

// TypeScript type inferred from the Zod schema.
export type SuggestDealTagsOutput = z.infer<typeof SuggestDealTagsOutputSchema>;

// --- Public Interface Function ---
/**
 * @async
 * @function suggestDealTags
 * @description Asynchronously invokes the `suggestDealTagsFlow` with the provided input.
 * This is the primary function imported and used by the UI (e.g., in `SubmitDealForm`).
 * @param {SuggestDealTagsInput} input - The input data for suggesting deal tags and summary.
 * @returns {Promise<SuggestDealTagsOutput>} A promise that resolves to the AI-suggested tags and summary.
 * // 🔧 This function is called from the UI to trigger AI tag and summary generation.
 */
export async function suggestDealTags(input: SuggestDealTagsInput): Promise<SuggestDealTagsOutput> {
  return suggestDealTagsFlow(input);
}

// --- Genkit Prompt Definition ---
// `ai.definePrompt` configures the request to the AI model.
const prompt = ai.definePrompt({
  name: 'suggestDealTagsPrompt', // Unique name for the prompt.
  input: {schema: SuggestDealTagsInputSchema},   // Specifies the input schema.
  output: {schema: SuggestDealTagsOutputSchema}, // Specifies the desired output schema for structured output.
  // The actual prompt template sent to the LLM. Uses Handlebars syntax `{{{ }}}`.
  // 🔧 The prompt's wording guides the AI in generating relevant tags and a summary.
  prompt: `You are an AI assistant that suggests relevant tags for deals on firearms and related products.

  Given the following information about a deal, suggest a list of tags (usually 3-5 tags) that would help users find it when searching.
  Also provide a short summary/description of the deal (around 1-2 sentences) that can be used on the site.

  Product Name: {{{productName}}}
  Product Description: {{{productDescription}}}
  Category: {{{category}}}

  Return your response in the specified JSON format with "tags" as an array of strings and "description" as a string.
  Tags:`, // "Tags:" might be a slight artifact if the model is expected to produce JSON directly due to outputSchema.
          // It's often better to let the structured output schema guide the JSON generation fully.
  // TODO: Consider adjusting safety settings if necessary.
  // config: {
  //   safetySettings: [/* ... */]
  // }
});

// --- Genkit Flow Definition ---
// `ai.defineFlow` wraps the prompt execution into a reusable flow.
const suggestDealTagsFlow = ai.defineFlow(
  {
    name: 'suggestDealTagsFlow', // Unique name for the flow.
    inputSchema: SuggestDealTagsInputSchema,   // Specifies the input schema for the flow.
    outputSchema: SuggestDealTagsOutputSchema, // Specifies the output schema for the flow.
  },
  async input => { // The function that executes when the flow is called.
    // Execute the defined prompt with the flow's input.
    const {output} = await prompt(input);
    // Return the output from the prompt.
    // The `!` asserts that output is not null/undefined. Robust error handling might be added.
    return output!;
  }
);
