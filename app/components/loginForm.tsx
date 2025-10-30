import { login } from "@/actions"

const LoginForm = () => {

    return (
        <form action={login}>
            <input type="text" name="username" placeholder="username" required />
            <input type="password" name="password" placeholder="password" required />
            <button type="submit">Login</button>
        </form>
    )
}

export default LoginForm