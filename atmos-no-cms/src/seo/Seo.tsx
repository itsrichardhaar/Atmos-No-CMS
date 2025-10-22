import { useEffect, useRef } from "react";
import { SITE } from "./config";

type JsonLd = Record<string, any>;
type Props = {
  title?: string;
  description?: string;
  path?: string;           // e.g. "/products/vision-series"
  image?: string;          // absolute or relative; we'll make absolute
  type?: "website" | "article" | "product";
  canonical?: string;      // optional override
  jsonLd?: JsonLd | JsonLd[];
};

function absUrl(url?: string) {
  if (!url) return undefined;
  return url.startsWith("http") ? url : `${SITE.baseUrl}${url.startsWith("/") ? url : `/${url}`}`;
}

function setOrRemove<K extends "name" | "property" | "itemprop">(
  key: K,
  keyVal: string,
  content?: string
) {
  const selector = `meta[${key}="${keyVal}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!content) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(key, keyVal);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href?: string) {
  const selector = `link[rel="${rel}"]`;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!href) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function Seo({
  title,
  description,
  path,
  image,
  type = "website",
  canonical,
  jsonLd
}: Props) {
  const prevTitle = useRef<string>(typeof document !== "undefined" ? document.title : "");

  useEffect(() => {
    if (typeof document === "undefined") return;

    // Title
    const fullTitle = title ? `${title} | ${SITE.name}` : SITE.name;
    document.title = fullTitle;

    // Canonical URL
    const url = canonical || (path ? `${SITE.baseUrl}${path}` : SITE.baseUrl);

    // Images
    const ogImage = absUrl(image) ?? SITE.defaultImage;

    // Standard meta
    setOrRemove("name", "description", description);

    // Canonical link
    setLink("canonical", url);

    // Open Graph
    setOrRemove("property", "og:title", fullTitle);
    setOrRemove("property", "og:description", description);
    setOrRemove("property", "og:type", type);
    setOrRemove("property", "og:url", url);
    setOrRemove("property", "og:site_name", SITE.name);
    setOrRemove("property", "og:image", ogImage);

    // Twitter
    setOrRemove("name", "twitter:card", "summary_large_image");
    if (SITE.twitter) setOrRemove("name", "twitter:site", SITE.twitter);
    setOrRemove("name", "twitter:title", fullTitle);
    setOrRemove("name", "twitter:description", description);
    setOrRemove("name", "twitter:image", ogImage);

    // JSON-LD (clear any previous blocks that we created)
    const prior = Array.from(document.head.querySelectorAll<HTMLScriptElement>('script[data-seo-jsonld="1"]'));
    prior.forEach((n) => n.remove());

    const blocks = Array.isArray(jsonLd) ? jsonLd : (jsonLd ? [jsonLd] : []);
    for (const block of blocks) {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.setAttribute("data-seo-jsonld", "1");
      s.text = JSON.stringify(block);
      document.head.appendChild(s);
    }

    // (Optional) cleanup: restore previous title on unmount
    return () => {
      document.title = prevTitle.current;
    };
  }, [title, description, path, image, type, canonical, jsonLd]);

  return null;
}
