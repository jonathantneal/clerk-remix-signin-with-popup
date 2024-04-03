/* eslint-disable */
import { useSignIn } from "@clerk/remix";
import * as React from "react";

export default function SignInWithGoogle() {
  const { signIn, isLoaded } = useSignIn();

  React.useEffect(() => {
    if (isLoaded && signIn) {
      signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sign-in-sso-callback",
        redirectUrlComplete: "/sign-in-success",
      });
    }
  }, [signIn, isLoaded]);

  return <p>signing in...</p>;
}
