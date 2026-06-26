import Link from "next/link";

import { ApiImage } from "@/app/components/ApiImage";
import { getApiData, type Animal } from "@/app/lib/api";

export default async function AdminDashboardPage() {
    const animals = await getApiData<Animal>("animals");

    return (
        <main className="mx-auto min-w-250 px-8 py-24">
            <h1 className="mb-8 text-[48px] font-bold text-[#3f5f93]">
                Admin
            </h1>

            <ul className="space-y-4">
                {animals.map((animal) => (
                    <li
                        key={animal.id}
                        className="flex h-19.5 items-center justify-between border border-[#555]"
                    >
                        <div className="flex h-full items-center gap-4">
                            <ApiImage
                                src={animal.asset?.url}
                                alt={animal.name}
                                className="h-[78px] w-[90px] object-cover"
                            />

                            <h2 className="text-xl font-bold">{animal.name}</h2>
                        </div>

                        <div className="mr-4 flex gap-3">
                            <Link
                                href={`/admin/${animal.id}`}
                                className="rounded bg-[#3f5f93] px-5 py-3 text-white"
                            >
                                Rediger
                            </Link>

                            <button className="rounded bg-[#9a3f43] px-5 py-3 text-white">
                                Slet
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="mt-8 flex justify-center">
                <Link
                    href="/admin/create"
                    className="rounded bg-[#3f5f93] px-4 py-3 text-white"
                >
                    Tilføj dyr
                </Link>
            </div>
        </main>
    );
}