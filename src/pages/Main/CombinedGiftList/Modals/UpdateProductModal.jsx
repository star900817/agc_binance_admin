import { Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import { handleStateChange } from '../../../../util/helper';

const UpdateProductModal = ({
  data,
  setUpdatedProduct,
  allcollections,
  allcategories,
  selectedSubCategories,
  setSelectedSubCategories,
}) => {
  console.log('data', data);
  const [product, setproduct] = useState(null);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    setproduct({ ...data, colection: data.colection._id });
  }, [data]);

  useEffect(() => {
    if (newImage) setproduct((prev) => ({ ...prev, image: newImage }));
  }, [newImage]);

  useEffect(() => {
    if (!product) return;

    if (allcategories?.subCategories) {
      setSelectedSubCategories(allcategories?.subCategories[product.category]);
    }
  }, [product?.category]);

  useEffect(() => {
    if (product) {
      const { image, price, _id, __v, ...productDetails } = product;

      console.log('adafdf', product);

      setUpdatedProduct({
        image,
        price: price ? parseFloat(price) : 0,
        cardId: _id,
        productDetails,
        colection: product.colection,
        category: product.category,
        subCategory: product.subCategory,
      });
    }
  }, [product]);

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <label>Product ID</label>
        <Input
          value={product?.productID || ''}
          name="productID"
          onChange={(e) => handleStateChange(e, setproduct)}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Product Name (En)</label>
        <Input
          value={product?.nameEn || ''}
          name="nameEn"
          onChange={(e) => handleStateChange(e, setproduct)}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Product Name (Ar)</label>
        <Input
          value={product?.nameAr || ''}
          name="nameAr"
          onChange={(e) => handleStateChange(e, setproduct)}
        />
      </div>

      <label>Image</label>
      <div>
        {newImage ? (
          <img src={URL.createObjectURL(newImage)} height={100} width={100} />
        ) : (
          <img
            src={
              product?.image?.includes('http')
                ? product?.image
                : `${import.meta.env.VITE_REACT_APP_BACKEND_IMAGE_URL}/${
                    product?.image
                  }`
            }
            height={100}
            width={100}
          />
        )}
        <Input type="file" onChange={(e) => setNewImage(e.target.files[0])} />
      </div>

      {/* <div style={{ marginBottom: "10px" }}>
        <label>Category Name (En)</label>
        <Input
          value={product?.categoryNameEn || ""}
          name="categoryNameEn"
          onChange={(e) => handleStateChange(e, setproduct)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Category Name (Ar)</label>
        <Input
          value={product?.categoryNameAr || ""}
          name="categoryNameAr"
          onChange={(e) => handleStateChange(e, setproduct)}
        />
      </div> */}

      <div style={{ marginTop: '10px' }}>
        <label>Price ({product?.currency}) </label>
        <Input
          value={product?.price || ''}
          name="price"
          onChange={(e) => handleStateChange(e, setproduct)}
        />
      </div>

      <div style={{ marginTop: '10px' }}>
        <label>Price in SAR </label>
        <Input
          value={product?.priceInSAR || ''}
          name="priceInSAR"
          onChange={(e) => handleStateChange(e, setproduct)}
        />
      </div>

      {allcollections && (
        <div style={{ marginTop: '10px' }}>
          <label>Select Collection</label>
          <Select
            style={{
              width: '100%',
            }}
            value={product?.colection}
            options={allcollections}
            name="colection"
            onChange={(value) =>
              setproduct((prev) => ({ ...prev, colection: value }))
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
            value={product?.category}
            options={allcategories?.category}
            name="category"
            onChange={(value) =>
              setproduct((prev) => ({
                ...prev,
                category: value,
                subCategory: '',
              }))
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
            value={product?.subCategory}
            onChange={(value) =>
              setproduct((prev) => ({ ...prev, subCategory: value }))
            }
          />
        </div>
      )}

      {/* <div style={{ marginBottom: "10px" }}>
        <label>Merchant Name (En)</label>
        <Input
          value={product?.merchantNameEn || ""}
          name="merchantNameEn"
          onChange={(e) => handleStateChange(e, setproduct)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Merchant Name (Ar)</label>
        <Input
          value={product?.merchantNameAr || ""}
          name="merchantNameAr"
          onChange={(e) => handleStateChange(e, setproduct)}
        />
      </div> */}

      {/* <div style={{ marginBottom: "10px" }}>
        <label>Face Value</label>
        <Input
          value={product?.faceValue || ""}
          name="faceValue"
          onChange={(e) => handleStateChange(e, setproduct)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>How to use (AR)</label>
        <Input
          value={product?.howToUseAr || ""}
          name="howToUseAr"
          onChange={(e) => handleStateChange(e, setproduct)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>How to use (En)</label>
        <Input
          value={product?.howToUseEn || ""}
          name="howToUseEn"
          onChange={(e) => handleStateChange(e, setproduct)}
        />
      </div> */}

      {/* <div style={{ marginBottom: "10px" }}>
        <label>Curreny</label>
        <Input
          value={product?.currency || ""}
          name="currency"
          onChange={(e) => handleStateChange(e, setproduct)}
        />
      </div> */}

      {/* <div style={{ marginBottom: "10px" }}>
        <label>Price Before Vat</label>
        <Input
          value={product?.costPriceBeforeVat || ""}
          name="costPriceBeforeVat"
          onChange={(e) => handleStateChange(e, setproduct)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Price After Vat</label>
        <Input
          value={product?.costPriceAfterVat || ""}
          name="costPriceAfterVat"
          onChange={(e) => handleStateChange(e, setproduct)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Vat amount</label>
        <Input
          value={product?.costPriceVatAmount || ""}
          name="costPriceVatAmount"
          onChange={(e) => handleStateChange(e, setproduct)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Vat %</label>
        <Input
          value={product?.vatPercentage || ""}
          name="vatPercentage"
          onChange={(e) => handleStateChange(e, setproduct)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Vat Type</label>
        <Input
          value={product?.vatType || ""}
          name="vatType"
          onChange={(e) => handleStateChange(e, setproduct)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Reommended retail price after vat</label>
        <Input
          value={product?.recommendedRetailPriceAfterVat || ""}
          name="recommendedRetailPriceAfterVat"
          onChange={(e) => handleStateChange(e, setproduct)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Reommended retail price Before vat</label>
        <Input
          value={product?.recommendedRetailPriceBeforeVat || ""}
          name="recommendedRetailPriceBeforeVat"
          onChange={(e) => handleStateChange(e, setproduct)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Reommended retail Vat Value</label>
        <Input
          value={product?.recommendedRetailPriceVatAmount || ""}
          name="recommendedRetailPriceBeforeVat"
          onChange={(e) => handleStateChange(e, setproduct)}
        />
      </div> */}
    </div>
  );
};

export default UpdateProductModal;
