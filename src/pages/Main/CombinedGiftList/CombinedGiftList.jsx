import { Modal, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import {
  addProduct,
  deleteProduct,
  fetchAllBitaQtyThirdParty,
  getBitaqtyGifts,
  updateproduct,
} from '../../../services/Product';
import {
  getColections,
  getCategoriesAndSubcategories,
  mergeObjects,
} from '../../../util/helper';
import DeleteConformationModel from './Modals/DeleteConformationModel';
import { toast } from 'react-toastify';
import UpdateProductModal from './Modals/UpdateProductModal';
import AddProductModal from './Modals/AddProductModal';
import { getCategories } from '../../../services/categories';
import { getCollections } from '../../../services/Collections';

const CombinedGiftList = () => {
  const [gifts, setGifts] = useState(null);
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

  const handleCloseModal = () => {
    setDataToWorkOn({ data: null, action: '', isOpen: false });
  };

  const addProductModal = (data) => {
    setDataToWorkOn({ data: data, action: 'add', isOpen: true });
  };

  const handleAddProduct = async () => {
    if (productToAdd) {
      console.log('productToAdd', productToAdd);
      const { success, message } = await addProduct(productToAdd);
      if (success) {
        toast.success(message);
        handleCloseModal();
      } else {
        toast.error(message);
        handleCloseModal();
      }
    }
  };

  const editProductModal = (data) => {
    console.log('data', data);
    setDataToWorkOn({ data: data, action: 'edit', isOpen: true });
  };

  const handleProductUpdate = async () => {
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

  const deleteProductModal = (data) => {
    setDataToWorkOn({ data: data, action: 'delete', isOpen: true });
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

  const BitaqtyProductTableColumns = [
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
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => addProductModal(record)}>Add</a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    async function fetch() {
      const response = await getBitaqtyGifts();
      const gifts = response.data;
      console.log('gifts', gifts);
      setGifts(mergeObjects(gifts));
    }

    fetch();
  }, [dataToWorkon.isOpen]);

  useEffect(() => {
    async function fetch() {
      const moreBitaQty = await fetchAllBitaQtyThirdParty();
      setThirdPartyOption(moreBitaQty.data);
    }

    fetch();
  }, []);

  return (
    <div>
      <div style={{ color: 'black' }}>
        <h4>Gifts Already Added</h4>
      </div>
      <Table
        columns={PlatformProuctTableColumns}
        dataSource={gifts}
        pagination={{ defaultPageSize: 5 }}
        rowKey={(record) => record.productID}
      />

      <div style={{ color: 'black' }}>
        <h4>More Gifts to add</h4>
      </div>
      <Table
        columns={BitaqtyProductTableColumns}
        dataSource={thirPartyOption}
        pagination={{ defaultPageSize: 5 }}
        rowKey={(record) => record.productID}
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

      <Modal
        open={dataToWorkon.isOpen && dataToWorkon.action === 'add'}
        onCancel={handleCloseModal}
        onOk={() => handleAddProduct()}
        title={'Add Product'}
        okText={'Add Product'}
      >
        <AddProductModal
          data={dataToWorkon.data}
          setProductToAdd={setProductToAdd}
          allcategories={allcategories}
          allcollections={allcollections}
          selectedSubCategories={selectedSubCategories}
          setSelectedSubCategories={setSelectedSubCategories}
        />
      </Modal>
    </div>
  );
};

export default CombinedGiftList;
