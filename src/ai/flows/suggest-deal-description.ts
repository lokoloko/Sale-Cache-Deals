// src/ai/flows/suggest-deal-description.ts
'use server';

/**
 * @fileOverview An AI tool to suggest a compelling description for a user-submitted deal.
 *
 * - suggestDealDescription - A function that suggests a deal description based on product details.
 * - SuggestDealDescriptionInput - The input type for the suggestDealDescription function.
 * - SuggestDealDescriptionOutput - The return type for the suggestDealDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestDealDescriptionInputSchema = z.object({
  productName: z.string().describe('The name of the product being offered in the deal.'),
  productCategory: z.string().describe('The category of the product (e.g., rifle, pistol, optic).'),
  retailer: z.string().describe('The name of the retailer offering the deal.'),
  originalPrice: z.number().describe('The original price of the product.'),
  dealPrice: z.number().describe('The discounted price of the product.'),
  productDetails: z.string().describe('Detailed information about the product, including specs and features.'),
});

export type SuggestDealDescriptionInput = z.infer<typeof SuggestDealDescriptionInputSchema>;

const SuggestDealDescriptionOutputSchema = z.object({
  suggestedDescription: z.string().describe('A compelling description for the deal submission.'),
});

export type SuggestDealDescriptionOutput = z.infer<typeof SuggestDealDescriptionOutputSchema>;

export async function suggestDealDescription(input: SuggestDealDescriptionInput): Promise<SuggestDealDescriptionOutput> {
  return suggestDealDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestDealDescriptionPrompt',
  input: {schema: SuggestDealDescriptionInputSchema},
  output: {schema: SuggestDealDescriptionOutputSchema},
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
});

const suggestDealDescriptionFlow = ai.defineFlow(
  {
    name: 'suggestDealDescriptionFlow',
    inputSchema: SuggestDealDescriptionInputSchema,
    outputSchema: SuggestDealDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
