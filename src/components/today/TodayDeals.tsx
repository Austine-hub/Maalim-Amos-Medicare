//src/components/today/TodayDeals

"use client";

import React, { useMemo, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { ShoppingCart, Check } from "lucide-react";

import { useCart } from "@/context/CartContext";
import { getAllDealsInKSH } from "@/data/details/today";

import styles from "./TodayDeals.module.css";

/* ------------------------- Helpers ------------------------- */
const renderStars = (rating = 4) => {
  const filled = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;
  const empty = 5 - Math.ceil(rating);

  return (
    <>
      {Array.from({ length: filled }, (_, i) => (
        <span key={`f${i}`} className={styles.starFilled}>★</span>
      ))}
      {hasHalf && <span className={styles.starHalf}>★</span>}
      {Array.from({ length: empty }, (_, i) => (
        <span key={`e${i}`} className={styles.starEmpty}>★</span>
      ))}
    </>
  );
};

/* ------------------------- Component ------------------------- */
const TodayDeals: React.FC = () => {
  const { addToCart, items } = useCart();

  const deals = useMemo(() => getAllDealsInKSH(), []);

  const isInCart = useCallback(
    (id: string) => items.some(item => item.id === id),
    [items]
  );

  const handleAddToCart = useCallback(
    (deal: (typeof deals)[number], e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (isInCart(deal.id)) return;

      addToCart({
        id: deal.id,
        name: deal.name,
        price: deal.priceKSH,
        quantity: 1,
        image: deal.img,
        originalPrice: deal.mrpKSH,
        discount: deal.discount,
        category: "Deals",
      });

      toast.success(`${deal.name} added to cart`, {
        duration: 3000,
        icon: <ShoppingCart size={26} />,
        position: "top-center",
        style: {
          background: "#07af0f",
          color: "#fff",
          fontWeight: "500",
        },
      });
    },
    [addToCart, isInCart]
  );

  if (!deals.length) return null;

  return (
    <section className={styles.dealsSection}>
      <div className={styles.sectionHeader}>
        <h1 className={styles.mainTitle}>Today's Featured Offers</h1>
        <p className={styles.mainSubtitle}>
          Premium medical and wellness products at exceptional prices
        </p>
      </div>

      <div className={styles.cardsContainer}>
        {deals.map((deal) => {
          const added = isInCart(deal.id);

          return (
            <article key={deal.id} className={styles.card}>
              <div className={styles.badge}>Limited Time</div>

              <div className={styles.imageWrapper}>
                <img
                  src={deal.img}
                  alt={deal.name}
                  className={styles.productImage}
                  loading="lazy"
                />
              </div>

              <div className={styles.productContent}>
                <div className={styles.ratingContainer}>
                  <div className={styles.stars}>{renderStars(4)}</div>
                  <span className={styles.reviewCount}>(4.0)</span>
                </div>

                <h3 className={styles.productName}>{deal.name}</h3>

                <div className={styles.priceContainer}>
                  <span className={styles.price}>
                    {deal.priceFormattedKSH}
                  </span>
                  <span className={styles.priceLabel}>Special Price</span>
                </div>

                <div className={styles.buttonGroup}>
                  <Link
                    href={`/today/${deal.slug}`}
                    className={styles.viewButton}
                    aria-label={`View details for ${deal.name}`}
                  >
                    View Details
                  </Link>

                  {/* Action Button */}
                  <div className={styles.actions}>
                    <motion.button
                      type="button"
                      className={`${styles.cartBtn} ${
                        added ? styles.cartBtnAdded : ""
                      }`}
                      onClick={(e) => handleAddToCart(deal, e)}
                      disabled={added}
                      aria-disabled={added}
                      aria-label={
                        added
                          ? `${deal.name} already in cart`
                          : `Add ${deal.name} to cart`
                      }
                      whileTap={!added ? { scale: 0.95 } : undefined}
                    >
                      {added ? (
                        <>
                          <span>Added</span>
                          <Check size={18} className={styles.btnIcon} />
                        </>
                      ) : (
                        <>
                          <span>Add to</span>
                          <ShoppingCart size={18} className={styles.btnIcon} />
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <aside className={styles.cashbackBanner}>
        <div className={styles.cashbackIcon}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
        </div>

        <div className={styles.cashbackContent}>
          <h4 className={styles.cashbackTitle}>Earn 5% Cashback</h4>
          <p className={styles.cashbackDescription}>
            Get instant cashback on all purchases at <strong>Bumedi.com</strong>.
          </p>
        </div>

        <button className={styles.discoverButton} type="button">
          Learn More
        </button>
      </aside>
    </section>
  );
};

export default TodayDeals;
