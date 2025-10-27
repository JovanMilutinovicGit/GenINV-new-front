import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { format } from "date-fns";
// 🎨 Stilovi inspirisani izgledom sa slike

Font.register({
  family: "OpenSans",
  src: "../../../public/fonts/DejaVuSans.ttf",
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "OpenSans",
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 60,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
  section: {
    marginBottom: 10,
    alignSelf: "flex-end", // ovo gura sekciju skroz desno
    textAlign: "right",
  },
  label: {
    fontWeight: "bold",
  },
  table: {
    display: "table",
    width: "auto",
    marginTop: 30,
    border: "1 solid #000",
    borderBottom: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
    fontWeight: "bold",
  },
  cell: {
    borderRight: "1 solid #000",
    borderBottom: "1 solid #000",
    padding: 4,
    textAlign: "center",
  },
  col1: { width: "7%" }, // Red. br.
  col2: { width: "20%", textAlign: "left" }, // Naziv artikla
  col3: { width: "15%" }, // Jedinica mere
  col4: { width: "15%" }, // Količina
  col5: { width: "13%" }, // Cena
  col6: { width: "10%" }, // Rabat
  col7: { width: "20%" },
  footer: {
    marginTop: 25,
  },
  stampRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 80,
  },
  total: {
    textAlign: "right",
    marginTop: 10,
    fontSize: 12,
    fontWeight: "bold",
  },
});

// 🧾 Glavna komponenta
const InvoicePDF = ({ invoice }) => {
  if (!invoice) return null;

  const totalSum = invoice.items?.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* 🏢 Podaci o firmi */}
        <View style={styles.header}>
          <Text>Naziv firme: Slavisa Milutinovic I.B Oskar 2410</Text>
          <Text>Adresa: Žitkovac</Text>
          <Text>Fiskalni broj: 812142074</Text>
          <Text>Žiro račun: 1707-0174-0090400-22</Text>
        </View>

        {/* 📋 Podaci o kupcu */}
        <View style={styles.section}>
          <View style={{ flexDirection: "row" }}>
            <Text>Kupac:{invoice.customer_name}</Text>
          </View>
          <Text>Fiskalni broj: {invoice.fiscal_number}</Text>
          <Text>Mesto: {invoice.city}</Text>
        </View>

        <View style={{ alignItems: "center", marginTop: 10, marginBottom: 10 }}>
          <Text style={{ fontSize: 12 }}>
            Račun br: {invoice.invoice_number}
          </Text>
        </View>

        {/* 📦 Tabela artikala */}
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.cell, styles.col1]}>Red. br.</Text>
            <Text style={[styles.cell, styles.col2]}>Naziv artikla</Text>
            <Text style={[styles.cell, styles.col3]}>Jedinica mere</Text>
            <Text style={[styles.cell, styles.col4]}>Komada</Text>
            <Text style={[styles.cell, styles.col5]}>Cena (€)</Text>
            <Text style={[styles.cell, styles.col6]}>Rabat (%)</Text>
            <Text style={[styles.cell, styles.col7]}>Ukupno</Text>
          </View>

          {invoice.items?.map((item, i) => (
            <View style={styles.tableRow} key={i}>
              <Text style={[styles.cell, styles.col1]}>{i + 1}</Text>
              <Text style={[styles.cell, styles.col2]}>
                {item.article_name}
              </Text>
              <Text style={[styles.cell, styles.col3]}>{item.unit}</Text>
              <Text style={[styles.cell, styles.col4]}>{item.quantity}</Text>
              <Text style={[styles.cell, styles.col5]}>
                {item.price.toFixed(2)}
              </Text>
              <Text style={[styles.cell, styles.col6]}></Text>
              <Text style={[styles.cell, styles.col7]}>
                {(item.quantity * item.price).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.total}>Ukupno: {totalSum?.toFixed(2)} €</Text>

        {/* 🧾 Pečati i potpis */}
        <View style={styles.stampRow}>
          <View>
            <Text>Žitkovac</Text>
            <Text>
              Datum: {format(new Date(invoice?.issue_date), "dd-MM-yyyy")}
            </Text>
          </View>
          <View>
            <Text>_________________________</Text>
            <Text style={{ fontSize: 10 }}>Potpis i pečat</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
