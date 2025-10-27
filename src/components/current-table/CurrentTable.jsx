import React, { useEffect } from "react";
import "./CurrentTable.css";
import { useSelector } from "react-redux";
import { selectInvoiceItems } from "../../redux/ApiSlice/InvoiceSlice/InoviceSlice";
import { FaTrash } from "react-icons/fa6";
import { removeItem } from "../../redux/ApiSlice/InvoiceSlice/InoviceSlice";
import { useDispatch } from "react-redux";

const CurrentTable = ({ setTotal }) => {
  const allItems = useSelector(selectInvoiceItems);
  console.log(allItems);
  const dispatch = useDispatch();
  const round2 = (num) => Number(num).toFixed(2);
  const totalAmount =
    allItems?.items?.reduce((sum, item) => sum + Number(item.total), 0) || 0;
  useEffect(() => {
    setTotal(totalAmount);
  }, [allItems]);
  return (
    <div className="current-table">
      <table>
        <thead>
          <tr>
            <th>R. br:</th>
            <th>Artikal:</th>
            <th>J. mere:</th>
            <th>Kol:</th>
            <th>Cena:</th>
            <th>U:</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {allItems?.items?.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.article_name}</td>
              <td>{item.unit}</td>
              <td>{item.quantity}</td>
              <td>{round2(item.price)}</td>
              <td>{round2(item.total)}</td>
              <td
                className="actions"
                onClick={() => {
                  dispatch(
                    removeItem({
                      article_name: item.article_name,
                      unit: item.unit,
                    })
                  );
                }}
              >
                <FaTrash />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrentTable;
