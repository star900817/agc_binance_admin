import { Input, Select } from 'antd';
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
      <h4>
        All the data will be inherited from the source which is selected <br />
        Pleae enter following details for Platform use
      </h4>

      {/* <div style={{ marginTop: "10px" }}>
        <label>Currency: {addProduct?.productDetails?.currency}</label>
      </div> */}

      <div style={{ marginTop: '10px' }}>
        <label>Enter Price ({addProduct?.productDetails?.currency})</label>
        <Input
          type="number"
          name="price"
          value={addProduct?.price}
          onChange={(e) => handleStateChange(e, setAddProduct)}
        />
      </div>

      <div style={{ marginTop: '10px' }}>
        <label>Price in SAR</label>
        <Input
          type="number"
          name="priceInSAR"
          value={addProduct?.priceInSAR}
          onChange={(e) => handleStateChange(e, setAddProduct)}
        />
      </div>

      <div style={{ marginTop: '10px' }}>
        {newImage ? (
          <img src={URL.createObjectURL(newImage)} width={50} height={50} />
        ) : (
          <img
            src={
              addProduct?.image?.includes('http')
                ? addProduct?.image
                : `${import.meta.env.VITE_REACT_APP_BACKEND_IMAGE_URL}/${
                    addProduct?.image
                  }`
            }
          />
        )}
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
        <label>Image</label>
        <Input type="file" onChange={(e) => setNewImage(e.target.files[0])} />
      </div>

      <div
        style={{
          marginTop: '10px',
          display: 'flex',
          justifyContent: '',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Input
          type="checkbox"
          name="isFeatured"
          style={{ width: 'fit-content' }}
          // value={addProduct?.priceInSAR}
          onChange={(e) =>
            setAddProduct((prev) => ({ ...prev, isFeatured: e.target.checked }))
          }
        />
        <label style={{ marginLeft: '10px', width: '80%' }}>
          Consider as a Feature product
        </label>
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
