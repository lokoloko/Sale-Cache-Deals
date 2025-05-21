// This file is machine generated - changes may be lost.

'use server';

/**
 * @fileOverview Provides AI-powered suggestions for relevant tags for user-submitted deals.
 *
 * - suggestDealTags - A function that suggests relevant tags for a deal submission.
 * - SuggestDealTagsInput - The input type for the suggestDealTags function.
 * - SuggestDealTagsOutput - The return type for the suggestDealTags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestDealTagsInputSchema = z.object({
  productName: z.string().describe('The name of the product being offered in the deal.'),
  productDescription: z.string().describe('A detailed description of the product and the deal itself.'),
  category: z.string().describe('The category of the product (e.g., firearms, accessories, ammunition).'),
});

export type SuggestDealTagsInput = z.infer<typeof SuggestDealTagsInputSchema>;

const SuggestDealTagsOutputSchema = z.object({
  tags: z.array(z.string()).describe('An array of relevant tags for the deal, to improve categorization and searchability.'),
  description: z.string().describe('A summary of the deal'),
});

export type SuggestDealTagsOutput = z.infer<typeof SuggestDealTagsOutputSchema>;

export async function suggestDealTags(input: SuggestDealTagsInput): Promise<SuggestDealTagsOutput> {
  return suggestDealTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestDealTagsPrompt',
  input: {schema: SuggestDealTagsInputSchema},
  output: {schema: SuggestDealTagsOutputSchema},
  prompt: `You are an AI assistant that suggests relevant tags for deals on firearms and related products.

  Given the following information about a deal, suggest a list of tags that would help users find it when searching.
  Also provide a short summary/description of the deal that can be used on the site.

  Product Name: {{{productName}}}
  Product Description: {{{productDescription}}}
  Category: {{{category}}}

  Tags:`,
});

const suggestDealTagsFlow = ai.defineFlow(
  {
    name: 'suggestDealTagsFlow',
    inputSchema: SuggestDealTagsInputSchema,
    outputSchema: SuggestDealTagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
