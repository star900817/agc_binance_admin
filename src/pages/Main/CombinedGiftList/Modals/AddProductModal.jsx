import { Input, InputNumber, Select } from 'antd';
import { useEffect, useState } from 'react';
import { handleStateChange } from '../../../../util/helper';

const AddProductModal = ({
  data,
  setProductToAdd,
  allcollections,
  allcategories,
  selectedSubCategories,
  setSelectedSubCategories,
}) => {
  const [addProduct, setAddProduct] = useState({ isFeatured: false });
  const [newImage, setNewImage] = useState(null);
  const [minQty, setMinQty] = useState(1);

  useEffect(() => {
    if (!addProduct) return;

    if (allcategories?.subCategories) {
      setSelectedSubCategories(
        allcategories?.subCategories[addProduct.category]
      );
    }
  }, [addProduct?.category]);

  useEffect(() => {
    setAddProduct((prev) => ({
      ...prev,
      productDetails: data,
      image: data.image,
      colection: data.colection,
      price: data.costPriceAfterVat,
      priceInSAR: data.costPriceAfterVat * 3.75,
    }));
  }, [data]);

  useEffect(() => {
    if (newImage) {
      setAddProduct((prev) => ({ ...prev, image: newImage }));
    }
  }, [newImage]);
  useEffect(() => {
    if (minQty) {
      setAddProduct((prev) => ({ ...prev, minQty }));
    }
  }, [newImage]);

  useEffect(() => {
    setProductToAdd(addProduct);
  }, [addProduct]);

  useEffect(() => {
    setAddProduct((prev) => ({
      ...prev,
      productDetails: data,
      image: data.image,
      colection: data.colection,
      price: data.costPriceAfterVat,
      priceInSAR: data.priceInSAR,
      description: data.description,
    }));
  }, [data]);

  return (
    <div style={{ color: 'black' }}>
      <div style={{ marginBottom: '10px' }}>
        <label>Title</label>
        <Input
          placeholder="Title"
          name="title"
          value={''}
          onChange={(e) => handleStateChange(e, setNewBinance)}
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
      <div style={{ marginTop: '10px' }}>
        <label>Selling Price {addProduct?.productDetails?.currency}</label>
        <Input
          type="input"
          name="price"
          value={addProduct?.price}
          onChange={(e) => handleStateChange(e, setAddProduct)}
        />
      </div>

      <div style={{ marginTop: '10px' }}>
        <label>Cost Price</label>
        <Input
          type="input"
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
          name="description"
          value={addProduct?.description}
          onChange={(e) => handleStateChange(e, setAddProduct)}
        />
      </div>
    </div>
  );
};

export default AddProductModal;
