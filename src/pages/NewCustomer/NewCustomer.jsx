import { useState } from "react";
import "./NewCustomer.css";
import {
  useAddCustomerMutation,
  useGetCustomersQuery,
} from "../../redux/ApiSlice/Api/Api";
import CustomersTable from "../../components/customer-table/CustomersTable";

const NewCustomer = () => {
  const [addNewCustomer] = useAddCustomerMutation();
  const { data } = useGetCustomersQuery();
  const [customerName, setCustomerName] = useState("");
  const [customerFiscalNum, setCustomerFiscalNum] = useState("");
  const [customerCity, setCustomerCity] = useState("");

  const handleAddCustomer = (e) => {
    e.preventDefault();
    addNewCustomer({
      name: customerName,
      fiscal_number: customerFiscalNum,
      city: customerCity,
    });
    console.log({
      name: customerName,
      fiscal_number: customerFiscalNum,
      city: customerCity,
    });
  };
  console.log(data);
  return (
    <div className="new-customer">
      <form onSubmit={handleAddCustomer} className="new-customer-form">
        <input
          value={customerName}
          onChange={(e) => {
            setCustomerName(e.target.value);
          }}
          required
          placeholder="Naziv"
        />
        <input
          value={customerFiscalNum}
          type="number"
          onChange={(e) => {
            setCustomerFiscalNum(e.target.value);
          }}
          required
          placeholder="Fiskalni broj"
        />
        <input
          value={customerCity}
          onChange={(e) => {
            setCustomerCity(e.target.value);
          }}
          required
          placeholder="Mesto"
        />
        <button>Dodaj novog kupca</button>
      </form>
      <div className="table-section">
        <CustomersTable data={data} />
      </div>
    </div>
  );
};

export default NewCustomer;
