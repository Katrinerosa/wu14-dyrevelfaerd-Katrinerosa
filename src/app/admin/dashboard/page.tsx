export default async function AdminDashboardPage() {
    const response = await fetch("http://127.0.0.1:4000/api/v1/animals")
    const animals = await response.json()

    return (
        <main className="m-8">
            <h1>Admin</h1>

            <ul>
                {animals.map((animal) => (
                    <li key={animal.id}>
                        <h2>{animal.name}</h2>
                        <img
                            src={animal.asset.url}
                            alt={animal.name}
                            width="200"
                        />
                    </li>
                ))}
            </ul>
        </main>
    )
}
