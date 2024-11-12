import { DatePicker, Table, Typography, Input, Form, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import CTable from "src/components/CTable";

const CustomerListPage = () => {
  const [datas, setDatas] = useState([]);
  const [editingKey, setEditingKey] = useState(""); // Track which row is being edited
  const [loading, setLoading] = useState(false); // Loading state for saving data

  const isEditing = (record) => record._id === editingKey; // Use _id as the key for editing

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
        await axios.put(`/customerPriceList/${_id}`, updatedRow);

        // Update the local data
        newData.splice(index, 1, updatedRow);
        setDatas(newData);
        setEditingKey(""); // Exit edit mode
        message.success("データが更新されました。");
        setLoading(false);
      }
    } catch (errInfo) {
      console.log("保存に失敗しました！:", errInfo);
      setLoading(false);
      message.error("更新に失敗しました。");
    }
  };

  const cancel = () => {
    setEditingKey(""); // Exit edit mode without saving
  };

  const columns = [
    {
      title: "顧客名",
      dataIndex: "顧客名",
      align: "center",
      onCell: (_, index) => {
        const rowSpan = getRowSpan(index, "顧客名");
        return {
          rowSpan,
        };
      },
    },
    {
      title: "配達先名称",
      dataIndex: "配達先",
      align: "center",
    },
    {
      title: "サイズ",
      dataIndex: "サイズ",
      align: "center",
    },
    {
      title: "料金",
      dataIndex: "料金",
      align: "center",
    },
    {
      title: "距離",
      dataIndex: "距離",
      align: "center",
      editable: true, // Mark as editable
    },
    {
      title: "タリフ比率",
      dataIndex: "タリフ比率",
      align: "center",
      editable: true, // Mark as editable
    },
    {
      title: "操作",
      align: "center",
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
  // const mergedColumns = columns.map((col) => {
  //   if (!col.editable) {
  //     return col;
  //   }
  //   return {
  //     ...col,
  //     onCell: (record) => ({
  //       record,
  //       editable: col.editable, // This can be used for internal logic but not passed to <td>
  //       dataIndex: col.dataIndex,
  //       title: col.title,
  //       editing: isEditing(record),
  //     }),
  //   };
  // });

  // Helper function to get row span for 顧客名
  const getRowSpan = (index, key) => {
    const currentData = datas[index];
    const previousData = index > 0 ? datas[index - 1] : null;

    if (index === 0 || currentData[key] !== previousData?.[key]) {
      let rowSpan = 1;
      let i = index + 1;
      while (i < datas.length && datas[i][key] === currentData[key]) {
        rowSpan += 1;
        i += 1;
      }
      return rowSpan;
    }
    return 0;
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/customerPriceList");
      const dataWithKey = res.data.map((item) => ({ ...item, key: item._id })); // Ensure each row has a key as _id
      setDatas(dataWithKey.sort((a, b) => a.顧客名.localeCompare(b.顧客名)));
    };
    fetchData();
  }, []);
  // const EditableCell = ({
  //   editing,
  //   dataIndex,
  //   title,
  //   record,
  //   children,
  //   ...restProps
  // }) => {
  //   return (
  //     <td {...restProps}>
  //       {editing ? (
  //         <Form.Item
  //           name={dataIndex}
  //           style={{ margin: 0 }}
  //           rules={[
  //             {
  //               required: true,
  //               message: `Please Input ${title}!`,
  //             },
  //           ]}>
  //           <Input />
  //         </Form.Item>
  //       ) : (
  //         children
  //       )}
  //     </td>
  //   );
  // };
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable, // Use for internal logic only
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  // EditableCell component
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    record,
    children,
    ...restProps // Don't include editable here
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
        <CTable
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          dataSource={datas}
          columns={mergedColumns}
          scroll={{ x: "max-content" }}
          pagination={false}
          ps={10}
          className="w-full"
          rowClassName="editable-row"
          loading={loading} // Show loading spinner while saving
        />
      </Form>
    </div>
  );
};

export default CustomerListPage;
