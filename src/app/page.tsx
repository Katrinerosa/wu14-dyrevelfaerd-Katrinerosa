import { NewsletterForm } from "./components/NewsletterForm";
import { PageShell } from "./components/SiteShell";
import { getApiData, getAssetUrl, type ContentSection } from "./lib/api";

const fallbackAbouts: ContentSection[] = [
  {
    id: "fallback-1",
    title: "Om os",
    content:
      "Vi kæmper for at nedbringe antallet af dyr i nød og sikre, at alle nødstedte dyr får den rette hjælp. Vi arbejder med et landsdækkende netværk af frivillige, internater og plejestationer, der hver dag hjælper dyr.",
  },
  {
    id: "fallback-2",
    title: "Dyr & Mennesker",
    content:
      "Dyr er en vigtig del af vores liv og samfundet, og styrker vores sociale relationer. Med dyr følger ansvar, derfor arbejder vi proaktivt med oplysning om ansvarligt ejerskab.",
  },
  {
    id: "fallback-3",
    title: "Mad & Forbrug",
    content:
      "Vi kæmper for et mere naturligt fødevareforbrug og en bæredygtig produktion med fokus på kvalitet, omtanke og respekt for dyr og natur.",
  },
];

export default async function Home() {
  const [abouts, adoptSections] = await Promise.all([
    getApiData<ContentSection>("abouts"),
    getApiData<ContentSection>("adoptsections"),
  ]);
  const visibleAbouts = abouts.length > 0 ? abouts.slice(0, 3) : fallbackAbouts;
  const heroImage = getAssetUrl(adoptSections[0]?.asset?.url);
  const emergencyImage = getAssetUrl(
    adoptSections[1]?.asset?.url ?? adoptSections[0]?.asset?.url,
  );

  return (
    <PageShell>
      <main>
        <section
          className="relative mx-auto flex h-[154px] max-w-[1400px] items-center overflow-hidden bg-[#7f877f] bg-cover bg-center px-8 text-white sm:h-[240px] sm:px-28"
          style={heroImage ? { backgroundImage: `url(${heroImage})` } : undefined}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent" />
          <div className="relative">
            <h1 className="font-oswald text-3xl font-normal leading-tight [text-shadow:0_3px_8px_rgba(0,0,0,0.55)] sm:text-6xl">
              Foreningen for Dyrevelfærd
            </h1>
            <p className="mt-2 font-oswald text-lg font-medium leading-tight [text-shadow:0_3px_8px_rgba(0,0,0,0.55)] sm:text-3xl">
              Vi specialiserer os i dyrevelfærd
            </p>
          </div>
        </section>

        <section id="om" className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 sm:py-16">
          <div className="grid gap-9 md:grid-cols-3">
            {visibleAbouts.map((about) => (
              <article key={about.id}>
                <h2 className="font-oswald text-2xl font-bold text-[#365b91]">
                  {about.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#111]">{about.content}</p>
              </article>
            ))}
          </div>
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
          className="relative mx-auto flex h-[155px] max-w-[1400px] items-center overflow-hidden bg-[#6f7168] bg-cover bg-center px-8 text-white sm:h-[245px] sm:px-28"
          style={emergencyImage ? { backgroundImage: `url(${emergencyImage})` } : undefined}
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
