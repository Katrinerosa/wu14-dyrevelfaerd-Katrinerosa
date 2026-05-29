"use client";

import { useRouter } from "next/navigation";
import { useState, type SyntheticEvent } from "react";
import { newsletterSchema } from "../lib/validation";

type NewsletterFormProps = {
  compact?: boolean;
};

const STORAGE_KEY = "dyrevelfaerd-newsletter-emails";

function getStoredEmails() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

export function NewsletterForm({ compact = false }: NewsletterFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = newsletterSchema.safeParse({ name, email });

    if (!result.success) {
      setError(
        result.error.issues[0]?.message ??
        "Tjek at navn og email er udfyldt korrekt.",
      );
      return;
    }

    const normalizedEmail = result.data.email;
    const emails = getStoredEmails();

    if (emails.includes(normalizedEmail)) {
      setError("Denne email er allerede tilmeldt nyhedsbrevet.");
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify([...emails, normalizedEmail]));

    router.push(`/newsletter/success?email=${encodeURIComponent(normalizedEmail)}`);
  };

  return (
    <form
      action="/newsletter/success"
      className={`grid gap-3 ${
        compact ? "sm:grid-cols-[1fr_1fr_auto]" : "sm:grid-cols-[1fr_1fr_auto]"
      }`}
      noValidate
      onSubmit={handleSubmit}
    >
      <div>
        <label className="sr-only" htmlFor="newsletter-name">
          Navn
        </label>
        <input
          className="h-10 w-full border border-[#4d5b67] bg-transparent px-3 text-sm outline-offset-2"
          id="newsletter-name"
          minLength={2}
          name="name"
          onChange={(event) => setName(event.target.value)}
          placeholder="Navn"
          required
          type="text"
          value={name}
        />
      </div>
      <div>
        <label className="sr-only" htmlFor="newsletter-email">
          Email
        </label>
        <input
          className="h-10 w-full border border-[#4d5b67] bg-transparent px-3 text-sm outline-offset-2"
          id="newsletter-email"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          required
          type="email"
          value={email}
        />
      </div>
      <button
        className="h-10 bg-[#365b91] px-5 font-oswald text-sm font-bold text-white transition hover:bg-[#244575]"
        type="submit"
      >
        Tilmeld
      </button>
      {error ? (
        <p className="text-sm font-semibold text-[#9a1f1f] sm:col-span-3" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
