import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE_URL = "http://localhost:4000";

export async function POST(request: Request) {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) return new NextResponse("Unauthorized", { status: 401 });

    const form = await request.formData();
    const file = form.get("file") as File | null;
    if (!file) return new NextResponse("No file", { status: 400 });

    const fd = new FormData();
    fd.append("file", file, (file as any).name || "upload");

    const response = await fetch(`${API_BASE_URL}/api/v1/assets`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      } as any,
      body: fd,
    });

    const json = await response.json();
    return NextResponse.json(json, { status: response.status });
  } catch (error) {
    console.error("upload route error", error);
    return NextResponse.json({ message: "Upload error", error: String(error) }, { status: 500 });
  }
}
