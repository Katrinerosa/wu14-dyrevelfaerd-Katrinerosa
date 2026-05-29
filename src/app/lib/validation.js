import { z } from "zod";

export const newsletterSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Skriv dit navn, så vi ved hvem tilmeldingen gælder." }),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
      message: "Skriv en gyldig emailadresse.",
    }),
});