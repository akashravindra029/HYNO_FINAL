import React from 'react';
import './LoadingSkeleton.css';

const Skeleton = ({ width, height, borderRadius = '4px', className = '' }) => {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        width,
        height,
        borderRadius,
      }}
    />
  );
};

const ProductCardSkeleton = () => {
  return (
    <div className="product-card-skeleton">
      <Skeleton height="200px" borderRadius="8px" className="product-image-skeleton" />
      <div className="product-info-skeleton">
        <Skeleton width="80%" height="20px" className="title-skeleton" />
        <Skeleton width="60%" height="16px" className="rating-skeleton" />
        <Skeleton width="40%" height="18px" className="price-skeleton" />
        <Skeleton width="50%" height="16px" className="category-skeleton" />
        <Skeleton width="100%" height="40px" borderRadius="6px" className="button-skeleton" />
      </div>
    </div>
  );
};

const ProductsGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="products-grid-skeleton">
      {Array.from({ length: count }, (_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

const CartItemSkeleton = () => {
  return (
    <div className="cart-item-skeleton">
      <Skeleton width="80px" height="80px" borderRadius="8px" className="cart-image-skeleton" />
      <div className="cart-info-skeleton">
        <Skeleton width="70%" height="18px" className="cart-title-skeleton" />
        <Skeleton width="50%" height="16px" className="cart-price-skeleton" />
        <div className="cart-controls-skeleton">
          <Skeleton width="30px" height="30px" borderRadius="50%" />
          <Skeleton width="40px" height="20px" />
          <Skeleton width="30px" height="30px" borderRadius="50%" />
        </div>
      </div>
    </div>
  );
};

const OrderSkeleton = () => {
  return (
    <div className="order-skeleton">
      <div className="order-header-skeleton">
        <Skeleton width="150px" height="20px" />
        <Skeleton width="100px" height="16px" />
      </div>
      <div className="order-items-skeleton">
        <Skeleton width="100%" height="60px" borderRadius="8px" />
        <Skeleton width="100%" height="60px" borderRadius="8px" />
      </div>
      <div className="order-footer-skeleton">
        <Skeleton width="80px" height="18px" />
        <Skeleton width="100px" height="24px" />
      </div>
    </div>
  );
};

const LoadingSpinner = ({ size = 'medium', color = 'primary' }) => {
  const sizeMap = {
    small: '20px',
    medium: '40px',
    large: '60px',
  };

  return (
    <div
      className={`loading-spinner loading-spinner-${color}`}
      style={{
        width: sizeMap[size],
        height: sizeMap[size],
      }}
    >
      <div className="spinner-inner"></div>
    </div>
  );
};

const LoadingButton = ({ children, loading, ...props }) => {
  return (
    <button {...props} disabled={loading}>
      {loading ? <LoadingSpinner size="small" /> : children}
    </button>
  );
};

export {
  Skeleton,
  ProductCardSkeleton,
  ProductsGridSkeleton,
  CartItemSkeleton,
  OrderSkeleton,
  LoadingSpinner,
  LoadingButton,
};
