import { useEffect, useState } from 'react';
import {
  getCategoriesAndSubcategories,
  mergeObjects,
  searchData,
  getColections,
} from '../../util/helper';
import { getCategories } from '../../services/categories';
import { getCollections } from '../../services/Collections';

import { Button, Input, Modal, Select, Space, Table } from 'antd';
import {
  addProduct,
  deleteProduct,
  fetchAllBitaQtyThirdParty,
  getBitaqtyGifts,
  updateproduct,
} from '../../services/Product';
import UpdateProductModal from './CombinedGiftList/Modals/UpdateProductModal';
import DeleteConformationModel from './CombinedGiftList/Modals/DeleteConformationModel';
import { toast } from 'react-toastify';

const SelectedGiftCards = () => {
  const [gifts, setGifts] = useState(null);
  const [giftCopy, setGiftCopy] = useState(null);

  const [sortParameters, setSortParameters] = useState({
    colection: '',
    nameEn: '',
    productID: '',
  });

  useEffect(() => {
    const filtered = searchData(sortParameters, giftCopy);
    setGifts(filtered);
  }, [sortParameters]);

  const [filteredGift, setFilteredGift] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [thirPartyOption, setThirdPartyOption] = useState(null);
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
      const gifts = response.data;
      setGifts(mergeObjects(gifts));
      setGiftCopy(mergeObjects(gifts));
    }

    fetch();
  }, [dataToWorkon.isOpen]);

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

  const handleDeleteProduct = async () => {
    const { success, message } = await deleteProduct(dataToWorkon.data);
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
      title: 'Product ID',
      dataIndex: 'productID',
      key: 'productID',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'ProductName',
      dataIndex: 'nameEn',
      key: 'nameEn',
    },
    {
      title: 'Product Type',
      dataIndex: 'productTag',
      key: 'productTag',
    },
    {
      title: 'Initial Price (USD)',
      dataIndex: 'costPriceAfterVat',
      key: 'costPriceAfterVat',
      render: (text) => parseFloat(text).toFixed(2),
    },
    {
      title: 'Platform Price (USD)',
      dataIndex: 'price',
      key: 'price',
      render: (text) => parseFloat(text).toFixed(2),
    },
    {
      title: 'Price In SAR',
      dataIndex: 'priceInSAR',
      key: 'priceInSAR',
      render: (text) => parseFloat(text).toFixed(2),
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
        <h4>Gifts Already Added </h4>
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
        dataSource={gifts}
        pagination={{ defaultPageSize: 10 }}
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
        open={dataToWorkon.isOpen && dataToWorkon.action === 'edit'}
        onCancel={handleCloseModal}
        onOk={() => handleProductUpdate()}
        title={'Update Product'}
        okText={'Update'}
      >
        <UpdateProductModal
          data={dataToWorkon.data}
          setUpdatedProduct={setUpdatedProduct}
          allcategories={allcategories}
          allcollections={allcollections}
          selectedSubCategories={selectedSubCategories}
          setSelectedSubCategories={setSelectedSubCategories}
        />
      </Modal>
    </>
  );
};

export default SelectedGiftCards;
