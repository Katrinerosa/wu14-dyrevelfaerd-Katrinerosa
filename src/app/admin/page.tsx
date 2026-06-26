"use client"

import { useActionState } from "react"
import { loginAction } from "./action"
import type { LoginState } from "./action"

const initialState: LoginState = {
    values: {
        username: "",
        password: "",
    },
    errors: undefined,
}

export default function AdminPage() {
    const [, formAction, isPending] = useActionState(loginAction, initialState)

    return (
        <form action={formAction} className="m-8 flex max-w-sm flex-col gap-3">
            <label htmlFor="username">Brugernavn</label>
            <input
                className="border p-2"
                type="text"
                name="username"
                id="username"
                autoComplete="username"
            />

            <label htmlFor="password">Kodeord</label>
            <input
                className="border p-2"
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
            />

            <button className="border p-2" type="submit" disabled={isPending}>
                {isPending ? "Logger ind..." : "Log ind"}
            </button>
        </form>
    )
}
