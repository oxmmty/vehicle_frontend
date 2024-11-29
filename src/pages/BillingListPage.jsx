import { Button, DatePicker, Form, Select, Table, Checkbox, Input } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Assuming react-router-dom is used for navigation
import axios from "axios";
import dayjs from "dayjs";
import CTable from "src/components/CTable";

const BillingListPage = () => {
  const [datas, setDatas] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(dayjs());
  const [selectedRows, setSelectedRows] = useState([]); // State for storing selected rows
  const [customerFilter, setCustomerFilter] = useState(""); // State for customer name filter
  const navigate = useNavigate(); // Navigation hook

  const columns = [
    {
      title: "選択",
      key: "select",
      align: "center",
      render: (_, record) =>
        record.delete == true ? (
          <Checkbox
            disabled
            checked={selectedRows.includes(record.識別コード)}
            onChange={(e) => handleRowSelection(e.target.checked, record)}
          />
        ) : (
          <Checkbox
            checked={selectedRows.includes(record.識別コード)}
            onChange={(e) => handleRowSelection(e.target.checked, record)}
          />
        ),
    },
    {
      title: "受注コード",
      dataIndex: "識別コード",
      key: "識別コード",
      align: "center",
    },
    {
      title: "日付",
      dataIndex: "配達日1",
      key: "配達日1",
      align: "center",
      render: (text) => dayjs(text).format("YYYY-MM-DD"),
    },
    {
      title: "顧客名",
      dataIndex: "顧客名",
      key: "顧客名",
      align: "center",
    },
    {
      title: "積地",
      dataIndex: "取場所",
      key: "取場所",
      align: "center",
    },
    {
      title: "配達先",
      dataIndex: "配達先1",
      key: "配達先1",
      align: "center",
    },
    {
      title: "船社",
      dataIndex: "船社B",
      key: "船社B",
      align: "center",
    },
    {
      title: "下払会社1",
      dataIndex: "下払会社名1",
      key: "下払会社名1",
      align: "center",
    },
    {
      title: "下払会社2",
      dataIndex: "下払会社名2",
      key: "下払会社名2",
      align: "center",
    },
    {
      title: "下払会社3",
      dataIndex: "下払会社名3",
      key: "下払会社名3",
      align: "center",
    },
    {
      title: "下払会社4",
      dataIndex: "下払会社名4",
      key: "下払会社名4",
      align: "center",
    },
    {
      title: "下払会社5",
      dataIndex: "下払会社名5",
      key: "下払会社名5",
      align: "center",
    },
    {
      title: "下払会社6",
      dataIndex: "下払会社名6",
      key: "下払会社名6",
      align: "center",
    },
    {
      title: "保管場所",
      dataIndex: "保管場所",
      key: "保管場所",
      align: "center",
    },
    {
      title: "請求書作成日",
      dataIndex: "請求書作成日",
      key: "請求書作成日",
      align: "center",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/order");
      setDatas(res.data);
      filterDataByMonth(dayjs(), res.data); // Initialize with current month data
    };

    fetchData();
  }, []);

  const handleDateChange = (date) => {
    setSelectedMonth(date);
    filterDataByMonth(date, datas);
  };

  const handleCustomerFilterChange = (e) => {
    setCustomerFilter(e.target.value);
    filterDataByMonth(selectedMonth, datas, e.target.value); // Re-filter when customer name changes
  };

  const filterDataByMonth = (month, data, customerName = "") => {
    const filtered = data.filter((item) => {
      const orderDate = dayjs(item.配達日1).format("YYYY-MM");
      const matchesMonth = orderDate === month.format("YYYY-MM");
      const matchesCustomerName = item.顧客名.includes(customerName); // Filter by customer name

      return matchesMonth && matchesCustomerName; // Combine filters
    });

    setFilteredData(filtered);
  };

  const handleRowSelection = (isSelected, record) => {
    if (isSelected) {
      setSelectedRows([...selectedRows, record.識別コード]);
    } else {
      setSelectedRows(selectedRows.filter((id) => id !== record.識別コード));
    }
  };

  const handleCreateButton = () => {
    if (selectedRows.length > 0) {
      navigate("/orders_invoices/invoice", { state: { data: selectedRows } });
    } else {
      alert("Please select at least one row.");
    }
  };

  const status = ["すべて", "未請求", "請求済"];

  return (
    <div className="flex flex-col items-center w-full">
      <Form layout="vertical">
        <div className="flex flex-wrap flex-row items-center gap-4">
          <Form.Item label={"年月"} className="grow">
            <DatePicker
              picker="month"
              value={selectedMonth}
              onChange={handleDateChange}
            />
          </Form.Item>
          <Form.Item label={"顧客名"} className="grow">
            <Input
              placeholder="顧客名でフィルタ"
              value={customerFilter}
              onChange={handleCustomerFilterChange}
            />
          </Form.Item>
          <Form.Item label={"請求状況"} className="grow">
            <Select defaultValue={"すべて"} style={{ width: 100 }}>
              {status.map((data) => (
                <Select.Option key={data} value={data}>
                  {data}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Button type="primary" className="grow" onClick={handleCreateButton}>
            作成
          </Button>
        </div>
      </Form>
      <div className="w-full">
        <CTable
          columns={columns}
          dataSource={filteredData}
          scroll={{ x: "max-content" }}
          rowKey="識別コード"
          className="table-fixed"
          size="small"
          ps={12}
        />
      </div>
    </div>
  );
};

export default BillingListPage;
