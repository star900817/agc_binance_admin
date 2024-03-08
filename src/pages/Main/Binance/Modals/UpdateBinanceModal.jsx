import { Input, Select, InputNumber } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  getColections,
  getCategoriesAndSubcategories,
  handleStateChange,
} from '../../../../util/helper';
import { getCollections } from '../../../../services/Collections';
import { getCategories } from '../../../../services/categories';

const UpdateBinanceModal = ({ data, setBinanceToUpdate }) => {
  const [newBinance, setNewBinance] = useState(null);

  const [allcollections, setAllcollections] = useState(null);
  const [allcategories, setAllcategories] = useState(null);
  const [selectedSubCategories, setSelectedSubCategories] = useState(null);
  const [isDualToken, setIsDualToken] = useState('false');
  const [minQty, setMinQty] = useState(1);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    console.log(newBinance);
    if (!newBinance) return;

    if (allcategories?.subCategories) {
      setSelectedSubCategories(
        allcategories?.subCategories[newBinance?.category]
      );
    }
  }, [newBinance?.category, allcategories]);

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
    setNewBinance((prev) => ({
      ...prev,
      priceInSAR: newBinance?.priceInSAR,
    }));
  }, [newBinance?.price]);

  useEffect(() => {
    if (isDualToken) {
      setNewBinance((prev) => ({ ...prev, isDualToken }));
    }
  }, [isDualToken]);

  useEffect(() => {
    if (minQty) {
      setNewBinance((prev) => ({ ...prev, minQty }));
    }
  }, [minQty]);

  useEffect(() => {
    setNewBinance((prev) => ({
      ...prev,
      faceToken: newBinance?.faceToken,
    }));
  }, [newBinance?.faceToken]);

  useEffect(() => {
    setNewBinance((prev) => ({
      ...prev,
      baseToken: newBinance?.baseToken,
    }));
  }, [newBinance?.baseToken]);

  useEffect(() => {
    setNewBinance((prev) => ({
      ...prev,
      ...data,
      category: data.category?._id,
      colection: data.colection?._id,
    }));
  }, [data]);

  useEffect(() => {
    if (newImage) setNewBinance((prev) => ({ ...prev, image: newImage }));
  }, [newImage]);

  useEffect(() => {
    setBinanceToUpdate(newBinance);
  }, [newBinance]);

  useEffect(() => {
    setNewBinance((prev) => ({
      ...prev,
      description: newBinance?.description,
    }));
  }, [newBinance?.description]);

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <label>Title</label>
        <Input
          placeholder="Title"
          name="title"
          value={newBinance?.title || ''}
          onChange={(e) => handleStateChange(e, setNewBinance)}
        />
      </div>

      {allcollections && (
        <div style={{ marginBottom: '10px' }}>
          <label>Select Collection</label>
          <Select
            style={{
              width: '100%',
            }}
            value={newBinance?.colection}
            options={allcollections}
            name="colection"
            onChange={(value) =>
              setNewBinance((prev) => ({ ...prev, colection: value }))
            }
          />
        </div>
      )}

      {allcategories && (
        <div style={{ marginBottom: '10px' }}>
          <label>Select Category</label>
          <Select
            style={{
              width: '100%',
            }}
            value={newBinance?.category}
            options={allcategories?.category}
            name="category"
            onChange={(value) =>
              setNewBinance((prev) => ({
                ...prev,
                category: value,
                subCategory: '',
              }))
            }
          />
        </div>
      )}

      {selectedSubCategories && (
        <div style={{ marginBottom: '10px' }}>
          <label>Select Subcategory</label>
          <Select
            style={{
              width: '100%',
            }}
            options={selectedSubCategories}
            name="subCategory"
            value={newBinance?.subCategory}
            onChange={(value) =>
              setNewBinance((prev) => ({ ...prev, subCategory: value }))
            }
          />
        </div>
      )}

      {/* <div style={{ marginBottom: "10px" }}>
        <label>Currency</label>
        <Input
          placeholder="Currency"
          name="currency"
          value={newBinance?.currency || ""}
          onChange={(e) => handleStateChange(e, setNewBinance)}
        />
      </div> */}

      <div style={{ marginBottom: '10px' }}>
        <label>Select gift card type</label>
        <Select
          style={{
            width: '100%',
          }}
          options={[
            {
              label: 'Single Token',
              value: 'false',
            },
            {
              label: 'Dual Token',
              value: 'true',
            },
          ]}
          value={newBinance?.isDualToken}
          name="isDualToken"
          onChange={(value) => {
            setIsDualToken(value);
          }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Base Token</label>
        <Input
          placeholder="token"
          name="baseToken"
          onChange={(e) => handleStateChange(e, setNewBinance)}
          value={newBinance?.baseToken}
        />
      </div>

      {newBinance?.isDualToken == 'true' && (
        <div style={{ marginBottom: '10px' }}>
          <label>Face Token</label>
          <Input
            placeholder="token"
            name="faceToken"
            onChange={(e) => handleStateChange(e, setNewBinance)}
            value={newBinance?.faceToken}
          />
        </div>
      )}

      <div style={{ marginBottom: '10px' }}>
        <label>Cost Price</label>
        <Input
          placeholder="Cost Price"
          name="price"
          value={newBinance?.price}
          onChange={(e) => handleStateChange(e, setNewBinance)}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Selling Price</label>
        <Input
          placeholder="Selling Price"
          name="priceInSAR"
          value={newBinance?.priceInSAR || ''}
          onChange={(e) => handleStateChange(e, setNewBinance)}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Min Qty</label>
        <InputNumber
          placeholder="minQty"
          name="minQty"
          min={1}
          value={newBinance?.minQty}
          style={{ width: '100%' }}
          onChange={(value) => {
            setMinQty(value);
          }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Image</label>
        <div>
          {newImage ? (
            <img src={URL.createObjectURL(newImage)} height={100} width={100} />
          ) : (
            <img
              src={
                newBinance?.image?.includes('http')
                  ? newBinance?.image
                  : `${import.meta.env.VITE_REACT_APP_BACKEND_IMAGE_URL}/${
                      newBinance?.image
                    }`
              }
              height={100}
              width={100}
            />
          )}
          <Input type="file" onChange={(e) => setNewImage(e.target.files[0])} />
        </div>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Description</label>
        <Input
          placeholder="Description"
          name="description"
          value={newBinance?.description}
          onChange={(e) => handleStateChange(e, setNewBinance)}
        />
      </div>
    </div>
  );
};

export default UpdateBinanceModal;
