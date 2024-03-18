import React, { useEffect, useState } from 'react';
import { getOrders } from '../../../services/Order';
import { Button, Input, Modal, Space, Table, Tag } from 'antd';
import OrderDetails from './Modals/OrderDetails';
import { searchData, sortByCreatedAtDescending } from '../../../util/helper';

const modalStyles = {
  width: '60% !important', // Default width for larger screens
  '@media screen and (max-width: 768px)': {
    width: '95%', // For screens smaller than or equal to 768px
  },
};

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [copyOrders, setCopyOrders] = useState([]);

  const [orderDetails, setOrderDetails] = useState({
    isOpen: false,
    data: null,
  });
  const [sortParameters, setSortParameters] = useState({
    orderId: '',
  });

  const handleOpenDetailView = (data) => {
    setOrderDetails({
      isOpen: true,
      data: data,
    });
  };

  const handleCloseDetailView = () => {
    setOrderDetails({
      isOpen: false,
      data: null,
    });
  };

  useEffect(() => {
    async function fetch() {
      const { data: orderData } = await getOrders();
      setOrders(sortByCreatedAtDescending(orderData));
      setCopyOrders(sortByCreatedAtDescending(orderData));
    }

    fetch();
  }, []);

  useEffect(() => {
    const filtered = searchData(sortParameters, copyOrders);
    setOrders(filtered);
  }, [sortParameters]);

  const OrderTableColumns = [
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (dateStr) => <p>{new Date(dateStr).toUTCString()}</p>,
    },
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Customer Name',
      dataIndex: 'Customer Name',
      key: 'userId',
      render: (text, record) => (
        <p>{record.userId.fullName || record.userId.firstName}</p>
      ),
    },
    {
      title: 'TAG',
      dataIndex: 'tag',
      key: 'tag',
      render: (text, record) => {
        let type = '';
        for (const product of record.products) {
          type = product.productType;
          break;
        }
        return <p>{type}</p>;
      },
    },
    {
      title: 'Payment Status',
      dataIndex: 'Payment Status',
      key: 'isPaymentSuccess',
      render: (text, record) => (
        <Tag color={record?.isPaymentSuccess ? '#87d068' : '#f50'} style={{fontSize: '16px', padding: '2px'}}>
          {record?.isPaymentSuccess ? 'Payment Success' : 'Abandoned checkouts'}
        </Tag>
      ),
    },
    {
      title: 'Grand Total',
      dataIndex: 'grandTotal',
      key: 'grandTotal',
    },
    {
      title: 'Redeem Code Status',
      dataIndex: 'Redeem Code Status',
      key: 'isRedeemCodeShared',
      render: (text, record) => (
        <p>{record?.isRedeemCodeShared ? 'Shared' : '-'}</p>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleOpenDetailView(record)}>
            View
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ color: 'black' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '20px',
          }}
        >
          <h4>Orders</h4>
          <div style={{ marginLeft: '30px' }}>
            <label style={{ fontWeight: 'bold' }}>Search orders</label> <br />
            <Input
              placeholder="Enter order Id"
              value={sortParameters?.orderId || ''}
              onChange={(e) =>
                setSortParameters((prev) => ({
                  ...prev,
                  orderId: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <Table
          columns={OrderTableColumns}
          dataSource={orders || []}
          pagination={{ defaultPageSize: 5 }}
        />
      </div>

      <Modal
        open={orderDetails.isOpen && orderDetails.data !== null}
        onCancel={handleCloseDetailView}
        onOk={handleCloseDetailView}
        title={'Order Details'}
        okText={'Ok'}
        style={modalStyles}
      >
        <OrderDetails OrderData={orderDetails.data} />
      </Modal>
    </div>
  );
};

export default Order;
