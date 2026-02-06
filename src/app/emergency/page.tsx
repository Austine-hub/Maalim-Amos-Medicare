import React, { memo } from 'react';
import styles from './EmergencyCase.module.css';

type EmergencyType = 'emergency' | 'urgent' | 'general' | 'specialty';
type EmergencyPriority = 'critical' | 'high' | 'medium' | 'low';

interface EmergencyCaseProps {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  href: string;
  type?: EmergencyType;
  priority?: EmergencyPriority;
  className?: string;
  isExternal?: boolean;
  subtitle?: string;
  availability?: string;
  responseTime?: string;
}

const EmergencyCase: React.FC<EmergencyCaseProps> = ({
  id,
  title,
  description,
  buttonText,
  href,
  type = 'emergency',
  priority = 'high',
  className = '',
  isExternal = false,
  subtitle,
  availability = '24/7 Available',
  responseTime,
}) => {
  const titleId = `emergency-title-${id}`;
  const descId = `emergency-desc-${id}`;

  // Icon selection based on emergency type
  const renderIcon = () => {
    switch (type) {
      case 'emergency':
        return (
          <svg
            className={styles.icon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" fill="currentColor" stroke="none" />
          </svg>
        );
      case 'urgent':
        return (
          <svg
            className={styles.icon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        );
      case 'specialty':
        return (
          <svg
            className={styles.icon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        );
      default:
        return (
          <svg
            className={styles.icon}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
          </svg>
        );
    }
  };

  return (
    <article
      className={`${styles.card} ${className}`}
      aria-labelledby={titleId}
      aria-describedby={descId}
      data-type={type}
      data-priority={priority}
    >
      {/* Priority Badge */}
      {priority === 'critical' && (
        <div className={styles.priorityBadge} aria-label="Critical priority">
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            className={styles.badgeIcon}
            aria-hidden="true"
          >
            <circle cx="8" cy="8" r="8" />
          </svg>
          <span>CRITICAL</span>
        </div>
      )}

      {/* Icon */}
      <div className={styles.iconWrapper} aria-hidden="true">
        {renderIcon()}
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 id={titleId} className={styles.title}>
            {title}
          </h3>
          {subtitle && (
            <span className={styles.subtitle}>{subtitle}</span>
          )}
        </div>

        <p id={descId} className={styles.description}>
          {description}
        </p>

        {/* Metadata */}
        <div className={styles.metadata}>
          <span className={styles.metaItem}>
            <svg
              viewBox="0 0 16 16"
              className={styles.metaIcon}
              aria-hidden="true"
            >
              <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M8 4v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            {availability}
          </span>
          {responseTime && (
            <span className={styles.metaItem}>
              <svg
                viewBox="0 0 16 16"
                className={styles.metaIcon}
                aria-hidden="true"
              >
                <path
                  d="M8 2a6 6 0 100 12A6 6 0 008 2zm0 1a5 5 0 110 10A5 5 0 018 3zm-.5 2v3.5l2.5 1.5.5-.866-2-1.2V5h-1z"
                  fill="currentColor"
                />
              </svg>
              {responseTime}
            </span>
          )}
        </div>

        {/* CTA Button */}
        <a
          href={href}
          className={styles.button}
          aria-label={`${buttonText} for ${title}`}
          {...(isExternal && {
            target: '_blank',
            rel: 'noopener noreferrer',
          })}
        >
          <span className={styles.buttonText}>{buttonText}</span>

          <svg
            className={styles.arrow}
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M6 3L11 8L6 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </a>
      </div>
    </article>
  );
};

export default memo(EmergencyCase);
