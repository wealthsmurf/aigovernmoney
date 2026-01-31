"use client";

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  ArrowRight,
  PartyPopper,
  AlertTriangle,
  LoaderCircle,
  BookOpenCheck,
} from 'lucide-react';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { checkEligibilityAction } from '@/app/actions';
import type { FindSubsidiesOutput } from '@/ai/flows/find-subsidies';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  age: z.coerce.number().min(1, { message: '나이를 입력해주세요.' }),
  residence: z.string().min(1, { message: '거주지를 입력해주세요.' }),
  monthlyIncome: z.coerce.number().min(0, { message: '월 소득을 입력해주세요.' }),
  interests: z.string().min(1, { message: '관심분야를 한 가지 이상 입력해주세요.' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function EligibilityChecker() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<FindSubsidiesOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 28,
      residence: '서울특별시',
      monthlyIncome: 2500000,
      interests: '주거, 취업',
    },
  });

  const onSubmit = (values: FormValues) => {
    setError(null);
    setResult(null);
    startTransition(async () => {
      const { data, error } = await checkEligibilityAction(values);
      if (error) {
        setError(error);
      } else {
        setResult(data);
      }
    });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          Eligibility Checker / 자격 판독기
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age / 나이</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 28" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="residence"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City of Residence / 거주지</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 서울특별시" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="monthlyIncome"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Monthly Income (KRW) / 월 소득 (원)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g., 2500000"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter your income in Korean Won.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Areas of Interest / 관심 분야</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 주거, 창업, 취업, 교육"
                        {...field}
                      />
                    </FormControl>
                     <FormDescription>
                      What kind of support are you looking for? (e.g., housing, startup, employment, education)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-accent text-accent-foreground font-bold hover:bg-accent/90 transition-transform active:scale-[0.98]"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <LoaderCircle className="animate-spin" />
                  Checking...
                </>
              ) : (
                'Check Eligibility'
              )}
            </Button>
          </form>
        </Form>

        {isPending && (
          <div className="mt-6 text-center">
            <LoaderCircle className="mx-auto h-8 w-8 animate-spin text-primary" />
            <p className="mt-2 font-semibold">Analyzing your information...</p>
            <p className="text-sm text-muted-foreground">
              AI is comparing against current policies.
            </p>
          </div>
        )}

        {error && (
          <Card className="mt-6 border-destructive bg-destructive/10 text-destructive-foreground">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-destructive" />
                <div>
                  <p className="font-bold">An error occurred</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {result && (
          <Card
            className={`mt-6 ${
              result.eligible ? 'border-primary bg-primary/5' : 'bg-secondary'
            }`}
          >
            <CardContent className="p-6">
              <div className="flex flex-col items-center gap-4 text-center">
                {result.eligible ? (
                  <PartyPopper className="h-12 w-12 text-primary" />
                ) : (
                  <AlertTriangle className="h-12 w-12 text-muted-foreground" />
                )}
                <h3 className="font-headline text-2xl font-bold">
                  {result.eligible
                    ? 'Congratulations!'
                    : 'Eligibility Unlikely'}
                </h3>
                <p className="text-lg text-foreground/90 whitespace-pre-wrap">
                  {result.subsidyDetails}
                </p>

                {result.eligible && (
                  <>
                    <div className="w-full border-t my-4"></div>
                    <div className="w-full text-center space-y-4">
                        <h4 className="font-headline text-xl font-bold">
                            신청 방법 (How to Apply)
                        </h4>
                        <p className="text-foreground/90 whitespace-pre-wrap">{result.applicationMethod}</p>
                        
                        {result.requiredDocuments && result.requiredDocuments.length > 0 && (
                            <div className="text-left p-4 border rounded-md bg-card max-w-md mx-auto">
                                <h5 className="font-semibold mb-2 flex items-center gap-2">
                                    <BookOpenCheck className="h-5 w-5 text-primary" />
                                    필요한 서류 (Required Documents)
                                </h5>
                                <ul className="list-disc list-inside space-y-2 text-foreground/80 pl-2">
                                    {result.requiredDocuments.map((doc, index) => (
                                      <li key={index}>{doc}</li>
                                    ))}
                                </ul>
                                <p className="text-xs mt-3 text-muted-foreground">
                                    * 필요 서류는 정책에 따라 달라질 수 있습니다. 방문 전 공식 사이트에서 확인하세요.
                                </p>
                            </div>
                        )}
                        {result.applicationUrl && (
                          <Button
                              asChild
                              className="w-full bg-accent text-accent-foreground font-bold hover:bg-accent/90 sm:w-auto transition-transform active:scale-[0.98]"
                              >
                              <a
                                  href={result.applicationUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                              >
                                  신청 사이트로 바로가기
                                  <ArrowRight className="ml-2 h-4 w-4" />
                              </a>
                          </Button>
                        )}
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
