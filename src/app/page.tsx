import Link from "next/link";

type Asset = {
  url?: string;
};

type Section = {
  id: number | string;
  title: string;
  content: string;
  asset?: Asset;
};

type Animal = {
  id: number | string;
  name: string;
  description: string;
  age?: number;
  asset?: Asset;
};

async function getApiData<T>(path: string): Promise<T[]> {
  try {
    const response = await fetch(`http://localhost:4000/api/v1/${path}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    return response.json();
  } catch {
    return [];
  }
}

function ApiImage({
  src,
  alt,
  className,
}: {
  src?: string;
  alt: string;
  className: string;
}) {
  if (!src) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-[#d9d1c2] text-sm font-medium text-[#5d6358]`}
      >
        Intet billede
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} />;
}

export default async function Home() {
  const [adoptSections, abouts, animals, volunteers] = await Promise.all([
    getApiData<Section>("adoptsections"),
    getApiData<Section>("abouts"),
    getApiData<Animal>("animals"),
    getApiData<Section>("volunteers"),
  ]);

  const hero = adoptSections[0];
  const volunteer = volunteers[0];

  return (
    <main className="min-h-screen bg-[#f6f3ed] text-[#1f261f]">
      <header className="bg-white">
        <nav className="mx-auto flex h-[100px] max-w-6xl items-center justify-between px-5 text-[#1f261f] sm:px-8">
          <Link className="text-sm font-bold uppercase tracking-[0.18em]" href="/">
            Dyrevelfærd
          </Link>
          <div className="hidden items-center gap-7 text-sm font-medium sm:flex">
            <a href="#adopter">Adopter</a>
            <a href="#dyr">Dyr</a>
            <a href="#om">Om os</a>
            <Link href="/admin">Admin</Link>
          </div>
        </nav>
      </header>

      <section id="adopter" className="relative h-[360px] overflow-hidden bg-[#172018] text-white">
        <ApiImage
          src={hero?.asset?.url}
          alt={hero?.title ?? "Dyrevelfærd"}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#dce9c8]">
              Foreningen for dyrevelfærd
            </p>
            <h1 className="text-4xl font-bold leading-[1.05] sm:text-6xl">
              {hero?.title ?? "Adopter et dyr"}
            </h1>
            <p className="mt-4 max-w-xl text-lg font-semibold leading-7 text-white/88">
              {hero?.content ??
                "Overvejer du et nyt medlem af familien? Måske du er det perfekte match til et dyr, der venter på et nyt kærligt hjem."}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#d8ef8f] px-6 text-sm font-bold text-[#1f261f] transition hover:bg-[#c7e676]"
                href="#dyr"
              >
                Se dyr
              </a>
              <a
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/60 px-6 text-sm font-bold text-white transition hover:bg-white/12"
                href="#frivillig"
              >
                Bliv frivillig
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="om" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#61724c]">
            Om foreningen
          </p>
          <h2 className="mt-3 text-4xl font-bold leading-tight">
            Vi arbejder for bedre forhold for dyr.
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {abouts.length > 0 ? (
            abouts.slice(0, 3).map((about) => (
              <article className="border-l border-[#c8c0af] pl-5" key={about.id}>
                <h3 className="text-xl font-bold">{about.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#5d6358]">
                  {about.content}
                </p>
              </article>
            ))
          ) : (
            <p className="text-[#5d6358]">Ingen om os-tekster kunne hentes fra API'et.</p>
          )}
        </div>
      </section>

      <section id="dyr" className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#61724c]">
                Dyr
              </p>
              <h2 className="mt-3 text-4xl font-bold">Dyr der søger hjem</h2>
            </div>
            <Link
              className="text-sm font-bold text-[#43522f] underline underline-offset-4"
              href="/admin"
            >
              Administrer dyr
            </Link>
          </div>

          {animals.length > 0 ? (
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {animals.map((animal) => (
                <article
                  className="overflow-hidden rounded-lg border border-[#e7e0d2] bg-[#fbfaf7]"
                  key={animal.id}
                >
                  <div className="aspect-[4/3]">
                    <ApiImage
                      src={animal.asset?.url}
                      alt={animal.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6b7d4f]">
                      {animal.age ? `${animal.age} år` : "Adoption"}
                    </p>
                    <h3 className="mt-2 text-xl font-bold">{animal.name}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#5d6358]">
                      {animal.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-lg border border-[#e7e0d2] bg-[#fbfaf7] p-8 text-[#5d6358]">
              Ingen dyr kunne hentes fra API'et lige nu.
            </div>
          )}
        </div>
      </section>

      <section
        id="frivillig"
        className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:py-24"
      >
        <div className="min-h-[360px] overflow-hidden rounded-lg">
          <ApiImage
            src={volunteer?.asset?.url}
            alt={volunteer?.title ?? "Frivillige"}
            className="h-full min-h-[360px] w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#61724c]">
            Frivillig
          </p>
          <h2 className="mt-3 text-4xl font-bold leading-tight">
            {volunteer?.title ?? "Bliv frivillig"}
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#5d6358]">
            {volunteer?.content ??
              "Hjælp med pleje, transport og praktiske opgaver for dyr, der har brug for en ny chance."}
          </p>
        </div>
      </section>

      <footer className="bg-[#1f261f] px-5 py-10 text-white sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-bold">Foreningen for dyrevelfærd</p>
            <p className="mt-1 text-sm text-white/70">Data hentes fra localhost:4000</p>
          </div>
          <Link
            className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-bold text-[#1f261f]"
            href="/admin"
          >
            Admin login
          </Link>
        </div>
      </footer>
    </main>
  );
}
