//src/components/medicalInfo/MedicalCarousel.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './MedicalInfoCarousel.module.css';
import Link from 'next/link';


interface Schedule {
  day: string;
  time: string;
}

interface InfoCard {
  id: number;
  title: string;
  description: string;
  buttonText?: string;
  type: 'emergency' | 'timetable' | 'hours';
  hours?: Schedule[];
  href?: string;          // ✅ added
}

const cardsData: InfoCard[] = [
  {
    id: 1,
    title: 'Emergency Case',
    description: 'If you need a doctor urgently outside of medicenter opening hours, call emergency appointment number for emergency service.',
    buttonText: 'READ MORE',
    type: 'emergency',
    href: '/emergency',   // ✅ comma fixed
  },
  {
    id: 2,
    title: 'Doctors Timetable',
    description: 'Here at medicenter we have individual doctor\'s lists. Click read more below to see services and current timetable for our doctors.',
    buttonText: 'READ MORE',
    type: 'timetable',
    href: '/timetable',   // ✅ comma fixed
  },
  {
    id: 3,
    title: 'Opening Hours',
    description: '',
    type: 'hours',
    hours: [
      { day: 'Monday - Thursday', time: '8.00 - 17.00' },
      { day: 'Friday', time: '9.00 - 18.00' },
      { day: 'Saturday', time: '9.30 - 17.30' }
    ]
  }
];

export default function MedicalInfoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % cardsData.length);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + cardsData.length) % cardsData.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, goToNext]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <div 
      className={styles.carouselContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Active indicator bar */}
      <div className={styles.indicatorBar}>
        <div 
          className={styles.activeBar}
          style={{ 
            width: `${100 / cardsData.length}%`,
            transform: `translateX(${currentIndex * 100}%)`
          }}
        />
      </div>

      <div className={styles.cardsWrapper}>
        {cardsData.map((card, index) => (
          <div
            key={card.id}
            className={`${styles.card} ${styles[card.type]} ${
              index === currentIndex ? styles.active : ''
            }`}
            onClick={() => goToSlide(index)}
          >
            <h2 className={styles.cardTitle}>{card.title}</h2>
            
            {card.type === 'hours' ? (
              <div className={styles.hoursContainer}>
                {card.hours?.map((schedule, idx) => (
                  <div key={idx} className={styles.hoursRow}>
                    <span className={styles.hoursDay}>{schedule.day}</span>
                    <span className={styles.hoursTime}>{schedule.time}</span>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <p className={styles.cardDescription}>{card.description}</p>
                  {card.buttonText && card.href && (
                    <Link
                      href={card.href}
                      className={styles.readMoreButton}
                      onClick={(e) => e.stopPropagation()} // 🚨 critical
                    >
                      {card.buttonText}
                      <span className={styles.arrow}>→</span>
                    </Link>
                  )}

              </>
            )}
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button 
        className={`${styles.navButton} ${styles.navButtonPrev}`}
        onClick={goToPrevious}
        aria-label="Previous slide"
      >
        ‹
      </button>

      <button 
        className={`${styles.navButton} ${styles.navButtonNext}`}
        onClick={goToNext}
        aria-label="Next slide"
      >
        ›
      </button>
    </div>
  );
}