import { Button, Space, Table, Modal, Select, InputNumber, Tag } from "antd";
import { Form, Input } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import '../../css/table.css'
const { Option } = Select;

import { useRef, useEffect, useState } from "react";
import {
  createUsers,
  deleteUsers,
  getUsers,
  updateUsers,
} from "../../services/Users";
import { toast } from "react-toastify";
import FormItem from "antd/es/form/FormItem";
import { country, userRoleBase, userRoleSelect } from "../../util/constant";
import { handleStateChange, searchData } from "../../util/helper"

export const Users = () => {

  const [usersList, setUsersList] = useState([]);
  const [copyUserList, setCopyUserList] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [editUserData, setEditUserData] = useState({});

  const [userType, setUserType] = useState("");
  const [userAccess, setUserAccess] = useState([]);

  const [mobileNo, setMobileNo] = useState({
    prefix: "",
    number: "",
  });

  const [sortParameters, setSortParameters] = useState({
    email: "",
    firstName: "",
    role: "all",
  });

  useEffect(() => {
    const filtered = searchData(sortParameters, copyUserList);
    setUsersList(filtered);
  }, [sortParameters]);

  useEffect(() => {
    setEditUserData((prev) => ({
      ...prev,
      role: userType,
      userAccess: userAccess,
    }));
  }, [userType, userAccess]);

  useEffect(() => {
    async function getUserApiCall() {
      let { success, message, data } = await getUsers();
      if (success) {
        setUsersList(data);
        setCopyUserList(data);
      } else {
        toast.error(message);
      }
    }

    getUserApiCall();
  }, [isModalOpen, isUpdateModalOpen]);

  // const numberPrefixSelector = (
  //   <Form.Item name="prefix" noStyle>
  //     <Select
  //       placeholder="+966"
  //       defaultValue="+966 "
  //       type="text"
  //       style={{
  //         width: 70,
  //       }}
  //     />
  //     {country.map((cont) => (
  //         <Option value={cont.dial_code}>{cont.dial_code}</Option>
  //       ))}

  //     <Option value="+86">+86</Option>
  //       <Option value="+87">+87</Option>
  //       <Option value="+91">+91</Option>
  //     </Select>
  //   </Form.Item>
  // );

  const onFinish = async (values) => {
    let { success, message, data } = await createUsers({
      ...values,
      role: userType,
      phoneNumber: `${mobileNo.prefix} ${mobileNo.number}`,
      userAccess: userAccess,
    });
    if (success) {
      let res = { ...data, key: usersList.length + 1 };
      toast.success(message);
      // setUsersList((prev) => [...prev, res]);
      setIsModalOpen(false);
    } else {
      toast.error(message);
    }
  };

  const onUpdateFinish = async () => {
    let { success, message, data } = await updateUsers(editUserData);
    if (success) {
      let res = { ...data, key: usersList.length + 1 };
      toast.success(message);
      // setUsersList((prev) => [...prev, res]);
      setIsUpdateModalOpen(false);
    } else {
      toast.error(message);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleUpdateCancel = () => {
    setIsUpdateModalOpen(false);
  };

  const askToRemoveUser = async (id, index) => {
    if (confirm("Are you sure you want to remove this user?")) {
      const { success, message } = await deleteUsers(id);
      if (success) {
        let remainingUser = usersList.filter((user) => user._id !== id);
        setUsersList(remainingUser);
      } else {
        toast.error(message);
      }
    }
  };

  const editUser = async (value) => {
    setEditUserData(() => ({ ...value }));
    setUserAccess(value?.userAccess);
    setUserType(value?.role);
    setIsUpdateModalOpen(true);
  };

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

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      ...getColumnSearchProps('firstName'),
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    //       render: (_, { role }) => (
    //   <>
    //     {role.map((role) => {
    //       let color = role==='admin' ? 'geekblue' : 'green';
    //       if (role === 'loser') {
    //         color = 'volcano';
    //       }
    //       return (
    //         <Tag color={color} key={role}>
    //           {role.toUpperCase()}
    //         </Tag>
    //       );
    //     })}
    //   </>
      // ),
         render: (role) => <span style={{ color: role =='admin'? '#EB00FF': '#018AA9', backgroundColor: role == 'admin' ? '#F7EAFF' : '#E2F9FF',  padding: '7px 15px', borderRadius:'6px', width: '75px', display: 'inline-flex', justifyContent: 'center'}}>{role}</span>
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps('email'),
    },
    {
      title: "PhoneNumber",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Nationality",
      dataIndex: "nationality",
      key: "nationality",
    },
    {
      title: "DateOfBirth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
    },
    {
      title: "Status Or Residence Number",
      dataIndex: "statusOrResidenceNumber",
      key: "statusOrResidenceNumber",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => editUser(record)}>Update</a>
          <a onClick={() => askToRemoveUser(record._id, record.key)}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Modal
        title="Create Users"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <Form name="Create User" onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[
              {
                required: true,
                message: "Please input your Full Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label="Phone Number" name="phoneNumber">
            {/* <InputNumber
              addonBefore={numberPrefixSelector}
              style={{
                width: "100%",
              }}
              maxLength={11}
            /> */}

            <Space.Compact>
              <Input
                style={{
                  width: "20%",
                  WebkitAppearance:
                    "none" /* For WebKit browsers like Chrome and Safari */,
                  MozAppearance: "textfield" /* For Firefox */,
                  appearance: "textfield" /* For other modern browsers */,
                }}
                defaultValue="966"
                type="number"
                onChange={(e) =>
                  setMobileNo((prev) => ({ ...prev, prefix: e.target.value }))
                }
              />
              <Input
                style={{
                  width: "80%",
                }}
                type="number"
                defaultValue="9998988"
                onChange={(e) =>
                  setMobileNo((prev) => ({ ...prev, number: e.target.value }))
                }
              />
            </Space.Compact>
          </Form.Item>

          <Form.Item
            label="Status Or Residence Number"
            name="statusOrResidenceNumber"
          >
            <InputNumber style={{ width: "50%" }} />
          </Form.Item>

          <Form.Item label="User Role">
            <Select
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="user Role"
              name="role"
              onChange={(value) => setUserType(value)}
              options={userRoleSelect}
            />
          </Form.Item>

          {userType && (
            <Form.Item label="User Access control">
              <Select
                mode="multiple"
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="user Role"
                name="access"
                onChange={(value) => setUserAccess(value)}
                options={userRoleBase}
              />
            </Form.Item>
          )}

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Update Users"
        open={isUpdateModalOpen}
        onCancel={handleUpdateCancel}
        footer={false}
      >
        <Form
          name="Create User"
          onFinish={onUpdateFinish}
          autoComplete="off"
          initialValues={editUserData}
        >
          <div style={{ marginBottom: "10px" }}>
            <label>Full Name</label>
            <Input
              value={editUserData?.fullName || ""}
              name="fullName"
              onChange={(e) => handleStateChange(e, setEditUserData)}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Email</label>
            <Input
              value={editUserData?.email || ""}
              name="email"
              onChange={(e) => handleStateChange(e, setEditUserData)}
              type="email"
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Phone Number</label>
            <Input
              value={editUserData?.phoneNumber || ""}
              name="phoneNumber"
              onChange={(e) => handleStateChange(e, setEditUserData)}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Status Or Residence Number</label>
            <Input
              value={editUserData?.statusOrResidenceNumber || ""}
              name="statusOrResidenceNumber"
              onChange={(e) => handleStateChange(e, setEditUserData)}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Role</label>
            <Select
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="user Role"
              name="role"
              defaultValue={userType}
              onChange={(value) => setUserType(value)}
              options={userRoleSelect}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Role</label>
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              defaultValue={userAccess}
              placeholder="user Access"
              name="access"
              onChange={(value) => setUserAccess(value)}
              options={userRoleBase}
            />
          </div>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <h4 style={{ color: "black" }}>Users</h4>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Button
          type="primary"
          style={{ marginTop: "18px" }}
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          Add User
        </Button>

        <Button
          type="primary"
          style={{ marginLeft: "20px", marginTop: "18px" }}
          onClick={() => {
            sortParameters.role === "user"
              ? setSortParameters((prev) => ({ ...prev, role: "admin" }))
              : setSortParameters((prev) => ({ ...prev, role: "user" }));
          }}
        >
          {sortParameters.role === "user" ? "Show Admins" : "All user"}
        </Button>
       
      </div>
      <Table
        columns={columns}
        dataSource={usersList}
        pagination={{ defaultPageSize: 10 }}
      />
    </>
  );
};
