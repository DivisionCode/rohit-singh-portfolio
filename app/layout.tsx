import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { Header } from "@/components/site/Header";
import { themeScript } from "@/components/site/ThemeToggle";
import { Footer } from "@/components/site/Footer";
import { GA_MEASUREMENT_ID, SITE_URL, profile, socials } from "@/lib/content/site";
import { ventures } from "@/lib/content/work";

/*
  One typeface for the whole interface.

  There is no monospace: a terminal face on labels reads as a developer
  default rather than as a design decision. Hierarchy comes from size, weight,
  case and tracking instead, which is harder to get right and looks it.

  Schibsted Grotesk is a variable grotesque with genuine detail in the a, g
  and R, and it is not the Next.js default the way Geist is.
*/
const sans = Schibsted_Grotesk({
  variable: "--font-sans-face",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.name} · ${profile.role}`,
    template: `%s, ${profile.name}`,
  },
  description: profile.seoDescription,
  applicationName: profile.group,
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  keywords: [
    "Rohit Singh",
    "Sushraj Ventures",
    "Fundrev",
    "Tunegram",
    "Arthmala",
    "senior software engineer",
    "founding engineer",
    "TypeScript",
    "Next.js",
    "React",
    "Vue.js",
    "Node.js",
    "AI systems",
    "ERP developer",
    "India",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    siteName: profile.group,
    title: `${profile.name} · ${profile.role}`,
    description: profile.seoDescription,
    url: SITE_URL,
    locale: "en_IN",
    images: [{ url: "/media/profile.jpg", width: 1200, height: 1200, alt: profile.name }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Divisioncode_Dc",
    creator: "@Divisioncode_Dc",
    title: `${profile.name} · ${profile.role}`,
    description: profile.seoDescription,
    images: ["/media/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  other: {
    "p:domain_verify": "324779d2993b5ab33e0ab3a8db99c8c6",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

/** Structured data so search and LLM surfaces get the relationships right. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: SITE_URL,
  image: `${SITE_URL}/media/profile.jpg`,
  jobTitle: "Senior Software Engineer",
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  description: profile.seoDescription,
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.location.city,
    addressRegion: profile.location.region,
    postalCode: profile.location.postal,
    addressCountry: "IN",
  },
  sameAs: socials.map((social) => social.href),
  worksFor: ventures
    .filter((venture) => venture.links.some((link) => link.kind === "site"))
    .map((venture) => ({
      "@type": "Organization",
      name: venture.name,
      url: venture.links.find((link) => link.kind === "site")?.href,
      description: venture.tagline,
    })),
  knowsAbout: [
    "AI agent systems",
    "Private capital technology",
    "Enterprise resource planning",
    "Marketplace platforms",
    "TypeScript",
    "React",
    "Next.js",
    "Vue.js",
    "Node.js",
    "MongoDB",
    "SQL Server",
    ".NET",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col bg-canvas text-ink">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />

        <script
          type="application/ld+json"
          // Static, author-controlled payload.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}',{anonymize_ip:true});`}
        </Script>
      </body>
    </html>
  );
}
