type AnimalDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AnimalDetailPage({ params }: AnimalDetailPageProps) {
  const { id } = await params;

  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="text-3xl font-bold">Dyredetalje</h1>
      <p className="mt-3 text-gray-600">
        Her skal det enkelte dyr hentes fra /api/v1/animals/{id}.
      </p>
    </main>
  );
}
