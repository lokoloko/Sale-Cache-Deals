// src/ai/flows/suggest-deal-description.ts
'use server'; // This directive marks the module's functions as callable from Server Components and Server Actions.

/**
 * @fileOverview An AI tool to suggest a compelling description for a user-submitted deal.
 * This file defines a Genkit flow that uses an AI model to generate deal descriptions.
 *
 * - suggestDealDescription - Exported async function that invokes the Genkit flow.
 * - SuggestDealDescriptionInput - 🔍 Zod schema and TypeScript type for the input to the flow. This defines what data the UI needs to provide.
 * - SuggestDealDescriptionOutput - 🔍 Zod schema and TypeScript type for the output from the flow. This defines what data the UI will receive.
 */

import {ai} from '@/ai/genkit'; // Genkit AI instance.
import {z} from 'genkit'; // Zod for schema definition and validation.

// --- Input Schema Definition ---
/**
 * @const SuggestDealDescriptionInputSchema
 * @description Zod schema for the input required by the `suggestDealDescription` flow.
 * Each field is described for clarity, especially for the AI model.
 * // 🔍 This schema dictates the data structure the UI form (e.g., SubmitDealForm) must send.
 */
const SuggestDealDescriptionInputSchema = z.object({
  productName: z.string().describe('The name of the product being offered in the deal.'),
  productCategory: z.string().describe('The category of the product (e.g., rifle, pistol, optic).'),
  retailer: z.string().describe('The name of the retailer offering the deal.'),
  originalPrice: z.number().describe('The original price of the product.'),
  dealPrice: z.number().describe('The discounted price of the product.'),
  productDetails: z.string().describe('Detailed information about the product, including specs and features. This can be an existing user-entered description to be improved upon.'),
});

// TypeScript type inferred from the Zod schema.
export type SuggestDealDescriptionInput = z.infer<typeof SuggestDealDescriptionInputSchema>;

// --- Output Schema Definition ---
/**
 * @const SuggestDealDescriptionOutputSchema
 * @description Zod schema for the output produced by the `suggestDealDescription` flow.
 * // 🔍 This schema defines the data structure the UI will receive and can use to update form fields.
 */
const SuggestDealDescriptionOutputSchema = z.object({
  suggestedDescription: z.string().describe('A compelling, AI-generated description for the deal submission.'),
});

// TypeScript type inferred from the Zod schema.
export type SuggestDealDescriptionOutput = z.infer<typeof SuggestDealDescriptionOutputSchema>;

// --- Public Interface Function ---
/**
 * @async
 * @function suggestDealDescription
 * @description Asynchronously invokes the `suggestDealDescriptionFlow` with the provided input.
 * This is the primary function imported and used by the UI (e.g., in `SubmitDealForm`).
 * @param {SuggestDealDescriptionInput} input - The input data for suggesting a deal description.
 * @returns {Promise<SuggestDealDescriptionOutput>} A promise that resolves to the AI-suggested description.
 * // 🔧 This function is called from the UI to trigger the AI description generation.
 */
export async function suggestDealDescription(input: SuggestDealDescriptionInput): Promise<SuggestDealDescriptionOutput> {
  return suggestDealDescriptionFlow(input);
}

// --- Genkit Prompt Definition ---
// `ai.definePrompt` configures the request to the AI model.
const prompt = ai.definePrompt({
  name: 'suggestDealDescriptionPrompt', // Unique name for the prompt.
  input: {schema: SuggestDealDescriptionInputSchema},   // Specifies the input schema.
  output: {schema: SuggestDealDescriptionOutputSchema}, // Specifies the desired output schema (forces structured output).
  // The actual prompt template sent to the LLM. Uses Handlebars syntax `{{{ }}}` for variable substitution.
  // 🔧 The wording and structure of this prompt directly influence the quality of AI-generated descriptions.
  prompt: `You are an expert copywriter specializing in creating compelling deal descriptions for firearms and accessories.

  Based on the following product details, create a short, attention-grabbing description for a deal submission. Highlight the key features and the savings offered.

  Product Name: {{{productName}}}
  Product Category: {{{productCategory}}}
  Retailer: {{{retailer}}}
  Original Price: {{{originalPrice}}}
  Deal Price: {{{dealPrice}}}
  Product Details: {{{productDetails}}}

  Write a description that is concise, informative, and persuasive, encouraging users to check out the deal. Focus on what makes this deal particularly attractive.
  `,
  // TODO: Consider adding safety settings if needed, e.g., for specific content policies.
  // config: {
  //   safetySettings: [/* ... */]
  // }
});

// --- Genkit Flow Definition ---
// `ai.defineFlow` wraps the prompt execution into a reusable flow.
const suggestDealDescriptionFlow = ai.defineFlow(
  {
    name: 'suggestDealDescriptionFlow', // Unique name for the flow.
    inputSchema: SuggestDealDescriptionInputSchema,   // Specifies the input schema for the flow.
    outputSchema: SuggestDealDescriptionOutputSchema, // Specifies the output schema for the flow.
  },
  async input => { // The function that executes when the flow is called.
    // Execute the defined prompt with the flow's input.
    const {output} = await prompt(input);
    // Return the output from the prompt. The `!` asserts that output is not null/undefined,
    // assuming the LLM successfully adheres to the output schema. Error handling might be needed for robustness.
    return output!; 
  }
);
