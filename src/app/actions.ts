"use server";

import * as z from 'zod';
import { findSubsidies, FindSubsidiesOutput } from '@/ai/flows/find-subsidies';

const formSchema = z.object({
  age: z.coerce.number().min(1),
  residence: z.string().min(1),
  monthlyIncome: z.coerce.number().min(0),
  interests: z.string().min(1, { message: '관심분야를 입력해주세요.' }),
});

export async function checkEligibilityAction(
  values: z.infer<typeof formSchema>
): Promise<{ data: FindSubsidiesOutput | null; error: string | null }> {
  try {
    const validatedData = formSchema.parse(values);
    const result = await findSubsidies(validatedData);
    return { data: result, error: null };
  } catch (e) {
    if (e instanceof z.ZodError) {
      return { data: null, error: 'Invalid form data provided.' };
    }
    console.error('Error in checkEligibilityAction:', e);
    return { data: null, error: 'An unexpected error occurred. Please try again.' };
  }
}
