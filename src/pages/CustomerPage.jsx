import { Button, Form, Input, Popconfirm, Modal, notification } from "antd";
import CTable from "src/components/CTable";
import axios from "axios";
import { useEffect, useState } from "react";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  record,
  index,
  children,
  validationRules = [],
  ...restProps
}) => {
  const inputNode = <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item name={dataIndex} rules={[...validationRules]}>
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default function CustomerPage() {
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();
  const [datas, setDatas] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get(process.env.REACT_API_BASE_URL + `/customer`);
      const sortedData = res.data.sort((a, b) => b.カウント - a.カウント);
      setDatas(sortedData);
    } catch (error) {
      notification.error({
        message: "エラー",
        description: "顧客の読み込みに失敗しました。",
      });
    }
  };

  const addressValidator = (_, value) => {
    if (value && value.length < 10) {
      return Promise.reject(
        new Error("有効な住所を入力してください！(最低10文字)"),
      );
    }
    return Promise.resolve();
  };

  const phoneNumberValidator = (_, value) => {
    if (value && !/^[0-9]{10,11}$/.test(value)) {
      return Promise.reject(
        new Error(
          "有効な電話番号を入力してください！(10桁または11桁の半角数字)",
        ),
      );
    }
    return Promise.resolve();
  };

  const faxNumberValidator = (_, value) => {
    if (value && !/^[0-9]{10,11}$/.test(value)) {
      return Promise.reject(
        new Error(
          "有効なFAX番号を入力してください！(10桁または11桁の半角数字)",
        ),
      );
    }
    return Promise.resolve();
  };

  const isEditing = (record) => record._id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record._id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const values = await form.validateFields();

      const updatedCustomer = {};
      for (let field in values) {
        updatedCustomer[field] = values[field] === null ? "" : values[field];
      }

      await axios.put(
        process.env.REACT_API_BASE_URL + `/customer/${key}`,
        updatedCustomer,
      );

      notification.success({
        message: "成功",
        description: "顧客が正常に更新されました。",
      });
      setEditingKey("");
      fetchCustomers();
    } catch (errInfo) {
      notification.error({
        message: "エラー",
        description: "変更を保存できません。",
      });
    }
  };

  const handleDelete = async (key) => {
    try {
      await axios.delete(process.env.REACT_API_BASE_URL + `/customer/${key}`);
      notification.success({
        message: "成功",
        description: "顧客を正常に削除しました。",
      });
      fetchCustomers();
    } catch (error) {
      notification.error({
        message: "エラー",
        description: "顧客の削除に失敗しました。",
      });
    }
  };

  const handleAdd = async (values) => {
    try {
      await axios.post(process.env.REACT_API_BASE_URL + `/customer`, values);
      notification.success({
        message: "成功",
        description: "顧客が正常に追加されました。",
      });
      setIsModalVisible(false);
      fetchCustomers();
    } catch (error) {
      notification.error({
        message: "エラー",
        description: "顧客の追加に失敗しました。",
      });
    }
  };

  const columns = [
    {
      title: "顧客名称",
      dataIndex: "顧客名称",
      editable: true,
      align: "center",
      validationRules: [], // No required validation here
    },
    {
      title: "担当",
      dataIndex: "担当",
      editable: true,
      align: "center",
      validationRules: [], // No required validation here
    },
    {
      title: "TEL",
      dataIndex: "TEL",
      editable: true,
      align: "center",
      validationRules: [{ validator: phoneNumberValidator }],
    },
    {
      title: "FAX",
      dataIndex: "FAX",
      editable: true,
      align: "center",
      validationRules: [{ validator: faxNumberValidator }],
    },
    {
      title: "住所",
      dataIndex: "住所",
      editable: true,
      align: "center",
      validationRules: [{ validator: addressValidator }],
    },
    {
      title: "操作",
      dataIndex: "operation",
      align: "center",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span className="flex-wrap">
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
          <span className=" flex-wrap">
            <Button
              type="link"
              disabled={editingKey !== ""}
              onClick={() => edit(record)}>
              編集
            </Button>
            <Popconfirm
              title="Are you sure to delete?"
              onConfirm={() => handleDelete(record._id)}>
              <Button type="link" danger>
                削除
              </Button>
            </Popconfirm>
          </span>
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
        validationRules: col.validationRules || [], // Pass validation rules to EditableCell
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
        <div className="flex justify-end p-4">
          <Button
            onClick={showAddModal}
            type="primary"
            className=" w-28 h-12 z-1">
            顧客を追加
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
        title="顧客を追加"
        open={isModalVisible}
        onCancel={handleCancelModal}
        footer={null}>
        <Form form={addForm} onFinish={handleAdd}>
          <Form.Item
            name="顧客名称"
            rules={[
              { required: true, message: "顧客名称を入力してください!" },
            ]}>
            <Input placeholder="顧客名称" />
          </Form.Item>

          <Form.Item
            name="担当"
            rules={[{ required: true, message: "担当を入力してください！" }]}>
            <Input placeholder="担当" />
          </Form.Item>
          <Form.Item
            name="TEL"
            rules={[
              { message: "電話番号を入力してください！" },
              { validator: phoneNumberValidator },
            ]}>
            <Input placeholder="電話番号（半角数字10桁または11桁）" />
          </Form.Item>

          <Form.Item
            name="FAX"
            rules={[
              { message: "FAXを入力してください！" },
              { validator: faxNumberValidator },
            ]}>
            <Input placeholder="FAX番号（半角数字10桁または11桁）" />
          </Form.Item>
          <Form.Item
            name="住所"
            rules={[
              { message: "住所を入力してください！" },
              { validator: addressValidator },
            ]}>
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
}
