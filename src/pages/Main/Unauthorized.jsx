import React from "react";

const Unauthorized = () => {
  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <img
          src="/assets/Unauthorized.jpg"
          width={500}
          height={400}
          style={{ margin: "auto" }}
        />
      </div>

      <p
        style={{
          color: "black",
          fontSize: "16px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: "20px" }}>Unauthorized !</span> <br />
        Contact Super Admin for visiting permission to this page.
        <br />
        <span style={{ fontSize: "12px", color: "gray" }}>
          Re-Authenticate just in case.
        </span>
      </p>
    </>
  );
};

export default Unauthorized;
