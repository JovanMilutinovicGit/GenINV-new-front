import React from "react";
import { FaTrash } from "react-icons/fa6";
import { useDeleteCustomerMutation } from "../../redux/ApiSlice/Api/Api";
import "./CustomersTable.css";
const CustomersTable = ({ data }) => {
  const [deleteCustomer] = useDeleteCustomerMutation();
  const handleDelete = (idCustomer) => {
    deleteCustomer(idCustomer); // samo broj/string
  };
  return (
    <div>
      <table className="current-table">
        <thead>
          <tr>
            <td>Naziv</td>
            <td>Fiskalni br:</td>
            <td>Mesto</td>
            <td>Akcija</td>
          </tr>
        </thead>
        <tbody>
          {data?.map((customer) => {
            return (
              <tr key={customer?.id}>
                <td>{customer?.name}</td>
                <td>{customer?.fiscal_number}</td>
                <td>{customer?.city}</td>
                <td className="action-delete">
                  <FaTrash
                    onClick={() => {
                      handleDelete(customer?.id);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default CustomersTable;
