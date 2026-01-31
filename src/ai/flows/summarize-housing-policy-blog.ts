'use server';

/**
 * @fileOverview Summarizes news articles and government policies related to youth housing subsidies.
 *
 * - summarizeHousingPolicyBlog - A function that summarizes the content.
 * - SummarizeHousingPolicyBlogInput - The input type for the summarizeHousingPolicyBlog function.
 * - SummarizeHousingPolicyBlogOutput - The return type for the summarizeHousingPolicyBlog function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeHousingPolicyBlogInputSchema = z.object({
  articleContent: z
    .string()
    .describe('The content of the news article or government policy document.'),
});
export type SummarizeHousingPolicyBlogInput = z.infer<
  typeof SummarizeHousingPolicyBlogInputSchema
>;

const SummarizeHousingPolicyBlogOutputSchema = z.object({
  summary: z.string().describe('A summary of the news article or policy.'),
  keyPoints: z
    .array(z.string())
    .describe('Key points extracted from the article or policy.'),
  tips: z.string().describe('Helpful tips or important considerations.'),
});
export type SummarizeHousingPolicyBlogOutput = z.infer<
  typeof SummarizeHousingPolicyBlogOutputSchema
>;

export async function summarizeHousingPolicyBlog(
  input: SummarizeHousingPolicyBlogInput
): Promise<SummarizeHousingPolicyBlogOutput> {
  return summarizeHousingPolicyBlogFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeHousingPolicyBlogPrompt',
  input: {schema: SummarizeHousingPolicyBlogInputSchema},
  output: {schema: SummarizeHousingPolicyBlogOutputSchema},
  prompt: `You are an expert policy analyst specializing in youth housing subsidies.  Summarize the following news article or government policy document regarding youth housing subsidies.

  Article Content: {{{articleContent}}}

  In your summary, extract key points and provide helpful tips or important considerations for young people seeking housing assistance.

  Summary:
  Key Points:
  - [Key Point 1]
  - [Key Point 2]
  - [Key Point 3]
  Tips:`, // Ensure the LLM returns the summary, key points, and tips
});

const summarizeHousingPolicyBlogFlow = ai.defineFlow(
  {
    name: 'summarizeHousingPolicyBlogFlow',
    inputSchema: SummarizeHousingPolicyBlogInputSchema,
    outputSchema: SummarizeHousingPolicyBlogOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
