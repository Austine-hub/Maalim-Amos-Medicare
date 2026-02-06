import React from 'react';
import styles from './WhyChooseUs.module.css';
import { Ear } from 'lucide-react';
import { 
  FaTooth, 
  FaUserMd, 
  FaFileAlt, 
  FaDna, 
  FaSeedling, 
} from 'react-icons/fa';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        {icon}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

const WhyChooseUs: React.FC = () => {
  const features = [
  {
    icon: <FaTooth />,
    title: 'Blood Clotting Disorders | Cudurrada Xinjirowga Dhiigga',
    description: 'Assessment and management of bleeding and clotting conditions such as hemophilia and thrombosis. Qiimeyn iyo daawayn lagu sameeyo cudurrada dhiiggu si aan caadi ahayn u xinjirowga ama u dhiig baxo.'
  },
  {
    icon: <FaUserMd />,
    title: 'Wound Healing & Tissue Repair | Bogsiinta Nabarrada',
    description: 'Evaluation of genetic and medical factors affecting wound healing and tissue regeneration. Qiimeyn lagu sameeyo arrimaha hidde-sideyaasha iyo caafimaadka ee saameeya bogsashada nabarrada.'
  },
  {
    icon: <FaFileAlt />,
    title: 'Genetic & Medical Research | Cilmi-baarista Caafimaadka',
    description: 'Clinical studies and research on inherited and chronic diseases. Daraasado iyo cilmi-baaris ku saabsan cudurrada hidde-sideyaasha iyo kuwa daba-dheeraada.'
  },
  {
    icon: <FaDna />,
    title: 'Genetic Testing & Counseling | Baaritaanka Hiddo-sideyaasha',
    description: 'Advanced genetic screening and professional counseling for patients and families. Baaritaan casri ah iyo talo-bixin xirfadeed oo ku saabsan cudurrada la iska dhaxlo.'
  },
  {
    icon: <FaSeedling />,
    title: 'Allergy & Immunology Care | Daawaynta Xasaasiyadda',
    description: 'Diagnosis and treatment of seasonal and chronic allergies. Ogaanshaha iyo daawaynta xasaasiyadda xilliyada kala duwan.'
  },
  {
    icon: <Ear size={28} />,
    title: 'Physical Rehabilitation & Fitness | Baxnaaninta Jirka',
    description: 'Physiotherapy and muscle strengthening programs for recovery and wellness. Barnaamijyo baxnaanin iyo xoojinta murqaha si loo soo kabto loona helo caafimaad wanaagsan.'
  }
];


  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.heading}>Why Choose Us</h2>
          <div className={styles.underline}></div>
        </div>
        
        <p className={styles.subtitle}>
          It is the people who make Medicenter what it is and we are extremely proud of the achievements of our
          staff. We all work together to help our patients through recovery, providing the best possible care.
        </p>

        <div className={styles.grid}>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;