'use server';

/**
 * @fileOverview Determines youth housing subsidy eligibility based on user input.
 *
 * - determineSubsidyEligibility - A function that determines subsidy eligibility.
 * - SubsidyEligibilityInput - The input type for the determineSubsidyEligibility function.
 * - SubsidyEligibilityOutput - The return type for the determineSubsidyEligibility function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SubsidyEligibilityInputSchema = z.object({
  age: z.number().describe('The age of the user.'),
  residence: z.string().describe('The city of residence of the user.'),
  monthlyIncome: z.number().describe('The monthly income of the user in Korean Won.'),
  housingType: z.string().describe('The housing type of the user (e.g., 월세, 전세).'),
});
export type SubsidyEligibilityInput = z.infer<typeof SubsidyEligibilityInputSchema>;

const SubsidyEligibilityOutputSchema = z.object({
  eligible: z.boolean().describe('Whether the user is likely eligible for youth housing subsidy.'),
  subsidyDetails: z.string().describe('Details about the subsidy the user is eligible for.'),
  applicationMethod: z.string().describe('A detailed step-by-step guide on how to apply for the subsidy (e.g., online application steps, where to visit).'),
  requiredDocuments: z.array(z.string()).describe('A list of required documents for the application.'),
  applicationUrl: z.string().optional().describe('The URL to the online application page, if available.'),
});
export type SubsidyEligibilityOutput = z.infer<typeof SubsidyEligibilityOutputSchema>;

export async function determineSubsidyEligibility(
  input: SubsidyEligibilityInput
): Promise<SubsidyEligibilityOutput> {
  return determineSubsidyEligibilityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'subsidyEligibilityPrompt',
  input: {schema: SubsidyEligibilityInputSchema},
  output: {schema: SubsidyEligibilityOutputSchema},
  prompt: `You are an expert in Korean youth housing subsidies.

  Based on the user's information, determine if they are likely eligible for any youth housing subsidies. Consider the age, residence, monthly income, and housing type of the user. Check if the user meets the requirements for 청년 월세 지원 정책, which generally requires applicants to be between 19 and 34 years old and have an income below 60% of the median income.
  
  If the user is eligible, provide details about the subsidy including the monetary amount, a detailed step-by-step guide on how to apply (applicationMethod), a list of required documents, and a URL for the application if available. The application method should be descriptive and easy to follow.

  User Age: {{{age}}}
  User Residence: {{{residence}}}
  User Monthly Income: {{{monthlyIncome}}}
  User Housing Type: {{{housingType}}}

  The output must follow the schema provided and be in Korean.
  `,
});

const determineSubsidyEligibilityFlow = ai.defineFlow(
  {
    name: 'determineSubsidyEligibilityFlow',
    inputSchema: SubsidyEligibilityInputSchema,
    outputSchema: SubsidyEligibilityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
