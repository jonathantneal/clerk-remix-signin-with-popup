import { AuthenticateWithRedirectCallback } from "@clerk/remix";

export default function SSOCallback() {
  return <AuthenticateWithRedirectCallback redirectUrl="/sign-in-success" />;
}
