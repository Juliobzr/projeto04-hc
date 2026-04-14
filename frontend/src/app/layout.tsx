import type { Metadata } from "next";
import { Provider } from "@/components/ui/provider";
import PanelLayout from "@/components/ui/layout/PanelLayout";
import "./globals.css";

// Configurações de SEO e título da página
export const metadata: Metadata = {
  title: "Projeto HC - Triagem",
  description: "Sistema de identificação e triagem do Hospital das Clínicas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        {/* O Provider garante que o tema do Chakra UI funcione em tudo */}
        <Provider>
          
          {/* O PanelLayout é o "esqueleto" fixo. 
            Ele mantém a Sidebar e o Header parados enquanto você navega,
            evitando que a tela pisque ou "pule" ao trocar de página.
          */}
          <PanelLayout>
            {children}
          </PanelLayout>

        </Provider>
      </body>
    </html>
  );
}