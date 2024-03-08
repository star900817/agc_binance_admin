import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import { addProduct, deleteProduct, getCms } from "../../../../services/Cms";
import { toast } from "react-toastify";

const PartnerLogoManage = () => {
  const [partnerLogos, setPartnerLogo] = useState([]);
  const [existingPartnerLogo, setExistingPartnerLogo] = useState([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    async function fetchCMS() {
      const letPartnerLogo = await getCms("partnerLogo");
      setExistingPartnerLogo(letPartnerLogo.data);
    }

    fetchCMS();
  }, [toggle]);

  const handleDeleteLogo = async (id) => {
    const { success, message } = await deleteProduct(id);
    if (success) {
      toast.success(message);

      setToggle(!toggle);
    } else {
      setToggle(!toggle);
      toast.error(message);
    }
  };

  const handleAddLogos = async () => {
    const { success, message } = await addProduct(partnerLogos, "partnerLogo");
    if (success) {
      toast.success(message);
      setToggle(!toggle);
      setPartnerLogo([]);
    } else {
      setToggle(!toggle);
      toast.error(message);
    }
  };

  return (
    <div>
      <div style={{ color: "black" }}>
        <h4>Manage partner logo</h4>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "black",
        }}
      >
        <div style={{ width: "30%" }}>
          <Input
            type="file"
            multiple
            onChange={(e) => setPartnerLogo([...e.target.files])}
          />
          <br />
          <br />
          <Button type="primary" onClick={handleAddLogos}>
            Add Images
          </Button>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            {partnerLogos?.length
              ? partnerLogos?.map((image) => (
                  <img
                    src={URL.createObjectURL(image)}
                    height={100}
                    width={100}
                    style={{ marginBottom: "20px" }}
                  />
                ))
              : null}
          </div>
        </div>
        <div
          style={{
            width: "68%",
            borderLeft: "1px solid gray",
            padding: "10px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {existingPartnerLogo?.length
            ? existingPartnerLogo?.map((image) => (
                <div style={{ position: "relative" }}>
                  <img
                    src={`${import.meta.env.VITE_REACT_APP_BACKEND_IMAGE_URL}${
                      image?.imageURL
                    }`}
                    height={100}
                    width={100}
                  />
                  <p
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      cursor: "pointer",
                    }}
                    onClick={() => handleDeleteLogo(image?._id)}
                  >
                    X
                  </p>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default PartnerLogoManage;
