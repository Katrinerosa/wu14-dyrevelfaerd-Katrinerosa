"use client";

import { useState } from "react";
import type { Animal } from "../lib/api";
import { ApiImage } from "./ApiImage";

export function ImageSlider({ animals }: { animals: Animal[] }) {
  const slides = animals.filter((animal) => animal.asset?.url).slice(0, 4);
  const [index, setIndex] = useState(0);

  if (slides.length < 2) {
    return null;
  }

  const current = slides[index];

  return (
    <section aria-label="Udvalgte dyr" className="bg-[#eff3f7] py-12">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 sm:px-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
        <div className="aspect-[16/9] overflow-hidden">
          <ApiImage
            alt={current.name}
            className="h-full w-full object-cover"
            src={current.asset?.url}
          />
        </div>
        <div>
          <p className="font-oswald text-sm font-bold uppercase text-[#365b91]">
            Udvalgt fra internatet
          </p>
          <h2 className="mt-2 font-oswald text-4xl font-bold">{current.name}</h2>
          <p className="mt-4 text-sm leading-6 text-[#2f2f2f]">{current.description}</p>
          <div className="mt-6 flex gap-3">
            {slides.map((slide, slideIndex) => (
              <button
                aria-label={`Vis ${slide.name}`}
                className={`h-3 w-8 ${
                  slideIndex === index ? "bg-[#365b91]" : "bg-[#9aa9bc]"
                }`}
                key={slide.id}
                onClick={() => setIndex(slideIndex)}
                type="button"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
