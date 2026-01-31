import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-3xl text-primary md:text-4xl">
              청년 지원금 내비게이터: 당신에게 맞는 지원금, AI가 찾아드립니다
            </CardTitle>
            <p className="pt-2 text-muted-foreground">
              '청년 지원금 내비게이터'가 여러분의 복잡한 지원금 문제를 해결해드리는 방법과 저희 서비스의 강점을 소개합니다.
            </p>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <p className="text-lg leading-relaxed">
              사회에 첫발을 내딛는 청년들에게 '안정'은 먼 꿈처럼 느껴지고, 학업, 취업, 주거 등 다양한 분야에서 경제적 부담을 마주하게 됩니다. 정부와 각 지자체에서는 청년들의 부담을 덜어주기 위해 수많은 지원 정책을 시행하고 있지만, 정보는 여러 곳에 흩어져 있고, 전문 용어와 복잡한 조건들로 가득해 나에게 맞는 정책을 찾기란 하늘의 별 따기와도 같습니다.
            </p>
            <p className="text-lg leading-relaxed">
              '청년 지원금 내비게이터'는 바로 이 지점에서 출발했습니다. 저희는 최신 AI 기술을 활용하여, 단 몇 가지 핵심 정보(나이, 거주지, 월 소득, 관심 분야)만으로 수많은 정책 데이터베이스를 실시간으로 분석합니다. 이를 통해 사용자 개개인의 상황에 가장 적합한 정부 지원금 수혜 자격을 단 몇 초 만에 정확하게 진단해 드립니다. 더 이상 여러 웹사이트를 헤매며 시간을 낭비하지 마세요.
            </p>
            <p className="text-lg leading-relaxed">
              하지만 저희 서비스는 단순한 자격 여부 확인에서 그치지 않습니다. AI는 사용자가 수혜 가능한 정책을 찾으면, 마치 전문 컨설턴트처럼 상세하고 친절한 안내를 시작합니다. '청년 월세 특별 지원', '구직촉진수당', '청년창업사관학교' 등 해당 정책의 구체적인 혜택부터, 온라인 신청, 주민센터 방문 등 정책별로 상이한 신청 절차를 누구나 따라 하기 쉽게 단계별로 설명해 드립니다.
            </p>
            <p className="text-lg leading-relaxed">
              또한, 신청 과정에서 가장 큰 걸림돌 중 하나인 서류 준비의 막막함을 덜어드리고자, AI가 주민등록등본, 소득금액증명원 등 필요한 모든 서류 목록을 꼼꼼하게 정리하여 제공합니다. 뿐만 아니라, 온라인 신청이 가능한 경우 해당 사이트로 바로 연결되는 링크를 제공하여, 정보 탐색부터 신청 직전까지의 모든 과정을 하나의 앱 안에서 원스톱으로 해결할 수 있습니다.
            </p>
            <p className="text-lg leading-relaxed">
              '청년 지원금 내비게이터'의 목표는 명확합니다. 복잡하고 어려운 행정 절차의 장벽을 낮추고, 모든 청년이 마땅히 누려야 할 권리를 쉽고 편리하게 찾을 수 있도록 돕는 것입니다. 저희는 여러분의 곁에서 가장 똑똑하고 든든한 길잡이가 되어드리겠습니다. 지금 바로 '청년 지원금 내비게이터'와 함께 여러분의 가능성을 향한 첫걸음을 내딛어 보세요.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
