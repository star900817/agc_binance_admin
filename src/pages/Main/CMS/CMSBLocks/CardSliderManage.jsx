import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import {
  addCardSliderImages,
  deleteProduct,
  getCms,
} from "../../../../services/Cms";
import { toast } from "react-toastify";

const CardSliderManage = () => {
  const [cardSliderImage, setCardSliderImage] = useState([]);
  const [existingCardSliderImages, setExistingCardSliderImages] = useState([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    async function fetchCMS() {
      const letCardSliderImages = await getCms("cardSlider");
      setExistingCardSliderImages(letCardSliderImages.data);
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
    const { success, message } = await addCardSliderImages(
      cardSliderImage,
      "cardslider"
    );
    if (success) {
      toast.success(message);
      setToggle(!toggle);
      setCardSliderImage([]);
    } else {
      setToggle(!toggle);
      toast.error(message);
    }
  };

  return (
    <div style={{
      borderBottom: "0.4px solid #979797",
      paddingBottom: "40px"
    }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "black",
        }}
      >
        <div style={{ width: "30%" }}>
          <div style={{ color: "black" }}>
            <h4>Manage Card slider images</h4>
          </div>
          <Input
            type="file"
            multiple
            onChange={(e) => setCardSliderImage([...e.target.files])}
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
            {cardSliderImage?.length
              ? cardSliderImage?.map((image) => (
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
            width: "50%",
            height: "350px",
            border: "1px solid #BFBFBF",
            borderRadius: "12px",
          }}
        >
          <div
            style={{
              gap: "15px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              overflowY: "auto",
              height: "-webkit-fill-available",
              margin: "20px",
            }}
          >
            {" "}
            {existingCardSliderImages?.length
              ? existingCardSliderImages?.map((image) => (
                  <div style={{ position: "relative" }}>
                    <img
                      src={`${
                        import.meta.env.VITE_REACT_APP_BACKEND_IMAGE_URL
                      }${image?.imageURL}`}
                      height={130}
                      width={130}
                    />
                    <p
                      style={{
                        position: "absolute",
                        top: "5px",
                        right: "9px",
                        cursor: "pointer",
                        padding: "6px",
                        paddingBottom: "5px",
                        backgroundColor: "white",
                        borderRadius: "50px",
                        margin: 0,
                      }}
                      onClick={() => handleDeleteLogo(image?._id)}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.4 3.2H9.6C9.6 2.77565 9.43143 2.36869 9.13137 2.06863C8.83131 1.76857 8.42435 1.6 8 1.6C7.57565 1.6 7.16869 1.76857 6.86863 2.06863C6.56857 2.36869 6.4 2.77565 6.4 3.2ZM4.8 3.2C4.8 2.35131 5.13714 1.53737 5.73726 0.937258C6.33737 0.337142 7.15131 0 8 0C8.84869 0 9.66263 0.337142 10.2627 0.937258C10.8629 1.53737 11.2 2.35131 11.2 3.2H15.2C15.4122 3.2 15.6157 3.28429 15.7657 3.43431C15.9157 3.58434 16 3.78783 16 4C16 4.21217 15.9157 4.41566 15.7657 4.56569C15.6157 4.71571 15.4122 4.8 15.2 4.8H14.4944L13.7856 13.072C13.7175 13.8708 13.352 14.6149 12.7615 15.1571C12.171 15.6993 11.3985 16.0001 10.5968 16H5.4032C4.60153 16.0001 3.82902 15.6993 3.23852 15.1571C2.64802 14.6149 2.28254 13.8708 2.2144 13.072L1.5056 4.8H0.8C0.587827 4.8 0.384344 4.71571 0.234315 4.56569C0.0842854 4.41566 0 4.21217 0 4C0 3.78783 0.0842854 3.58434 0.234315 3.43431C0.384344 3.28429 0.587827 3.2 0.8 3.2H4.8ZM10.4 8C10.4 7.78783 10.3157 7.58434 10.1657 7.43431C10.0157 7.28429 9.81217 7.2 9.6 7.2C9.38783 7.2 9.18434 7.28429 9.03432 7.43431C8.88429 7.58434 8.8 7.78783 8.8 8V11.2C8.8 11.4122 8.88429 11.6157 9.03432 11.7657C9.18434 11.9157 9.38783 12 9.6 12C9.81217 12 10.0157 11.9157 10.1657 11.7657C10.3157 11.6157 10.4 11.4122 10.4 11.2V8ZM6.4 7.2C6.61217 7.2 6.81566 7.28429 6.96569 7.43431C7.11571 7.58434 7.2 7.78783 7.2 8V11.2C7.2 11.4122 7.11571 11.6157 6.96569 11.7657C6.81566 11.9157 6.61217 12 6.4 12C6.18783 12 5.98434 11.9157 5.83431 11.7657C5.68429 11.6157 5.6 11.4122 5.6 11.2V8C5.6 7.78783 5.68429 7.58434 5.83431 7.43431C5.98434 7.28429 6.18783 7.2 6.4 7.2ZM3.808 12.936C3.84208 13.3355 4.02493 13.7077 4.32035 13.9788C4.61577 14.2499 5.00223 14.4002 5.4032 14.4H10.5968C10.9975 14.3998 11.3836 14.2494 11.6786 13.9783C11.9737 13.7072 12.1563 13.3352 12.1904 12.936L12.888 4.8H3.112L3.808 12.936Z"
                          fill="#FF5555"
                        />
                      </svg>
                    </p>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSliderManage;
