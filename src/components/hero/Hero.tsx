'use client';

import React, { useState, useEffect, useCallback } from 'react';
import styles from './Hero.module.css';
import Link from "next/link";
import {
  Hospital,
  Syringe,
  Baby,
  HeartPulse,
  Users,
  Scissors,
  Stethoscope,
  MessageCircle,
  Bone,
  Activity,
  Thermometer,
  AlertTriangle, // replaced BandAid
  Microscope,
  Eye,
  Smile,
  Brain
} from 'lucide-react';

const SERVICES = [
  { icon: Hospital, title: 'Outpatient', desc: 'General consultations' },
  { icon: Syringe, title: 'Immunization', desc: 'Vaccines & protection' },
  { icon: Baby, title: 'Antenatal', desc: 'Prenatal care' },
  { icon: HeartPulse, title: 'Postnatal', desc: 'After-birth support' },
  { icon: Users, title: 'Family Planning', desc: 'Reproductive health' },
  { icon: Scissors, title: 'Minor Surgery', desc: 'Outpatient procedures' },
  { icon: Stethoscope, title: 'Gynaecology', desc: "Women's health" },
  { icon: MessageCircle, title: 'Counselling', desc: 'Mental wellness' },
  { icon: Bone, title: 'Physiotherapy', desc: 'Rehabilitation care' },
  { icon: Activity, title: 'Cardiology', desc: 'Heart & vascular care' },
  { icon: Thermometer, title: 'Internal Medicine', desc: 'Adult medical care' },
  { icon: AlertTriangle, title: 'Emergency', desc: 'Immediate care & trauma' },
  { icon: Microscope, title: 'Laboratory', desc: 'Diagnostic testing' },
  { icon: Eye, title: 'Ophthalmology', desc: 'Eye care & surgery' },
  { icon: Smile, title: 'Dentistry', desc: 'Oral health & treatment' },
  { icon: Brain, title: 'Neurology', desc: 'Nervous system & brain care' },
];
const SLIDES = [
  
  '/hero/hero1.jpg',
  '/hero/hero2.jpg',
  '/aboutUs/consultation.jpg',
  '/aboutUs/pharmacy.jpg',
  '/hero/hero3.jpg',
  '/aboutUs/lab.jpg',
  '/hero/hero4.jpg',
  '/hero/hero5.jpg',
  '/aboutUs/MCH.png',
  '/hero/hero1.avif',
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const navigate = useCallback((direction: number) => {
    setCurrentSlide((prev) => (prev + direction + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => navigate(1), 5000);
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <section className={styles.hero}>
      <div className={styles.slider}>
        <div
          className={styles.track}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {SLIDES.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Healthcare ${i + 1}`}
              className={styles.slide}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          ))}
        </div>

        <button
          className={`${styles.nav} ${styles.prev}`}
          onClick={() => navigate(-1)}
          aria-label="Previous slide"
        >
          ‹
        </button>

        <button
          className={`${styles.nav} ${styles.next}`}
          onClick={() => navigate(1)}
          aria-label="Next slide"
        >
          ›
        </button>

        <div className={styles.indicators}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === currentSlide ? styles.active : ''}`}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <aside className={styles.sidebar}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h3 className={styles.title}>Our Services</h3>
            <p className={styles.subtitle}>Comprehensive Healthcare Solutions</p>
          </div>

          <div className={styles.services}>
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <div key={i} className={styles.service}>
                  <Icon size={22} strokeWidth={1.8} className={styles.icon} />
                  <div>
                    <h4 className={styles.name}>{service.title}</h4>
                    <p className={styles.desc}>{service.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.pharmacy}>
          <div className={styles.badge}>
            <svg viewBox="0 0 24 24" fill="none" className={styles.badgeIcon}>
              <path
                d="M12 2v20M2 12h20M12 6l4 6-4 6-4-6z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>24/7</span>
          </div>

          <h3 className={styles.pharmacyTitle}>Pharmacy</h3>
          <p className={styles.pharmacyDesc}>Quality medications & expert guidance</p>


          <Link
            href="/more/new"
            className={styles.cta}
          >
            Visit Pharmacy <span className={styles.arrow}>→</span>
          </Link>

        </div>
      </aside>
    </section>
  );
};

export default Hero;