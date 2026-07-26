import { getCSRFToken } from "./django"

export const Client = Object.freeze({
  APP: "app",
  BROWSER: "browser",
} as const)
type ClientType = (typeof Client)[keyof typeof Client]

export const settings: {
  client: ClientType
  baseUrl: string
  withCredentials: boolean
} = {
  client: Client.BROWSER,
  baseUrl: `/_allauth/${Client.BROWSER}/v1`,
  withCredentials: false,
}

const ACCEPT_JSON = { accept: "application/json" }

export const AuthProcess = Object.freeze({
  LOGIN: "login",
  CONNECT: "connect",
} as const)
type AuthProcessType = (typeof AuthProcess)[keyof typeof AuthProcess]

export const Flows = Object.freeze({
  LOGIN: "login",
  LOGIN_BY_CODE: "login_by_code",
  MFA_AUTHENTICATE: "mfa_authenticate",
  MFA_REAUTHENTICATE: "mfa_reauthenticate",
  MFA_TRUST: "mfa_trust",
  MFA_WEBAUTHN_SIGNUP: "mfa_signup_webauthn",
  PASSWORD_RESET_BY_CODE: "password_reset_by_code",
  PROVIDER_REDIRECT: "provider_redirect",
  PROVIDER_SIGNUP: "provider_signup",
  REAUTHENTICATE: "reauthenticate",
  SIGNUP: "signup",
  VERIFY_EMAIL: "verify_email",
})

export const URLs = Object.freeze({
  // Meta
  CONFIG: "/config",

  // Account management
  CHANGE_PASSWORD: "/account/password/change",
  EMAIL: "/account/email",
  PROVIDERS: "/account/providers",

  // Account management: 2FA
  AUTHENTICATORS: "/account/authenticators",
  RECOVERY_CODES: "/account/authenticators/recovery-codes",
  TOTP_AUTHENTICATOR: "/account/authenticators/totp",

  // Auth: Basics
  LOGIN: "/auth/login",
  REQUEST_LOGIN_CODE: "/auth/code/request",
  CONFIRM_LOGIN_CODE: "/auth/code/confirm",
  SESSION: "/auth/session",
  REAUTHENTICATE: "/auth/reauthenticate",
  REQUEST_PASSWORD_RESET: "/auth/password/request",
  RESET_PASSWORD: "/auth/password/reset",
  SIGNUP: "/auth/signup",
  VERIFY_EMAIL: "/auth/email/verify",

  // Auth: 2FA
  MFA_AUTHENTICATE: "/auth/2fa/authenticate",
  MFA_REAUTHENTICATE: "/auth/2fa/reauthenticate",
  MFA_TRUST: "/auth/2fa/trust",

  // Auth: Social
  PROVIDER_SIGNUP: "/auth/provider/signup",
  REDIRECT_TO_PROVIDER: "/auth/provider/redirect",
  PROVIDER_TOKEN: "/auth/provider/token",

  // Auth: Sessions
  SESSIONS: "/auth/sessions",

  // Auth: WebAuthn
  REAUTHENTICATE_WEBAUTHN: "/auth/webauthn/reauthenticate",
  AUTHENTICATE_WEBAUTHN: "/auth/webauthn/authenticate",
  LOGIN_WEBAUTHN: "/auth/webauthn/login",
  SIGNUP_WEBAUTHN: "/auth/webauthn/signup",
  WEBAUTHN_AUTHENTICATOR: "/account/authenticators/webauthn",
})

export const AuthenticatorType = Object.freeze({
  TOTP: "totp",
  RECOVERY_CODES: "recovery_codes",
  WEBAUTHN: "webauthn",
} as const)

// ---- Types verified against the openapi spec ----

export interface AllauthUser {
  id: number
  display: string
  email: string
  has_usable_password: boolean
  username: string
}

export interface AuthenticationMethod {
  method: string
  at: number
  email?: string
  username?: string
  provider?: string
  uid?: string
  reauthenticated?: boolean
}

export interface Flow {
  id: string
  is_pending?: boolean
}

export interface BaseAuthenticationMeta {
  session_token?: string // app clients only
  access_token?: string // app clients only
}

export interface AuthenticationMeta extends BaseAuthenticationMeta {
  is_authenticated: boolean
}

export interface AuthenticatedMeta extends BaseAuthenticationMeta {
  is_authenticated: true
}

export interface AuthenticatedResponse {
  status: 200
  data: {
    user: AllauthUser
    methods: AuthenticationMethod[]
  }
  meta: AuthenticationMeta
}

export interface AuthenticationResponse {
  status: 401
  data: {
    flows: Flow[]
  }
  meta: AuthenticationMeta
}

export interface SessionGoneResponse {
  status: 410
  data: Record<string, never>
  meta: AuthenticationMeta
}

export interface AllauthFieldError {
  code: string
  param?: string
  message: string
}

export interface ErrorResponse {
  status: 400
  errors: AllauthFieldError[]
}

export interface ForbiddenResponse {
  status: 403
}

export interface ConflictResponse {
  status: 409
}

export type SessionResponse =
  | AuthenticatedResponse
  | AuthenticationResponse
  | SessionGoneResponse
  | ErrorResponse
  | ForbiddenResponse
  | ConflictResponse

// Generic fallback for endpoints we haven't typed field-by-field yet
export interface GenericResponse<T = unknown> {
  status: number
  data?: T
  meta?: AuthenticationMeta
  errors?: AllauthFieldError[]
}

// ---- Internal request helper ----

function postForm(action: string, data: Record<string, string>): void {
  const f = document.createElement("form")
  f.method = "POST"
  f.action = settings.baseUrl + action

  for (const key in data) {
    const d = document.createElement("input")
    d.type = "hidden"
    d.name = key
    d.value = data[key]
    f.appendChild(d)
  }
  document.body.appendChild(f)
  f.submit()
}

const tokenStorage = window.sessionStorage

export function getSessionToken(): string | null {
  return tokenStorage.getItem("sessionToken")
}

async function request<T>(
  method: string,
  path: string,
  data?: unknown,
  headers?: Record<string, string>
): Promise<T> {
  const options: RequestInit & { headers: Record<string, string> } = {
    method,
    headers: {
      ...ACCEPT_JSON,
      ...headers,
    },
  }
  if (settings.withCredentials) {
    options.credentials = "include"
  }
  if (path !== URLs.CONFIG) {
    if (settings.client === Client.BROWSER) {
      options.headers["X-CSRFToken"] = getCSRFToken() || ""
    } else if (settings.client === Client.APP) {
      options.headers["User-Agent"] = "django-allauth example app"
      const sessionToken = getSessionToken()
      if (sessionToken) {
        options.headers["X-Session-Token"] = sessionToken
      }
    }
  }

  if (typeof data !== "undefined") {
    options.body = JSON.stringify(data)
    options.headers["Content-Type"] = "application/json"
  }

  const resp = await fetch(settings.baseUrl + path, options)
  const msg = (await resp.json()) as GenericResponse & { status: number }

  if (msg.status === 410) {
    tokenStorage.removeItem("sessionToken")
  }
  if (msg.meta?.session_token) {
    tokenStorage.setItem("sessionToken", msg.meta.session_token)
  }
  if (
    [401, 410].includes(msg.status) ||
    (msg.status === 200 && msg.meta?.is_authenticated)
  ) {
    const event = new CustomEvent("allauth.auth.change", { detail: msg })
    document.dispatchEvent(event)
  }

  return msg as T
}

// ---- Payload types ----

export interface LoginPayload {
  email: string
  password: string
}

export interface SignupPayload {
  email: string
  password: string
  username?: string
}

export interface ResetPasswordPayload {
  key: string
  password: string
}

export interface ChangePasswordPayload {
  current_password?: string
  new_password: string
}

// ---- Auth: Basics ----

export const login = (data: LoginPayload) =>
  request<SessionResponse>("POST", URLs.LOGIN, data)

export const reauthenticate = (data: unknown) =>
  request<SessionResponse>("POST", URLs.REAUTHENTICATE, data)

export const logout = () => request<SessionResponse>("DELETE", URLs.SESSION)

export const signUp = (data: SignupPayload) =>
  request<SessionResponse>("POST", URLs.SIGNUP, data)

export const signUpByPasskey = (data: unknown) =>
  request<GenericResponse>("POST", URLs.SIGNUP_WEBAUTHN, data)

export const providerSignup = (data: unknown) =>
  request<GenericResponse>("POST", URLs.PROVIDER_SIGNUP, data)

export const getProviderAccounts = () =>
  request<GenericResponse>("GET", URLs.PROVIDERS)

export const disconnectProviderAccount = (
  providerId: string,
  accountUid: string
) =>
  request<GenericResponse>("DELETE", URLs.PROVIDERS, {
    provider: providerId,
    account: accountUid,
  })

export const requestPasswordReset = (email: string) =>
  request<GenericResponse>("POST", URLs.REQUEST_PASSWORD_RESET, { email })

export const requestLoginCode = (email: string) =>
  request<GenericResponse>("POST", URLs.REQUEST_LOGIN_CODE, { email })

export const confirmLoginCode = (code: string) =>
  request<SessionResponse>("POST", URLs.CONFIRM_LOGIN_CODE, { code })

export const getEmailVerification = (key: string) =>
  request<GenericResponse>("GET", URLs.VERIFY_EMAIL, undefined, {
    "X-Email-Verification-Key": key,
  })

export const getEmailAddresses = () =>
  request<GenericResponse>("GET", URLs.EMAIL)

export const getSessions = () => request<GenericResponse>("GET", URLs.SESSIONS)

export const endSessions = (ids: number[]) =>
  request<GenericResponse>("DELETE", URLs.SESSIONS, { sessions: ids })

// ---- 2FA ----

export const getAuthenticators = () =>
  request<GenericResponse>("GET", URLs.AUTHENTICATORS)

export const getTOTPAuthenticator = () =>
  request<GenericResponse>("GET", URLs.TOTP_AUTHENTICATOR)

export const mfaAuthenticate = (code: string) =>
  request<SessionResponse>("POST", URLs.MFA_AUTHENTICATE, { code })

export const mfaReauthenticate = (code: string) =>
  request<SessionResponse>("POST", URLs.MFA_REAUTHENTICATE, { code })

export const mfaTrust = (trust: boolean) =>
  request<GenericResponse>("POST", URLs.MFA_TRUST, { trust })

export const activateTOTPAuthenticator = (code: string) =>
  request<GenericResponse>("POST", URLs.TOTP_AUTHENTICATOR, { code })

export const deactivateTOTPAuthenticator = () =>
  request<GenericResponse>("DELETE", URLs.TOTP_AUTHENTICATOR)

export const getRecoveryCodes = () =>
  request<GenericResponse>("GET", URLs.RECOVERY_CODES)

export const generateRecoveryCodes = () =>
  request<GenericResponse>("POST", URLs.RECOVERY_CODES)

// ---- Meta / Email / Password ----

export const getConfig = () => request<GenericResponse>("GET", URLs.CONFIG)

export const addEmail = (email: string) =>
  request<GenericResponse>("POST", URLs.EMAIL, { email })

export const deleteEmail = (email: string) =>
  request<GenericResponse>("DELETE", URLs.EMAIL, { email })

export const markEmailAsPrimary = (email: string) =>
  request<GenericResponse>("PATCH", URLs.EMAIL, { email, primary: true })

export const requestEmailVerification = (email: string) =>
  request<GenericResponse>("PUT", URLs.EMAIL, { email })

export const verifyEmail = (key: string) =>
  request<SessionResponse>("POST", URLs.VERIFY_EMAIL, { key })

export const getPasswordReset = (key: string) =>
  request<GenericResponse>("GET", URLs.RESET_PASSWORD, undefined, {
    "X-Password-Reset-Key": key,
  })

export const resetPassword = (data: ResetPasswordPayload) =>
  request<SessionResponse>("POST", URLs.RESET_PASSWORD, data)

export const changePassword = (data: ChangePasswordPayload) =>
  request<GenericResponse>("POST", URLs.CHANGE_PASSWORD, data)

export const getAuth = () => request<SessionResponse>("GET", URLs.SESSION)

// ---- Social ----

export const authenticateByToken = (
  providerId: string,
  token: string,
  process: AuthProcessType = AuthProcess.LOGIN
) =>
  request<SessionResponse>("POST", URLs.PROVIDER_TOKEN, {
    provider: providerId,
    token,
    process,
  })

export function redirectToProvider(
  providerId: string,
  callbackURL: string,
  process: AuthProcessType = AuthProcess.LOGIN
): void {
  postForm(URLs.REDIRECT_TO_PROVIDER, {
    provider: providerId,
    process,
    callback_url:
      window.location.protocol + "//" + window.location.host + callbackURL,
    csrfmiddlewaretoken: getCSRFToken() || "",
  })
}

// ---- WebAuthn ----

export const getWebAuthnCreateOptions = (passwordless?: boolean) => {
  let url: string = URLs.WEBAUTHN_AUTHENTICATOR
  if (passwordless) url += "?passwordless"
  return request<GenericResponse>("GET", url)
}

export const getWebAuthnCreateOptionsAtSignup = () =>
  request<GenericResponse>("GET", URLs.SIGNUP_WEBAUTHN)

export const addWebAuthnCredential = (name: string, credential: unknown) =>
  request<GenericResponse>("POST", URLs.WEBAUTHN_AUTHENTICATOR, {
    name,
    credential,
  })

export const signupWebAuthnCredential = (name: string, credential: unknown) =>
  request<SessionResponse>("PUT", URLs.SIGNUP_WEBAUTHN, { name, credential })

export const deleteWebAuthnCredential = (ids: string[]) =>
  request<GenericResponse>("DELETE", URLs.WEBAUTHN_AUTHENTICATOR, {
    authenticators: ids,
  })

export const updateWebAuthnCredential = (
  id: string,
  data: Record<string, unknown>
) =>
  request<GenericResponse>("PUT", URLs.WEBAUTHN_AUTHENTICATOR, { id, ...data })

export const getWebAuthnRequestOptionsForReauthentication = () =>
  request<GenericResponse>("GET", URLs.REAUTHENTICATE_WEBAUTHN)

export const reauthenticateUsingWebAuthn = (credential: unknown) =>
  request<SessionResponse>("POST", URLs.REAUTHENTICATE_WEBAUTHN, { credential })

export const authenticateUsingWebAuthn = (credential: unknown) =>
  request<SessionResponse>("POST", URLs.AUTHENTICATE_WEBAUTHN, { credential })

export const loginUsingWebAuthn = (credential: unknown) =>
  request<SessionResponse>("POST", URLs.LOGIN_WEBAUTHN, { credential })

export const getWebAuthnRequestOptionsForLogin = () =>
  request<GenericResponse>("GET", URLs.LOGIN_WEBAUTHN)

export const getWebAuthnRequestOptionsForAuthentication = () =>
  request<GenericResponse>("GET", URLs.AUTHENTICATE_WEBAUTHN)

// ---- Setup ----

export function setup(
  client: ClientType,
  baseUrl: string,
  withCredentials: boolean
): void {
  settings.client = client
  settings.baseUrl = baseUrl
  settings.withCredentials = withCredentials
}
