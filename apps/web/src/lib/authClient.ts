import { createAuthClient } from "better-auth/react";
import { sentinelClient } from "@better-auth/infra/client";
import { twoFactorClient, emailOTPClient, multiSessionClient, usernameClient, adminClient } from "better-auth/client/plugins";
import { ssoClient } from "@better-auth/sso/client";
import { env } from "@/env";

const baseURL =
  env.NEXT_PUBLIC_AUTH_API_URL ||
  (typeof window !== "undefined" ? window.location.origin : env.BETTER_AUTH_URL);

const identifyUrl = env.NEXT_PUBLIC_BETTER_AUTH_IDENTIFY_URL;

export const authClient = createAuthClient({
  baseURL,
  basePath: "/api/auth",
  fetchOptions: {
    credentials: "include",
  },
  plugins: [
    ...(identifyUrl ? [sentinelClient({ identifyUrl })] : []),
    twoFactorClient(),
    emailOTPClient(),
    multiSessionClient(),
    usernameClient(),
    adminClient(),
    ssoClient(),
  ],
});

export const { signIn, signOut, useSession } = authClient;
