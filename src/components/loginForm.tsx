"use client"

import { login } from "@/actions"
import { useFormState } from "react-dom"

const LoginForm = () => {

    const [state, formAction] = useFormState<any, FormData>(login, undefined)

    return (
        <form action={formAction}>
            <input type="text" name="username" placeholder="username" required />
            <input type="password" name="password" placeholder="password" required />
            <button type="submit">Login</button>
            {state?.error && <p style={{ color: "red" }}>{state.error}</p>}
        </form>
    )
}

export default LoginForm