import React, { useEffect, useState } from 'react';
import './OrderDetails.css';
import { Button, Input, Tag } from 'antd';
import { sendCodesForOrders } from '../../../../services/Order';
import { toast } from 'react-toastify';

const OrderDetails = ({ OrderData }) => {
  const [emailData, setEmailData] = useState(null);

  // const handleTokenChange = (id, text) => {
  //   let updatedList = emailData.map((item) => {
  //     if (item?.productId === id) {
  //       return {
  //         ...item,
  //         codeString: text,
  //       };
  //     } else return item;
  //   });

  //   setEmailData(updatedList);
  // };

  // const handleSendEmail = async () => {
  //   console.log('eamildata', emailData);
  //   const { success, message } = await sendCodesForOrders({
  //     productData: emailData,
  //     email: OrderData?.userId?.email,
  //     orderId: OrderData?._id,
  //   });
  //   if (success) {
  //     toast.success('Email sent successfully');
  //   } else {
  //     toast.error(message);
  //   }
  // };

  useEffect(() => {
    if (OrderData?.products) {
      console.log('fradsfadsfdom', OrderData, 'adfasdf');
      let orderArrayData = [];
      OrderData?.products?.map((product) => {
        let newObject = {};
        if (product?.productType == 'bitaqty') {
          newObject['productName'] =
            product?.productId?.productDetails?.nameEn || 'unknown';
          newObject['productSKU'] =
            product?.productId?.productDetails?.productID || '';
          newObject['productQty'] = product?.quantity;
          newObject['productId'] = product?.productId?._id;
          newObject['productImage'] = `${
            import.meta.env.VITE_REACT_APP_BACKEND_IMAGE_URL
          }/${product?.productId?.image}`;
          newObject['codeString'] = '';
        } else {
          newObject['productName'] = product?.productId?.title || 'unknown';
          if (
            product?.productId?.giftCards &&
            product?.productId?.giftCards.length > 0
          ) {
            newObject['productSKU'] =
              product?.productId?.giftCards[0].referenceNo || 'unknown';
          }
          newObject['productQty'] = product?.quantity;
          newObject['productId'] = product?.productId?._id;
          newObject['productImage'] = `${
            import.meta.env.VITE_REACT_APP_BACKEND_IMAGE_URL
          }/${product?.productId?.image}`;
          newObject['codeString'] = '';
        }

        orderArrayData.push(newObject);
      });

      // setEmailData(orderArrayData);
    }
  }, [OrderData]);

  return (
    <div>
      <div className="order_details_component">
        <div>
          <p className="customer_name_style">
            {OrderData?.userId?.fullName || OrderData?.userId?.firstName}
          </p>
          <p className="customer_sub_details">{OrderData?.userId?.email}</p>
          <p className="customer_sub_details">
            {OrderData?.userId?.phoneNumber}
          </p>
          <p className="customer_sub_details">
            {new Date(OrderData?.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="order_total_container">
          <p className="grand_total_heading">Grand Total</p>
          <p className="grand_total_value">{OrderData?.grandTotal} SAR</p>
          <Tag color={OrderData?.isPaymentSuccess ? '#87d068' : '#f50'}>
            {OrderData?.isPaymentSuccess ? 'Payment Success' : 'Payment Failed'}
          </Tag>
        </div>
      </div>
      <div className="product_details_component">
        <p className="product_details_heading">
          {`Purchased Products (Order Id: ${OrderData.orderId})`}
        </p>
        {/* {OrderData?.isPaymentSuccess && !OrderData?.isRedeemCodeShared ? (
          <Button type="primary" onClick={handleSendEmail}>
            Send redeem codes on email
          </Button>
        ) : !OrderData?.isPaymentSuccess ? (
          <Button type="primary" onClick={handleSendEmail}>
            Send redeem codes on email
          </Button>
        ) : OrderData?.isPaymentSuccess ? (
          <p style={{ color: 'green', fontSize: '12px', marginTop: '0px' }}>
            {'Redeem code/s already shared.'}
          </p>
        ) : null} */}

        <div className="product_list_holder">
          {OrderData?.products?.map((product) => {
            let sku = '';
            if (product?.productId?.productDetails?.productTag == 'bitaqty') {
              sku = product?.productId?.productDetails?.productID;
            } else if (
              product?.productId?.giftCards &&
              product?.productId?.giftCards.length > 0
            ) {
              sku = product?.productId?.giftCards[0].referenceNo;
            }
            return (
              <div style={{ marginBottom: '20px' }}>
                <div className="product_detail_holder">
                  <img
                    className="product_image"
                    src={
                      product?.productId?.image
                        ? `${
                            import.meta.env.VITE_REACT_APP_BACKEND_IMAGE_URL
                          }/${product?.productId?.image}`
                        : '/assets/default-gift-card.jpg'
                    }
                    alt="product"
                  />
                  <div className="product_info_container">
                    <p className="product_details_heading">
                      {product?.productId?.productDetails?.nameEn ||
                        product?.productId?.title}
                    </p>
                    <p className="qty_style">SKU: {sku}</p>
                    <p className="qty_style">
                      Price: {product?.productId?.priceInSAR} SAR
                    </p>
                  </div>
                  <div className="qty_count_container">
                    <p className="product_details_heading">
                      {product?.quantity} Qty
                    </p>
                  </div>
                  <div className="product_wise_total">
                    <p className="product_details_heading">
                      Total:{' '}
                      {product?.productId?.priceInSAR * product?.quantity}
                    </p>
                  </div>
                </div>
                {/* {OrderData?.isPaymentSuccess &&
                  !OrderData?.isRedeemCodeShared && (
                    <Input
                      placeholder="Enter Tokens"
                      onChange={(e) =>
                        handleTokenChange(
                          product?.productId?._id,
                          e.target.value
                        )
                      }
                    />
                  )} */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
