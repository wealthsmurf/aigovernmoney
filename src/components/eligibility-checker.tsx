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
  ListOrdered,
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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
          <div className="mt-6">
            {result.eligible ? (
              <Card className="border-primary bg-primary/5">
                <CardHeader className="text-center">
                  <div className="flex flex-col items-center gap-2">
                    <PartyPopper className="h-12 w-12 text-primary" />
                    <CardTitle className="font-headline text-2xl">
                      Congratulations! You might be eligible.
                    </CardTitle>
                    <p className="text-muted-foreground">
                      아래에서 지원금 목록과 가장 관련성 높은 지원금의 신청 방법을 확인해보세요.
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* List of eligible subsidies */}
                  {result.subsidies && result.subsidies.length > 0 && (
                    <div>
                      <h3 className="mb-4 text-xl font-bold font-headline text-center">
                        신청 가능한 지원금 목록
                      </h3>
                      <Accordion type="single" collapsible className="w-full">
                        {result.subsidies.map((subsidy, index) => (
                          <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger className="font-semibold text-lg hover:no-underline text-left">
                              {subsidy.name}
                            </AccordionTrigger>
                            <AccordionContent className="space-y-2 px-2 text-left">
                              <p className="text-foreground/90">{subsidy.description}</p>
                              <p className="text-sm text-muted-foreground">
                                <strong>주관 기관:</strong> {subsidy.agency}
                              </p>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  )}

                  <div className="w-full border-t my-6"></div>

                  {/* Application details for the most relevant subsidy */}
                  {result.mostRelevantSubsidyName && (
                    <div className="space-y-4 text-left">
                      <h3 className="font-headline text-xl font-bold text-center">
                        ✅ {result.mostRelevantSubsidyName}
                        <br />
                        <span className="text-lg">상세 신청 방법</span>
                      </h3>
                      
                      {result.applicationMethod && result.applicationMethod.length > 0 && (
                        <div className="p-4 bg-card rounded-lg border">
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <ListOrdered className="h-5 w-5 text-primary" />
                            신청 절차 (Application Steps)
                          </h4>
                          <ol className="list-decimal list-inside space-y-3 pl-2 text-foreground/90">
                            {result.applicationMethod.map((step, index) => (
                              <li key={index}>{step}</li>
                            ))}
                          </ol>
                        </div>
                      )}

                      {result.requiredDocuments && result.requiredDocuments.length > 0 && (
                          <div className="p-4 bg-card rounded-lg border">
                              <h4 className="font-semibold mb-3 flex items-center gap-2">
                                  <BookOpenCheck className="h-5 w-5 text-primary" />
                                  필요 서류 (Required Documents)
                              </h4>
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
                        <div className="text-center pt-4">
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
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="mt-6 bg-secondary">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <AlertTriangle className="h-12 w-12 text-muted-foreground" />
                    <h3 className="font-headline text-2xl font-bold">
                      아쉽지만, 해당되는 지원금을 찾지 못했습니다.
                    </h3>
                    {result.notEligibleReason && (
                      <p className="text-lg text-foreground/90">
                        {result.notEligibleReason}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground pt-4">
                      입력 정보를 다시 확인하시거나, 나중에 다시 시도해주세요. 정부 정책은 계속 업데이트됩니다.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
