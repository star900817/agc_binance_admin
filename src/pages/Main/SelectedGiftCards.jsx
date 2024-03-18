import { useEffect, useState, useRef } from 'react';
import {
  getCategoriesAndSubcategories,
  mergeObjects,
  searchData,
  getColections,
} from '../../util/helper';
import { SearchOutlined } from '@ant-design/icons';

import { getCategories } from '../../services/categories';
import { getCollections } from '../../services/Collections';

import { Button, Input, Modal, Select, Space, Table, Dropdown } from 'antd';
import {
  addBinance,
  deleteBinance,
  addProduct,
  fetchAllBinanceGifts,
  fetchAllBitaQtyThirdParty,
  getBitaqtyGifts,
  updateBinance,
  updateproduct,
} from '../../services/Product';

import { deleteProduct as deleteBitaqty } from '../../services/Product';
import UpdateBitaqtyModal from './CombinedGiftList/Modals/UpdateProductModal';
import DeleteConformationModel from './CombinedGiftList/Modals/DeleteConformationModel';
import { toast } from 'react-toastify';
import AddBinanceModal from './Binance/Modals/AddBinanceModal';
import AddBitaqtyModal from './CombinedGiftList/Modals/AddProductModal';
import UpdateBinanceModal from './Binance/Modals/UpdateBinanceModal';

const SelectedGiftCards = () => {
  const [gifts, setGifts] = useState(null);
  const [allBinance, setAllBinance] = useState([]);
  const [allcollections, setAllcollections] = useState(null);
  const [allcategories, setAllcategories] = useState(null);
  const [selectedSubCategories, setSelectedSubCategories] = useState(null);
  const [mergedDataSource, setMergedDataSource] = useState(null);

  const [openAddBinanceModal, setOpenAddBinanceModal] = useState(false);
  const [binanceToAdd, setBinanceToAdd] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState(null);
  const [binanceToUpdate, setBinanceToUpdate] = useState(null);

  const [openAddBitaqtyModal, setOpenAddBitaqtyModal] = useState(false);

  const [mergedCopy, setMergedCopy] = useState(null);
  const searchInput = useRef(null);
  const [filteredGift, setFilteredGift] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [thirPartyOption, setThirdPartyOption] = useState(null);
  const [productToAdd, setProductToAdd] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [dataToWorkon, setDataToWorkOn] = useState({
    data: null,
    action: '',
    isOpen: false,
  });
  const [sortParameters, setSortParameters] = useState({
    category: '',
    colection: '',
    title: '',
    productID: '',
  });
  const imageUrl = import.meta.env.VITE_REACT_APP_BACKEND_IMAGE_URL;

  useEffect(() => {
    async function fetch() {
      const allCollectionsRes = await getCollections();
      const allCategoriesRes = await getCategories();
      const binanceRes = await fetchAllBinanceGifts();
      const bitaqtyRes = await getBitaqtyGifts();

      setAllcollections(getColections(allCollectionsRes.data));
      setAllcategories(getCategoriesAndSubcategories(allCategoriesRes?.data));
      setGifts(mergeObjects(bitaqtyRes.data));
      setAllBinance(binanceRes?.data?.data || []);
    }

    fetch();
  }, [dataToWorkon.isOpen, openAddBinanceModal, openAddBitaqtyModal]);

  useEffect(() => {
    if (Array.isArray(gifts) && Array.isArray(allBinance)) {
      const mergedData = [...gifts, ...allBinance];
      setMergedCopy(mergedData);
      setMergedDataSource(mergedData);
    }
  }, [gifts, allBinance]);

  const handleOpenAddBinanceModal = () => {
    setOpenAddBinanceModal(true);
  };

  const handleAddBinance = async () => {
    if (binanceToAdd) {
      const { success, message } = await addBinance(binanceToAdd);
      if (success) {
        setOpenAddBinanceModal();
        toast.success(message);
      } else {
        setOpenAddBinanceModal();
        toast.error(message);
      }
    }
  };

  const handleCloseAddBinanceModal = () => {
    setOpenAddBinanceModal(false);
  };

  const editProductModal = (data) => {
    setDataToWorkOn({
      data: data,
      action: 'edit',
      isOpen: true,
      type: 'binance',
    });
  };

  const handleBinanceUpdate = async () => {
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

  const deleteProductModal = (data) => {
    setDataToWorkOn({
      data: data,
      action: 'delete',
      isOpen: true,
      type: 'binance',
    });
  };

  const handleDeleteBinance = async () => {
    const { success, message } = await deleteBinance(dataToWorkon.data);
    if (success) {
      toast.success('Product deleted successfully');
      // toast.success(message);
      handleCloseModal();
    } else {
      toast.error(message);
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setDataToWorkOn({ data: null, action: '', isOpen: false, type: '' });
  };

  const handleOpenAddBitaqtyModal = () => {
    setOpenAddBitaqtyModal(true);
  };
  const handleAddBitaqty = async () => {
    if (productToAdd) {
      console.log(productToAdd);
      const { success, message } = await addBinance(productToAdd);
      if (success) {
        setOpenAddBitaqtyModal();
        toast.success('Bitaqty Card added successfully');
      } else {
        setOpenAddBitaqtyModal();
        toast.error(message);
      }
    }
  };
  const handleCloseAddBitaqtyModal = () => {
    setOpenAddBitaqtyModal(false);
  };
  const handleBitaqtyUpdate = async () => {
    if (updatedProduct) {
      const { success, message } = await updateproduct(updatedProduct);
      if (success) {
        toast.success(message);
        handleCloseModal();
      } else {
        toast.error(message);
        handleCloseModal();
      }
    }
  };
  const handleDeleteBitaqty = async () => {
    const { success, message } = await deleteBitaqty(dataToWorkon.data);
    if (success) {
      toast.success('Bitaqty Card deleted successfully');
      handleCloseModal();
    } else {
      toast.error(message);
      handleCloseModal();
    }
  };

  const items = [
    {
      key: '1',
      label: <a onClick={handleOpenAddBinanceModal}>Add Binance</a>,
    },
    {
      key: '2',
      label: <a onClick={handleOpenAddBitaqtyModal}>Add Bitaqty</a>,
    },
  ];

  useEffect(() => {
    const filtered = searchData(sortParameters, mergedCopy);
    setMergedDataSource(filtered);
  }, [sortParameters]);

  const PlatformProuctTableColumns = [
    {
      title: 'Card Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <a>{`${record.nameEn || ''} ${record.title || ''}`}</a>
      ),
    },
    {
      title: 'Product Type',
      dataIndex: 'productTag',
      key: 'productTag',
    },
    {
      title: 'Product Quantity',
      dataIndex: 'minQty',
      key: 'minQty',
      render: (minQty) => minQty || '1',
    },
    {
      title: 'Product ID',
      dataIndex: 'giftCards',
      key: 'giftCards',
      render: (cards, record) => {
        const referenceNos =
          cards && cards.length > 0
            ? cards.map((card) => card.referenceNo)
            : [];
        const productID = record.productID || '';

        return (
          <ul>
            {referenceNos.map((referenceNo) => (
              <li key={referenceNo}>
                {record.minQty === 0 ? '' : referenceNo}
              </li>
            ))}
            {productID && <li>{productID}</li>}
          </ul>
        );
      },
    },
    {
      title: 'Redeem Code',
      dataIndex: 'giftCards',
      key: 'giftCards',
      render: (cards, record) => {
        if (cards && cards.length > 0) {
          return (
            <ul>
              {cards.map((card) => (
                <li key={card.code}>
                  {record.minQty == 0 ? '' : `${card.code}`}
                </li>
              ))}
            </ul>
          );
        } else {
          return '';
        }
      },
    },
    {
      title: 'Base Token',
      dataIndex: 'baseToken',
      key: 'baseToken',
      render: (baseToken) => baseToken,
    },   {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <img src={`${imageUrl}/${image}`} style={{height:'40px', width:'40px', border: '1px solid #E1E1E1', borderRadius: '2px'}}/>,
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
    <>
      <div
        style={{
          color: 'black',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <Dropdown
          menu={{
            items,
          }}
          placement="bottomLeft"
        >
          <Button style={{ marginTop: '20px' }}>Add New Card</Button>
        </Dropdown>
        <br />

        <div style={{ marginLeft: '30px' }}>
          <label style={{ fontWeight: 'bold' }}>Search cards by Card ID</label>{' '}
          <br />
          <Input
            placeholder="Enter card Id"
            value={sortParameters?.productID || ''}
            onChange={(e) => (
              console.log(e.target.value),
              setSortParameters((prev) => ({
                ...prev,
                productID: e.target.value,
              }))
            )}
          />
        </div>

        <div style={{ marginLeft: '30px' }}>
          <label style={{ fontWeight: 'bold' }}>Search cards by Name</label>{' '}
          <br />
          <Input
            placeholder="Enter card name"
            value={sortParameters?.title || ''}
            onChange={(e) =>
              setSortParameters((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
          />
        </div>

        <div style={{ marginLeft: '30px' }}>
          <label style={{ fontWeight: 'bold' }}>
            Filter the Products by collection name
          </label>{' '}
          <br />
          <Select
            style={{ width: '250px' }}
            value={sortParameters.colection}
            onChange={(value) =>
              setSortParameters((prev) => ({
                ...prev,
                colection: value,
              }))
            }
          >
            {allcollections &&
              allcollections.map((collection) => (
                <Select.Option key={collection.value} value={collection.value}>
                  {collection.label}
                </Select.Option>
              ))}
          </Select>
        </div>
        <div style={{ marginLeft: '30px' }}>
          <label style={{ fontWeight: 'bold' }}>
            Filter the Products by category name
          </label>{' '}
          <br />
          <Select
            style={{ width: '250px' }}
            value={sortParameters.category}
            onChange={(value) =>
              setSortParameters((prev) => ({
                ...prev,
                category: value,
              }))
            }
          >
            {allcategories &&
              allcategories.category.map((category) => (
                <Select.Option key={category.value} value={category.value}>
                  {category.label}
                </Select.Option>
              ))}
          </Select>
        </div>
        <div style={{ marginLeft: '20px' }}>
          <Button
            type="primary"
            style={{ marginTop: '18px' }}
            onClick={() =>
              setSortParameters({
                email: '',
                firstName: '',
                role: '',
              })
            }
          >
            Clear filter
          </Button>
        </div>
      </div>
      <Table
        columns={PlatformProuctTableColumns}
        dataSource={mergedDataSource}
        pagination={{ defaultPageSize: 5 }}
        rowKey={(record) => record._id}
      />

      <Modal
        open={openAddBinanceModal}
        onCancel={handleCloseAddBinanceModal}
        onOk={() => handleAddBinance()}
        title={'Add binance'}
        okText={'Add'}
      >
        <AddBinanceModal setBinanceToAdd={setBinanceToAdd} />
      </Modal>

      <Modal
        open={
          dataToWorkon.isOpen &&
          dataToWorkon.action === 'edit' &&
          dataToWorkon.type === 'binance'
        }
        onCancel={handleCloseModal}
        onOk={() => handleBinanceUpdate()}
        title={'Update Product'}
        okText={'Update'}
      >
        <UpdateBinanceModal
          data={dataToWorkon.data}
          setUpdatedProduct={setUpdatedProduct}
          allcategories={allcategories}
          allcollections={allcollections}
          selectedSubCategories={selectedSubCategories}
          setSelectedSubCategories={setSelectedSubCategories}
          setBinanceToUpdate={setBinanceToUpdate}
        />
      </Modal>

      <Modal
        open={
          dataToWorkon.isOpen &&
          dataToWorkon.action === 'delete' &&
          dataToWorkon.type === 'binance'
        }
        onCancel={handleCloseModal}
        onOk={() => handleDeleteBinance()}
        title={'Delete Confirmation'}
        okText={'Delete'}
      >
        {dataToWorkon.action === 'delete' ? (
          <DeleteConformationModel productId={dataToWorkon.data} />
        ) : null}
      </Modal>

      <Modal
        open={openAddBitaqtyModal}
        onCancel={handleCloseAddBitaqtyModal}
        onOk={() => handleAddBitaqty()}
        title={'Add Bitaqty'}
        okText={'Add Product'}
      >
        <AddBitaqtyModal setProductToAdd={setProductToAdd} />
      </Modal>

      <Modal
        open={
          dataToWorkon.isOpen &&
          dataToWorkon.action === 'edit' &&
          dataToWorkon.type === 'bitaqty'
        }
        onCancel={handleCloseModal}
        onOk={() => handleBitaqtyUpdate()}
        title={'Update Product'}
        okText={'Update'}
      >
        <UpdateBitaqtyModal
          data={dataToWorkon.data}
          setUpdatedProduct={setUpdatedProduct}
          allcategories={allcategories}
          allcollections={allcollections}
          selectedSubCategories={selectedSubCategories}
          setSelectedSubCategories={setSelectedSubCategories}
          setBinanceToUpdate={setBinanceToUpdate}
        />
      </Modal>

      <Modal
        open={
          dataToWorkon.isOpen &&
          dataToWorkon.action === 'delete' &&
          dataToWorkon.type === 'bitaqty'
        }
        onCancel={handleCloseModal}
        onOk={() => handleDeleteBitaqty()}
        title={'Delete Confirmation'}
        okText={'Delete'}
      >
        {dataToWorkon.action === 'delete' ? (
          <DeleteConformationModel productId={dataToWorkon.data} />
        ) : null}
      </Modal>
    </>
  );
};

export default SelectedGiftCards;
