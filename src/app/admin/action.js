"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function loginAction(prevState, formData) {
    const username = formData.get("username")
    const password = formData.get("password")

    const response = await fetch("http://127.0.0.1:4000/auth/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    })

    const data = await response.json()

    const cookieStore = await cookies()
    cookieStore.set("token", data.token)

    redirect("/admin/dashboard")
}