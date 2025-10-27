import React from "react";
import { format } from "date-fns";
import { CiReceipt } from "react-icons/ci";
import "./History.css";
import { FaTrash } from "react-icons/fa6";
import { pdf } from "@react-pdf/renderer";
import InvoicePDF from "../invoice/Invoice";
import { useDeleteInvoicerMutation } from "../../redux/ApiSlice/Api/Api";
import { useLazyGetInvoiceByIdQuery } from "../../redux/ApiSlice/Api/Api";
const History = ({ data }) => {
  const [deleteInvoice] = useDeleteInvoicerMutation();

  const [triggerGetInvoiceById] = useLazyGetInvoiceByIdQuery();

  const handleDownload = async (id) => {
    try {
      // 1️⃣ Pozivamo API
      const { data: invoice } = await triggerGetInvoiceById(id);
      console.log(invoice);
      if (!invoice) {
        console.error("Nema podataka za taj ID!");
        return;
      }

      // 2️⃣ Generišemo PDF
      const blob = await pdf(<InvoicePDF invoice={invoice} />).toBlob();

      // 3️⃣ Skidamo fajl
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Racun-${invoice.invoice_number}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Greška prilikom preuzimanja PDF-a:", error);
    }
  };
  return (
    <div className="history-table">
      <table>
        <thead>
          <tr>
            <th>R.br</th>
            <th>Kupac</th>
            <th>Datum</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((invoice) => {
            return (
              <tr key={invoice?.id}>
                <td>{invoice?.id}</td>
                <td>{invoice?.customer_name}</td>
                <td>{format(new Date(invoice?.issue_date), "dd-MM-yyyy")}</td>
                <td className="history-actions">
                  <CiReceipt
                    size={25}
                    onClick={() => handleDownload(invoice.id)}
                  />
                  <FaTrash
                    size={23}
                    onClick={() => {
                      deleteInvoice(invoice?.id);
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

export default History;
