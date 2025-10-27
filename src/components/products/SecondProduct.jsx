import React from "react";
import "./SecondProduct.css";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/ApiSlice/InvoiceSlice/InoviceSlice";
const SecondProduct = () => {
  const dispatch = useDispatch();

  return (
    <div className="second-product">
      <button
        onClick={() => {
          dispatch(
            addItem({
              article_name: "Oskar kafa",
              unit: "200g",
              quantity: 1,
              price: 2.88,
            })
          );
        }}
      >
        200g
      </button>
    </div>
  );
};

export default SecondProduct;
