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
      title: 'Blood clotting disorder',
      description: 'Donec ipsum diam, pretium mollis dapibus risus. Nullam dolor nibh pulvinar at interdum eget.'
    },
    {
      icon: <FaUserMd />,
      title: 'Wound healing genes',
      description: 'Donec ipsum diam, pretium mollis dapibus risus. Nullam dolor nibh pulvinar at interdum eget.'
    },
    {
      icon: <FaFileAlt />,
      title: 'Studies of genetic',
      description: 'Donec ipsum diam, pretium mollis dapibus risus. Nullam dolor nibh pulvinar at interdum eget.'
    },
    {
      icon: <FaDna />,
      title: 'Generics strategies',
      description: 'Donec ipsum diam, pretium mollis dapibus risus. Nullam dolor nibh pulvinar at interdum eget.'
    },
    {
      icon: <FaSeedling />,
      title: 'Springtime allergies',
      description: 'Donec ipsum diam, pretium mollis dapibus risus. Nullam dolor nibh pulvinar at interdum eget.'
    },
    {
      icon: <Ear size={28} />,
      title: 'Muscle fitness',
      description: 'Donec ipsum diam, pretium mollis dapibus risus. Nullam dolor nibh pulvinar at interdum eget.'
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