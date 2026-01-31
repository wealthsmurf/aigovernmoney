import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header';

export const metadata: Metadata = {
  title: '청년 주거 내비게이터 | AI 주거 지원금 자격 조회',
  description: 'AI로 간편하게 청년 주거 지원금 자격 확인! 나이, 소득, 거주지 정보만으로 나에게 맞는 월세 지원, 전세 대출 등 다양한 주거 정책을 찾아보세요. 복잡한 정책도 AI가 쉽게 요약해드립니다.',
  keywords: ['청년 주거', '주거 지원금', '월세 지원', '전세 대출', '청년 정책', 'AI', '주택 청약', '주거 안정', '청년 월세 지원'],
  openGraph: {
    title: '청년 주거 내비게이터 | AI 주거 지원금 자격 조회',
    description: 'AI로 간편하게 청년 주거 지원금 자격 확인! 나에게 맞는 주거 정책을 찾아보세요.',
    siteName: '청년 주거 내비게이터',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: '청년 주거 내비게이터 | AI 주거 지원금 자격 조회',
    description: 'AI로 간편하게 청년 주거 지원금 자격 확인! 나에게 맞는 주거 정책을 찾아보세요.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
