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
  workStations,
  index,
  children,
  ...restProps
}) => {
  let inputNode = <Input />;

  if (dataIndex === "workStation") {
    inputNode = (
      <Select>
        {workStations.map((station) => (
          <Select.Option key={station._id} value={station.事業所名}>
            {station.事業所名}
          </Select.Option>
        ))}
      </Select>
    );
  }

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

const UserManage = () => {
  const [form] = Form.useForm();
  const [datas, setDatas] = useState([]);
  const [workStations, setWorkStations] = useState([]); // State for workstations
  const [editingKey, setEditingKey] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isAdmin = true; // Replace with actual check for admin

  const loadData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_API_BASE_URL}/userInfo`);
      setDatas(res.data);
    } catch (error) {
      notification.error({
        message: "Failed to Load Data",
        description: error.response?.data?.message || "Unable to load data.",
      });
      console.error("Failed to fetch data:", error);
    }
  };

  const loadWorkStations = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_API_BASE_URL}/work`);
      setWorkStations(res.data); // Assuming response data contains workstations
    } catch (error) {
      notification.error({
        message: "Failed to Load Workstations",
        description:
          error.response?.data?.message || "Unable to load workstations.",
      });
      console.error("Failed to fetch workstations:", error);
    }
  };

  useEffect(() => {
    loadData();
    loadWorkStations(); // Load workstations on component mount
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

        await axios.put(`${process.env.REACT_API_BASE_URL}/userInfo/${key}`, {
          ...newData[index],
        });

        notification.success({
          message: "User Updated",
          description: `${item.name} has been successfully updated.`,
        });
      }

      // Reload the data after successful update
      await loadData();
    } catch (errInfo) {
      notification.error({
        message: "Save Failed",
        description:
          errInfo.response?.data?.message || "Unable to save changes.",
      });
      console.log("Validate Failed:", errInfo);
    }
  };

  const handleDelete = async (key) => {
    try {
      await axios.delete(`${process.env.REACT_API_BASE_URL}/userInfo/${key}`);
      notification.success({
        message: "User Deleted",
        description: `User has been successfully deleted.`,
      });

      // Reload the data after successful delete
      await loadData();
    } catch (error) {
      notification.error({
        message: "Delete Failed",
        description:
          error.response?.data?.message || "Failed to delete the user.",
      });
      console.error("Failed to delete user:", error);
    }
  };

  const handleAdd = async (values) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_API_BASE_URL}/userInfo`,
        values,
      );
      setDatas([...datas, response.data]);

      notification.success({
        message: "User Added",
        description: `${values.name} has been successfully added.`,
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
      title: "名称",
      dataIndex: "name",
      editable: true,
    },
    {
      title: "メール",
      dataIndex: "email",
      editable: true,
    },
    {
      title: "事業所名",
      dataIndex: "workStation",
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
              <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
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
        inputType: col.dataIndex === "email" ? "email" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        workStations: col.dataIndex === "workStation" ? workStations : [], // Pass workStations only for workStation field
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
          Add User
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
        title="Add User"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}>
        <Form form={form} onFinish={handleAdd} layout="vertical">
          <Form.Item
            name="name"
            label="名称"
            rules={[
              { required: true, message: "Please input the user's name!" },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="メール"
            rules={[
              { required: true, message: "Please input the user's email!" },
              { type: "email", message: "Please input a valid email!" },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="workStation"
            label="事業所名"
            rules={[
              {
                required: true,
                message: "Please select the user's work station!",
              },
            ]}>
            <Select>
              {workStations.map((station) => (
                <Select.Option key={station._id} value={station.事業所名}>
                  {station.事業所名}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="password" // Add password field
            label="Password"
            rules={[
              { required: true, message: "Please input the user's password!" },
            ]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Add User
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserManage;
