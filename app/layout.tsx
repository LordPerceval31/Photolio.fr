import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 1. LES IMPORTS (Ne pas oublier le CSS, sinon le toast sera invisible ou moche)
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s — Photolio",
    default: "Photolio — Créez votre portfolio photographe en ligne",
  },
  description:
    "Créez votre portfolio photographe en ligne, partagez des galeries privées avec vos clients et gérez votre site vitrine en totale autonomie. Essai gratuit.",
  authors: [
    { name: "Levynix Studio", url: "https://levynixstudio.netlify.app/" },
  ],
  creator: "Levynix Studio",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Photolio — Votre portfolio photographe en ligne",
    description:
      "Site vitrine, galeries privées et portfolio personnalisé pour photographes amateurs et professionnels.",
    url: "https://photolio.fr",
    siteName: "Photolio",
    locale: "fr_FR",
    type: "website",
  },
  metadataBase: new URL("https://photolio.fr"),

  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue focus:text-white focus:rounded-lg focus:font-semibold"
        >
          Passer au contenu
        </a>
        {children}

        {/* 2. LE CONTENEUR (Placé à la fin du body pour être au-dessus de tout) */}
        <ToastContainer
          position="top-center"
          theme="dark"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </body>
    </html>
  );
}
