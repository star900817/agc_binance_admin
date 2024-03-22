import { Input, Select, InputNumber } from 'antd';
import React, { useEffect, useState } from 'react';
import { getCollections } from '../../../../services/Collections';
import { getCategories } from '../../../../services/categories';
import {
  getColections,
  getCategoriesAndSubcategories,
  handleStateChange,
} from '../../../../util/helper';

const AddProductModal = ({ setProductToAdd }) => {
  const [addProduct, setAddProduct] = useState({
    productTag: 'bitaqty',
    minQty: 1,
  });
  const [newImage, setNewImage] = useState(null);
  const [minQty, setMinQty] = useState(1);
  const [allcollections, setAllcollections] = useState(null);
  const [allcategories, setAllcategories] = useState(null);
  const [selectedSubCategories, setSelectedSubCategories] = useState(null);

  useEffect(() => {
    if (!addProduct) return;

    if (allcategories?.subCategories) {
      setSelectedSubCategories(
        allcategories?.subCategories[addProduct.category]
      );
    }
  }, [addProduct?.category]);

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
      setAddProduct((prev) => ({ ...prev, image: newImage }));
    }
  }, [newImage]);

  useEffect(() => {
    if (minQty) {
      setAddProduct((prev) => ({ ...prev, minQty }));
    }
  }, [minQty]);

  useEffect(() => {
    setAddProduct((prev) => ({
      ...prev,
      baseToken: addProduct?.baseToken,
      // baseToken: 'USDT',
    }));
  }, [addProduct?.baseToken]);

  useEffect(() => {
    setProductToAdd(addProduct);
  }, [addProduct]);

  useEffect(() => {
    setAddProduct((prev) => ({
      ...prev,
      priceInSAR: addProduct?.priceInSAR,
    }));
  }, [addProduct?.priceInSAR]);

  useEffect(() => {
    setAddProduct((prev) => ({
      ...prev,
      description: addProduct?.description,
    }));
  }, [addProduct?.description]);

  return (
    <div style={{ color: 'black' }}>
      <div style={{ marginBottom: '10px' }}>
        <label>Title</label>
        <Input
          placeholder="Title"
          name="title"
          value={addProduct?.title || ''}
          onChange={(e) => handleStateChange(e, setAddProduct)}
        />
      </div>

      {allcollections && (
        <div style={{ marginTop: '10px' }}>
          <label>Select Collection</label>
          <Select
            style={{
              width: '100%',
            }}
            options={allcollections}
            name="colection"
            onChange={(value) =>
              setAddProduct((prev) => ({ ...prev, colection: value }))
            }
          />
        </div>
      )}

      {allcategories && (
        <div style={{ marginTop: '10px' }}>
          <label>Select Category</label>
          <Select
            style={{
              width: '100%',
            }}
            options={allcategories?.category}
            name="category"
            onChange={(value) =>
              setAddProduct((prev) => ({ ...prev, category: value }))
            }
          />
        </div>
      )}

      {selectedSubCategories && (
        <div style={{ marginTop: '10px' }}>
          <label>Select Subcategory</label>
          <Select
            style={{
              width: '100%',
            }}
            options={selectedSubCategories}
            name="subCategory"
            onChange={(value) =>
              setAddProduct((prev) => ({ ...prev, subCategory: value }))
            }
          />
        </div>
      )}
      <div style={{ marginBottom: '10px' }}>
        <label>Base Token</label>
        <Input
          placeholder="token"
          name="baseToken"
          onChange={(e) => handleStateChange(e, setAddProduct)}
        />
      </div>

      <div style={{ marginTop: '10px' }}>
        <label>Cost Price {addProduct?.productDetails?.currency}</label>
        <Input
          type="input"
          placeholder="Cost Price"
          name="price"
          value={addProduct?.price}
          onChange={(e) => handleStateChange(e, setAddProduct)}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <label>Selling Price</label>
        <Input
          type="input"
          placeholder="Selling Price"
          name="priceInSAR"
          value={addProduct?.priceInSAR}
          onChange={(e) => handleStateChange(e, setAddProduct)}
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
      <div style={{ marginTop: '10px' }}>
        {newImage ? (
          <img src={URL.createObjectURL(newImage)} width={100} height={100} />
        ) : (
          ''
        )}
      </div>
      <div style={{ marginTop: '10px' }}>
        <label>Image</label>
        <Input type="file" onChange={(e) => setNewImage(e.target.files[0])} />
      </div>

      <div style={{ marginTop: '10px' }}>
        <label>Description</label>
        <Input
          type="string"
          placeholder="Description"
          name="description"
          value={addProduct?.description}
          onChange={(e) => handleStateChange(e, setAddProduct)}
        />
      </div>
    </div>
  );
};

export default AddProductModal;
