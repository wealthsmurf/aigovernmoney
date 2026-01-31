import AdBanner from '@/components/ad-banner';
import EligibilityChecker from '@/components/eligibility-checker';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            Youth Housing Subsidy
          </h1>
          <p className="mt-4 text-lg text-foreground/80">
            Check if you're eligible for housing support in minutes. Just enter
            your details below.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            청년 주거 지원금 자격이 되는지 몇 분 안에 확인해 보세요. 아래에
            정보를 입력하기만 하면 됩니다.
          </p>
        </div>
        <EligibilityChecker />
        <AdBanner />
      </div>
    </div>
  );
}
