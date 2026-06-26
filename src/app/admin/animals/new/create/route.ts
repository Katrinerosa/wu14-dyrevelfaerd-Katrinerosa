import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE_URL = "http://localhost:4000";

export async function POST(request: Request) {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) return new NextResponse("Unauthorized", { status: 401 });

    const body = await request.json();

    const response = await fetch(`${API_BASE_URL}/api/v1/animals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      } as any,
      body: JSON.stringify(body),
    });

    const json = await response.json();
    return NextResponse.json(json, { status: response.status });
  } catch (error) {
    console.error("create route error", error);
    return NextResponse.json({ message: "Create error", error: String(error) }, { status: 500 });
  }
}
