import { useEffect, useState } from 'react';
import {
  fetchAllBitaQtyThirdParty,
  addProduct,
  getBitaqtyGifts,
} from '../../services/Product';
import { getCategories } from '../../services/categories';
import { getCollections } from '../../services/Collections';
import { Button, Modal, Space, Table } from 'antd';
import { toast } from 'react-toastify';
import AddProductModal from './CombinedGiftList/Modals/AddProductModal';
import {
  getCategoriesAndSubcategories,
  mergeObjects,
  getColections,
} from '../../util/helper';

const BitaqatyGiftCards = () => {
  const [thirPartyOption, setThirdPartyOption] = useState(null);
  const [dataToWorkon, setDataToWorkOn] = useState({
    data: null,
    action: '',
    isOpen: false,
  });
  const [productToAdd, setProductToAdd] = useState(null);
  const [availabel, setAvailabel] = useState([]);
  const [notAvailabel, setNotAvailabel] = useState([]);

  const [allcollections, setAllcollections] = useState(null);
  const [allcategories, setAllcategories] = useState(null);
  const [selectedSubCategories, setSelectedSubCategories] = useState(null);

  useEffect(() => {
    async function fetch() {
      const allCollections = await getCollections();
      setAllcollections(getColections(allCollections.data));

      const response = await getBitaqtyGifts();
      const gifts = response.data;
      setAvailabel(mergeObjects(gifts));
    }

    fetch();
  }, [dataToWorkon.isOpen]);

  useEffect(() => {
    async function fetch() {
      const moreBitaQty = await fetchAllBitaQtyThirdParty();
      // const availabelGiftCard = moreBitaQty.data.filter(
      //   (data) => data.available == true
      // );
      // setAvailabel(availabelGiftCard);
      // const notAvailabelGiftCard = moreBitaQty.data.filter(
      //   (data) => data.available == false
      // );
      // setNotAvailabel(notAvailabelGiftCard);
      setNotAvailabel(moreBitaQty.data);
    }

    fetch();
  }, []);

  useEffect(() => {
    async function fetch() {
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

  function checkIsExist(productID) {
    let check = false;
    availabel.map((item) => {
      if (item.productID == productID && check == false) {
        check = true;
      }
    });

    return check;
  }

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
      title: 'Gift Status',
      dataIndex: 'Gift Status',
      key: 'costPriceAfterVat',
      render: (_, record) => (
        <>{checkIsExist(record.productID) ? 'Already Added' : '-'}</>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {checkIsExist(record.productID) ? (
            <a style={{ pointerEvents: 'none', color: 'gray' }}>Add</a>
          ) : (
            <a onClick={() => addProductModal(record)}>Add</a>
          )}
        </Space>
      ),
    },
  ];

  // const alreadyExistingProducts = [
  //   {
  //     title: "Product ID",
  //     dataIndex: "productID",
  //     key: "productID",
  //     render: (text) => <a>{text}</a>,
  //   },
  //   {
  //     title: "ProductName",
  //     dataIndex: "nameEn",
  //     key: "nameEn",
  //   },
  //   {
  //     title: "Product Type",
  //     dataIndex: "productTag",
  //     key: "productTag",
  //   },
  //   {
  //     title: "Initial Price (USD)",
  //     dataIndex: "costPriceAfterVat",
  //     key: "costPriceAfterVat",
  //     render: (text) => parseFloat(text).toFixed(2),
  //   },
  //   {
  //     title: "Action",
  //     key: "action",
  //     render: (_, record) => (
  //       <Space size="middle">
  //         <a onClick={() => addProductModal(record)}>Add</a>
  //       </Space>
  //     ),
  //   },
  // ];
  return (
    <>
      {/* <div>
        <h3>Available Giftcards</h3>
        <Table
          columns={alreadyExistingProducts}
          dataSource={availabel}
          pagination={{ defaultPageSize: 5 }}
        />
      </div> */}
      <div>
        <h3>Bitaqaty Giftcards</h3>
        <Table
          columns={BitaqtyProductTableColumns}
          dataSource={notAvailabel}
          pagination={{ defaultPageSize: 10 }}
        />
      </div>

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
          allcollections={allcollections}
          allcategories={allcategories}
          selectedSubCategories={selectedSubCategories}
          setSelectedSubCategories={setSelectedSubCategories}
        />
      </Modal>
    </>
  );
};

export default BitaqatyGiftCards;
