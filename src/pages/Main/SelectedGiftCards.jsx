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
import GridLogo from '../../assets/grid-icon.svg';
import ListLogo from '../../assets/list-icon.svg';

import {
  Button,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Dropdown,
  Pagination,
} from 'antd';
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
import GridView from './GridView';
import Loader from '../../util/Loader';

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
<<<<<<< HEAD
  const [layout, changeLayout] = useState('list')
  const [isLoading, setIsLoading] = useState(true)
=======
  const [layout, changeLayout] = useState('list');
>>>>>>> 13670b4b2589a60d22c94f3d53d7624349c5ab92
  const searchInput = useRef(null);
  const [filteredGift, setFilteredGift] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [thirPartyOption, setThirdPartyOption] = useState(null);
  const [productToAdd, setProductToAdd] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

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
      setIsLoading(false)
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
      console.log('details', productToAdd);
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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = mergedDataSource?.slice(startIndex, endIndex);

  const totalPages = Math.ceil(mergedDataSource?.length / itemsPerPage);

  // console.log(totalPages,'totaal/////', currentPage)

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
              <li key={referenceNo} className="list-item">
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
                <li key={card.code} className="list-item">
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
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <img
          src={`${imageUrl}/${image}`}
          style={{
            height: '40px',
            width: '40px',
            border: '1px solid #E1E1E1',
            borderRadius: '2px',
          }}
        />
      ),
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
    isLoading? <Loader/>:
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '20px',
        }}
      >
        <h4>Products</h4>
        <Dropdown
          menu={{
            items,
          }}
          placement="bottomLeft"
        >
          <Button style={{ marginTop: '20px' }}>Add New Card</Button>
        </Dropdown>
      </div>
      <div
        style={{
          color: 'black',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <br />

        <div>
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

        <div className="toggle-btn">
          <Button
            style={{ marginTop: '20px' }}
            onClick={() => changeLayout('grid')}
            className={layout == 'grid' ? 'active' : ''}
          >
            {/* <img src={GridLogo} /> */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ paddingBottom: '2px' }}
            >
              <path
                d="M0 2.14284C0 1.57452 0.225765 1.02948 0.627628 0.627613C1.02949 0.225749 1.57454 -1.52588e-05 2.14286 -1.52588e-05H6.42857C6.99689 -1.52588e-05 7.54194 0.225749 7.9438 0.627613C8.34566 1.02948 8.57143 1.57452 8.57143 2.14284V6.42856C8.57143 6.99688 8.34566 7.54192 7.9438 7.94379C7.54194 8.34565 6.99689 8.57141 6.42857 8.57141H2.14286C1.57454 8.57141 1.02949 8.34565 0.627628 7.94379C0.225765 7.54192 0 6.99688 0 6.42856V2.14284ZM11.4286 2.14284C11.4286 1.57452 11.6543 1.02948 12.0562 0.627613C12.4581 0.225749 13.0031 -1.52588e-05 13.5714 -1.52588e-05H17.8571C18.4255 -1.52588e-05 18.9705 0.225749 19.3724 0.627613C19.7742 1.02948 20 1.57452 20 2.14284V6.42856C20 6.99688 19.7742 7.54192 19.3724 7.94379C18.9705 8.34565 18.4255 8.57141 17.8571 8.57141H13.5714C13.0031 8.57141 12.4581 8.34565 12.0562 7.94379C11.6543 7.54192 11.4286 6.99688 11.4286 6.42856V2.14284ZM0 13.5714C0 13.0031 0.225765 12.458 0.627628 12.0562C1.02949 11.6543 1.57454 11.4286 2.14286 11.4286H6.42857C6.99689 11.4286 7.54194 11.6543 7.9438 12.0562C8.34566 12.458 8.57143 13.0031 8.57143 13.5714V17.8571C8.57143 18.4254 8.34566 18.9705 7.9438 19.3724C7.54194 19.7742 6.99689 20 6.42857 20H2.14286C1.57454 20 1.02949 19.7742 0.627628 19.3724C0.225765 18.9705 0 18.4254 0 17.8571V13.5714ZM11.4286 13.5714C11.4286 13.0031 11.6543 12.458 12.0562 12.0562C12.4581 11.6543 13.0031 11.4286 13.5714 11.4286H17.8571C18.4255 11.4286 18.9705 11.6543 19.3724 12.0562C19.7742 12.458 20 13.0031 20 13.5714V17.8571C20 18.4254 19.7742 18.9705 19.3724 19.3724C18.9705 19.7742 18.4255 20 17.8571 20H13.5714C13.0031 20 12.4581 19.7742 12.0562 19.3724C11.6543 18.9705 11.4286 18.4254 11.4286 17.8571V13.5714Z"
                fill="#AEAEAE"
              />
            </svg>
          </Button>
          <Button
            style={{ marginTop: '20px' }}
            onClick={() => changeLayout('list')}
            className={layout == 'list' ? 'active' : ''}
          >
            {/* <img src={ListLogo} /> */}
            <svg
              width="20"
              height="17"
              viewBox="0 0 20 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.0323 0C19.5685 0 20 0.433198 20 0.97166V2.91498C20 3.45344 19.5685 3.88664 19.0323 3.88664H17.0968C16.5605 3.88664 16.129 3.45344 16.129 2.91498V0.97166C16.129 0.433198 16.5605 0 17.0968 0H19.0323ZM12.9032 0.647773C13.6169 0.647773 14.1935 1.22672 14.1935 1.94332C14.1935 2.65992 13.6169 3.23887 12.9032 3.23887H1.29032C0.576614 3.23887 0 2.65992 0 1.94332C0 1.22672 0.576614 0.647773 1.29032 0.647773H12.9032ZM12.9032 7.12551C13.6169 7.12551 14.1935 7.70445 14.1935 8.42105C14.1935 9.13765 13.6169 9.7166 12.9032 9.7166H1.29032C0.576614 9.7166 0 9.13765 0 8.42105C0 7.70445 0.576614 7.12551 1.29032 7.12551H12.9032ZM12.9032 13.6032C13.6169 13.6032 14.1935 14.1822 14.1935 14.8988C14.1935 15.6154 13.6169 16.1943 12.9032 16.1943H1.29032C0.576614 16.1943 0 15.6154 0 14.8988C0 14.1822 0.576614 13.6032 1.29032 13.6032H12.9032ZM20 7.44939V9.39271C20 9.93117 19.5685 10.3644 19.0323 10.3644H17.0968C16.5605 10.3644 16.129 9.93117 16.129 9.39271V7.44939C16.129 6.91093 16.5605 6.47773 17.0968 6.47773H19.0323C19.5685 6.47773 20 6.91093 20 7.44939ZM19.0323 12.9555C19.5685 12.9555 20 13.3887 20 13.9271V15.8704C20 16.4089 19.5685 16.8421 19.0323 16.8421H17.0968C16.5605 16.8421 16.129 16.4089 16.129 15.8704V13.9271C16.129 13.3887 16.5605 12.9555 17.0968 12.9555H19.0323Z"
                fill="#018AA9"
              />
            </svg>
          </Button>
        </div>
      </div>

      {layout === 'list' ? (
        <Table
          columns={PlatformProuctTableColumns}
          dataSource={mergedDataSource}
          pagination={{ defaultPageSize: 5 }}
          rowKey={(record) => record._id}
        />
      ) : null}

      {layout === 'grid' ? (
        <>
          {' '}
          <div className="main-outer-div">
            {currentItems &&
              currentItems.map((item, index) => (
                <GridView
                  key={index}
                  image={item?.image}
                  price={item?.priceInSAR}
                  category={item?.category?.name}
                  title={item?.title}
                  onDelete={() => deleteProductModal(item._id, item.key)}
                  onUpdate={() => editProductModal(item)}
                />
              ))}{' '}
          </div>
          <div
            style={{
              margin: '30px',
              textAlign: 'center',
              paddingBottom: '20px',
            }}
          >
            <Pagination
              current={currentPage}
              total={mergedDataSource?.length}
              pageSize={itemsPerPage}
              pageSizeOptions={['10', '12', '20', '50', '100']}
              onChange={(page) => setCurrentPage(page)}
            />
          </div>
        </>
      ) : null}

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
