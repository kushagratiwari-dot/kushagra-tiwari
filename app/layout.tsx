import type { Metadata } from "next";
import { Anton, Geist, Geist_Mono, Caveat_Brush } from "next/font/google";
import "./globals.css";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const caveat = Caveat_Brush({ weight: "400", subsets: ["latin"], variable: "--font-caveat" });

export const metadata: Metadata = {
  title: "Kushagra Tiwari | AIML Engineering Student",
  description: "Portfolio of Kushagra Tiwari, B.Tech AIML student at Allenhouse Institute of Technology.",
};

const boot = `(function(){try{var q=new URLSearchParams(location.search).get('agents'),s=localStorage.getItem('agents'),r=matchMedia('(prefers-reduced-motion:reduce)').matches;if(q==='on'||(q!=='off'&&s!=='off'&&!r))document.documentElement.classList.add('build-mode')}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${anton.variable} ${geist.variable} ${geistMono.variable} ${caveat.variable}`}>
      <head><script dangerouslySetInnerHTML={{ __html: boot }} /></head>
      <body>{children}</body>
    </html>
  );
}
