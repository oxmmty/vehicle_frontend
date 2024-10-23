import { Button, Form, Input, Popconfirm, Modal, notification } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import CTable from "src/components/CTable";

const getTelRules = () => [
  { message: "TELを入力してください！" },
  {
    pattern: /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/,
    message: "TELは数字とハイフンのみ入力可能です。",
  },
];

const getFaxRules = () => [
  { message: "FAXを入力してください！" },
  {
    pattern: /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/,
    message: "FAXは数字とハイフンのみ入力可能です。",
  },
];

const getAddressRules = () => [
  { message: "住所を入力してください！" },
  { min: 10, message: "住所は最低10文字必要です。" },
];

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

  const getValidationRules = () => {
    switch (dataIndex) {
      case "TEL":
        return getTelRules();
      case "FAX":
        return getFaxRules();
      case "住所":
        return getAddressRules();
      default:
        return [];
    }
  };
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={getValidationRules()}>
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const ShipCompany = () => {
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
      const res = await axios.get(process.env.REACT_API_BASE_URL + `/ship`);
      setDatas(res.data);
    } catch (error) {
      notification.error({
        message: "エラー",
        description: "船社の読み込みに失敗しました。",
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
        process.env.REACT_API_BASE_URL + `/ship/${key}`,
        updatedCustomer,
      );

      notification.success({
        message: "成功",
        description: "船社が正常に更新されました。",
      });
      setEditingKey("");
      fetchCustomers(); // Reload data after editing
    } catch (errInfo) {
      notification.error({
        message: "エラー",
        description: "変更を保存できませんでした。",
      });
    }
  };

  // Delete customer
  const handleDelete = async (key) => {
    try {
      await axios.delete(process.env.REACT_API_BASE_URL + `/ship/${key}`);
      notification.success({
        message: "削除成功",
        description: "船社が正常に削除されました。",
      });
      fetchCustomers(); // Reload data after deletion
    } catch (error) {
      notification.error({
        message: "エラー",
        description: "船社の削除に失敗しました。",
      });
    }
  };

  // Add a new customer
  const handleAdd = async (values) => {
    try {
      await axios.post(process.env.REACT_API_BASE_URL + `/ship`, values);
      notification.success({
        message: "追加成功",
        description: "船社が正常に追加されました。",
      });
      setIsModalVisible(false);
      fetchCustomers(); // Reload data after adding
    } catch (error) {
      notification.error({
        message: "エラー",
        description: "船社の追加に失敗しました。",
      });
    }
  };

  const columns = [
    {
      title: "船社名称",
      dataIndex: "船社名称",
      editable: true,
    },
    // {
    //   title: "カウント",
    //   dataIndex: "カウント",
    //   editable: true,
    // },
    {
      title: "担当",
      dataIndex: "担当",
      editable: true,
    },
    {
      title: "TEL",
      dataIndex: "TEL",
      editable: true,
    },
    {
      title: "FAX",
      dataIndex: "FAX",
      editable: true,
    },
    {
      title: "住所",
      dataIndex: "住所",
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
              保存
            </Button>
            <Popconfirm
              title="キャンセルしてもよろしいですか？"
              onConfirm={cancel}>
              <Button type="link">キャンセル</Button>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Button
              type="link"
              disabled={editingKey !== ""}
              onClick={() => edit(record)}>
              編集
            </Button>
            <Popconfirm
              title="本当に削除しますか？"
              onConfirm={() => handleDelete(record._id)}>
              <Button type="link" danger>
                削除
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
        <div className="flex justify-end mb-4">
          <Button onClick={showAddModal} type="primary">
            荷主を追加
          </Button>
        </div>
        <CTable
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
          pagination={true}
          ps={10}
        />
      </Form>

      <Modal
        title="Add Customer"
        visible={isModalVisible}
        onCancel={handleCancelModal}
        footer={null}>
        <Form form={addForm} onFinish={handleAdd}>
          <Form.Item
            name="船社名称"
            rules={[
              { required: true, message: "船社名称を入力してください！" },
            ]}>
            <Input placeholder="船社名称" />
          </Form.Item>

          <Form.Item name="担当">
            <Input placeholder="担当" />
          </Form.Item>
          <Form.Item name="TEL" rules={getTelRules()}>
            <Input placeholder="TEL" />
          </Form.Item>
          <Form.Item name="FAX" rules={getFaxRules()}>
            <Input placeholder="FAX" />
          </Form.Item>
          <Form.Item name="住所" rules={getAddressRules()}>
            <Input placeholder="住所" />
          </Form.Item>
          <Form.Item>
            <div className="flex justify-end">
              <Button type="primary" htmlType="submit">
                追加
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default ShipCompany;
