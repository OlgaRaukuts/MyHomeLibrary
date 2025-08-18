import BookDetailClient from '../[id]/BookDetailClient';

// ⚡ здесь можно описать доступные id
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
}

export default function BookDetailPage() {
  return <BookDetailClient />;
}