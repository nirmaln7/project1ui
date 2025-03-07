import React from "react";
import MaterialTable from "../Common/MaterialTable";
import useData from "../../hooks/useData";
import AddProduct from "./AddProduct";

const ProductHome = ({ dataModel, catList }) => {
  const headers = ["Name", "Price", "Stock"];

  const prodList = dataModel.products.map((x) => {
    return { Name: x.title, Stock: x.stock, Price: x.price };
  });

  const categories = catList.map((x) => {
    return { Name: x.name, id: x._id };
  });

  return (
    <>
      <AddProduct categories={categories} />
      <MaterialTable headers={headers} data={prodList}></MaterialTable>
    </>
  );
};

export default ProductHome;
