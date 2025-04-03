import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllProducts } from "../../../api/product.api";
import { ProductsResponse } from "../../../types/types";
import Pagination from "../../Pagination";
import ProductListItem from "./ProductListItem";
import "./style.scss";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<ProductsResponse>();
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const pageLimit = 30;

  const fetchProducts = async (page: number) => {
    try {
      setIsLoading(true);
      const skip = (page - 1) * 30;
      const data = await getAllProducts(pageLimit, skip);
      setProducts(data);
    } catch (e) {
      console.log("Something went wrong", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const handlePageChange = (page: number) => {
    if (!products) return;

    setSearchParams({ page: page.toString() });
  };

  return (
    <div className="product-list__wrapper">
      <h2 className="product-list__title">Product List</h2>

      {isLoading ? (
        <div>Loading...</div>
      ) : !products ? (
        <div>No data available....</div>
      ) : (
        <>
          <ul className="product-list">
            {products.products.length > 0 &&
              products.products.map((product) => (
                <ProductListItem key={product.id} product={product} />
              ))}
          </ul>
          {products && (
            <Pagination
              totalCount={products.total}
              pageSize={pageLimit}
              currentPage={page}
              onChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
