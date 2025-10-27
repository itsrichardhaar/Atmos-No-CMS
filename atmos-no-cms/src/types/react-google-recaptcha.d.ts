// types/react-google-recaptcha.d.ts
declare module "react-google-recaptcha" {
  import * as React from "react";

  export type ReCAPTCHASize = "compact" | "normal" | "invisible";
  export type ReCAPTCHATheme = "light" | "dark";
  export type ReCAPTCHABadge = "bottomright" | "bottomleft" | "inline";

  export interface ReCAPTCHAProps {
    sitekey: string;
    onChange?: (token: string | null) => void;
    onExpired?: () => void;
    onErrored?: () => void;
    size?: ReCAPTCHASize;
    theme?: ReCAPTCHATheme;
    tabIndex?: number;        
    hl?: string;
    badge?: ReCAPTCHABadge;   
    isolated?: boolean;
    className?: string;       
  }

  export default class ReCAPTCHA extends React.Component<ReCAPTCHAProps> {
    reset(): void;
    getValue(): string | null;
    executeAsync(): Promise<string>;
  }
}

