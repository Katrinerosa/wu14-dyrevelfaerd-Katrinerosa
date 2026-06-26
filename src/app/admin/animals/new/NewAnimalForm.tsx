"use client"

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiImage } from "@/app/components/ApiImage";

export default function NewAnimalForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [age, setAge] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    if (f) setPreview(URL.createObjectURL(f));
    else setPreview(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      let assetId: number | null = null;

      if (file) {
        const fd = new FormData();
        fd.append("file", file, file.name);

        const uploadRes = await fetch(`/admin/animals/new/upload`, {
          method: "POST",
          body: fd,
        });

        if (!uploadRes.ok) {
          const text = await uploadRes.text();
          throw new Error(`Upload failed: ${uploadRes.status} ${text}`);
        }

        const uploadJson = await uploadRes.json();
        assetId = uploadJson.id ?? uploadJson.asset?.id ?? uploadJson.assetId ?? null;
      }

      const createBody = {
        name,
        description,
        age: age ? Number(age) : undefined,
        assetId,
      };

      const createRes = await fetch(`/admin/animals/new/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createBody),
      });

      if (!createRes.ok) {
        const text = await createRes.text();
        throw new Error(`Create failed: ${createRes.status} ${text}`);
      }

      setMessage("Dyr oprettet.");
      router.push("/admin/dashboard");
    } catch (err: any) {
      setMessage(err?.message ?? "Noget gik galt");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl p-8 space-y-4">
      <h1 className="text-2xl font-bold">Opret dyr</h1>

      <label className="block">
        Navn
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2"
        />
      </label>

      <label className="block">
        Beskrivelse
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
          className="w-full border p-2"
        />
      </label>

      <label className="block">
        Alder
        <input
          name="age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full border p-2"
        />
      </label>

      <label className="block">
        Billede
        <input type="file" accept="image/*" onChange={handleFileChange} className="block mt-2" />
      </label>

      {preview ? (
        <div className="rounded border p-4">
          <p className="mb-2 font-bold">Preview</p>
          <img src={preview} alt="preview" className="h-56 w-full rounded object-cover" />
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
      >
        {isSubmitting ? "Opretter..." : "Opret"}
      </button>

      {message ? <p className="text-sm text-gray-700">{message}</p> : null}
    </form>
  );
}
