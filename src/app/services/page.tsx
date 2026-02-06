// src/components/AboutUs.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import styles from './AboutUs.module.css';

interface Department {
  name: string;
  description: string;
  image: string;
}

const AboutUs: React.FC = () => {
  const departments: Department[] = [
    {
      name: 'Pharmacy',
      description:
        'Our fully stocked pharmacy provides prescription and over-the-counter medicines, ensuring quality, affordability, and professional pharmaceutical care.',
      image: '/aboutUs/pharmacy.jpg',
    },
    {
      name: 'VCT (Voluntary Counseling & Testing)',
      description:
        'We provide confidential HIV testing, counseling, and prevention education in a safe, non-judgmental environment.',
      image: '/aboutUs/VCT.jpg',
    },
    {
      name: 'General Consultation',
      description:
        'Our experienced medical officers and clinicians offer comprehensive consultations for all age groups, addressing both acute and chronic conditions.',
      image: '/aboutUs/consultation.jpg',
    },
    {
      name: 'Laboratory Services',
      description:
        'We operate a modern diagnostic laboratory equipped for accurate and timely investigations to support clinical decision-making.',
      image: '/aboutUs/lab.jpg',
    },
    {
      name: 'MCH (Maternal & Child Health)',
      description:
        'We offer prenatal, postnatal, immunization, and growth-monitoring services to ensure the well-being of mothers and children.',
      image: '/aboutUs/MCH.jpg',
    },
  ];

  return (
    <section
      className={styles.aboutUsSection}
      aria-labelledby="about-us-heading"
    >
      <div className={styles.intro}>
        <h2 id="about-us-heading" className={styles.title}>
          About Our Comprehensive Care Clinic
        </h2>
        <p className={styles.subtitle}>
          At MAALIM AMOS: Isbitaalka Raysashada Degdegga ah Comprehensive Healthcare Centre, we are dedicated to
          providing patient-centered, affordable, and high-quality healthcare
          under one roof. Our multidisciplinary team ensures that every patient
          receives the care they deserve with compassion and professionalism.
        </p>
      </div>

      <div className={styles.departmentsGrid} role="list">
        {departments.map((dept) => (
          <article
            key={dept.name}
            className={styles.departmentCard}
            role="listitem"
            tabIndex={0}
          >
            <Image
              src={dept.image}
              alt={`${dept.name} department`}
              width={400}
              height={260}
              className={styles.departmentImage}
              loading="lazy"
            />

            <div className={styles.departmentContent}>
              <h3 className={styles.departmentName}>{dept.name}</h3>
              <p className={styles.departmentDescription}>
                {dept.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AboutUs;
