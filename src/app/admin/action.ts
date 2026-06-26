"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type LoginState = {
  values: {
    username: string;
    password: string;
  };
  errors?: string;
};

export async function loginAction(
  prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  const response = await fetch("http://127.0.0.1:4000/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    return {
      values: { username, password },
      errors: "Brugernavn eller kodeord er forkert.",
    };
  }

  const data = await response.json();

  if (!data.token) {
    return {
      values: { username, password },
      errors: "Login lykkedes ikke. Prøv igen.",
    };
  }

  const cookieStore = await cookies();
  cookieStore.set("token", data.token);

  redirect("/admin/dashboard");
}
