import { AnimalGrid } from "../components/AnimalGrid";
import { NewsletterForm } from "../components/NewsletterForm";
import { PageShell } from "../components/SiteShell";
import { getApiData, getAssetUrl, type ContentSection } from "../lib/api";
import { getAnimals } from "../lib/dal/animals";

export default async function AdoptPage() {
  const [animals, adoptSections] = await Promise.all([
    getAnimals(),
    getApiData<ContentSection>("adoptsections"),
  ]);
  const heroSection = adoptSections[0];
  const heroImage = getAssetUrl(heroSection?.asset?.url) ?? "/dyrevelfaerd/kittens.jpg";
  const emergencyImage =
    getAssetUrl(adoptSections[1]?.asset?.url) ?? "/dyrevelfaerd/hero-hedgehog.jpg";

  return (
    <PageShell>
      <main>
        <section
          className="relative mx-auto flex h-[340px] max-w-[1440px] items-center overflow-hidden bg-[#6f7168] bg-cover bg-center px-8 text-white sm:px-28"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
          <div className="relative max-w-2xl">
            <h1 className="font-oswald text-4xl font-normal leading-tight [text-shadow:0_3px_8px_rgba(0,0,0,0.55)] sm:text-6xl">
              {heroSection?.title ?? "Adopter et dyr"}
            </h1>
            <p className="mt-3 text-base font-semibold leading-7 [text-shadow:0_3px_8px_rgba(0,0,0,0.55)] sm:text-xl">
              {heroSection?.content ??
                "Måske du er det perfekte match til et af vores internatdyr, som venter på et nyt kærligt hjem."}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl p-8">
          <AnimalGrid animals={animals} />
        </section>

        <section className="bg-[#dce8f5] px-5 py-12 sm:px-8">
          <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <h2 className="font-oswald text-3xl font-bold text-[#365b91]">
                Tilmeld dig vores nyhedsbrev
              </h2>
              <p className="mt-2 text-sm font-semibold">
                Få inspiration og nyheder om dyrevelfærd og vores arbejde, direkte i din indbakke.
              </p>
            </div>
            <NewsletterForm compact />
          </div>
        </section>

        <section
          className="relative mx-auto flex h-[340px] max-w-[1440px] items-center overflow-hidden bg-[#6f7168] bg-cover bg-center px-8 text-white sm:px-28"
          style={{ backgroundImage: `url(${emergencyImage})` }}
        >
          <div className="absolute inset-0 bg-black/35" />
          <div className="relative">
            <h2 className="font-oswald text-3xl font-normal uppercase leading-tight [text-shadow:0_3px_8px_rgba(0,0,0,0.55)] sm:text-5xl">
              Står du med et dyr i nød?
            </h2>
            <p className="mt-2 font-oswald text-base font-medium [text-shadow:0_3px_8px_rgba(0,0,0,0.55)] sm:text-xl">
              Ring til Dyrenes Vagtcentral på 1812 og få råd og hjælp og håndtering af dyr.
            </p>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
