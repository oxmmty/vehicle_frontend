import { Button, Form, Input, Popconfirm, Modal, notification } from "antd";
import axios from "axios";
import CTable from "src/components/CTable";
import { useEffect, useState } from "react";

const getShipperNameRules = () => [
  { required: true, message: "荷主名称を入力してください！" },
  { max: 50, message: "荷主名称は50文字以内で入力してください。" },
];

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
  let inputNode = <Input />;

  const getValidationRules = () => {
    switch (dataIndex) {
      case "荷主名称":
        return getShipperNameRules();
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

const ShipperList = () => {
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();
  const [datas, setDatas] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchShippers();
  }, []);

  const fetchShippers = async () => {
    try {
      const res = await axios.get(process.env.REACT_API_BASE_URL + `/shipper`);
      setDatas(res.data);
    } catch (error) {
      notification.error({
        message: "エラー",
        description: "荷主の読み込みに失敗しました。",
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

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const updatedShipper = { ...row };

      await axios.put(
        process.env.REACT_API_BASE_URL + `/shipper/${key}`,
        updatedShipper,
      );

      notification.success({
        message: "成功",
        description: "荷主情報が正常に更新されました。",
      });
      setEditingKey("");
      fetchShippers();
    } catch (errInfo) {
      notification.error({
        message: "エラー",
        description: "変更を保存できません。",
      });
    }
  };

  const handleDelete = async (key) => {
    try {
      await axios.delete(process.env.REACT_API_BASE_URL + `/shipper/${key}`);
      notification.success({
        message: "削除成功",
        description: "荷主が正常に削除されました。",
      });
      fetchShippers();
    } catch (error) {
      notification.error({
        message: "エラー",
        description: "荷主の削除に失敗しました。",
      });
    }
  };

  const handleAdd = async (values) => {
    try {
      await axios.post(process.env.REACT_API_BASE_URL + `/shipper`, values);
      notification.success({
        message: "追加成功",
        description: "荷主が正常に追加されました。",
      });
      setIsModalVisible(false);
      fetchShippers();
    } catch (error) {
      notification.error({
        message: "エラー",
        description: "荷主の追加に失敗しました。",
      });
    }
  };

  const columns = [
    {
      title: "荷主名称",
      dataIndex: "荷主名称",
      editable: true,
      align: "center",
    },
    {
      title: "担当",
      dataIndex: "担当",
      editable: true,
      align: "center",
    },
    {
      title: "TEL",
      dataIndex: "TEL",
      editable: true,
      align: "center",
    },
    {
      title: "FAX",
      dataIndex: "FAX",
      editable: true,
      align: "center",
    },
    {
      title: "住所",
      dataIndex: "住所",
      editable: true,
      align: "center",
    },
    {
      title: "操作",
      align: "center",
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
        title="荷主を追加"
        visible={isModalVisible}
        onCancel={handleCancelModal}
        footer={null}>
        <Form form={addForm} onFinish={handleAdd}>
          <Form.Item name="荷主名称" rules={getShipperNameRules()}>
            <Input placeholder="荷主名称" />
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

export default ShipperList;
