import React from "react";
import "./FirstProduct.css";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/ApiSlice/InvoiceSlice/InoviceSlice";

const FirstProduct = () => {
  const dispatch = useDispatch();
  const addInvoiceItem = () => {
    dispatch(
      addItem({
        article_name: "Oskar kafa",
        unit: "100g",
        quantity: 1,
        price: 1.44,
      })
    );
    console.log("sd");
  };
  return (
    <div className="first-product">
      <button
        onClick={() => {
          addInvoiceItem();
        }}
      >
        100g
      </button>
    </div>
  );
};

export default FirstProduct;
