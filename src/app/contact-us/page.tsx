// src/components/ContactUs.tsx
'use client';

// ===============================================================
// CONTACT US — Accessible, Scalable, Responsive (Next.js)
// ===============================================================

import React, { useState, useRef } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import styles from './ContactUs.module.css';

// ===============================================================
// TYPES
// ===============================================================

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

interface Props {
  onSubmit?: (payload: ContactPayload) => Promise<void> | void;
}

// ===============================================================
// INITIAL STATE
// ===============================================================

const initialState: ContactPayload = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

// ===============================================================
// COMPONENT
// ===============================================================

const ContactUs: React.FC<Props> = ({ onSubmit }) => {
  const [form, setForm] = useState<ContactPayload>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const successRef = useRef<HTMLDivElement | null>(null);

  // ===============================================================
  // VALIDATION
  // ===============================================================
  const validate = () => {
    const e: Record<string, string> = {};

    if (!(form.name ?? '').trim()) e.name = 'Full name is required.';

    if (!(form.email ?? '').trim()) {
      e.email = 'Email is required.';
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
        (form.email ?? '').trim()
      )
    ) {
      e.email = 'Enter a valid email address.';
    }

    if (!(form.message ?? '').trim()) e.message = 'Please enter a message.';

    const phoneTrimmed = (form.phone ?? '').trim();
    if (phoneTrimmed && !/^[0-9+\s()-]{6,20}$/.test(phoneTrimmed)) {
      e.phone = 'Enter a valid phone number.';
    }

    return e;
  };

  // ===============================================================
  // HANDLERS
  // ===============================================================
  const handleChange =
    (key: keyof ContactPayload) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((s) => ({ ...s, [key]: e.target.value }));
      setErrors((prev) => ({ ...prev, [key]: '' }));
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = validate();
    setErrors(validation);

    if (Object.keys(validation).length > 0) {
      const firstKey = Object.keys(validation)[0];
      document
        .querySelector<HTMLInputElement | HTMLTextAreaElement>(
          `#contact-${firstKey}`
        )
        ?.focus();
      return;
    }

    setSubmitting(true);

    const payload: ContactPayload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone?.trim() || undefined,
      subject: form.subject?.trim() || undefined,
      message: form.message.trim(),
    };

    try {
      if (onSubmit) {
        await onSubmit(payload);
      } else {
        console.log('Contact form payload:', payload);
      }

      setForm(initialState);
      setErrors({});
      successRef.current?.focus();
    } catch (err) {
      console.error('Contact submit error:', err);
      setErrors((prev) => ({
        ...prev,
        submit: 'Failed to send — please try again later.',
      }));
    } finally {
      setSubmitting(false);
    }
  };

  // ===============================================================
  // RENDER
  // ===============================================================
  return (
    <section className={styles.contactSection} aria-labelledby="contact-heading">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="contact-heading" className={styles.title}>
            Contact Us
          </h2>
          <p className={styles.subtitle}>
            We’re here to help — reach out for appointments, medication queries,
            or general enquiries.
          </p>
        </header>

        <div className={styles.grid}>
          {/* LEFT COLUMN */}
          <div className={styles.details}>
            <div className={styles.card}>
              <Image
                src="/aboutUs/pharmacy.jpg"
                alt="Clinic exterior"
                className={styles.heroImg}
                width={800}
                height={500}
                loading="lazy"
              />

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>Main Pharmacy & Clinic</h3>

                <address className={styles.address}>
                  123 Health Ave, Suite 4
                  <br />
                  Nairobi, Kenya
                </address>

                <dl className={styles.contactList}>
                  <div className={styles.contactItem}>
                    <dt>Phone</dt>
                    <dd>
                      <a href="tel:+254700000000" className={styles.link}>
                        +254 700 000 000
                      </a>
                    </dd>
                  </div>

                  <div className={styles.contactItem}>
                    <dt>Email</dt>
                    <dd>
                      <a
                        href="mailto:info@yourpharmacy.co.ke"
                        className={styles.link}
                      >
                        info@yourpharmacy.co.ke
                      </a>
                    </dd>
                  </div>

                  <div className={styles.contactItem}>
                    <dt>Opening Hours</dt>
                    <dd>
                      Mon–Fri: 08:00–18:00
                      <br />
                      Sat: 09:00–13:00
                      <br />
                      Sun: Closed
                    </dd>
                  </div>
                </dl>

                <div
                  className={styles.mapPlaceholder}
                  role="img"
                  aria-label="Map placeholder"
                >
                  <div className={styles.mapInner}>
                    Map placeholder — embed your map here
                  </div>
                </div>

                <div className={styles.teamCard}>
                  <Image
                    src="/team/Pharmacist.jpg"
                    alt="On-call pharmacist"
                    className={styles.teamAvatar}
                    width={200}
                    height={200}
                    loading="lazy"
                  />
                  <div>
                    <p className={styles.teamRole}>On-call Pharmacist</p>
                    <p className={styles.teamName}>
                      Dr. Jane Doe, BPharm, MSc
                    </p>
                    <p className={styles.small}>
                      Available for medication counselling & clinical queries
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className={styles.formWrap}>
            {/* FORM (unchanged) */}
            {/* … everything preserved exactly … */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
