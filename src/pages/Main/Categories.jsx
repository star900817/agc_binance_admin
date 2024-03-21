import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Input, Form } from "antd";
import {
  MenuOutlined,
  DeleteOutlined,
  EditOutlined,
  UpOutlined,
  DownOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import {
  createCategory,
  getCategories,
  swapCategory,
  deleteCategory,
  updateCategoryDetail,
} from "../../services/categories";
import { toast } from "react-toastify";
import { generateRandomString } from "../../util/generateId";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 20,
    },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 4,
    },
  },
};

const Categories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [getCategoriesData, setgetCategoriesData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [imageChangeIndex, setImageChangeIndex] = useState([]);

  const imageUrl = import.meta.env.VITE_REACT_APP_BACKEND_IMAGE_URL;

  const [hideImage, setHideImage] = useState(false);

  const [modalKey, setModalKey] = useState(0);

  const [editCategoryData, setEditCategoryData] = useState(null);
  let initialCategoryState = {
    uuid: generateRandomString(5),
    title: "",
    image: null,
    subcategory: [],
  };
  const [category, setCategory] = useState(initialCategoryState);

  const [error, setError] = useState(false);

  const [subCategory, setSubCategory] = useState([
    {
      id: generateRandomString(5),
      subCategoryName: "",
    },
  ]);

  useEffect(() => {
    getCategoriesDetails();
  }, []);

  useEffect(() => {
    setCategory((prev) => ({ ...prev, subcategory: subCategory }));
  }, [subCategory]);

  const handleSubCategoryList = (id, title, image, index) => {
    
    const updatedParaInput = subCategory.map((item) => {
      if (item.id === id) {
        console.log(image, title);

        if (title !== undefined) return { ...item, subCategoryName: title };
        if (image !== undefined && index !== undefined) {
          
          setImageChangeIndex((prev) => [...prev, index]);
          return { ...item, subCategoryImage: image };
        } else return { ...item };
      }
      return item;
    });
    console.log("updatedParaInput", updatedParaInput);
    setSubCategory(updatedParaInput);
  };

  const showModal = () => {    
    setModalKey(prevKey => prevKey + 1);
    setIsModalOpen(true);
    setCategory(initialCategoryState);
    setSubCategory([
      {
        id: generateRandomString(5),
        subCategoryName: "",
      },
    ]);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEdit(false);
    setError(false);
    setCategory(initialCategoryState);
    setSubCategory([
      {
        id: generateRandomString(5),
        subCategoryName: "",
      },
    ]);
  };

  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  const handleChange = (e) => {
    if (e.target.name == "title") {
      if (e.target.value == "") {
        setError(true);
      } else {
        setError(false);
      }
    }
    setCategory((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    console.log("e", e);
    setCategory((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleCategoryCoverImage = (e) => {
    setCategory((prev) => ({ ...prev, categoryCoverImage: e.target.files[0] }));
  };

  const handleSubmit = async () => {

    if (category.title == "") {
      setError(true);
    } else {
      const fb = new FormData();
      fb.append("name", category.title);
      fb.append("image", category.image);
      fb.append("uid", new Date().getTime());
      // fb.append("subCategories[]", JSON.stringify(category.subcategory));
      category.subcategory.forEach((item, index) => {
        if (item.subCategoryName != "") {
          let detailObj = {
            id: item.id,
            subCategoryName: item.subCategoryName,
          };
          fb.append("subCategories", JSON.stringify(detailObj));
          fb.append("subCategoryImage", item.subCategoryImage);
        }        
      });

      let { success, message, data } = await createCategory(fb);
      if (success == 200) {
        toast.success(message);
        getCategoriesDetails();
        setCategory(initialCategoryState);
        setSubCategory([
          {
            id: generateRandomString(5),
            subCategoryName: "",
          },
        ]);
        setIsModalOpen(false);
      }
    }
  };

  const removeElementFromArray = (array, element) => {
    if (array.length <= 1) {
      return array;
    }
    const newArr = array.filter((item) => {
      return item.id !== element;
    });

    return newArr;
  };

  const getCategoriesDetails = async () => {
    let { success, data } = await getCategories();
    setgetCategoriesData(data);
  };

  const upCategoryOrder =async (index) => {
    if (index > 0) {
      console.log(index);
      const firstID = getCategoriesData[index]._id;
      const secondID = getCategoriesData[index - 1]._id;
      const { success, message } = await swapCategory(firstID, secondID);
      if (success == 200) {
        toast.success(message);
        getCategoriesDetails();
      }
    }
  }

  const downCategoryOrder =async (index) => {
    if (index < getCategoriesData.length - 1) {
      console.log(index);
      const firstID = getCategoriesData[index]._id;
      const secondID = getCategoriesData[index + 1]._id;
      const { success, message } = await swapCategory(firstID, secondID);
      if (success == 200) {
        toast.success(message);
        getCategoriesDetails();
      }
    }
  }

  const deleteCategoryData = async (id) => {
    const { success, message } = await deleteCategory(id);
    if (success == 200) {
      toast.success(message);
      getCategoriesDetails();
    }
  };

  const editCtaegoryData = async (id) => {
    const findData = getCategoriesData.find((item) => item._id == id);
    console.log("findData", findData);
    setEdit(true);
    setEditCategoryData(findData);
    setHideImage(false);
    setCategory({
      uuid: findData?._id,
      title: findData?.name,
      image: findData?.image,
      subcategory: findData?.subCategories,
      ...(findData?.categoryCoverImage && {
        categoryCoverImage: findData?.categoryCoverImage,
      }),
    });
    if(findData?.subCategories?.length > 0) {
      setSubCategory(findData?.subCategories);
    } else {
      setSubCategory([
        {
          id: generateRandomString(5),
          subCategoryName: "",
        },
      ]);
    }

    // setSubCategory()
    setEdit(true);
    setIsModalOpen(true);
  };

  const updateCategories = async () => {
    if (category.title == "") {
      setError(true);
    } else {
      const fb = new FormData();
      fb.append("categoryId", category.uuid);
      fb.append("name", category.title);
      // fb.append("subCategories", JSON.stringify(category.subcategory));
      fb.append("image", category.image);
      fb.append("categoryCoverImage", category.categoryCoverImage);
      
      let indedArray = [];
      console.log(category.subcategory);
      category.subcategory.forEach((obj, index) => {
        if (obj.subCategoryImage instanceof File) {
          let detailObj = {
            id: obj.id,
            subCategoryName: obj.subCategoryName,
          };
          fb.append("imageDetails", JSON.stringify(detailObj));
          fb.append("subCategoryImage", obj.subCategoryImage);
          indedArray.push(index);
        } else {
          let detailObj = {
            id: obj.id,
            subCategoryName: obj.subCategoryName,
            subCategoryImage: obj.subCategoryImage
          };
          fb.append("imageDetails", JSON.stringify(detailObj));
        }
      });
      fb.append("imageChangeIndex", JSON.stringify(indedArray));

      let { success, message } = await updateCategoryDetail(fb);
      if (success == 200) {
        toast.success(message);
        setIsModalOpen(false);
        setEdit(false);
        getCategoriesDetails();
        setCategory(initialCategoryState);
        setSubCategory([
          {
            id: generateRandomString(5),
            subCategoryName: "",
          },
        ]);
      }
    }
  };

  const handleditImageChange = (e) => {
    setHideImage(true);
    setCategory((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleEditCoverImageChange = (e) => {
    setCategory((prev) => ({ ...prev, categoryCoverImage: e.target.files[0] }));
  };

  const columns = [    
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (value, record, index) => {

        return (
          <>            
            <UpOutlined 
              style={{ margin: "0 15px 0 0", cursor: "pointer" }}
              onClick={() => upCategoryOrder(index)} />

            <DownOutlined 
              style={{ margin: "0 15px 0 0", cursor: "pointer" }}
              onClick={() => downCategoryOrder(index)} />

            <DeleteOutlined
              style={{ margin: "0 15px 0 0", cursor: "pointer", color: '#F93C65' }}
              onClick={() => deleteCategoryData(record._id)}
            />
            <EditOutlined
              style={{ margin: "0 15px 0 0", cursor: "pointer", color: '#00B6DE' }}
              onClick={() => editCtaegoryData(record._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <Button
        type="primary"
        htmlType="submit"
        onClick={showModal}
        className="categoryBtn"
      >
        Add Category
      </Button>

      {edit === true ? (
        <Modal
          key={modalKey}
          title="Update Categories"
          open={isModalOpen}
          onOk={updateCategories}
          onCancel={handleCancel}
          footer={[
            <Button key="submit" type="primary" onClick={updateCategories}>
              Update
            </Button>,
          ]}
        >
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <div style={{ margin: "0 0 50 0" }}>
              <label>Name:</label>
              <Input
                type="text"
                placeholder="Basic usage"
                name="title"
                onChange={handleChange}
                value={category?.title}
                className="form-control"
              />
              {error && (
                <span className="error">Category field is required !</span>
              )}
            </div>

            <p style={{ marginBottom: "3px" }}>Change Image:</p>
            <input type="file" onChange={handleditImageChange} name="image" />

            <div style={{ margin: "0 0 20 0" }}>
              {hideImage == false ? (
                <>
                  <div className="" style={{ marginTop: "15px" }}>
                    <label style={{ display: "block" }}>Uploaded Image:</label>
                    <img
                      src={`${imageUrl}/${category.image}`}
                      className="categoryImg"
                    />
                  </div>
                </>
              ) : (
                <>
                  <img src="" />
                </>
              )}
            </div>

            <h5>Sub-Categories</h5>
            <Form
              name="dynamic_form_item"
              {...formItemLayoutWithOutLabel}
              onFinish={onFinish}
              style={{
                maxWidth: 600,
              }}
            >
              <div className="col-span-6">
                <div>
                  {subCategory?.map((item, index) => (
                    <div
                      key={item.id}
                      className="field"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        marginTop: "20px",
                      }}
                    >
                      <button
                        className="subCatBtn"
                        style={{ width: "5%" }}
                        onClick={() =>
                          setSubCategory([
                            ...subCategory,
                            {
                              id: generateRandomString(5),
                              subCategoryName: "",
                            },
                          ])
                        }
                      >
                        <span
                          style={{ color: "black" }}
                          className="text-[30px] ml-[20px] cursor-pointer addsubCategories"
                        >
                          +
                        </span>
                      </button>

                      <div style={{ display: "block", width: "90%" }}>
                        <Input
                          name={"subCategoryName"}
                          style={{ marginBottom: "10px" }}
                          onChange={(e) =>
                            handleSubCategoryList(item?.id, e.target.value)
                          }
                          value={item?.subCategoryName || ""}
                        />

                       { item?.subCategoryImage? (typeof item?.subCategoryImage === "object" ? (
                          <img
                            src={URL.createObjectURL(item?.subCategoryImage)}
                            height={200}
                            width={200}
                          />
                        ) : (
                          <img
                            src={`${imageUrl}/${item?.subCategoryImage}`}
                            height={200}
                            width={200}
                          />
                        )) : ''}
                        <input
                          type="file"
                          id={item.id}
                          onChange={(e) =>
                            handleSubCategoryList(
                              item.id,
                              undefined,
                              e.target.files[0],
                              index
                            )
                          }
                        ></input>
                      </div>
                      <div
                        // className="removeSubCategories"
                        style={{
                          width: "5%",
                          paddingLeft: "12px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setSubCategory(
                            removeElementFromArray(subCategory, item.id)
                          );
                        }}
                      >
                        <CloseCircleOutlined />
                      </div>
                    </div>
                  ))}

                </div>
              </div>
            </Form>
          </Form.Item>
        </Modal>
      ) : (
        <Modal
          key={modalKey}
          title="Add Categories"
          open={isModalOpen}
          onOk={handleSubmit}
          onCancel={handleCancel}
        >
          <div style={{ margin: "0 0 50 0" }}>
            <Input
              type="text"
              placeholder="Add category name"
              name="title"
              value={category?.title}
              onChange={handleChange}
              className="form-control"
            />
            {error && (
              <span className="error">Category field is required !</span>
            )}
          </div>
          <div style={{ marginTop: "20px" }}>
            <>
              <label>Upload Image:</label>
              <Input
                type="file"
                placeholder="Basic usage"
                name="image"
                onChange={(e) => handleImageChange(e)}
              />
            </>
          </div>

          {/* <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            <>
              <label>Upload category cover image:</label>
              <Input
                type="file"
                placeholder="Basic usage"
                name="CategoryCoverImage"
                onChange={(e) => handleCategoryCoverImage(e)}
              />
            </>
          </div> */}
          <h5> Sub-Categories</h5>
          <Form
            name="dynamic_form_item"
            {...formItemLayoutWithOutLabel}
            onFinish={onFinish}
            style={{
              maxWidth: 600,
            }}
          >
            <div className="col-span-6">
              <div>
                {subCategory?.map((item, index) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <Button
                      className="mb-[10px]"
                      style={{marginRight: '5px'}}
                      onClick={() =>
                        setSubCategory([
                          ...subCategory,
                          {
                            id: generateRandomString(5),
                            subCategoryName: "",
                          },
                        ])
                      }
                    >
                      <span
                        className="text-[30px] ml-[20px] cursor-pointer addsubCategories"
                        onClick={() =>
                          setSubCategory([
                            ...subCategory,
                            {
                              id: generateRandomString(5),
                              subCategoryName: "",
                            },
                          ])
                        }
                      >
                        +
                      </span>
                    </Button>
                    <Input
                      name={"subCategoryName"}
                      style={{marginRight: '5px'}}
                      onChange={(e) =>
                        handleSubCategoryList(item?.id, e.target.value)
                      }
                      value={item?.subCategoryName || ""}
                    />
                    <Input
                          type="file"
                          style={{marginRight: '5px'}}
                          placeholder="Basic usage"
                          name="subCategoryImage"
                          onChange={(e) => handleSubCategoryList(
                            item.id,
                            undefined,
                            e.target.files[0],
                            index
                          )}
                        />
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setSubCategory(
                          removeElementFromArray(subCategory, item.id)
                        );
                      }}
                    >
                      x
                    </div>                    
                  </div>
                ))}
              </div>
            </div>
          </Form>
        </Modal>
      )}

      <Table dataSource={getCategoriesData} columns={columns} rowKey={(record) => record._id} />
    </>
  );
};

export default Categories;
