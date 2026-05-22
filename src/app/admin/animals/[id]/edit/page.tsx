type EditAnimalPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditAnimalPage({ params }: EditAnimalPageProps) {
  const { id } = await params;

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-2xl font-bold">Rediger dyr</h1>
      <p className="mt-3 text-gray-600">
        Her skal formularen hente og opdatere dyret med id {id}.
      </p>
    </main>
  );
}
