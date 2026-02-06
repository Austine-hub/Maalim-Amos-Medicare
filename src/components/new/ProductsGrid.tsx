// src/components/new/ProductsGrids.tsx

"use client";

import { memo, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Eye, ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { useCart } from "@/context/CartContext";
import { getAllDealsInKSH, type DealViewModel } from "@/data/details/ProductGrid";
import styles from "./ProductGrid.module.css";

/* -------------------------------------------------------------------------- */
/* Deal Card Component                                                        */
/* -------------------------------------------------------------------------- */

interface DealCardProps {
  deal: DealViewModel;
  isAdded: boolean;
  onAddToCart: (deal: DealViewModel) => void;
}

const DealCard = memo(function DealCard({
  deal,
  isAdded,
  onAddToCart,
}: DealCardProps) {
  if (!deal || typeof deal.priceKSH !== "number") return null;

  const {
    isActive: inStock,
    discount,
    slug,
    img,
    name,
    mrpFormattedKSH,
    priceFormattedKSH,
    savingsKSH,
  } = deal;

  const hasDiscount = discount > 0;

  const stopPropagation = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleAdd = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (!inStock || isAdded) return;
      onAddToCart(deal);
    },
    [deal, inStock, isAdded, onAddToCart]
  );

  return (
    <motion.article
      className={`${styles.card} ${!inStock ? styles.cardDisabled : ""}`}
      whileHover={inStock ? { y: -6 } : undefined}
      transition={{ duration: 0.3, ease: "easeOut" }}
      aria-label={name}
    >
      {hasDiscount && (
        <div className={styles.badge}>
          <span className={styles.badgeText}>{discount}% OFF</span>
        </div>
      )}

      <div className={styles.actions}>
        <button
          className={styles.actionBtn}
          onClick={stopPropagation}
          aria-label="Add to wishlist"
        >
          <Heart size={18} />
        </button>

        <Link
          href={`/products/${slug}`}
          className={styles.actionBtn}
          onClick={stopPropagation}
          aria-label="View details"
        >
          <Eye size={18} />
        </Link>
      </div>

      <Link
        href={`/products/${slug}`}
        className={styles.imageWrapper}
        onClick={stopPropagation}
      >
        <div className={styles.imageContainer}>
          <Image
            src={img || "/images/placeholder.png"}
            alt={name}
            fill
            className={styles.image}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
      </Link>

      <div className={styles.content}>
        <Link
          href={`/products/${slug}`}
          className={styles.nameLink}
          onClick={stopPropagation}
        >
          <h3 className={styles.name}>{name}</h3>
        </Link>

        <div className={styles.pricing}>
          {hasDiscount && <span className={styles.mrp}>{mrpFormattedKSH}</span>}
          <span className={styles.price}>{priceFormattedKSH}</span>
        </div>

        {hasDiscount && (
          <div className={styles.savings}>
            Save{" "}
            {new Intl.NumberFormat("en-KE", {
              style: "currency",
              currency: "KES",
              maximumFractionDigits: 0,
            }).format(savingsKSH)}
          </div>
        )}

        <div className={styles.buttonGroup}>
          <Link
            href={`/products/${slug}`}
            className={styles.viewBtn}
            onClick={stopPropagation}
          >
            View Details
          </Link>

          <button
            className={`${styles.cartBtn} ${
              isAdded ? styles.cartBtnAdded : ""
            }`}
            onClick={handleAdd}
            disabled={!inStock || isAdded}
            aria-label={
              isAdded
                ? `${name} already in cart`
                : inStock
                ? `Add ${name} to cart`
                : "Out of stock"
            }
          >
            {isAdded ? (
              <>
                <Check size={16} />
                <span>Added to Cart</span>
              </>
            ) : (
              <>
                <ShoppingCart size={16} />
                <span>{inStock ? "Add to Cart" : "Out of Stock"}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.article>
  );
});

/* -------------------------------------------------------------------------- */
/* Main Grid Component                                                        */
/* -------------------------------------------------------------------------- */

export default function DealsGrid() {
  const { addToCart, items } = useCart();

  const deals = useMemo(() => getAllDealsInKSH(), []);

  const isInCart = useCallback(
    (id: string) => items.some((item) => item.id === id),
    [items]
  );

  const handleAddToCart = useCallback(
    (deal: DealViewModel) => {
      if (isInCart(deal.id)) return;

      addToCart({
        id: deal.id,
        name: deal.name,
        price: deal.priceKSH,
        quantity: 1,
        image: deal.img,
        category: deal.category,
        inStock: deal.isActive,
      });

      toast.success(
        <div className={styles.toastContent}>
          <strong>{deal.name}</strong>
          <span>Added to cart successfully</span>
        </div>,
        {
          duration: 3000,
          position: "top-center",
          style: {
            background: "#07af0f",
            color: "#ffffff",
            fontWeight: 500,
          },
        }
      );
    },
    [addToCart, isInCart]
  );

  if (!deals?.length) {
    return (
      <section className={styles.section}>
        <p className={styles.emptyState}>No deals available at the moment.</p>
      </section>
    );
  }

  return (
    <section className={styles.section} aria-labelledby="deals-heading">
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h2 id="deals-heading" className={styles.title}>
            Featured Healthcare Deals
          </h2>
          <p className={styles.subtitle}>
            Quality products at exceptional prices
          </p>
        </div>

        <Link href="/more/popular" className={styles.viewAll}>
          <span>View All Deals</span>
          <ArrowRight size={20} />
        </Link>
      </header>

      <div className={styles.grid}>
        {deals.map((deal) => (
          <DealCard
            key={deal.id}
            deal={deal}
            isAdded={isInCart(deal.id)}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </section>
  );
}
