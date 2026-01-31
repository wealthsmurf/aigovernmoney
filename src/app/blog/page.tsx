import { type SummarizeHousingPolicyBlogOutput } from '@/ai/flows/summarize-housing-policy-blog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertCircle,
  BookText,
  CheckCircle,
  List,
} from 'lucide-react';

// The AI-generated summary is now pre-generated and stored statically
// to prevent API rate limit errors and improve page load performance.
const summaryData: SummarizeHousingPolicyBlogOutput = {
  summary:
    '2026년부터 청년 주거 지원 정책이 확대되어 더 많은 청년들이 월세 지원을 받을 수 있게 됩니다. 지원 대상 연령이 39세로 상향되고 소득 기준도 완화되어 약 5만 명의 청년이 추가로 혜택을 받을 것으로 예상됩니다. 신청은 2026년 1월 1일부터 온라인으로 가능하며, 정확한 서류 준비가 중요합니다.',
  keyPoints: [
    '지원 대상 연령이 기존 34세에서 39세로 확대됩니다.',
    '소득 기준이 중위소득 60% 이하에서 70% 이하로 완화됩니다.',
    '온라인 복지 포털을 통해 2026년 1월 1일부터 신청이 시작됩니다.',
  ],
  tips: '신청 시 소득 증빙 자료를 정확히 준비하는 것이 중요합니다. 특히 비정기적인 소득(보너스 등)을 규정에 맞게 신고해야 불이익을 피할 수 있습니다. 신청 전에 모든 서류가 최신 정보인지 다시 한번 확인하세요.',
};

export default function BlogPage() {
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
            <>
              <div>
                <h2 className="mb-4 flex items-center gap-2 border-b pb-2 font-headline text-2xl font-semibold">
                  Summary / 정책 요약
                </h2>
                <p className="text-lg leading-relaxed">
                  {summaryData.summary}
                </p>
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
            </>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
