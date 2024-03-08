import { Input, Select, InputNumber } from 'antd';
import React, { useEffect, useState } from 'react';
import { getCollections } from '../../../../services/Collections';
import { getCategories } from '../../../../services/categories';
import {
  getColections,
  getCategoriesAndSubcategories,
  handleStateChange,
} from '../../../../util/helper';

const AddBinanceModal = ({ setBinanceToAdd }) => {
  const [newBinance, setNewBinance] = useState({
    productTag: 'binance',
    minQty: 1,
  });

  const [allcollections, setAllcollections] = useState(null);
  const [allcategories, setAllcategories] = useState(null);
  const [selectedSubCategories, setSelectedSubCategories] = useState(null);
  const [isDualToken, setIsDualToken] = useState('false');
  const [minQty, setMinQty] = useState(1);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    if (!newBinance) return;

    if (allcategories?.subCategories) {
      console.log(allcategories?.subCategories[newBinance?.category]);
      setSelectedSubCategories(
        allcategories?.subCategories[newBinance?.category]
      );
    }
  }, [newBinance?.category]);

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
    if (newImage) {
      setNewBinance((prev) => ({ ...prev, image: newImage }));
    }
  }, [newImage]);

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
    setBinanceToAdd(newBinance);
  }, [newBinance]);

  useEffect(() => {
    setNewBinance((prev) => ({
      ...prev,
      priceInSAR: newBinance?.priceInSAR,
    }));
  }, [newBinance?.priceInSAR]);

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
            value={newBinance?.subCategory}
            options={selectedSubCategories}
            name="subCategory"
            onChange={(value) => {
              setNewBinance((prev) => ({ ...prev, subCategory: value }));
            }}
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
          defaultValue="false"
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
        />
      </div>

      {isDualToken == 'true' && (
        <div style={{ marginBottom: '10px' }}>
          <label>Face Token</label>
          <Input
            placeholder="token"
            name="faceToken"
            onChange={(e) => handleStateChange(e, setNewBinance)}
          />
        </div>
      )}

      <div style={{ marginBottom: '10px' }}>
        <label>Cost price</label>
        <Input
          placeholder="Cost Price"
          name="price"
          value={newBinance?.price}
          onChange={(e) => handleStateChange(e, setNewBinance)}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Selling price</label>
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
          defaultValue={1}
          style={{ width: '100%' }}
          onChange={(value) => {
            setMinQty(value);
          }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        {newImage && (
          <img src={URL.createObjectURL(newImage)} width={100} height={100} />
        )}

        <div style={{ marginTop: '10px' }}>
          <label>Image</label>
          <Input type="file" onChange={(e) => setNewImage(e.target.files[0])} />
        </div>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Description</label>
        <Input
          placeholder="Description"
          name="description"
          value={newBinance?.description || ''}
          onChange={(e) => handleStateChange(e, setNewBinance)}
        />
      </div>
    </div>
  );
};

export default AddBinanceModal;
