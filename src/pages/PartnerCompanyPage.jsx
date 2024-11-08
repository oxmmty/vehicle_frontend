import React, { useEffect, useState } from "react";
import CTable from "src/components/CTable";
import { Button, Form, Input, Popconfirm, Modal, notification } from "antd";
import axios from "axios";

const validateEmail = (_, value) => {
  if (value && !/\S+@\S+\.\S+/.test(value)) {
    return Promise.reject(
      new Error("有効なメールアドレスを入力してください！"),
    );
  }
  return Promise.resolve();
};

const validateCC = (_, value) => {
  if (value) {
    const emails = value.split(",");
    const emailRegex = /\S+@\S+\.\S+/;
    const isValid = emails.every((email) => emailRegex.test(email.trim()));
    return isValid
      ? Promise.resolve()
      : Promise.reject(
          new Error("有効なメールアドレスをカンマで区切って入力してください！"),
        );
  }
  return Promise.resolve(); // Allow empty value
};

const phoneNumberValidator = (_, value) => {
  if (value && !/^[0-9]{10,11}$/.test(value)) {
    return Promise.reject(
      new Error("有効な電話番号を入力してください！(10桁または11桁の半角数字)"),
    );
  }
  return Promise.resolve();
};

const faxNumberValidator = (_, value) => {
  if (value && !/^[0-9]{10,11}$/.test(value)) {
    return Promise.reject(
      new Error("有効なFAX番号を入力してください！(10桁または11桁の半角数字)"),
    );
  }
  return Promise.resolve();
};

const validateAddress = (_, value) => {
  if (value && value.length < 5) {
    return Promise.reject(new Error("住所は5文字以上で入力してください！"));
  }
  return Promise.resolve(); // Allow empty value
};

const EditableCell = ({
  editing,
  dataIndex,
  title,
  record,
  index,
  children,
  ...restProps
}) => {
  const getValidationRules = (dataIndex) => {
    switch (dataIndex) {
      case "アドレス":
        return [{ validator: validateEmail }];
      case "CC":
        return [{ validator: validateCC }];
      case "TEL":
        return [{ validator: validatePhoneNumber }];
      case "FAX":
        return [{ validator: validateFaxNumber }];
      case "住所":
        return [{ validator: validateAddress }];
      default:
        return [{ required: true, message: `${title}を入力してください！` }];
    }
  };

  return (
    <td {...restProps} className="scrollable-cell">
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={getValidationRules(dataIndex)}>
          <Input className="scrollable-input" />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default function PartnerCompanyPage() {
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();
  const [datas, setDatas] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchPartnerCompanies();
  }, []);

  // Fetch partner company data from the API
  const fetchPartnerCompanies = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_API_BASE_URL}/partnercompany`,
      );
      // Sort data by カウント before setting it to state
      const sortedData = res.data.sort((a, b) => b.カウント - a.カウント);
      setDatas(sortedData);
    } catch (error) {
      notification.error({
        message: "エラー",
        description: "協力会社の読み込みに失敗しました。",
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

  // Save changes to the partner company
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const updatedCompany = { ...row };

      // Update partner company via API
      await axios.put(
        `${process.env.REACT_API_BASE_URL}/partnercompany/${key}`,
        updatedCompany,
      );

      notification.success({
        message: "成功",
        description: "Partner company updated successfully.",
      });
      setEditingKey("");
      fetchPartnerCompanies(); // Reload data after editing
    } catch (errInfo) {
      notification.error({
        message: "エラー",
        description: "Unable to save changes.",
      });
    }
  };

  // Delete partner company
  const handleDelete = async (key) => {
    try {
      await axios.delete(
        process.env.REACT_API_BASE_URL + `/partnercompany/${key}`,
      );
      notification.success({
        message: "成功",
        description: "協力会社が正常に削除されました。",
      });
      fetchPartnerCompanies(); // Reload data after deletion
    } catch (error) {
      notification.error({
        message: "エラー",
        description: "協力会社の削除に失敗しました。",
      });
    }
  };

  // Add a new partner company
  const handleAdd = async (values) => {
    try {
      await axios.post(
        `${process.env.REACT_API_BASE_URL}/partnercompany`,
        values,
      );
      notification.success({
        message: "成功",
        description: "協力会社が正常に追加されました。",
      });
      setIsModalVisible(false);
      fetchPartnerCompanies(); // Reload data after adding
    } catch (error) {
      notification.error({
        message: "エラー",
        description: "協力会社の追加に失敗しました。",
      });
    }
  };

  const columns = [
    {
      title: "協力会社",
      dataIndex: "協力会社",
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
      title: "アドレス",
      dataIndex: "アドレス",
      editable: true,
      align: "center",
      validationRules: [{ validator: validateEmail }],
    },
    {
      title: "CC",
      dataIndex: "CC",
      editable: true,
      align: "center",
      validationRules: [{ validator: validateCC }],
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
      validationRules: [{ validator: validateAddress }],
    },
    {
      title: "操作",
      dataIndex: "operation",
      align: "center",
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
              title="Are you sure to delete?"
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
        <div className="flex justify-end p-4">
          <Button
            onClick={showAddModal}
            type="primary"
            className=" w-32 h-12 z-1">
            協力会社を追加
          </Button>
        </div>

        <CTable
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          virtualscroll={{ x: 2000, y: 500 }}
          className="overflow-scroll"
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
        title="協力会社を追加"
        visible={isModalVisible}
        onCancel={handleCancelModal}
        footer={null}>
        <Form form={addForm} onFinish={handleAdd}>
          <Form.Item
            name="協力会社"
            rules={[
              { required: true, message: "「協力会社を入力してください！" },
            ]}>
            <Input placeholder="協力会社" />
          </Form.Item>
          <Form.Item
            name="担当"
            rules={[{ required: true, message: "担当を入力してください！" }]}>
            <Input placeholder="担当" />
          </Form.Item>
          <Form.Item name="アドレス" rules={[{ validator: validateEmail }]}>
            <Input placeholder="アドレス" />
          </Form.Item>
          <Form.Item name="CC" rules={[{ validator: validateCC }]}>
            <Input placeholder="CC" />
          </Form.Item>
          <Form.Item name="TEL" rules={[{ validator: phoneNumberValidator }]}>
            <Input placeholder="TEL" />
          </Form.Item>
          <Form.Item name="FAX" rules={[{ validator: faxNumberValidator }]}>
            <Input placeholder="FAX" />
          </Form.Item>
          <Form.Item name="住所" rules={[{ validator: validateAddress }]}>
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
