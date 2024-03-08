import React, { useRef, useEffect, useState } from "react";
import { getCustomerUser } from "../../../../services/Users";
import { Button, Space, Input, Table } from "antd";
import { searchData } from "../../../../util/helper";
import { SearchOutlined } from '@ant-design/icons';

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [copyCustomers, setCopyCustomers] = useState([]);

  const [sortParameters, setSortParameters] = useState({
    email: "",
    firstName: "",
  });

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>          
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    }    
  });

  const CustomerTableColumns = [
    {
      title: "Customer Name",
      dataIndex: "Customer Name",
      key: "firstName",
      ...getColumnSearchProps('firstName'),
      render: (text, record) => <p>{record.firstName || record.lastName}</p>,
    },
    {
      title: "Email ID",
      dataIndex: "email",
      ...getColumnSearchProps('email'),
      key: "email",
    },
    {
      title: "User type",
      dataIndex: "role",
      kay: "role",
    },
    {
      title: "Registered on",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (dateStr) => <p>{new Date(dateStr).toUTCString()}</p>,
    },
  ];

  useEffect(() => {
    const filtered = searchData(sortParameters, copyCustomers);
    setCustomers(filtered);
  }, [sortParameters]);

  useEffect(() => {
    async function fetch() {
      const { data: customerData } = await getCustomerUser();
      setCustomers(customerData);
      setCopyCustomers(customerData);
    }

    fetch();
  }, []);

  return (
    <div>      
      <Table
        columns={CustomerTableColumns}
        dataSource={customers || []}
        pagination={{ defaultPageSize: 5 }}
      />
    </div>
  );
};

export default CustomerTable;
