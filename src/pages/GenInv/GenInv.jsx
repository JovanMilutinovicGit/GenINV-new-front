import { useState } from "react";
import CompanyInfo from "../../components/company-info/CompanyInfo";
import "./GenInv.css";
import Customer from "../../components/customer/Customer";
import FirstProduct from "../../components/products/FirstProduct";
import SecondProduct from "../../components/products/SecondProduct";
import CurrentTable from "../../components/current-table/CurrentTable";
import { useDispatch, useSelector } from "react-redux";
import {
  reset,
  selectInvoiceItems,
} from "../../redux/ApiSlice/InvoiceSlice/InoviceSlice";
import { useGetInvNumQuery } from "../../redux/ApiSlice/Api/Api";
import { useGetAllInvoicesQuery } from "../../redux/ApiSlice/Api/Api";
import { useCreateInvoiceMutation } from "../../redux/ApiSlice/Api/Api";
import History from "../../components/history/HistoryTable";
const GenInv = () => {
  const invoice = useSelector(selectInvoiceItems);
  const dispatch = useDispatch();
  const { data } = useGetInvNumQuery();
  const { data: dataInvoices } = useGetAllInvoicesQuery();
  const [addNewInvoice] = useCreateInvoiceMutation();
  const round2 = (num) => Number(num).toFixed(2);
  const [total, setTotal] = useState(0);
  const handleAddInvoice = () => {
    addNewInvoice(invoice);
  };
  return (
    <div className="gen-inv">
      <CompanyInfo />
      <div className="gen-inv-inputs">
        <div className="gen-inv-first">
          <div>
            <p>Račun br. {data?.invoice_number}</p>
            <p>Datum: {data?.date}</p>
          </div>
          <div>
            <button
              onClick={() => {
                handleAddInvoice();
              }}
            >
              Snimi račun
            </button>
          </div>
        </div>
        <Customer />
        <div className="products-list">
          <FirstProduct />
          <SecondProduct />
          <button
            className="reset-btn"
            onClick={() => {
              dispatch(reset());
            }}
          >
            Reset
          </button>
        </div>
        <CurrentTable setTotal={setTotal} />
        <div className="sum">
          <p>Ukupno: {round2(total)}€</p>
        </div>
      </div>
      <div className="history-section">
        <h3>Istorija računa</h3>
        <History data={dataInvoices} />
      </div>
    </div>
  );
};

export default GenInv;
