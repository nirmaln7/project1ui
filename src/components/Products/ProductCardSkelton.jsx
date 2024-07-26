import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
    
const ProductCardSkelton = () => {
  return <Skeleton className="product_card" width="275px" />;
};

export default ProductCardSkelton;
