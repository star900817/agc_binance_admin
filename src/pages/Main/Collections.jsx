import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Input, Form } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  CloseCircleOutlined,
  UpOutlined,
  DownOutlined,
} from '@ant-design/icons';
import {
  createCollection,
  getCollections,
  deleteCollection,
  updateCollectionDetail,
  swapCollection,
} from '../../services/Collections';
import { toast } from 'react-toastify';
import { generateRandomString } from '../../util/generateId';

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

const Collections = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [getCollectionsData, setgetCollectionsData] = useState([]);
  const [edit, setEdit] = useState(false);

  const [editCollectionData, setEditCollectionData] = useState(null);
  let initialCollectionState = {
    uuid: generateRandomString(5),
    title: '',
  };
  const [collection, setCollection] = useState(initialCollectionState);

  const [error, setError] = useState(false);

  useEffect(() => {
    getCollectionsDetails();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
    setCollection(initialCollectionState);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEdit(false);
    setError(false);
    setCollection(initialCollectionState);
  };

  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };

  const handleChange = (e) => {
    if (e.target.name == 'title') {
      if (e.target.value == '') {
        setError(true);
      } else {
        setError(false);
      }
    }
    setCollection((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (collection.title == '') {
      setError(true);
    } else {
      const fb = new FormData();
      fb.append('name', collection.title);
      fb.append('uid', new Date().getTime());
      let { success, message, data } = await createCollection(fb);
      if (success == 200) {
        toast.success(message);
        getCollectionsDetails();
        setCollection(initialCollectionState);
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

  const getCollectionsDetails = async () => {
    let { success, data } = await getCollections();
    setgetCollectionsData(data);
  };

  const upCategoryOrder = async (index) => {
    console.log(index);
    if (index > 0) {
      console.log(index);
      const firstID = getCollectionsData[index]._id;
      const secondID = getCollectionsData[index - 1]._id;
      const { success, message } = await swapCollection(firstID, secondID);
      if (success == 200) {
        toast.success(message);
        getCollectionsDetails();
      }
    }
  };

  const downCategoryOrder = async (index) => {
    if (index < getCollectionsData.length - 1) {
      console.log(index);
      const firstID = getCollectionsData[index]._id;
      const secondID = getCollectionsData[index + 1]._id;
      const { success, message } = await swapCollection(firstID, secondID);
      if (success == 200) {
        toast.success(message);
        getCollectionsDetails();
      }
    }
  };

  const deleteCollectionData = async (id) => {
    const { success, message } = await deleteCollection(id);
    if (success == 200) {
      toast.success(message);
      getCollectionsDetails();
    }
  };

  const editCtaegoryData = async (id) => {
    const findData = getCollectionsData.find((item) => item._id == id);
    console.log('findData', findData);
    setEdit(true);
    setEditCollectionData(findData);
    setCollection({
      uuid: findData?._id,
      title: findData?.name,
    });

    // setSubCollection()
    setEdit(true);
    setIsModalOpen(true);
  };

  const updateCollections = async () => {
    if (collection.title == '') {
      setError(true);
    } else {
      const fb = new FormData();
      fb.append('collectionId', collection.uuid);
      fb.append('name', collection.title);

      let { success, message } = await updateCollectionDetail(fb);
      if (success == 200) {
        toast.success(message);
        setIsModalOpen(false);
        setEdit(false);
        getCollectionsDetails();
        setCollection(initialCollectionState);
      }
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (value, record, index) => {
        return (
          <>
            <UpOutlined
              style={{ margin: '0 15px 0 0', cursor: 'pointer' }}
              onClick={() => upCategoryOrder(index)}
            />

            <DownOutlined
              style={{ margin: '0 15px 0 0', cursor: 'pointer' }}
              onClick={() => downCategoryOrder(index)}
            />
            <DeleteOutlined
              style={{ margin: '0 15px 0 0', cursor: 'pointer' , color: '#F93C65' }}
              onClick={() => deleteCollectionData(record._id)}
            />
            <EditOutlined
              style={{ margin: '0 15px 0 0', cursor: 'pointer', color: '#00B6DE' }}
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
        className="collectionBtn"
      >
        Add Collection
      </Button>

      {edit === true ? (
        <Modal
          title="Update Collections"
          open={isModalOpen}
          onOk={updateCollections}
          onCancel={handleCancel}
          footer={[
            <Button key="submit" type="primary" onClick={updateCollections}>
              Update
            </Button>,
          ]}
        >
          {console.log('1', edit)}
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <div style={{ margin: '0 0 50 0' }}>
              <label>Name:</label>
              <Input
                type="text"
                placeholder="Basic usage"
                name="title"
                onChange={handleChange}
                value={collection?.title}
                className="form-control"
              />
              {error && (
                <span className="error">Collection field is required !</span>
              )}
            </div>
          </Form.Item>
        </Modal>
      ) : (
        <Modal
          title="Add Collections"
          open={isModalOpen}
          onOk={handleSubmit}
          onCancel={handleCancel}
        >
          <div style={{ margin: '0 0 50 0' }}>
            <Input
              type="text"
              placeholder="Add collection name"
              name="title"
              value={collection?.title}
              onChange={handleChange}
              className="form-control"
            />
            {error && (
              <span className="error">Collection field is required !</span>
            )}
          </div>
        </Modal>
      )}

      <Table dataSource={getCollectionsData} columns={columns} rowKey="Id" />
    </>
  );
};

export default Collections;
