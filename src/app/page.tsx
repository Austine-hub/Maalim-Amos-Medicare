//src/app/page.tsx

// src/app/page.tsx

import type { Metadata } from "next";

import Hero from "@/components/hero/Hero";
import MedicalInfoCarousel from "@/components/medicalInfo/MedicalCarousel";
import DealsOfTheDay from "@/components/deals/Deals";
import TodayDeals from "@/components/today/TodayDeals";
import PopularProducts from "@/components/new/PopularProducts";
import ProductsGrid from "@/components/new/ProductsGrid";
import Grid from "@/components/today/Products/Grid1";

import styles from "./page.module.css";
import WhyChooseUs from "@/components/whyChooseUs/WhyChooseUs";

export const metadata: Metadata = {
  title: "MAAALIM AMOS MEDICARE",
  description: "Modern Pharmacy solutions — Isbitaalka Raysashada Degdegga ah.",
};

export default function Home() {
  return (
    <main className={`${styles.page} ${styles.main}`}>

      {/* Hero – full width */}
      <section className={`${styles.fullBleed}`}>
        <Hero />
      </section>

      {/* Medical Info Carousel – MUST be full width */}
      <section
        className={`${styles.fullBleed}`}
        aria-label="Medical information"
      >
        <MedicalInfoCarousel />
      </section>

      {/* Deals of the Day */}
      <section className={`${styles.fullBleed} ${styles.sectionCompact}`}>
        <DealsOfTheDay />
      </section>

      {/* Today Deals */}
      <section className={`${styles.fullBleed} ${styles.sectionCompact}`}>
        <TodayDeals />
      </section>

      {/* Popular Products */}
      <section className={`${styles.fullBleed} ${styles.sectionCompact}`}>
        <PopularProducts />
      </section>

      {/* Box Grid */}
      <section className={`${styles.fullBleed} ${styles.sectionCompact}`}>
        <Grid />
      </section>

      {/* Products Grid */}
      <section className={`${styles.fullBleed} ${styles.section}`}>
        <ProductsGrid />
      </section>

      {/* WhyChooseUs */}
      <section className={`${styles.fullBleed} ${styles.section}`}>
        <WhyChooseUs/>
      </section>
    </main>
  );
}
