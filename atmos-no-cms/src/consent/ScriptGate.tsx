import { useEffect } from "react";
import { useConsent } from "./ConsentContext";

type Props = {
  needs: Array<"analytics" | "marketing">; // categories required to run
  run: () => void;                          // load your script here
};

export default function ScriptGate({ needs, run }: Props) {
  const { consent } = useConsent();

  useEffect(() => {
    if (consent.status === "unknown") return;
    const ok = needs.every((k) => consent.categories[k]);
    if (ok) run();
  }, [consent, needs, run]);

  return null;
}
