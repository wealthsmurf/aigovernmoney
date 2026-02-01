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

// New schema for a single subsidy
const SubsidyInfoSchema = z.object({
  name: z.string().describe('The official name of the subsidy program.'),
  description: z.string().describe('A concise summary of what the subsidy provides.'),
  agency: z.string().describe('The government agency or organization that manages the subsidy.'),
});

// Updated output schema
const FindSubsidiesOutputSchema = z.object({
  eligible: z.boolean().describe('Whether the user is likely eligible for any subsidies.'),
  subsidies: z.array(SubsidyInfoSchema).optional().describe('A list of subsidies the user might be eligible for.'),
  mostRelevantSubsidyName: z.string().optional().describe('The name of the single most relevant subsidy, for which application details are provided below.'),
  applicationMethod: z.array(z.string()).optional().describe('A detailed step-by-step guide on how to apply for the most relevant subsidy. Each string in the array is a separate step.'),
  requiredDocuments: z.array(z.string()).optional().describe('A list of required documents for the application for the most relevant subsidy.'),
  applicationUrl: z.string().optional().describe('The URL to the online application page for the most relevant subsidy, if available.'),
  notEligibleReason: z.string().optional().describe('If not eligible, a brief explanation of why.'),
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

  Based on the user's information, determine if they are likely eligible for any youth subsidies.

  **If the user is eligible for one or more subsidies:**
  1.  Set 'eligible' to true.
  2.  In the 'subsidies' array, provide a list of all subsidies they might be eligible for. Each item in the array should be an object with the subsidy's 'name', 'description', and the responsible 'agency'.
  3.  From that list, identify the single most relevant subsidy.
  4.  Set 'mostRelevantSubsidyName' to the name of that subsidy.
  5.  In 'applicationMethod', provide a step-by-step guide on how to apply for that most relevant subsidy. Each step should be a separate string in the array.
  6.  In 'requiredDocuments', list the necessary documents for that subsidy.
  7.  If an online application URL exists for it, provide it in 'applicationUrl'.

  **If no subsidies are found:**
  1.  Set 'eligible' to false.
  2.  In 'notEligibleReason', provide a brief, easy-to-understand explanation of why they are not eligible (e.g., "소득 기준을 초과합니다." or "해당 지역에 맞는 지원금이 없습니다.").

  User Information:
  - User Age: {{{age}}}
  - User Residence: {{{residence}}}
  - User Monthly Income: {{{monthlyIncome}}}
  - User Interests: {{{interests}}}

  The output must follow the schema provided and be in Korean. Make the descriptions and steps clear and easy to read.
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
