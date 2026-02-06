// src/components/today/Products/Grid.tsx
'use client';

import React, { memo, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import styles from './Grid.module.css';
import { getAllDealsInKSH, type DealViewModel } from '@/data/details/todayProducts';
import { useCart } from '@/context/CartContext';

const ProductGrid: React.FC = () => {
  const router = useRouter();
  const { addItem, items } = useCart(); // ⬅️ read cart state
  const products = getAllDealsInKSH();

  const isInCart = useCallback(
    (id: string) => items.some((item) => item.id === id),
    [items]
  );

  const handleViewProduct = useCallback(
    (slug: string) => router.push(`/today/products/${slug}`),
    [router]
  );

  const handleAddToCart = useCallback(
    (product: DealViewModel) => {
      if (isInCart(product.id)) return; // ⛔ logic-level protection

      addItem({
        id: product.id,
        name: product.name,
        price: product.priceKSH,
        quantity: 1,
        image: product.img,
        originalPrice: product.mrpKSH,
        discount: product.discount,
        inStock: true,
      });

      toast.success(`${product.name} added to cart`);
    },
    [addItem, isInCart]
  );

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Health & Wellness Essentials</h1>
        <p className={styles.subtitle}>
          Premium pharmaceutical products and healthcare solutions
        </p>
      </header>

      <div className={styles.grid}>
        <div className={styles.column}>
          {products.slice(0, 3).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isInCart={isInCart(product.id)}
              onView={handleViewProduct}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        <div className={styles.column}>
          <PromoCard
            title="Trusted Healthcare Solutions"
            subtitle="Quality medications and wellness products for your family's health"
            image="/products/pic5.jpg"
          />
          <PromoCard
            title="Expert Care & Support"
            subtitle="Professional guidance and pharmaceutical excellence you can rely on"
            image="/products/pic6.jpg"
          />
        </div>

        <div className={styles.column}>
          {products.slice(3, 6).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isInCart={isInCart(product.id)}
              onView={handleViewProduct}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ProductCardProps {
  readonly product: DealViewModel;
  readonly isInCart: boolean;
  readonly onView: (slug: string) => void;
  readonly onAddToCart: (product: DealViewModel) => void;
}

const ProductCard: React.FC<ProductCardProps> = memo(
  ({ product, isInCart, onView, onAddToCart }) => (
    <article className={styles.card}>
      {product.discount > 0 && (
        <span className={styles.badge}>-{product.discount}%</span>
      )}

      <div className={styles.imageBox} onClick={() => onView(product.slug)}>
        <Image
          src={product.img}
          alt={product.name}
          width={160}
          height={160}
          className={styles.image}
        />
      </div>

      <h3 className={styles.name} onClick={() => onView(product.slug)}>
        {product.name}
      </h3>

      <div className={styles.pricing}>
        <span className={styles.price}>{product.priceFormattedKSH}</span>
        {product.mrpKSH > product.priceKSH && (
          <span className={styles.originalPrice}>{product.mrpFormattedKSH}</span>
        )}
      </div>

      <div className={styles.actions}>
        <button
          className={styles.btnView}
          onClick={() => onView(product.slug)}
          aria-label="View product details"
        >
          View Details
        </button>
    <button
      className={`${styles.btnCart} ${isInCart ? styles.cartBtnAdded : ''}`}
      onClick={() => onAddToCart(product)}
      disabled={isInCart}
      aria-disabled={isInCart}
      aria-label={isInCart ? 'Already in cart' : 'Add to cart'}
    >
      {isInCart ? 'Added to Cart' : 'Add to Cart'}
    </button>

      </div>
    </article>
  )
);

ProductCard.displayName = 'ProductCard';

interface PromoCardProps {
  readonly title: string;
  readonly subtitle: string;
  readonly image: string;
}

const PromoCard: React.FC<PromoCardProps> = ({ title, subtitle, image }) => (
  <div className={styles.promo}>
    <div className={styles.promoContent}>
      <span className={styles.promoLabel}>Featured</span>
      <h2 className={styles.promoTitle}>{title}</h2>
      <p className={styles.promoText}>{subtitle}</p>
    </div>
    <div className={styles.promoImage}>
      <Image src={image} alt={title} width={200} height={220} />
    </div>
  </div>
);

export default ProductGrid;
