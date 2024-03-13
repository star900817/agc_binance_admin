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
  addProduct,
  deleteBinance,
  deleteProduct,
  fetchAllBinanceGifts,
  fetchAllBitaQtyThirdParty,
  getBitaqtyGifts,
  updateBinance,
  updateproduct,
} from '../../services/Product';
import UpdateProductModal from './CombinedGiftList/Modals/UpdateProductModal';
import DeleteConformationModel from './CombinedGiftList/Modals/DeleteConformationModel';
import { toast } from 'react-toastify';
import AddBinanceModal from './Binance/Modals/AddBinanceModal';
import AddProductModal from './CombinedGiftList/Modals/AddProductModal';
import UpdateBinanceModal from './Binance/Modals/UpdateBinanceModal';

const SelectedGiftCards = () => {
  const [gifts, setGifts] = useState(null);
  const [allBinance, setAllBinance] = useState([]);

  const [mergedCopy, setMergedCopy] = useState(null);
  const searchInput = useRef(null);

  const [sortParameters, setSortParameters] = useState({
    category: '',
    colection: '',
    nameEn: '',
    productID: '',
  });

  useEffect(() => {
    const filtered = searchData(sortParameters, mergedCopy);
    setGifts(filtered);
  }, [sortParameters]);

  const [filteredGift, setFilteredGift] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [thirPartyOption, setThirdPartyOption] = useState(null);
  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [binanceToUpdate, setBinanceToUpdate] = useState(null);

  const [dataToWorkon, setDataToWorkOn] = useState({
    data: null,
    action: '',
    isOpen: false,
  });

  const [updatedProduct, setUpdatedProduct] = useState(null);
  const [productToAdd, setProductToAdd] = useState(null);

  const [allcollections, setAllcollections] = useState(null);
  const [allcategories, setAllcategories] = useState(null);
  const [selectedSubCategories, setSelectedSubCategories] = useState(null);

  const [binanceToAdd, setBinanceToAdd] = useState(null);

  const handleOpenAddProductModal = () => {
    setOpenAddProductModal(true);
  };
  const handleCloseAddProductModal = () => {
    setOpenAddProductModal(false);
  };
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
  const handleAddBitaqty = () => {};
  const addProductModal = (data) => {
    setDataToWorkOn({ data: data, action: 'add', isOpen: true });
  };
  const items = [
    {
      key: '1',
      label: <a onClick={handleOpenAddProductModal}>Add Binance</a>,
    },
    {
      key: '2',
      label: <a onClick={addProductModal}>Add Bitaqty</a>,
    },
  ];

  useEffect(() => {
    async function fetch() {
      const allCollections = await getCollections();
      setAllcollections(getColections(allCollections.data));

      const allCategories = await getCategories();
      const { category, subCategories } = getCategoriesAndSubcategories(
        allCategories?.data
      );
      setAllcategories({ category, subCategories });
    }

    fetch();
  }, []);

  useEffect(() => {
    async function fetch() {
      const response = await getBitaqtyGifts();
      const binance = await fetchAllBinanceGifts();

      const gifts = response.data;
      setGifts(mergeObjects(gifts));
      setAllBinance(binance?.data?.data);

      setMergedCopy(mergeObjects(mergedDataSource));
    }

    fetch();
  }, [dataToWorkon.isOpen]);
  const mergedDataSource = gifts && allBinance ? [...gifts, ...allBinance] : [];

  const handleCloseModal = () => {
    setDataToWorkOn({ data: null, action: '', isOpen: false });
  };

  const editProductModal = (data) => {
    setDataToWorkOn({ data: data, action: 'edit', isOpen: true });
  };

  const handleProductUpdate = async () => {
    console.log('updatedProduct', updatedProduct);

    // if (updatedProduct.category === '65ceea33eab1a9c024f6e9d7') {
    //   updatedProduct.subCategory = ''; // Set subCategory to an empty string
    //   updatedProduct.productDetails.subCategory = '';
    // }

    if (updatedProduct) {
      // console.log('category', updatedProduct.category);
      // console.log('subcategory', updatedProduct.subCategory);
      // console.log('details', updatedProduct.productDetails.subCategory);

      const { success, message } = await updateproduct(updatedProduct);

      console.log('success', success);

      if (success) {
        toast.success(message);
        handleCloseModal();
      } else {
        toast.error(message);
        handleCloseModal();
      }
    }
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

  const handleDeleteProduct = async () => {
    const { success, message } = await deleteBinance(dataToWorkon.data);
    if (success) {
      toast.success(message);
      handleCloseModal();
    } else {
      toast.error(message);
      handleCloseModal();
    }
  };

  const deleteProductModal = (data) => {
    setDataToWorkOn({ data: data, action: 'delete', isOpen: true });
  };

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
            onChange={(e) =>
              setSortParameters((prev) => ({
                ...prev,
                productID: e.target.value,
              }))
            }
          />
        </div>

        <div style={{ marginLeft: '30px' }}>
          <label style={{ fontWeight: 'bold' }}>Search cards by Name</label>{' '}
          <br />
          <Input
            placeholder="Enter card name"
            value={sortParameters?.nameEn || ''}
            onChange={(e) =>
              setSortParameters((prev) => ({
                ...prev,
                nameEn: e.target.value,
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
        open={dataToWorkon.isOpen && dataToWorkon.action === 'delete'}
        onCancel={handleCloseModal}
        onOk={() => handleDeleteProduct()}
        title={'Delete Confirmation'}
        okText={'Delete'}
      >
        {dataToWorkon.action === 'delete' ? (
          <DeleteConformationModel productId={dataToWorkon.data} />
        ) : null}
      </Modal>
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
        open={dataToWorkon.isOpen && dataToWorkon.action === 'add'}
        onCancel={handleCloseModal}
        onOk={() => handleAddBitaqty()}
        title={'Add Bitaqty'}
        okText={'Add Product'}
      >
        <AddProductModal
          data={dataToWorkon.data}
          setProductToAdd={setProductToAdd}
          allcollections={allcollections}
          allcategories={allcategories}
          selectedSubCategories={selectedSubCategories}
          setSelectedSubCategories={setSelectedSubCategories}
        />
      </Modal>
      <Modal
        open={dataToWorkon.isOpen && dataToWorkon.action === 'edit'}
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
    </>
  );
};

export default SelectedGiftCards;
