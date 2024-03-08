import { Input, Button, Modal, Space, Table } from 'antd';
import React, { useRef, useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import AddBinanceModal from './Modals/AddBinanceModal';
import {
  addBinance,
  deleteBinance,
  fetchAllBinanceGifts,
  updateBinance,
} from '../../../services/Product';
import { toast } from 'react-toastify';
import DeleteBinanceModal from './Modals/DeleteBinanceModal';
import UpdateBinanceModal from './Modals/UpdateBinanceModal';

const Binance = () => {
  const [allBinance, setAllBinance] = useState([]);

  const [openAddProductModal, setOpenAddProductModal] = useState(false);

  const [dataToWorkon, setDataToWorkOn] = useState({
    data: null,
    action: '',
    isOpen: false,
  });

  const handleCloseAddProductModal = () => {
    setOpenAddProductModal(false);
  };

  // For Delete and Edit (Modal)
  const handleCloseModal = () => {
    setDataToWorkOn({ data: null, action: '', isOpen: false });
  };

  const handleOpenAddProductModal = () => {
    setOpenAddProductModal(true);
  };

  const deleteProductModal = (data) => {
    setDataToWorkOn({ data: data, action: 'delete', isOpen: true });
  };

  const handleDeleteProduct = async () => {
    const { success, message } = await deleteBinance(dataToWorkon.data);
    if (success) {
      toast.success(message);
      handleCloseModal();
    } else {
      toast.success(message);
      handleCloseModal();
    }
  };

  const editProductModal = (data) => {
    setDataToWorkOn({ data: data, action: 'edit', isOpen: true });
  };

  const [binanceToAdd, setBinanceToAdd] = useState(null);
  const handleAddProduct = async () => {
    if (binanceToAdd) {
      const { success, message } = await addBinance(binanceToAdd);
      if (success) {
        toast.success(message);
        setOpenAddProductModal();
      } else {
        toast.error(message);
        setOpenAddProductModal();
      }
    }
  };

  const [binanceToUpdate, setBinanceToUpdate] = useState(null);
  const handleProductUpdate = async () => {
    if (binanceToUpdate) {
      const { __v, ...data } = binanceToUpdate;
      const { success, message } = await updateBinance(data);
      if (success) {
        toast.success(message);
        handleCloseModal();
      } else {
        toast.error(message);
        handleCloseModal();
      }
    }
  };

  useEffect(() => {
    async function fetch() {
      const binance = await fetchAllBinanceGifts();
      setAllBinance(binance?.data?.data);
    }

    fetch();
  }, [dataToWorkon?.isOpen, openAddProductModal]);

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
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
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
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            onClick={() => {
              clearFilters && handleReset(clearFilters);
            }}
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
              close();
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
    onFilter: (value, record) => {
      if (Array.isArray(record[dataIndex])) {
        return record[dataIndex].some((item) => {
          return (
            item['code']
              ?.toString()
              .toLowerCase()
              .includes(value.toLowerCase()) ||
            item['referenceNo']
              ?.toString()
              .toLowerCase()
              .includes(value.toLowerCase())
          );
        });
      } else {
        return record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      }
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const BinanceTableColumn = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      ...getColumnSearchProps('title'),
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Product Type',
      dataIndex: 'productTag',
      key: 'productTag',
    },
    {
      title: 'Type',
      dataIndex: 'priceInSAR',
      key: 'priceInSAR',
    },
    {
      title: 'Base Token Amt',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Type',
      dataIndex: 'isDualToken',
      key: 'isDualToken',
      render: (value) => {
        if (value == 'true') {
          return 'Dual';
        } else {
          return 'Single';
        }
      },
    },
    {
      title: 'Base Token',
      dataIndex: 'baseToken',
      key: 'baseToken',
    },
    {
      title: 'Face Token',
      dataIndex: 'faceToken',
      key: 'faceToken',
      render: (value) => {
        if (value == 'undefined') {
          return '';
        }
      },
    },
    {
      title: 'Min Qty',
      dataIndex: 'minQty',
      key: 'minQty',
    },
    {
      title: 'Gift Cards(ReferenceNo/RedeemCode)',
      dataIndex: 'giftCards',
      key: 'giftCards',
      ...getColumnSearchProps('giftCards'),
      render: (cards, record) => {
        if (cards && cards.length > 0) {
          return (
            <ul>
              {cards.map((card) => (
                <li key={card.code}>
                  {record.minQty == 0
                    ? card.referenceNo
                    : `${card.referenceNo} / ${card.code}`}
                </li>
              ))}
            </ul>
          );
          return cardsString;
        } else {
          return '';
        }
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => editProductModal(record)}>Update</a>
          <a onClick={() => deleteProductModal(record._id, record.key)}>
            Delete
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        htmlType="submit"
        onClick={handleOpenAddProductModal}
        className="categoryBtn"
      >
        Add Binance
      </Button>

      <Table
        columns={BinanceTableColumn}
        dataSource={allBinance}
        pagination={{ defaultPageSize: 5 }}
      />

      <Modal
        open={openAddProductModal}
        onCancel={handleCloseAddProductModal}
        onOk={() => handleAddProduct()}
        title={'Add binance'}
        okText={'Add'}
      >
        <AddBinanceModal setBinanceToAdd={setBinanceToAdd} />
      </Modal>

      <Modal
        open={dataToWorkon.isOpen && dataToWorkon.action === 'edit'}
        onCancel={handleCloseModal}
        onOk={() => handleProductUpdate()}
        title={'Update Product'}
        okText={'Update'}
      >
        <UpdateBinanceModal
          data={dataToWorkon.data}
          setBinanceToUpdate={setBinanceToUpdate}
        />
      </Modal>

      <Modal
        open={dataToWorkon.isOpen && dataToWorkon.action === 'delete'}
        onCancel={handleCloseModal}
        onOk={() => handleDeleteProduct()}
        title={'Delete Confirmation'}
        okText={'Delete'}
      >
        {dataToWorkon.action === 'delete' ? (
          <DeleteBinanceModal productId={dataToWorkon.data} />
        ) : null}
      </Modal>
    </div>
  );
};

export default Binance;
