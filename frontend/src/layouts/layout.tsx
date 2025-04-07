import React from "react";
import Header from "@/components/Header.tsx";
import Hero from "@/components/Hero.tsx";
import Footer from "@/components/Footer.tsx";

type Props = {
  children: React.ReactNode;
  showHero?: boolean;
};

const Layout = ({ children, showHero = false }: Props) => {
  return (
      <main className="flex flex-col min-h-screen">
        <a href="#main-content" className="sr-only focus:not-sr-only">
          Skip to content
        </a>
        <Header/>
        {showHero && <Hero/>}
        <section id="main-content" className="container mx-auto flex-1 py-10">
          {children}
        </section>
        <Footer/>
      </main>
  );
};

export default Layout;
