'use server';

/**
 * @fileOverview Determines youth subsidy eligibility based on user input.
 *
 * - findSubsidies - A function that determines subsidy eligibility.
 * - FindSubsidiesInput - The input type for the findSubsidies function.
 * - FindSubsidiesOutput - The return type for the findSubsidies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FindSubsidiesInputSchema = z.object({
  age: z.number().describe('The age of the user.'),
  residence: z.string().describe('The city of residence of the user.'),
  monthlyIncome: z.number().describe('The monthly income of the user in Korean Won.'),
  interests: z.string().describe('The user\'s areas of interest (e.g., housing, employment, startup, education).'),
});
export type FindSubsidiesInput = z.infer<typeof FindSubsidiesInputSchema>;

const FindSubsidiesOutputSchema = z.object({
  eligible: z.boolean().describe('Whether the user is likely eligible for any subsidies.'),
  subsidyDetails: z.string().describe('Details about the subsidies the user might be eligible for. If multiple are found, list them.'),
  applicationMethod: z.string().describe('A detailed step-by-step guide on how to apply for the most relevant subsidy (e.g., online application steps, where to visit).'),
  requiredDocuments: z.array(z.string()).describe('A list of required documents for the application for the most relevant subsidy.'),
  applicationUrl: z.string().optional().describe('The URL to the online application page for the most relevant subsidy, if available.'),
});
export type FindSubsidiesOutput = z.infer<typeof FindSubsidiesOutputSchema>;

export async function findSubsidies(
  input: FindSubsidiesInput
): Promise<FindSubsidiesOutput> {
  return findSubsidiesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'findSubsidiesPrompt',
  input: {schema: FindSubsidiesInputSchema},
  output: {schema: FindSubsidiesOutputSchema},
  prompt: `You are an expert in all Korean government subsidies for youth.

  Based on the user's information, determine if they are likely eligible for any youth subsidies. Consider the user's age, residence, monthly income, and areas of interest.

  If the user is eligible for one or more subsidies, set 'eligible' to true.
  In 'subsidyDetails', provide a summary of all subsidies they might be eligible for.
  Then, for the single most relevant and impactful subsidy, provide a detailed step-by-step guide on how to apply in 'applicationMethod', a list of required documents in 'requiredDocuments', and a URL for the application in 'applicationUrl' if available. The application method should be descriptive and easy to follow.

  If no subsidies are found, set 'eligible' to false and explain why in the 'subsidyDetails'.

  User Age: {{{age}}}
  User Residence: {{{residence}}}
  User Monthly Income: {{{monthlyIncome}}}
  User Interests: {{{interests}}}

  The output must follow the schema provided and be in Korean.
  `,
});

const findSubsidiesFlow = ai.defineFlow(
  {
    name: 'findSubsidiesFlow',
    inputSchema: FindSubsidiesInputSchema,
    outputSchema: FindSubsidiesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
