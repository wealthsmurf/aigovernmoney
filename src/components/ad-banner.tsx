import { Card } from '@/components/ui/card';

export default function AdBanner() {
  return (
    <Card className="mt-12 overflow-hidden shadow-lg h-48 flex items-center justify-center text-center bg-muted/50 border-dashed">
      <div>
        <h3 className="font-headline text-xl font-bold text-muted-foreground">광고 영역</h3>
        <p className="text-sm text-muted-foreground mt-1">
          이 공간에 Google AdSense 광고를 게재할 수 있습니다.
        </p>
      </div>
    </Card>
  );
}
