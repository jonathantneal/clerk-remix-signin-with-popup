/* eslint-disable */
import { useSession } from "@clerk/remix";
import * as React from "react";

export default function Success() {
  const session = useSession();

  React.useEffect(() => {
    if (window.opener) {
      const message = {
        source: "clerk-sign-in",
        session: session.session?.id,
      };

      if (message.session) {
        window.opener.postMessage(message);

        window.close();
      }
    }
  }, [session.session?.id]);

  return <p>success</p>;
}
