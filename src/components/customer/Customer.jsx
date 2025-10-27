import React, { useState } from "react";
import { useGetCustomersQuery } from "../../redux/ApiSlice/Api/Api";
import { useDispatch } from "react-redux";
import { setCustomer } from "../../redux/ApiSlice/InvoiceSlice/InoviceSlice";
import "./Customer.css";

const Customer = () => {
  const { data } = useGetCustomersQuery();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const dispatch = useDispatch();
  const handleSelectChange = (e) => {
    const customerId = e.target.value;

    if (customerId === "") {
      // prazno polje = deselect
      setSelectedCustomer(null);
      dispatch(setCustomer(null));
    } else {
      const customer = data.find((c) => c.id === Number(customerId));
      setSelectedCustomer(customer);
      dispatch(setCustomer(customer?.id));
    }
  };

  return (
    <div className="customer">
      <select onChange={handleSelectChange} value={selectedCustomer?.id || ""}>
        <option value="">-- Izaberi kupca --</option> {/* prazno polje */}
        {data?.map((customer) => (
          <option key={customer?.id} value={customer?.id}>
            {customer?.name}
          </option>
        ))}
      </select>

      <p>Kupac: {selectedCustomer?.name || "-"}</p>
      <p>Fiskalni br: {selectedCustomer?.fiscal_number || "-"}</p>
      <p>Mesto: {selectedCustomer?.city || "-"}</p>
    </div>
  );
};

export default Customer;
