import { Button, DatePicker, Form, Select, Table } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";

const BillingListPage = () => {
  const [datas, setDatas] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // For storing filtered data
  const [selectedMonth, setSelectedMonth] = useState(dayjs()); // State to store the selected month

  const columns = [
    {
      title: "受注コード",
      dataIndex: "識別コード",
      key: "識別コード",
    },
    {
      title: "日付",
      dataIndex: "配達日1",
      key: "配達日1",
      render: (text) => dayjs(text).format("YYYY-MM-DD"),
    },
    {
      title: "顧客名",
      dataIndex: "顧客名",
      key: "顧客名",
    },
    {
      title: "積地",
      dataIndex: "取場所",
      key: "取場所",
    },
    {
      title: "配達先",
      dataIndex: "配達先1",
      key: "配達先1",
    },
    {
      title: "船社",
      dataIndex: "船社B",
      key: "船社B",
    },
    {
      title: "下払会社1",
      dataIndex: "下払会社名1",
      key: "下払会社名1",
    },
    {
      title: "下払会社2",
      dataIndex: "下払会社名2",
      key: "下払会社名2",
    },
    {
      title: "下払会社3",
      dataIndex: "下払会社名3",
      key: "下払会社名3",
    },
    {
      title: "下払会社4",
      dataIndex: "下払会社名4",
      key: "下払会社名4",
    },
    {
      title: "下払会社5",
      dataIndex: "下払会社名5",
      key: "下払会社名5",
    },
    {
      title: "下払会社6",
      dataIndex: "下払会社名6",
      key: "下払会社名6",
    },
    {
      title: "保管場所",
      dataIndex: "保管場所",
      key: "保管場所",
    },
    {
      title: "請求書作成日",
      dataIndex: "請求書作成日",
      key: "請求書作成日",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/order");
      console.log("Fetched Data:", res.data); // Log the fetched data
      setDatas(res.data);
      filterDataByMonth(dayjs(), res.data); // Initialize with current month data
    };
    fetchData();
  }, []);

  const handleDateChange = (date) => {
    setSelectedMonth(date);
    filterDataByMonth(date, datas);
  };

  const filterDataByMonth = (month, data) => {
    const filtered = data.filter((item) => {
      const orderDate = dayjs(item.配達日1).format("YYYY-MM");
      return orderDate === month.format("YYYY-MM");
    });
    setFilteredData(filtered);
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
          <Form.Item label={"請求状況"} className="grow">
            <Select defaultValue={"すべて"} style={{ width: 100 }}>
              {status.length > 0 ? (
                status.map((data) => (
                  <Option key={data} value={data}>
                    {data}
                  </Option>
                ))
              ) : (
                <Option disabled>Loading...</Option>
              )}
            </Select>
          </Form.Item>
          <Button type="primary" className="grow">
            作成
          </Button>
        </div>
      </Form>
      <Table
        columns={columns}
        dataSource={filteredData}
        scroll={{ x: "max-content" }}
        className="w-full"
      />
    </div>
  );
};

export default BillingListPage;
