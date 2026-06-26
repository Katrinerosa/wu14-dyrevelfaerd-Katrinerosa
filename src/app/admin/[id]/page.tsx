"use server"

import { getApiItem, type Animal } from "@/app/lib/api";
import { EditAnimalForm } from "./EditAnimalForm";

export default async function EditAnimalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const animal = await getApiItem<Animal>(`animals/${id}`);

  if (!animal) {
    return (
      <main className="mx-auto min-w-250 px-8 py-24">
        <h1>Dyret blev ikke fundet</h1>
      </main>
    );
  }

  return (
    <main className="mx-auto min-w-250 px-8 py-24">
      <h1>Rediger {animal.name}</h1>

      <EditAnimalForm animal={animal} id={id} />
    </main>
  );
}