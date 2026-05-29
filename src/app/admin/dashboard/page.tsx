import { ApiImage } from "@/app/components/ApiImage";
import { getApiData, type Animal } from "@/app/lib/api";

export default async function AdminDashboardPage() {
    const animals = await getApiData<Animal>("animals")

    return (
        <main className="m-8">
            <h1>Admin</h1>

            <ul>
                {animals.map((animal) => (
                    <li key={animal.id}>
                        <h2>{animal.name}</h2>
                        <ApiImage
                            src={animal.asset?.url}
                            alt={animal.name}
                            className="h-40 w-52 object-cover"
                        />
                    </li>
                ))}
            </ul>
        </main>
    )
}
