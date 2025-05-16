import './globals.css';


  export const metadata = {
    title: "Lucile Muscu",
    description: "Programme de Muscu.",
    icons: {
        icon: "/favicon.ico", // Pour le favicon par défaut
        shortcut: "/favicon.ico", // Pour les navigateurs type iOS
        apple: "/apple-touch-icon.png", // iPhone/iPad
    },
    openGraph: {
      title: "Lucile Muscu",
      description: "Programme de Muscu.",
      url: "https://lucile-muscu.vercel.app/",
      siteName: "Lucile Muscu",
      images: [
        {
          url: "https://lucile-muscu.vercel.app/preview.jpg", // Mets une image propre ici !
          width: 1200,
          height: 630,
          alt: "Site Lucile Muscu",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image", // ✅ Correction ici
      title: "Lucile Muscu",
      description: "Programme de Muscu.",
      images: ["https://lucile-muscu.vercel.app/preview.jpg"], // Même image que Open Graph
    },
  };
  



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="fr">
          <body className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
          <header className="bg-gradient-to-r from-purple-800 to-purple-900 text-white p-8 text-4xl font-extrabold text-center shadow-md">
    LUCILE MUSCU
</header>
              <main className="container mx-auto mt-4">{children}</main>
          </body>
      </html>
  );
}
