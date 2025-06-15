import { Geist, Geist_Mono } from "next/font/google";
import {Navbar} from "@/components/global/Navbar";
import "./globals.css";
import { Footer } from "@/components/global/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Rozco Online TV",
  description: "Rozco Online TV es tu plataforma en Estados Unidos para ver canales de televisión latinoamericanos internacionales en vivo. Disfruta de una amplia variedad de películas, series y eventos PPV (pago por ver), todo en español. Accede a contenido exclusivo desde América Latina, incluyendo noticias, entretenimiento, deportes y más, directamente desde cualquier dispositivo. ¡Conéctate con tus raíces y disfruta de la mejor programación latina sin restricciones!",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
