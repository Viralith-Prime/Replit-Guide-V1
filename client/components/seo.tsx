import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: "summary" | "summary_large_image";
  canonical?: string;
  noindex?: boolean;
}

const defaultValues = {
  title: "Replit Guide - Master Cloud Development",
  description:
    "Your comprehensive, interactive guide to mastering Replit. Learn everything from basics to advanced features with hands-on exercises and real-world examples.",
  keywords:
    "Replit, cloud development, coding, programming, online IDE, collaborative coding, AI programming, web development",
  author: "Replit Guide Team",
  ogTitle: "Replit Guide - Master Cloud Development",
  ogDescription:
    "Your comprehensive, interactive guide to mastering Replit. Learn everything from basics to advanced features with hands-on exercises.",
  ogImage: "/og-image.jpg",
  twitterCard: "summary_large_image" as const,
};

export function SEO({
  title,
  description,
  keywords,
  author,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  twitterCard,
  canonical,
  noindex = false,
}: SEOProps) {
  const seoTitle = title ? `${title} | Replit Guide` : defaultValues.title;
  const seoDescription = description || defaultValues.description;
  const seoKeywords = keywords || defaultValues.keywords;
  const seoAuthor = author || defaultValues.author;
  const seoOgTitle = ogTitle || title || defaultValues.ogTitle;
  const seoOgDescription =
    ogDescription || description || defaultValues.ogDescription;
  const seoOgImage = ogImage || defaultValues.ogImage;
  const seoOgUrl =
    ogUrl || (typeof window !== "undefined" ? window.location.href : "");
  const seoTwitterCard = twitterCard || defaultValues.twitterCard;
  const seoCanonical =
    canonical || (typeof window !== "undefined" ? window.location.href : "");

  useEffect(() => {
    // Update document title
    document.title = seoTitle;

    // Update or create meta tags
    const updateMetaTag = (
      name: string,
      content: string,
      property?: string,
    ) => {
      const selector = property
        ? `meta[property="${name}"]`
        : `meta[name="${name}"]`;
      let tag = document.querySelector(selector) as HTMLMetaElement;

      if (!tag) {
        tag = document.createElement("meta");
        if (property) {
          tag.setAttribute("property", name);
        } else {
          tag.setAttribute("name", name);
        }
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    // Basic meta tags
    updateMetaTag("description", seoDescription);
    updateMetaTag("keywords", seoKeywords);
    updateMetaTag("author", seoAuthor);
    updateMetaTag("viewport", "width=device-width, initial-scale=1.0");

    // Open Graph tags
    updateMetaTag("og:title", seoOgTitle, true);
    updateMetaTag("og:description", seoOgDescription, true);
    updateMetaTag("og:image", seoOgImage, true);
    updateMetaTag("og:url", seoOgUrl, true);
    updateMetaTag("og:type", "website", true);
    updateMetaTag("og:site_name", "Replit Guide", true);

    // Twitter Card tags
    updateMetaTag("twitter:card", seoTwitterCard);
    updateMetaTag("twitter:title", seoOgTitle);
    updateMetaTag("twitter:description", seoOgDescription);
    updateMetaTag("twitter:image", seoOgImage);

    // Robots tag
    updateMetaTag("robots", noindex ? "noindex, nofollow" : "index, follow");

    // Canonical link
    let canonicalLink = document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", seoCanonical);

    // JSON-LD structured data
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Replit Guide",
      description: seoDescription,
      url: seoOgUrl,
      author: {
        "@type": "Organization",
        name: seoAuthor,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${seoOgUrl}?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    };

    let jsonLdScript = document.querySelector(
      'script[type="application/ld+json"]',
    );
    if (!jsonLdScript) {
      jsonLdScript = document.createElement("script");
      jsonLdScript.setAttribute("type", "application/ld+json");
      document.head.appendChild(jsonLdScript);
    }
    jsonLdScript.textContent = JSON.stringify(jsonLd);
  }, [
    seoTitle,
    seoDescription,
    seoKeywords,
    seoAuthor,
    seoOgTitle,
    seoOgDescription,
    seoOgImage,
    seoOgUrl,
    seoTwitterCard,
    seoCanonical,
    noindex,
  ]);

  return null;
}

// Hook for programmatic SEO updates
export function useSEO(seoProps: SEOProps) {
  useEffect(() => {
    const seoComponent = <SEO {...seoProps} />;
    // The effect will run when component mounts
  }, [JSON.stringify(seoProps)]);
}
