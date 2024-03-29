export function mergeObjects(parentsArray) {
  let mergedParents = [];
  parentsArray.forEach((parent) => {
    let mergedChild = {};
    for (let key in parent) {
      if (
        parent.hasOwnProperty(key) &&
        typeof parent[key] === 'object' &&
        key !== 'projectDetailsHolder' &&
        key !== 'colection'
      ) {
        Object.assign(mergedChild, parent[key]);
      } else {
        mergedChild[key] = parent[key];
      }
    }
    mergedParents.push(mergedChild);
  });
  return mergedParents;
}

export const handleStateChange = (e, stateName) => {
  const { name, value } = e.target;
  console.log('name', name);
  console.log('value', value);
  stateName((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};

export const getColections = (data) => {
  let collections = [];
  // collections.push({ value: 0, label: 'None' });
  data.map((collection) => {
    collections.push({ value: collection?._id, label: collection?.name });
  });
  return collections;
};

export const getCategoriesAndSubcategories = (data) => {
  let category = [];
  // category.push({ value: 0, label: 'None' });
  let subCategories = {};
  data.map((mainCategory) => {
    category.push({ value: mainCategory?._id, label: mainCategory?.name });
    let newSubcategories = [];
    mainCategory?.subCategories?.map((subCategories) => {
      newSubcategories.push({
        value: subCategories?._id ? subCategories?._id : subCategories?.id,
        label: subCategories?.subCategoryName,
      });
    });
    subCategories[mainCategory?._id] = newSubcategories;
  });

  return { category, subCategories };
};

export const separateCMSImages = (imageObjectList, imageType) => {
  let imageUrlList = [];

  imageObjectList?.map((image) => {
    if (image.imageType == imageType) {
      imageUrlList.push(image);
    }
  });

  return imageUrlList;
};

export function filterByProductCollection(data, collectionName) {
  if (collectionName === 'general') return data;
  return data.filter((item) => item.productCollection === collectionName);
}

export function sortByCreatedAtDescending(arrayOfObjects) {
  return arrayOfObjects.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA;
  });
}

const getKeys = (searchObj) => {
  const keys = Object.keys(searchObj).filter((key) => {
    return (
      searchObj[key] !== '' &&
      searchObj[key] !== undefined &&
      key !== 'startDate' &&
      key !== 'endDate'
    );
  });
  return keys;
};

export function searchData(searchObj, allData) {
  // Extract the keys from searchObj that are not empty
  const keysToSearch = getKeys(searchObj);

  if (keysToSearch.length === 0) return allData; // If no search criteria, return all data

  return allData.filter((record) => {
    return keysToSearch.every((key) => {
      // Handling nested 'colection' and 'category' object searches
      if (key === 'colection' || key === 'category') {
        const recordValue = record[key]?._id?.toString().toLowerCase();
        const searchValue = searchObj[key]?.toString().toLowerCase();
        return recordValue?.includes(searchValue);
      }
      // Handling 'title' search
      else if (key === 'title') {
        const recordValue = record[key]?.toString().toLowerCase();
        const searchValue = searchObj[key]?.toString().toLowerCase();
        return recordValue?.includes(searchValue);
      }
      // Handling 'productID' search within 'giftCards' array
      else if (key === 'productID') {
        return record.giftCards?.some(
          (giftCard) =>
            giftCard.referenceNo
              .toString()
              .toLowerCase()
              .includes(searchObj[key].toString().toLowerCase()) ||
            giftCard.code
              .toString()
              .toLowerCase()
              .includes(searchObj[key].toString().toLowerCase())
        );
      }
      // General case for other keys
      else {
        const recordValue = record[key]?.toString().toLowerCase();
        const searchValue = searchObj[key]?.toString().toLowerCase();
        return recordValue?.includes(searchValue);
      }
    });
  });
}
