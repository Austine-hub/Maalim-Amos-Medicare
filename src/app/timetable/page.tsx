
'use client';

import React, { useState } from 'react';
import styles from './Timetable.module.css';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  qualifications: string;
  image: string;
  schedule: {
    day: string;
    times: string;
    available: boolean;
  }[];
}

const Timetable: React.FC = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<string>('Monday');

const doctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Ismail Omar',
    specialty: 'General Practitioner',
    qualifications: 'MBBS',
    image: '/hero/hero1.jpg',
    schedule: [
      { day: 'Monday', times: '08:00 - 16:00', available: true },
      { day: 'Tuesday', times: '08:00 - 16:00', available: true },
      { day: 'Wednesday', times: '08:00 - 13:00', available: true },
      { day: 'Thursday', times: '08:00 - 16:00', available: true },
      { day: 'Friday', times: '08:00 - 14:00', available: true },
      { day: 'Saturday', times: '09:00 - 12:00', available: true },
      { day: 'Sunday', times: 'Not Available', available: false },
    ],
  },
  {
    id: 2,
    name: 'Dr. Mahad Jama',
    specialty: 'General Surgery',
    qualifications: 'MBBS, MS',
    image: '/aboutUs/consultation.jpg',
    schedule: [
      { day: 'Monday', times: '09:00 - 15:00', available: true },
      { day: 'Tuesday', times: 'Operating Theatre', available: false },
      { day: 'Wednesday', times: '09:00 - 15:00', available: true },
      { day: 'Thursday', times: '09:00 - 15:00', available: true },
      { day: 'Friday', times: '09:00 - 12:00', available: true },
      { day: 'Saturday', times: 'Not Available', available: false },
      { day: 'Sunday', times: 'Not Available', available: false },
    ],
  },
  {
    id: 3,
    name: 'Dr. Abdi Mohamed',
    specialty: 'Nephrology',
    qualifications: 'MD, Nephrology',
    image: '/hero/hero1.avif',
    schedule: [
      { day: 'Monday', times: '10:00 - 16:00', available: true },
      { day: 'Tuesday', times: 'Dialysis Rounds', available: true },
      { day: 'Wednesday', times: '10:00 - 16:00', available: true },
      { day: 'Thursday', times: 'Dialysis Rounds', available: true },
      { day: 'Friday', times: '10:00 - 13:00', available: true },
      { day: 'Saturday', times: 'Not Available', available: false },
      { day: 'Sunday', times: 'Not Available', available: false },
    ],
  },
  {
    id: 4,
    name: 'Dr. Hassan Farah',
    specialty: 'Oral & Maxillofacial Surgery',
    qualifications: 'BDS, MDS',
    image: '/hero/hero3.jpg',
    schedule: [
      { day: 'Monday', times: '09:00 - 14:00', available: true },
      { day: 'Tuesday', times: '09:00 - 14:00', available: true },
      { day: 'Wednesday', times: 'Surgical Procedures', available: false },
      { day: 'Thursday', times: '09:00 - 14:00', available: true },
      { day: 'Friday', times: '09:00 - 12:00', available: true },
      { day: 'Saturday', times: 'Not Available', available: false },
      { day: 'Sunday', times: 'Not Available', available: false },
    ],
  },
  {
    id: 5,
    name: 'Dr. Mohamed Hassan',
    specialty: 'Cardiology',
    qualifications: 'MD, Cardiology',
    image: '/hero/hero6.jpeg',
    schedule: [
      { day: 'Monday', times: '08:00 - 15:00', available: true },
      { day: 'Tuesday', times: '08:00 - 15:00', available: true },
      { day: 'Wednesday', times: 'Cath Lab', available: false },
      { day: 'Thursday', times: '08:00 - 15:00', available: true },
      { day: 'Friday', times: '08:00 - 13:00', available: true },
      { day: 'Saturday', times: 'On Call', available: false },
      { day: 'Sunday', times: 'On Call', available: false },
    ],
  },
  {
    id: 6,
    name: 'Dr. Abdirahman Yusuf',
    specialty: 'General Practitioner',
    qualifications: 'MBBS',
    image: '/hero/hero5.jpg',
    schedule: [
      { day: 'Monday', times: '10:00 - 18:00', available: true },
      { day: 'Tuesday', times: '10:00 - 18:00', available: true },
      { day: 'Wednesday', times: '10:00 - 15:00', available: true },
      { day: 'Thursday', times: '10:00 - 18:00', available: true },
      { day: 'Friday', times: '10:00 - 14:00', available: true },
      { day: 'Saturday', times: 'Not Available', available: false },
      { day: 'Sunday', times: 'Not Available', available: false },
    ],
  },
  {
    id: 7,
    name: 'Dr. Ahmed Ali',
    specialty: 'Internal Medicine',
    qualifications: 'MD, Internal Medicine',
    image: '/hero/hero2.jpg',
    schedule: [
      { day: 'Monday', times: '07:00 - 14:00', available: true },
      { day: 'Tuesday', times: '07:00 - 14:00', available: true },
      { day: 'Wednesday', times: 'Ward Rounds', available: false },
      { day: 'Thursday', times: '07:00 - 14:00', available: true },
      { day: 'Friday', times: '07:00 - 12:00', available: true },
      { day: 'Saturday', times: 'Not Available', available: false },
      { day: 'Sunday', times: 'Not Available', available: false },
    ],
  },
  {
    id: 8,
    name: 'Dr. Yusuf Aden',
    specialty: 'Paediatrics',
    qualifications: 'MD, Paediatrics',
    image: '/team/team1.jpg',
    schedule: [
      { day: 'Monday', times: '09:00 - 17:00', available: true },
      { day: 'Tuesday', times: '09:00 - 17:00', available: true },
      { day: 'Wednesday', times: '09:00 - 17:00', available: true },
      { day: 'Thursday', times: '09:00 - 17:00', available: true },
      { day: 'Friday', times: '09:00 - 13:00', available: true },
      { day: 'Saturday', times: '09:00 - 12:00', available: true },
      { day: 'Sunday', times: 'Not Available', available: false },
    ],
  },
];
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const getScheduleForDay = (doctor: Doctor, day: string) => {
    return doctor.schedule.find(s => s.day === day);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Doctors Timetable</h1>
        <p className={styles.subtitle}>
          View our physicians' availability and schedule your appointment with confidence
        </p>
      </div>

      <div className={styles.daySelector}>
        {weekDays.map(day => (
          <button
            key={day}
            className={`${styles.dayButton} ${selectedDay === day ? styles.dayButtonActive : ''}`}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        <div className={styles.doctorsList}>
          {doctors.map(doctor => {
            const daySchedule = getScheduleForDay(doctor, selectedDay);
            
            return (
              <div
                key={doctor.id}
                className={`${styles.doctorCard} ${selectedDoctor === doctor.id ? styles.doctorCardActive : ''}`}
                onClick={() => setSelectedDoctor(selectedDoctor === doctor.id ? null : doctor.id)}
              >
                <div className={styles.doctorHeader}>
                  <div className={styles.doctorImage}>
                    <img src={doctor.image} alt={doctor.name} />
                  </div>
                  <div className={styles.doctorInfo}>
                    <h3 className={styles.doctorName}>{doctor.name}</h3>
                    <p className={styles.doctorSpecialty}>{doctor.specialty}</p>
                    <p className={styles.doctorQualifications}>{doctor.qualifications}</p>
                  </div>
                </div>

                <div className={styles.scheduleInfo}>
                  <div className={`${styles.availability} ${daySchedule?.available ? styles.availabilityActive : styles.availabilityInactive}`}>
                    <span className={styles.availabilityDot}></span>
                    <span className={styles.availabilityText}>
                      {daySchedule?.available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                  <div className={styles.timeSlot}>
                    {daySchedule?.times}
                  </div>
                </div>

                {selectedDoctor === doctor.id && (
                  <div className={styles.expandedSchedule}>
                    <h4 className={styles.weeklyScheduleTitle}>Weekly Schedule</h4>
                    <div className={styles.scheduleGrid}>
                      {doctor.schedule.map(slot => (
                        <div key={slot.day} className={styles.scheduleRow}>
                          <span className={styles.scheduleDay}>{slot.day}</span>
                          <span className={`${styles.scheduleTimes} ${slot.available ? '' : styles.scheduleTimesUnavailable}`}>
                            {slot.times}
                          </span>
                        </div>
                      ))}
                    </div>
                    <button className={styles.appointmentButton}>
                      Book Appointment
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>Appointment Information</h3>
            <p className={styles.infoText}>
              Our medical staff is committed to providing exceptional care. Please arrive 15 minutes before your scheduled appointment.
            </p>
          </div>

          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>Contact Us</h3>
            <div className={styles.contactInfo}>
              <p className={styles.contactItem}>
                <strong>Phone:</strong> (555) 123-4567
              </p>
              <p className={styles.contactItem}>
                <strong>Email:</strong> appointments@medicenter.com
              </p>
              <p className={styles.contactItem}>
                <strong>Hours:</strong> Monday - Friday, 7:00 AM - 6:00 PM
              </p>
            </div>
          </div>

          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>Emergency Care</h3>
            <p className={styles.infoText}>
              For medical emergencies, please call 911 or visit our Emergency Department, available 24/7.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Timetable;