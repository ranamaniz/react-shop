import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../../api/product.api";
import { Product } from "../../../types/types";

import ProductItem from "./ProductItem";

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchProductDetails = async (id: string) => {
    try {
      setIsLoading(true);
      const data = await getProductById(Number(id));
      setProduct(data);
    } catch (error) {
      console.log("Something went wrong", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
    }
  }, [id]);

  return (
    <div style={{ padding: "20px", height: "100%" }}>
    
      {isLoading ? (
        <div>Loading...</div>
      ) : !product ? (
        <div>No data available</div>
      ) : (
        <div className="product__wrapper">
          <ProductItem product={product} key={product?.id} />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
