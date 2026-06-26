"use client";

import Link from "next/link";
import { useState } from "react";
import type { Animal } from "../lib/api";
import { ApiImage } from "./ApiImage";

type AnimalGridProps = {
  animals: Animal[];
  initialCount?: number;
};

export function AnimalGrid({ animals, initialCount = 6 }: AnimalGridProps) {
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const visibleAnimals = animals.slice(0, visibleCount);
  const hasMore = visibleCount < animals.length;

  if (animals.length === 0) {
    return (
      <div className="mt-8 border border-[#b9c5d3] bg-white p-8 text-sm font-semibold">
        Der kunne ikke hentes dyr fra internatet lige nu. Prøv igen senere.
      </div>
    );
  }

  return (
    <>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleAnimals.map((animal) => (
          <article className="border border-[#d7d7d7] bg-white" key={animal.id}>
            <div className="h-48 overflow-hidden bg-[#f0f0f0] sm:h-56">
              <ApiImage
                alt={animal.name}
                className="h-full w-full object-cover"
                src={animal.asset?.url}
              />
            </div>
            <div className="p-5">
              <p className="font-oswald text-sm font-bold uppercase text-[#365b91]">
                {animal.age ? `${animal.age} år` : "Klar til adoption"}
              </p>
              <h3 className="mt-1 font-oswald text-2xl font-bold">{animal.name}</h3>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#2f2f2f]">
                {animal.description}
              </p>
              <Link
                className="mt-5 inline-flex h-10 items-center bg-[#365b91] px-4 font-oswald text-sm font-bold text-white"
                href={`/animals/${animal.id}`}
              >
                Læs mere
              </Link>
            </div>
          </article>
        ))}
      </div>
      {hasMore ? (
        <div className="mt-8 text-center">
          <button
            className="h-11 border border-[#365b91] px-6 font-oswald font-bold text-[#365b91] transition hover:bg-[#365b91] hover:text-white"
            onClick={() => setVisibleCount((current) => current + 3)}
            type="button"
          >
            Vis flere dyr
          </button>
        </div>
      ) : null}
    </>
  );
}
