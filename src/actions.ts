"use server"

import { cookies } from "next/headers"
import { sessionOptions, SessionData, defaultSession } from "./lib"
import { getIronSession } from "iron-session"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

let username = "lucsantosdev"
let isPremium = true

export const getSession = async () => {

    const session = await getIronSession<SessionData>(await cookies(), sessionOptions)

    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn
    }

    return session
}

export const login = async (prevState:{error:undefined | string}, formData: FormData) => {

    const session = await getSession()

    const formUsername = formData.get("username") as string
    const formPassword = formData.get("password") as string

    // Check credentials in database or other storage
    // const user = await db.getUser({ username, password })

    // Example:
    // if (username && password) {
        // Perform login logic here
    //}

    if (formUsername !== username) {
        return {error: "Invalid credentials"}
    }
    session.userId = "1"
    session.username = formUsername
    session.isPremium = isPremium
    session.isLoggedIn = true

    await session.save()
    redirect("/")
}

export const logout = async () => {
    const session = await getSession()
    session.destroy()
    redirect("/")
}

export const changePremiumStatus = async () => {
    const session = await getSession()
    session.isPremium = !session.isPremium
    await session.save()
    revalidatePath("/profile")
}

export const changeUsername = async (formData: FormData) => {
    const session = await getSession()
    const newUsername = formData.get("username") as string
    session.username = newUsername
    await session.save()
    revalidatePath("/profile")
}