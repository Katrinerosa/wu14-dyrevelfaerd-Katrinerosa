"use client"

import { FormEvent, useState, useTransition } from "react";
import { type Animal } from "@/app/lib/api";
import { ApiImage } from "@/app/components/ApiImage";

type EditAnimalFormProps = {
  animal: Animal;
  id: string;
};

export function EditAnimalForm({ animal, id }: EditAnimalFormProps) {
  const [name, setName] = useState(animal.name);
  const [description, setDescription] = useState(animal.description ?? "");
  const [imageUrl, setImageUrl] = useState(animal.asset?.url ?? "");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(async () => {
      setMessage("");

      const body = {
        name,
        description,
        age: animal.age,
        assetId: animal.assetId,
      };

      const response = await fetch(`/admin/${id}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setMessage("Ændringerne er gemt.");
      } else {
        setMessage("Kunne ikke gemme. Prøv igen.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded border p-4">
        <p className="mb-2 font-bold">Nuværende billede</p>
        <ApiImage
          src={imageUrl}
          alt={animal.name}
          className="h-56 w-full rounded object-cover"
        />
      </div>

      <label className="block">
        Navn
        <input
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full border p-2"
        />
      </label>

      <label className="block">
        Beskrivelse
        <textarea
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Skriv en beskrivelse af dyret"
          rows={6}
          className="w-full border p-2"
        />
      </label>

      <label className="block">
        Billed-url
        <input
          name="imageUrl"
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
          placeholder="Indsæt ny billed-url"
          className="w-full border p-2"
        />
      </label>

      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
      >
        {isPending ? "Gemmer..." : "Gem"}
      </button>

      {message ? <p className="text-sm text-gray-700">{message}</p> : null}
    </form>
  );
}
