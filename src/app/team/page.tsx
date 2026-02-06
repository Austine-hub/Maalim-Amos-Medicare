import React from 'react';
import styles from './TeamSection.module.css';
import Image from 'next/image';

const teamMembers = [
  {
    id: 1,
    name: 'Dr. Ismail Omar',
    role: 'GENERAL PRACTITIONER',
    image: '/hero/hero1.jpg',
    description:
      'Provides comprehensive primary care for acute and chronic conditions. / Daryeel guud oo caafimaad ah, baaritaan, daaweyn iyo la-talin bukaanada da\' kasta leh.',
  },
  {
    id: 2,
    name: 'Dr. Mahad Jama',
    role: 'GENERAL SURGEON',
    image: '/aboutUs/consultation.jpg',
    description:
      'Specialized in general and minimally invasive surgical procedures. / Ku takhasusay qalliin guud iyo qalliinnada fudud ee casriga ah.',
  },
  {
    id: 3,
    name: 'Dr. Abdi Mohamed',
    role: 'NEPHROLOGY',
    image: '/hero/hero1.avif',
    description:
      'Expert in kidney disease management, dialysis, and hypertension care. / Khabiir ku ah cudurrada kelyaha, sifaynta dhiigga iyo maareynta dhiig karka.',
  },
  {
    id: 4,
    name: 'Dr. Hassan Farah',
    role: 'ORAL SURGEON',
    image: '/hero/hero3.jpg',
    description:
      'Advanced care in oral surgery, dental trauma, and jaw disorders. / Daryeel heer sare ah oo ku saabsan qalliinka afka, ilko-xanuunka iyo cudurrada daanka.',
  },
  {
    id: 5,
    name: 'Dr. Mohamed Hassan',
    role: 'CARDIOLOGY',
    image: '/hero/hero6.jpeg',
    description:
      'Diagnosis and treatment of heart and cardiovascular conditions. / Ogaanshaha iyo daaweynta cudurrada wadnaha iyo xididdada dhiigga.',
  },
  {
    id: 6,
    name: 'Dr. Abdirahman Yusuf',
    role: 'GENERAL PRACTITIONER',
    image: '/hero/hero5.jpg',
    description:
      'Patient-centered primary care with focus on prevention and wellness. / Daryeel caafimaad oo ku salaysan bukaan-dhexe iyo ka hortagga cudurrada.',
  },
  {
    id: 7,
    name: 'Dr. Ahmed Ali',
    role: 'INTERNAL MEDICINE',
    image: '/hero/hero2.jpg',
    description:
      'Management of complex adult medical conditions and chronic diseases. / Maareynta cudurrada gudaha ee dadka waaweyn iyo xanuunnada daba-dheeraada.',
  },
  {
    id: 8,
    name: 'Dr. Yusuf Aden',
    role: 'PAEDIATRICS',
    image: '/team/team1.jpg',
    description:
      'Comprehensive medical care for infants, children, and adolescents. / Daryeel caafimaad oo dhammaystiran carruurta laga bilaabo dhalashada ilaa qaangaarka.',
  },
  {
    id: 9,
    name: 'Dr. Ali Warsame',
    role: 'EMERGENCY MEDICINE',
    image: '/team/team2.webp',
    description:
      'Rapid assessment and treatment of urgent and life-threatening conditions. / Qiimeyn degdeg ah iyo daaweyn xaaladaha halista ah iyo shilalka.',
  },
  {
    id: 10,
    name: 'Dr. Omar Sheikh',
    role: 'ORTHOPAEDICS',
    image: '/team/team3.jpg',
    description:
      'Specialist in bone, joint, and musculoskeletal injuries and disorders. / Ku takhasusay lafaha, kala-goysyada iyo dhaawacyada murqaha.',
  },
  {
    id: 11,
    name: 'Dr. Jama Abdullahi',
    role: 'RADIOLOGY',
    image: '/team/team5.jpg',
    description:
      'Diagnostic imaging expert supporting accurate clinical decision-making. / Khabiir sawir-qaadista caafimaadka si loo xaqiijiyo ogaansho sax ah.',
  },
  {
    id: 12,
    name: 'Dr. Farah Nur',
    role: 'ANAESTHESIOLOGY',
    image: '/team/team6.jpg',
    description:
      'Perioperative anesthesia, pain management, and patient safety specialist. / Khabiir suuxinta, xakamaynta xanuunka iyo badbaadada bukaanka.',
  },
];

const TeamSection = () => {
  return (
    <section className={styles.teamSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Meet Our Medcal Team</h2>

        <div className={styles.grid}>
          {teamMembers.map((member) => (
            <article key={member.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={member.image}
                  alt={member.name}
                  width={400}
                  height={400}
                  className={styles.image}
                />
              </div>

              <div className={styles.content}>
                <span className={styles.role}>{member.role}</span>
                <h3 className={styles.name}>{member.name}</h3>
                <p className={styles.description}>{member.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;

