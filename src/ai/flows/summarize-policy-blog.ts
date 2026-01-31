'use server';

/**
 * @fileOverview Summarizes news articles and government policies related to youth subsidies.
 *
 * - summarizePolicyBlog - A function that summarizes the content.
 * - SummarizePolicyBlogInput - The input type for the summarizePolicyBlog function.
 * - SummarizePolicyBlogOutput - The return type for the summarizePolicyBlog function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizePolicyBlogInputSchema = z.object({
  articleContent: z
    .string()
    .describe('The content of the news article or government policy document.'),
});
export type SummarizePolicyBlogInput = z.infer<
  typeof SummarizePolicyBlogInputSchema
>;

const SummarizePolicyBlogOutputSchema = z.object({
  summary: z.string().describe('A summary of the news article or policy.'),
  keyPoints: z
    .array(z.string())
    .describe('Key points extracted from the article or policy.'),
  tips: z.string().describe('Helpful tips or important considerations.'),
});
export type SummarizePolicyBlogOutput = z.infer<
  typeof SummarizePolicyBlogOutputSchema
>;

export async function summarizePolicyBlog(
  input: SummarizePolicyBlogInput
): Promise<SummarizePolicyBlogOutput> {
  return summarizePolicyBlogFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizePolicyBlogPrompt',
  input: {schema: SummarizePolicyBlogInputSchema},
  output: {schema: SummarizePolicyBlogOutputSchema},
  prompt: `You are an expert policy analyst specializing in youth subsidies.  Summarize the following news article or government policy document regarding youth subsidies.

  Article Content: {{{articleContent}}}

  In your summary, extract key points and provide helpful tips or important considerations for young people seeking government assistance.

  Summary:
  Key Points:
  - [Key Point 1]
  - [Key Point 2]
  - [Key Point 3]
  Tips:`, // Ensure the LLM returns the summary, key points, and tips
});

const summarizePolicyBlogFlow = ai.defineFlow(
  {
    name: 'summarizePolicyBlogFlow',
    inputSchema: SummarizePolicyBlogInputSchema,
    outputSchema: SummarizePolicyBlogOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
