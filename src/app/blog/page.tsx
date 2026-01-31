import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-3xl text-primary md:text-4xl">
              청년 주거 내비게이터: 당신의 보금자리, AI가 찾아드립니다
            </CardTitle>
            <p className="pt-2 text-muted-foreground">
              이 앱의 기능과 장점에 대해 알아보세요.
            </p>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <p className="text-lg leading-relaxed">
              청년 주거 안정의 꿈, 더 이상 멀게만 느껴지지 않도록 '청년 주거
              내비게이터'가 함께합니다. 복잡하고 흩어져 있는 정부의 청년 주택
              지원 정책, 어디서부터 어떻게 알아봐야 할지 막막하셨나요?
            </p>
            <p className="text-lg leading-relaxed">
              저희 서비스는 최신 AI 기술을 활용하여, 단 몇 가지 정보(나이,
              거주지, 소득, 주거 형태) 입력만으로 개인별 맞춤형 주거 지원금 수혜
              자격을 즉시 진단해 드립니다.
            </p>
            <p className="text-lg leading-relaxed">
              단순한 자격 여부 확인을 넘어, 본인에게 가장 적합한 정책을 AI가
              직접 분석하여 상세한 신청 방법과 절차, 준비해야 할 서류 목록,
              그리고 신청 사이트 바로가기 링크까지 한 번에 제공합니다.
            </p>
            <p className="text-lg leading-relaxed">
              마치 전문가에게 1:1 컨설팅을 받는 것처럼, 복잡한 행정 절차의
              스트레스 없이 쉽고 빠르게 보금자리를 찾을 수 있도록 돕는 것이
              저희의 목표입니다. 이제 '청년 주거 내비게이터'와 함께 똑똑하고
              편리하게 여러분의 주거 권리를 찾아보세요.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
