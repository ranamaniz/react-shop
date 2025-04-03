import { Link } from "react-router-dom";
import { Product } from "../../../types/types";
import "./style.scss";

const ProductListItem = ({ product }: { product: Product }) => {
  const productPrice = (
    product.price *
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  const isLowStock = product.availabilityStatus.toLowerCase().includes("low");

  return (
    <li key={product.id} className="product-item">
      <Link to={`product/${product.id}`} className="product-item__link">
        <div className="product-item__header">
          <img
            src={product?.thumbnail}
            alt={product.title}
            className="product-item__img"
            loading="lazy"
          />
          <div>
            <h3 className="product-item__title">{product.title}</h3>

            <div className="product-item__price__wrapper">
              <div>
                {product.discountPercentage && (
                  <span className="product-item__discount">
                    -{product.discountPercentage}%
                  </span>
                )}
                <span className="product-item__price">${productPrice}</span>
              </div>

              <div>
                {product.discountPercentage && (
                  <span className="product-item__mrp">
                    M.R.P.:
                    <span className="product-item__mrp__price">
                      ${product.price}
                    </span>
                  </span>
                )}
                <span
                  className={`product-item__status ${
                    isLowStock ? "product-item__status__low" : ""
                  }`}
                >
                  {product.availabilityStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="product-item__body">
          <span className="product-item__brand">{product.brand}</span>
          <span className="product-item__category">#{product.category}</span>
          <span className="product-item__rating">
            &#11088;{product.rating.toFixed(1)}/5
          </span>
          <span className="product-item__min-order">
            Min. Order: {product.minimumOrderQuantity}
          </span>
        </div>
      </Link>
    </li>
  );
};

export default ProductListItem;
