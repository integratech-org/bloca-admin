import { configureAuth } from "react-query-auth"
import { getAuth, login, logout, type LoginPayload } from "./allauth"
import { z } from "zod"

export const userKey = ["authenticated-user"]

export async function userFn() {
  const res = await getAuth()
  if (res.status === 200 && res.meta.is_authenticated) return res.data.user
  return null
}

export const signInInputSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

async function loginFn(payload: LoginPayload) {
  const res = await login(payload)

  if (res.status === 200) return res.data.user

  throw res
}

async function logoutFn() {
  await logout()
}

async function registerFn() {
  return null
}

const authConfig = {
  userKey,
  userFn,
  loginFn,
  logoutFn,
  registerFn,
}

export const { useUser, useLogin, useLogout, AuthLoader } =
  configureAuth(authConfig)
