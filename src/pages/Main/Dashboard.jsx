import React, { useEffect, useState } from "react";
import "../../css/dashboard.css";
import { Button, Dropdown, Modal, Select, Space, Table, Tag } from "antd";
import { DownOutlined } from "@ant-design/icons";
import OrderDetails from "./Order/Modals/OrderDetails";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getDashboardData, getOrders } from "../../services/Order";
import { getCustomerUser } from "../../services/Users";
import { fetchAllBinanceGifts, getBitaqtyGifts } from "../../services/Product";
import Loader from "../../util/Loader";

const Dashboard = () => {
  const [orderDetails, setOrderDetails] = useState({
    isOpen: false,
    data: null,
  });
  const [productNumbers, setProductNumbers] = useState();
  const [customerNumbers, setCustomerNumbers] = useState();
  const [salesNumbers, setSalesNumbers] = useState();
  const [orderNumbers, setorderNumbers] = useState();

  const [lastOrdersData, setLastOrdersData] = useState();
  const [chartData, setChartData] = useState();
  const [selectedMonth, setSelectedMonth] = useState();
  const [isLoading, setisLoading] = useState(true);
  const [items, setItems] = useState();
  let labels

  const handleOpenDetailView = (data) => {
    setOrderDetails({
      isOpen: true,
      data: data,
    });
  };

  const months = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  // const tempData = [
  //   {
  //     "3-2024": [],
  //   },
  //   {
  //     "4-2024": [],
  //   },
  // ];

  useEffect(() => {
    async function fetch() {
      const {
        data: generalInfo,
        orders: lastOrders,
        graph: graphData,
      } = await getDashboardData();

      setorderNumbers(generalInfo.orders);
      setCustomerNumbers(generalInfo.customers);
      setProductNumbers(generalInfo.products);
      setSalesNumbers(generalInfo.sales);
      setLastOrdersData(lastOrders);
      setChartData(graphData);
      setisLoading(false);
    }

    fetch();
  }, []);

  useEffect(() => {
     const itemData = chartData?.map((key, index) => ({
        label:
          months[Object.keys(key)[0].split("-")[0]] +
          " " +
          Object.keys(key)[0].split("-")[1],
        value: String(index + 1),
      }));
      setItems(itemData);
  },[chartData])

  useEffect(() => {
    if (items) {
      const [month, year] = items[0].label.split(" ");
      const formattedMonth = Object.keys(months).find(
        (key) => months[key] === month
      );
      setSelectedMonth(formattedMonth + "-" + year);
    }
  }, [items]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      // title: {
      //   display: true,
      //   text: "Chart.js Line Chart",
      // },
    },
      scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Days of month'
          },
         ticks: {
            autoSkip: true, 
            maxTicksLimit: 10,
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Sales'
        },
      }
    }
  };

  const handleChange = (value, label) => {
    const [month, year] = label.label.split(" ");
    const formattedMonth = Object.keys(months).find(
      (key) => months[key] === month
    );
    setSelectedMonth(formattedMonth + "-" + year);
  };

  let chart;

  if (chartData && selectedMonth) {

    const selectedData = chartData.find((item) => Object.keys(item) == selectedMonth)

    labels = selectedData[selectedMonth].map((item) => Object.keys(item)[0])

    // const data = Object.values(chartData[selectedMonth]).map((value) => value);

    const data = selectedData[selectedMonth].map((item) => Object.values(item)[0]);

    let dataPoints = [];
    let totalPrice;

    data.forEach((item) => {
      totalPrice = 0;
      item.forEach((i) => {
        totalPrice += Number(i.grandTotal);
      });
      dataPoints.push(totalPrice);
    });

    chart = {
      labels,
      datasets: [
        {
          label: "Sales Data",
          data: dataPoints,
          borderColor: "#00B6DE",
          backgroundColor: "#00B6DE",
        },
      ],
    };
  }


  const modalStyles = {
    width: "60% !important",
    "@media screen and (max-width: 768px)": {
      width: "95%",
    },
  };

  const handleCloseDetailView = () => {
    setOrderDetails({
      isOpen: false,
      data: null,
    });
  };

  const OrderTableColumns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (dateStr) => <p>{new Date(dateStr).toUTCString()}</p>,
    },
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Customer Name", 
      dataIndex: "Customer Name",
      key: "userId",
      render: (text, record) => (
        <p>{record.userId.fullName || record.userId.firstName}</p>
      ),
    },
    {
      title: "TAG",
      dataIndex: "tag",
      key: "tag",
      render: (text, record) => {
        let type = "";
        for (const product of record.products) {
          type = product.productType;
          break;
        }
        return <p>{type}</p>;
      },
    },
    {
      title: "Payment Status",
      dataIndex: "Payment Status",
      key: "isPaymentSuccess",
      render: (text, record) => (
        <Tag
          color={record?.isPaymentSuccess ? "#87d068" : "#f50"}
          style={{ fontSize: "14px", padding: "2px" }}
        >
          {record?.isPaymentSuccess ? "Payment Success" : "Abandoned checkouts"}
        </Tag>
      ),
    },
    {
      title: "Grand Total",
      dataIndex: "grandTotal",
      key: "grandTotal",
    },
    {
      title: "Redeem Code Status",
      dataIndex: "Redeem Code Status",
      key: "isRedeemCodeShared",
      render: (text, record) => (
        <p>{record?.isRedeemCodeShared ? "Shared" : "-"}</p>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleOpenDetailView(record)}>
            View
          </Button>
        </Space>
      ),
    },
  ];

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <div>
        <h4>Home</h4>
      </div>
      <div className="info-divs">
        <div className="box">
          <h3>Products</h3>
          <p>{productNumbers}</p>
          <div className="icon-div product-div">
            <svg
              width="25"
              height="25"
              viewBox="0 0 30 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M30 11.3165L17.0995 18.7646C16.9606 18.8448 16.8149 18.9027 16.6667 18.9395V33.3847L29.0799 26.0385C29.6502 25.701 30 25.0876 30 24.4249V11.3165ZM0 11.1185V24.4249C0 25.0876 0.349785 25.701 0.920067 26.0385L13.3333 33.3847V18.8129C13.3031 18.7978 13.2731 18.7817 13.2434 18.7646L0 11.1185Z"
                fill="#FEC53D"
              />
              <path
                opacity="0.499209"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M29.5948 7.70142C29.4372 7.50244 29.2383 7.33426 29.0064 7.21076L15.8814 0.2201C15.3304 -0.0733665 14.6695 -0.0733665 14.1186 0.2201L0.993559 7.21076C0.814812 7.30596 0.65567 7.42771 0.519943 7.56966L14.9101 15.8778C15.0047 15.9325 15.092 15.995 15.1715 16.064C15.251 15.995 15.3382 15.9325 15.4328 15.8778L29.5948 7.70142Z"
                fill="#FEC53D"
              />
            </svg>
          </div>
        </div>
        <div className="box">
          <h3>Customers</h3>
          <p>{customerNumbers}</p>
          <div className="icon-div customer-div">
            <svg
              width="25"
              height="25"
              viewBox="0 0 32 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.587821"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.66667 5.33333C6.66667 8.27885 9.05449 10.6667 12 10.6667C14.9455 10.6667 17.3333 8.27885 17.3333 5.33333C17.3333 2.38781 14.9455 -1.14441e-05 12 -1.14441e-05C9.05449 -1.14441e-05 6.66667 2.38781 6.66667 5.33333ZM20.0001 10.6667C20.0001 12.8758 21.7909 14.6667 24.0001 14.6667C26.2092 14.6667 28.0001 12.8758 28.0001 10.6667C28.0001 8.45751 26.2092 6.66665 24.0001 6.66665C21.7909 6.66665 20.0001 8.45751 20.0001 10.6667Z"
                fill="#8280FF"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.9778 13.3333C5.68256 13.3333 0.517679 16.5687 0.000868913 22.9323C-0.0272824 23.2789 0.635617 24 0.970004 24H22.9956C23.9972 24 24.0128 23.194 23.9972 22.9333C23.6065 16.3909 18.3616 13.3333 11.9778 13.3333ZM31.2747 24H26.1334C26.1334 20.9987 25.1418 18.2291 23.4683 16.0008C28.0103 16.0504 31.719 18.3468 31.9981 23.2C32.0093 23.3955 31.9981 24 31.2747 24Z"
                fill="#8280FF"
              />
            </svg>
          </div>
        </div>
        <div className="box">
          <h3>Sales</h3>
          <p>{salesNumbers}</p>
          <div className="icon-div sales-div">
            <svg
              width="25"
              height="25"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.11111 24.8889H26.4444C27.3036 24.8889 28 25.5853 28 26.4444C28 27.3036 27.3036 28 26.4444 28H1.55556C0.696446 28 0 27.3036 0 26.4444V1.55556C0 0.696446 0.696446 0 1.55556 0C2.41467 0 3.11111 0.696446 3.11111 1.55556V24.8889Z"
                fill="#4AD991"
              />
              <path
                opacity="0.5"
                d="M8.91256 18.175C8.32498 18.8018 7.34057 18.8335 6.71382 18.246C6.08707 17.6584 6.05531 16.674 6.64289 16.0472L12.4762 9.825C13.0445 9.21885 13.9888 9.16629 14.6208 9.70562L19.2248 13.6344L25.2235 6.03613C25.7558 5.36182 26.734 5.24675 27.4083 5.77909C28.0826 6.31143 28.1977 7.28961 27.6653 7.96391L20.6653 16.8306C20.1186 17.5231 19.1059 17.6227 18.4347 17.05L13.7306 13.0358L8.91256 18.175Z"
                fill="#4AD991"
              />
            </svg>
          </div>
        </div>
        <div className="box">
          <h3>Orders</h3>
          <p>{orderNumbers}</p>
          <div className="icon-div orders-div">
            <svg
              width="25"
              height="25"
              viewBox="0 0 21 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.2941 1H3.76472C2.2703 1 1.05884 2.21146 1.05884 3.70588V21.2941C1.05884 22.7885 2.2703 24 3.76472 24H17.2941C18.7885 24 20 22.7885 20 21.2941V3.70588C20 2.21146 18.7885 1 17.2941 1Z"
                stroke="#FF7B7B"
                strokeWidth="2"
              />
              <path
                d="M6.47064 7.76476H14.5883M6.47064 13.1765H14.5883M6.47064 18.5883H11.8824"
                stroke="#E33131"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="chart-div">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {" "}
          <h4>Sales Details</h4>
          {items && (
            <Select
              defaultValue={items[0].label}
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={items}
            />
          )}
        </div>

        <div className="inner-chart-div">  {chartData && labels && <Line style={{width: '900px', height: '350px'}} options={options} data={chart} />}</div>
      </div>

      <div className="latest-orders-div">
        {" "}
        <h4>Last Orders</h4>
        <Table
          columns={OrderTableColumns}
          dataSource={lastOrdersData || []}
          pagination={{ defaultPageSize: 5 }}
        />
      </div>

      <Modal
        open={orderDetails.isOpen && orderDetails.data !== null}
        onCancel={handleCloseDetailView}
        onOk={handleCloseDetailView}
        title={"Order Details"}
        okText={"Ok"}
        style={modalStyles}
      >
        <OrderDetails OrderData={orderDetails.data} />
      </Modal>
    </div>
  );
};

export default Dashboard;
