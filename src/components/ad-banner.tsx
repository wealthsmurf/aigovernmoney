import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ExternalLink } from 'lucide-react';

export default function AdBanner() {
  const adImage = PlaceHolderImages.find((img) => img.id === 'ad-banner-1');

  if (!adImage) {
    return null;
  }

  return (
    <Card className="mt-12 overflow-hidden shadow-lg">
      <Link href="#" className="group block">
        <div className="relative h-48 w-full">
          <Image
            src={adImage.imageUrl}
            alt={adImage.description}
            fill
            style={{ objectFit: 'cover' }}
            data-ai-hint={adImage.imageHint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h3 className="font-headline text-2xl font-bold">광고 문의</h3>
            <p className="mt-1 flex items-center text-sm opacity-90">
              여기에 광고를 게재하세요{' '}
              <ExternalLink className="ml-1.5 h-4 w-4" />
            </p>
          </div>
        </div>
      </Link>
    </Card>
  );
}
