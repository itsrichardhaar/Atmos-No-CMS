import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type ConsentCategories = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

export type ConsentState =
  | { status: "unknown"; categories: ConsentCategories }
  | { status: "accepted" | "rejected" | "custom"; categories: ConsentCategories };

type Ctx = {
  consent: ConsentState;
  acceptAll: () => void;
  rejectAll: () => void;
  updateCategories: (partial: Partial<Omit<ConsentCategories, "necessary">>) => void;
  saveCustom: () => void;
  resetConsent: () => void;

  // NEW: settings modal control
  settingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
};

const ConsentContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "cookieConsent.v1";

const defaultCategories: ConsentCategories = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>({
    status: "unknown",
    categories: defaultCategories,
  });

  const [settingsOpen, setSettingsOpen] = useState(false);

  // load from storage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as ConsentState;
        parsed.categories.necessary = true;
        setConsent(parsed);
      }
    } catch {}
  }, []);

  // persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch {}
  }, [consent]);

  const acceptAll = () =>
    setConsent({
      status: "accepted",
      categories: { necessary: true, analytics: true, marketing: true },
    });

  const rejectAll = () =>
    setConsent({
      status: "rejected",
      categories: { necessary: true, analytics: false, marketing: false },
    });

  const updateCategories = (partial: Partial<Omit<ConsentCategories, "necessary">>) =>
    setConsent((prev) => ({
      status: "custom",
      categories: { ...prev.categories, ...partial, necessary: true },
    }));

  const saveCustom = () =>
    setConsent((prev) => ({ status: "custom", categories: { ...prev.categories, necessary: true } }));

  const resetConsent = () => setConsent({ status: "unknown", categories: defaultCategories });

  const openSettings = () => setSettingsOpen(true);
  const closeSettings = () => setSettingsOpen(false);

  const value = useMemo(
    () => ({
      consent,
      acceptAll,
      rejectAll,
      updateCategories,
      saveCustom,
      resetConsent,
      settingsOpen,
      openSettings,
      closeSettings,
    }),
    [consent, settingsOpen]
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within ConsentProvider");
  return ctx;
}

