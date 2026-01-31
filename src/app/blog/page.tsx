import { summarizeHousingPolicyBlog } from '@/ai/flows/summarize-housing-policy-blog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, BookText, CheckCircle, List } from 'lucide-react';

// Dummy content for the summarizer. In a real app, this would come from a CMS or database.
const articleContent = `
The government has announced a new youth housing support policy for 2026. The key aspect of this policy is the expansion of eligibility criteria to include more young people struggling with housing costs. The monthly rent support subsidy, previously capped at 200,000 KRW, will now be available to individuals up to the age of 39, an extension from the previous 34-year-old limit. Furthermore, the income threshold has been adjusted. Applicants must now have an income that is 70% or less of the median income for their residential area, a 10% increase from the previous 60% limit. This change is expected to make an additional 50,000 young adults eligible for the subsidy nationwide.

To apply, several documents are required: a completed application form, a signed pledge of honesty, a copy of the lease agreement, proof of income for the last three months, and a family relation certificate. Applications will be accepted online through the official government welfare portal starting from January 1st, 2026. It is crucial that all documents are up-to-date and submitted correctly to avoid delays. One common pitfall is the income calculation; applicants must ensure that irregular income sources, such as annual bonuses, are correctly reported as per the guidelines. Failure to do so can result in disqualification.
`;

export default async function BlogPage() {
  const summaryData = await summarizeHousingPolicyBlog({ articleContent });

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-3xl text-primary md:text-4xl">
              2026년 청년 주거 지원금 신청 자격 총정리
            </CardTitle>
            <p className="pt-2 text-muted-foreground">
              An AI-powered summary of the latest updates on youth housing
              policies.
            </p>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <h2 className="mb-4 flex items-center gap-2 border-b pb-2 font-headline text-2xl font-semibold">
                Summary / 정책 요약
              </h2>
              <p className="text-lg leading-relaxed">{summaryData.summary}</p>
            </div>

            <div>
              <h2 className="mb-4 flex items-center gap-2 border-b pb-2 font-headline text-2xl font-semibold">
                <List className="text-primary" /> Key Points / 핵심 사항
              </h2>
              <ul className="list-inside space-y-3">
                {summaryData.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-4 flex items-center gap-2 border-b pb-2 font-headline text-2xl font-semibold">
                <BookText className="text-primary" />
                신청 시 필요한 서류
              </h2>
              <ul className="list-disc list-inside space-y-2 text-foreground/80">
                <li>확약서 (Pledge)</li>
                <li>임대차계약서 (Lease Agreement)</li>
                <li>월세이체증 (Proof of Rent Payment)</li>
                <li>소득증빙서류 (Proof of Income)</li>
                <li>가족관계증명서 (Family Relation Certificate)</li>
              </ul>
            </div>

            <Card className="border-accent/50 bg-accent/20">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-1 h-6 w-6 text-accent-foreground" />
                  <div>
                    <h3 className="font-headline font-bold text-accent-foreground">
                      꿀팁 (Pro Tip)
                    </h3>
                    <p className="text-accent-foreground/90">
                      {summaryData.tips}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
