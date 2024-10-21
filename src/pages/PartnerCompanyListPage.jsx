import { DatePicker, Table, Typography, Input, Form, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const { Title } = Typography;

const PartnerCompanyListPage = () => {
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [datas, setDatas] = useState([]);
  const [editingKey, setEditingKey] = useState(""); // Track which row is being edited
  const [loading, setLoading] = useState(false); // Loading state for saving data

  const isEditing = (record) => record._id === editingKey; // Check if the row is being edited

  const edit = (record) => {
    setEditingKey(record._id); // Set the editing key to the selected row's _id
  };

  const save = async (_id) => {
    try {
      const row = await form.validateFields(); // Get edited values from the form
      const newData = [...datas];
      const index = newData.findIndex((item) => _id === item._id);

      if (index > -1) {
        const item = newData[index];
        const updatedRow = { ...item, ...row };

        // Set loading state during the update process
        setLoading(true);

        // Send the updated row data to the backend using _id as the identifier
        await axios.put(`/companyPriceList/${_id}`, updatedRow);

        // Update the local data
        newData.splice(index, 1, updatedRow);
        setDatas(newData);
        setEditingKey(""); // Exit edit mode
        message.success("データが更新されました。");

        setLoading(false);
      }
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
      setLoading(false);
      message.error("更新に失敗しました。");
    }
  };

  const cancel = () => {
    setEditingKey(""); // Exit edit mode without saving
  };

  // Merge row span for the specified field
  const mergedRowSpan = (datas, field) => {
    const rowSpanMap = {};
    let previousValue = null;
    let spanCount = 0;

    datas.forEach((item, index) => {
      if (item[field] === previousValue) {
        rowSpanMap[index] = 0; // merge with previous cell
        spanCount += 1;
      } else {
        previousValue = item[field];
        rowSpanMap[index - spanCount] = spanCount + 1; // update the previous block's span
        spanCount = 0;
      }
    });

    // Handle the last group
    if (spanCount > 0) {
      rowSpanMap[datas.length - spanCount - 1] = spanCount + 1;
    }

    return rowSpanMap;
  };

  const columns = [
    {
      title: "協力会社名",
      dataIndex: "協力会社名",
      onCell: (_, index) => {
        const rowSpanMap = mergedRowSpan(datas, "協力会社名");
        return {
          rowSpan: rowSpanMap[index] || 1, // Default rowSpan is 1 if not found
        };
      },
    },
    {
      title: "配達先名称",
      dataIndex: "配達先",
    },
    {
      title: "サイズ",
      dataIndex: "サイズ",
    },
    {
      title: "料金",
      dataIndex: "料金",
    },
    {
      title: "距離",
      dataIndex: "距離",
      editable: true, // Mark as editable
    },
    {
      title: "タリフ比率",
      dataIndex: "タリフ比率",
      editable: true, // Mark as editable
    },
    {
      title: "操作",
      render: (_, record) => {
        const editable = isEditing(record); // Check if the current row is being edited
        return editable ? (
          <span>
            <a onClick={() => save(record._id)} style={{ marginRight: 8 }}>
              保存
            </a>
            <a onClick={cancel}>キャンセル</a>
          </span>
        ) : (
          <a disabled={editingKey !== ""} onClick={() => edit(record)}>
            編集
          </a>
        ); // Disable editing for multiple rows
      },
    },
  ];

  // Define how editable cells are rendered
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/companyPriceList");
      const dataWithKey = res.data.map((item) => ({ ...item, key: item._id })); // Ensure each row has a key as _id
      setDatas(dataWithKey);
    };
    fetchData();
  }, []);

  // Editable cell component
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    record,
    children,
    ...restProps
  }) => {
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}>
            <Input />
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const [form] = Form.useForm();

  return (
    <div className="flex flex-col gap-0">
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          dataSource={datas}
          columns={mergedColumns}
          scroll={{ x: "max-content" }}
          pagination={false}
          className="w-full"
          rowClassName="editable-row"
          loading={loading} // Show loading spinner while saving
        />
      </Form>
    </div>
  );
};

export default PartnerCompanyListPage;
