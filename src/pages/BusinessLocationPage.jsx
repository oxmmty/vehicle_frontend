import {
  Table,
  Typography,
  Button,
  Form,
  Input,
  Popconfirm,
  Modal,
  notification,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const { Title } = Typography;

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = <Input />;
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

const BussinessLocation = () => {
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();
  const [datas, setDatas] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Fetch customer data from the API
  const fetchCustomers = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_API_BASE_URL + `/workstation`,
      );
      setDatas(res.data);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to load workstations.",
      });
    }
  };

  const isEditing = (record) => record._id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record._id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  // Save changes to the customer
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const updatedCustomer = { ...row };

      // Update customer via API
      await axios.put(
        process.env.REACT_API_BASE_URL + `/workstation/${key}`,
        updatedCustomer,
      );

      notification.success({
        message: "Success",
        description: "Customer updated successfully.",
      });
      setEditingKey("");
      fetchCustomers(); // Reload data after editing
    } catch (errInfo) {
      notification.error({
        message: "Save Failed",
        description: "Unable to save changes.",
      });
    }
  };

  // Delete customer
  const handleDelete = async (key) => {
    try {
      await axios.delete(
        process.env.REACT_API_BASE_URL + `/workstation/${key}`,
      );
      notification.success({
        message: "Deleted",
        description: "Customer deleted successfully.",
      });
      fetchCustomers(); // Reload data after deletion
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to delete customer.",
      });
    }
  };

  // Add a new customer
  const handleAdd = async (values) => {
    try {
      await axios.post(process.env.REACT_API_BASE_URL + `/workstation`, values);
      notification.success({
        message: "Added",
        description: "Customer added successfully.",
      });
      setIsModalVisible(false);
      fetchCustomers(); // Reload data after adding
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to add customer.",
      });
    }
  };

  const columns = [
    {
      title: "作業地名称",
      dataIndex: "作業地名称",
      editable: true,
    },
    {
      title: "取場所",
      dataIndex: "取場所",
      editable: true,
    },
    {
      title: "配達場所",
      dataIndex: "配達場所",
      editable: true,
    },
    {
      title: "搬入返却場所",
      dataIndex: "搬入返却場所",
      editable: true,
    },

    {
      title: "保管場所",
      dataIndex: "保管場所",
      editable: true,
    },
    {
      title: "住所",
      dataIndex: "住所",
      editable: true,
    },
    {
      title: "依頼書備考コメント",
      dataIndex: "依頼書備考コメント",
      editable: true,
    },
    {
      title: "TEL",
      dataIndex: "TEL",
      editable: true,
    },
    {
      title: "担当者",
      dataIndex: "担当者",
      editable: true,
    },
    {
      title: "操作",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
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
          <>
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
          </>
        );
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
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const showAddModal = () => {
    setIsModalVisible(true);
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="flex flex-col gap-0">
      <Form form={form} component={false}>
        <Button
          onClick={showAddModal}
          type="primary"
          style={{ marginBottom: 16 }}>
          Add Customer
        </Button>
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
          pagination={false}
        />
      </Form>

      <Modal
        title="Add Customer"
        visible={isModalVisible}
        onCancel={handleCancelModal}
        footer={null}>
        <Form form={addForm} onFinish={handleAdd}>
          <Form.Item
            name="顧客名称"
            rules={[{ required: true, message: "Please input 顧客名称!" }]}>
            <Input placeholder="顧客名称" />
          </Form.Item>
          <Form.Item
            name="カウント"
            rules={[{ required: true, message: "Please input カウント!" }]}>
            <Input placeholder="カウント" />
          </Form.Item>
          <Form.Item
            name="担当"
            rules={[{ required: true, message: "Please input 担当!" }]}>
            <Input placeholder="担当" />
          </Form.Item>
          <Form.Item
            name="TEL"
            rules={[{ required: true, message: "Please input TEL!" }]}>
            <Input placeholder="TEL" />
          </Form.Item>
          <Form.Item
            name="FAX"
            rules={[{ required: true, message: "Please input FAX!" }]}>
            <Input placeholder="FAX" />
          </Form.Item>
          <Form.Item
            name="住所"
            rules={[{ required: true, message: "Please input 住所!" }]}>
            <Input placeholder="住所" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default BussinessLocation;
