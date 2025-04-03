import { Product } from "../../../types/types";
import "./style.scss";
const ProductItem = ({ product }: { product: Product }) => {
  const productPrice = (
    product.price *
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  const isLowStock = product.availabilityStatus.toLowerCase().includes("low");

  return (
    <div className="product">
      <img
        src={product?.images[0]}
        alt=""
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
          <span className="product__brand">{product.brand}</span>
          <span className="product__category">#{product.category}</span>
          <span className="product__rating">
            &#11088;{product.rating.toFixed(1)}/5
          </span>
          <span className="product-item__min-order">
            Min. Order: {product.minimumOrderQuantity}
          </span>
        </div>
        <p className="product__description">{product?.description}</p>
      </div>
      <div className="product__review__container">
        {product?.reviews?.map((review, index) => {
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
                <span className="product__review__date">{reviewDate}</span>
              </div>
              <p className="product__review__comment">{review.comment}</p>
              <div className="product__review__footer">
                <span>{review.reviewerName}</span>
                <span>{review.reviewerEmail}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductItem;
