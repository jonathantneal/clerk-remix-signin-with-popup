import * as React from "react";

import type { SetActive } from "@clerk/types";
import { UserButton, useAuth, useSignIn } from "@clerk/remix";

export default function SignInPage() {
  const auth = useAuth();
  const signin = useSignIn();

  console.log("SignInPage", { isSignedIn: auth.isSignedIn });

  return (
    <div>
      <h1>{auth.isSignedIn ? "Signed In" : "Sign In"}</h1>
      {auth.isSignedIn ? null : <SignInButton setActive={signin.setActive} />}
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  );
}

function SignInButton({ setActive }: { setActive?: SetActive }) {
  const windowRef = React.useRef<Window | null>(null);

  const handleMessage = React.useCallback(
    (event: MessageEvent) => {
      const { data } = event;

      if (setActive && data.source === "clerk-sign-in") {
        console.log("setActive", { session: data.session });
        setActive({ session: data.session });
      }
    },
    [setActive]
  );

  const openSignInWindow = React.useCallback(
    (url: string, name: string) => {
      // add the listener for receiving a message from the popup
      window.addEventListener("message", handleMessage);

      // window features
      const strWindowFeatures =
        "toolbar=no, menubar=no, width=600, height=700, top=100, left=100";

      if (windowRef.current === null || windowRef.current.closed) {
        windowRef.current = window.open(url, name, strWindowFeatures);
      } else if (windowRef.current.location.href !== url) {
        windowRef.current = window.open(url, name, strWindowFeatures);
        windowRef.current?.focus();
      } else {
        windowRef.current.focus();
      }
    },
    [handleMessage]
  );

  return (
    <button
      onClick={() =>
        openSignInWindow("/sign-in-with-google", "our_window_name")
      }
    >
      Sign in with Google in a new Window
    </button>
  );
}
