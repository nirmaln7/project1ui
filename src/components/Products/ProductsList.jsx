import React, { useEffect, useState } from "react";
import "./ProductsList.css";
import ProductCard from "./ProductCard";
import apiClient from "../../utils/api-client";
import useData from "../../hooks/useData";
import ProductCardSkelton from "./ProductCardSkelton";
import { useSearchParams } from "react-router-dom";
import Pagination from "../Common/Pagination";

const ProductsList = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [sorted, setSorted] = useState([]);
  const [search, setSearch] = useSearchParams();
  const category = search.get("category");
  const searchQuery = search.get("search");

  // const page = search.get("page");
  const { data, error, isLoading } = useData(
    "/products",
    {
      params: {
        search: searchQuery,
        category,
        page,
        perPage: 10,
      },
    },
    [category, page, searchQuery]
  );
  useEffect(() => {
    setPage(1);
  }, [searchQuery, category]);
  // const handlePageChange = (page) => {
  //   const currentParams = Object.fromEntries([...search]);
  //   setSearch({ ...currentParams, page: parseInt(currentParams.page) + 1 });
  // };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight - 1 &&
        !isLoading &&
        data &&
        page < data.totalPages
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [data, isLoading]);

  useEffect(() => {
    if (data && data.products) {
      const products = [...data.products];

      if (sortBy === "price desc") {
        setSorted(products.sort((a, b) => b.price - a.price));
      } else if (sortBy === "price asc") {
        setSorted(products.sort((a, b) => a.price - b.price));
      }
      if (sortBy === "rate desc") {
        setSorted(products.sort((a, b) => b.reviews.rate - a.reviews.rate));
      } else if (sortBy === "rate asc") {
        setSorted(products.sort((a, b) => a.reviews.rate - b.reviews.rate));
      } else {
        setSorted(products);
      }
    }
  }, [sortBy, data]);

  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <section className="products_list_section">
      <header className="align_center products_list_header">
        <h2>Products</h2>
        <select
          name="sort"
          id=""
          className="product_sorting"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Relevance</option>
          <option value="price desc">Price HIGH to LOW</option>
          <option value="price asc">Price LOW to HIGH</option>
          <option value="rate desc">Rate HIGH to LOW</option>
          <option value="rate asc">Rate LOW to HIGH</option>
        </select>
      </header>
      <div className="products_list">
        {error && <em className="form_error">{error}</em>}
        {data?.products &&
          sorted.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        {isLoading && skeleton.map((n) => <ProductCardSkelton key={n} />)}
      </div>
      {/* {data && (
        <Pagination
          totalPosts={data.totalProducts}
          postPerPage={8}
          onClick={handlePageChange}
          currentPage={page}
        />
      )} */}
    </section>
  );
};

export default ProductsList;
