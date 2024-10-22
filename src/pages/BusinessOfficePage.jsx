import {
  Table,
  Button,
  Form,
  Input,
  Select,
  Popconfirm,
  notification,
  Modal,
} from "antd";
import { useState, useEffect } from "react";
import axios from "axios";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  workStations, // Add workStations prop here
  index,
  children,
  ...restProps
}) => {
  let inputNode = <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[{ required: true, message: `Please Input ${title}!` }]}>
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const BusinessOffice = () => {
  const [form] = Form.useForm();
  const [datas, setDatas] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isAdmin = true; // Replace with actual check for admin

  const loadData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_API_BASE_URL}/work`);
      setDatas(res.data);
    } catch (error) {
      notification.error({
        message: "Failed to Load Data",
        description: error.response?.data?.message || "Unable to load data.",
      });
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const isEditing = (record) => record._id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      email: "",
      workStation: undefined, // Reset work station value
      ...record,
    });
    setEditingKey(record._id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...datas];
      const index = newData.findIndex((item) => key === item._id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setDatas(newData);
        setEditingKey("");

        await axios.put(`${process.env.REACT_API_BASE_URL}/work/${key}`, {
          ...newData[index],
        });

        notification.success({
          message: "事業所 Updated",
          description: `事業所 has been successfully updated.`,
        });
      }

      // Reload the data after successful update
      await loadData();
    } catch (errInfo) {
      notification.error({
        message: "保存に失敗しました！",
        description:
          errInfo.response?.data?.message || "Unable to save changes.",
      });
      console.log("Validate Failed:", errInfo);
    }
  };

  const handleDelete = async (key) => {
    try {
      await axios.delete(`${process.env.REACT_API_BASE_URL}/work/${key}`);
      notification.success({
        message: "事業所 Deleted",
        description: `事業所 has been successfully deleted.`,
      });

      // Reload the data after successful delete
      await loadData();
    } catch (error) {
      notification.error({
        message: "Delete Failed",
        description:
          error.response?.data?.message || "Failed to delete the 事業所.",
      });
      console.error("Failed to delete 事業所:", error);
    }
  };

  const handleAdd = async (values) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_API_BASE_URL}/work`,
        values,
      );
      setDatas([...datas, response.data]);

      notification.success({
        message: "事業所 Added",
        description: `事業所 has been successfully added.`,
      });
      setIsModalVisible(false);

      // Reload the data after successful add
      await loadData();
    } catch (error) {
      notification.error({
        message: "Add Failed",
        description: error.response?.data?.message || "Failed to add the user.",
      });
    }
  };

  const showAddModal = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "事業所コード",
      dataIndex: "事業所コード",
      editable: true,
    },
    {
      title: "事業所名",
      dataIndex: "事業所名",
      editable: true,
    },
    {
      title: "部署コード",
      dataIndex: "部署コード",
      editable: true,
    },
    {
      title: "識別コード連番",
      dataIndex: "識別コード連番",
      editable: true,
    },
    {
      title: "操作",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return isAdmin ? (
          editable ? (
            <span>
              <Button
                onClick={() => save(record._id)}
                type="link"
                style={{ marginRight: 8 }}>
                Save
              </Button>
              <Popconfirm
                title="キャンセルしてもよろしいですか？"
                onConfirm={cancel}>
                <Button type="link">Cancel</Button>
              </Popconfirm>
            </span>
          ) : (
            <span>
              <Button
                type="link"
                disabled={editingKey !== ""}
                onClick={() => edit(record)}>
                Edit
              </Button>
              <Popconfirm
                title="Are you sure to delete?"
                onConfirm={() => handleDelete(record._id)}>
                <Button type="link" danger>
                  Delete
                </Button>
              </Popconfirm>
            </span>
          )
        ) : null;
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      {isAdmin && (
        <Button
          type="primary"
          onClick={showAddModal}
          style={{ marginBottom: 16 }}>
          Add 事業所
        </Button>
      )}
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          rowKey="_id"
          bordered
          dataSource={datas}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{ pageSize: 20 }}
        />
      </Form>

      {/* Add User Modal */}
      <Modal
        title="Add 事業所"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}>
        <Form form={form} onFinish={handleAdd} layout="vertical">
          <Form.Item
            name="事業所コード"
            label="事業所コード"
            rules={[
              { required: true, message: "Please input the 事業所コード!" },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="事業所名"
            label="事業所名"
            rules={[{ required: true, message: "Please input the 事業所名!" }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="部署コード"
            label="部署コード"
            rules={[
              { required: true, message: "Please input the 部署コード!" },
              {
                pattern: /^\d{4}$/,
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="識別コード連番"
            label="識別コード連番"
            rules={[
              { required: true, message: "Please input the 識別コード連番!" },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Add 事業所
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BusinessOffice;
