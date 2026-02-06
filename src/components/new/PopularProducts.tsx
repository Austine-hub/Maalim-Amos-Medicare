//src/components/products/PopularProducts.tsx

"use client";

import { memo, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Heart, Eye, ShoppingCart, Check } from "lucide-react";
import toast from "react-hot-toast";

import styles from "./PopularProducts.module.css";
import { getAllDealsInKSH } from "@/data/details/popular";
import { useCart } from "@/context/CartContext";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

interface Deal {
  id: string;
  slug: string;
  name: string;
  priceKSH: number;
  mrpKSH: number;
  img: string;
  discount: number;
}

interface CardProps extends Deal {
  isAdded: boolean;
  onView: (slug: string) => void;
  onAddToCart: (deal: Deal) => void;
}

/* -------------------------------------------------------------------------- */
/* Product Card                                                               */
/* -------------------------------------------------------------------------- */

const ProductCard = memo<CardProps>(
  ({
    id,
    slug,
    name,
    priceKSH,
    mrpKSH,
    img,
    discount,
    isAdded,
    onView,
    onAddToCart,
  }) => {
    const stop = (e: React.MouseEvent) => e.stopPropagation();

    return (
      <article
        className={styles.card}
        role="button"
        tabIndex={0}
        onClick={() => onView(slug)}
        onKeyDown={(e) => e.key === "Enter" && onView(slug)}
      >
        {discount > 0 && (
          <span className={styles.badge}>{discount}% OFF</span>
        )}

        <div className={styles.actions}>
          <button
            aria-label="Add to wishlist"
            className={styles.iconBtn}
            onClick={stop}
          >
            <Heart size={16} />
          </button>

          <button
            aria-label="View product details"
            className={styles.iconBtn}
            onClick={(e) => {
              stop(e);
              onView(slug);
            }}
          >
            <Eye size={16} />
          </button>
        </div>

        <div className={styles.imageWrapper}>
          <Image
            src={img}
            alt={name}
            width={240}
            height={240}
            loading="lazy"
            className={styles.image}
          />
        </div>

        <div className={styles.info}>
          <h3 className={styles.title}>{name}</h3>

          <div className={styles.priceRow}>
            <span className={styles.current}>KES {priceKSH}</span>
            {mrpKSH > priceKSH && (
              <span className={styles.old}>KES {mrpKSH}</span>
            )}
          </div>

          <div className={styles.ctaRow}>
            <button
              className={styles.viewBtn}
              onClick={(e) => {
                stop(e);
                onView(slug);
              }}
            >
              View
            </button>

            <button
              className={`${styles.addBtn} ${
                isAdded ? styles.addedBtn : ""
              }`}
              disabled={isAdded}
              aria-disabled={isAdded}
              aria-label={
                isAdded ? `${name} already in cart` : `Add ${name} to cart`
              }
              onClick={(e) => {
                stop(e);
                onAddToCart({ id, slug, name, priceKSH, mrpKSH, img, discount });
              }}
            >
              {isAdded ? (
                <>
                  <Check size={16} />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={16} />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </article>
    );
  }
);

ProductCard.displayName = "ProductCard";

/* -------------------------------------------------------------------------- */
/* Popular Products Section                                                   */
/* -------------------------------------------------------------------------- */

const PopularProducts = () => {
  const router = useRouter();
  const { addToCart, items } = useCart();

  const deals = useMemo(() => getAllDealsInKSH(), []);

  const isInCart = useCallback(
    (id: string) => items.some((item) => item.id === id),
    [items]
  );

  const handleView = useCallback(
    (slug: string) => router.push(`/popular/${slug}`),
    [router]
  );

  const handleAddToCart = useCallback(
    (deal: Deal) => {
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

      toast.success("Added to cart", {
        duration: 2500,
        icon: <ShoppingCart size={20} />,
        position: "top-center",
        style: {
          background: "#07af0f",
          color: "#ffffff",
          fontWeight: 500,
        },
      });
    },
    [addToCart, isInCart]
  );

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2>New Arrivals at Joyland Clinic</h2>
        <button
          className={styles.viewAll}
          onClick={() => router.push("/more/new")}
        >
          View All
        </button>
      </header>

      <div className={styles.grid}>
        {deals.map((deal) => (
          <ProductCard
            key={deal.id}
            {...deal}
            isAdded={isInCart(deal.id)}
            onView={handleView}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </section>
  );
};

export default PopularProducts;
