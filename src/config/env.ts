import * as z from "zod"

const createEnv = () => {
  const EnvSchema = z.object({
    API_URL: z.string(),
  })

  const envVars = Object.entries(import.meta.env).reduce<
    Record<string, string>
  >((acc, curr) => {
    const [key, value] = curr
    if (key.startsWith("VITE_")) {
      acc[key.replace("VITE_", "")] = value
    }
    return acc
  }, {})

  const parsedEnv = EnvSchema.safeParse(envVars)

  if (!parsedEnv.success) {
    const fieldErrors = z.flattenError(parsedEnv.error).fieldErrors

    throw new Error(
      `Invalid env provided.
      The following variables are missing or invalid:
      ${Object.entries(fieldErrors)
        .map(([key, messages]) => `- ${key}: ${messages.join(", ")}`)
        .join("\n")}
      `
    )
  }

  return parsedEnv.data
}

export const env = createEnv()
