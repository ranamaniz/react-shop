import { useState } from "react";
import { Product } from "../../../types/types";
import "./style.scss";
import Barcode from "react-barcode";

const minShowReviewCount = 2;

const ProductItem = ({ product }: { product: Product }) => {
  const [showReviewsCount, setShowReviewsCount] = useState(minShowReviewCount);

  const productPrice = (
    product.price *
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  const isLowStock = product.availabilityStatus.toLowerCase().includes("low");
  const createdDate = new Date(product.meta.createdAt).toLocaleDateString();
  const updatedDate = new Date(product.meta.updatedAt).toLocaleDateString();

  return (
    <div className="product">
      <img
        src={product?.images[0]}
        alt={`${product?.title}`}
        className="product__img"
        loading="lazy"
      />

      <div className="product__body">
        <h1 className="product__title">
          {product?.title}{" "}
          <span
            className={`product__status ${
              isLowStock ? "product__status__low" : ""
            }`}
          >
            {product.availabilityStatus}
          </span>
        </h1>

        <div className="product__price__wrapper">
          <div>
            {product.discountPercentage && (
              <span className="product__discount">
                -{product.discountPercentage}%
              </span>
            )}
            <span className="product__price">${productPrice}</span>
          </div>

          <div>
            {product.discountPercentage && (
              <span className="product__mrp">
                M.R.P.:
                <span className="product__mrp__price">${product.price}</span>
              </span>
            )}
          </div>
        </div>

        <div className="product__info">
          <span className="product__brand">Brand: {product.brand}</span>
          <span className="product__category">
            Category: {product.category}
          </span>
          <span>Weight: 2kg</span>
          <span className="product__tag__wrapper">
            {product.tags.map((tag, i) => (
              <span className="product__tag" key={i}>
                #{tag}
              </span>
            ))}
          </span>
          <span>SKU: {product.sku}</span>
          <span className="product__rating">
            &#11088;{product.rating.toFixed(1)}/5
          </span>
          <span className="product__min-order">
            Min. Order: {product.minimumOrderQuantity}
          </span>
        </div>
        <div className="product__additional-info">
          <div className="product__dimensions">
            <h5 className="product__dimensions__title">Dimensions:</h5>
            <span>Height: {product?.dimensions?.height}</span>
            <span>Width: {product?.dimensions?.width}</span>
            <span>Depth: {product?.dimensions?.depth}</span>
          </div>
          <div className="product__policies">
            <span>Warranty: " {product?.warrantyInformation} "</span>
            <br />
            <span>{product?.shippingInformation}</span>
            <br />
            <span>{product?.returnPolicy}</span>
          </div>
        </div>

        <div className="product__qr-barcode">
          <img src={product?.meta?.qrCode} alt="" className="product__qr" />

          <Barcode
            value={product?.meta?.barcode}
            className="product__barcode"
          />
        </div>
      </div>
      <div className="product__description-meta">
        <p className="product__description">{product?.description}</p>
        <div className="product__meta">
          <p>Created on: {createdDate}</p>
          <p>Last updated on: {updatedDate}</p>
        </div>
      </div>
      <div className="product__review__container">
        {product?.reviews?.slice(0, showReviewsCount).map((review, index) => {
          const reviewDate = new Date(review.date).toLocaleString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div className="product__review" key={index}>
              <div className="product__review__header">
                <span className="product__review__rating">
                  &#11088;{review.rating.toFixed(1)}/5
                </span>
              </div>
              <p className="product__review__comment">"{review.comment}"</p>
              <div className="product__review__footer">
                <span className="product__review__reviewer">
                  - {review.reviewerName}
                </span>{" "}
                <span className="product__review__reviewer__email">
                  ({review.reviewerEmail})
                </span>
                <br />
                <span className="product__review__date">{reviewDate}</span>
              </div>
            </div>
          );
        })}

        {showReviewsCount < product.reviews.length && (
          <div className="product__review__showMore__wrapper">
            <button
              className="product__review__showMore"
              onClick={() =>
                setShowReviewsCount(
                  (prevCount) => prevCount + minShowReviewCount
                )
              }
            >
              Show more reviews...
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
