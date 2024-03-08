import React from "react";
import CustomerTable from "./CustomerTable/CustomerTable";

const Customer = () => {
  return (
    <div>
      <div style={{ color: "black" }}>
        <h4>Customer List</h4>
      </div>

      <div style={{ marginTop: "10px" }}>
        <CustomerTable />
      </div>
    </div>
  );
};

export default Customer;
