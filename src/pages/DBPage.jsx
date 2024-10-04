import { DatePicker, Table, Typography, Checkbox } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const { Title } = Typography;

const DBPage = () => {
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data from backend
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_API_BASE_URL}/order`,
      );
      setAllData(response.data);
      setFilteredData(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDateChange = (selectedDate) => {
    if (selectedDate) {
      const formattedDate = selectedDate.format("YYYY-MM-DD");
      setDate(formattedDate);
      const filtered = allData.filter();
      setFilteredData(filtered);
    } else {
      setFilteredData(allData);
    }
  };

  const onCheckboxChange = async (record, field, checked) => {
    const updatedRecord = { ...record, [field]: checked };
    try {
      await axios.put(`${process.env.REACT_API_BASE_URL}/order/${record._id}`, {
        [field]: checked,
        識別コード: record.識別コード,
      });
      const updatedData = filteredData.map((item) =>
        item.id === record.id ? updatedRecord : item,
      );
      setFilteredData(updatedData);
    } catch (err) {
      console.error("Error updating data:", err);
      setError("Failed to update data. Please try again.");
    }
  };

  const columns = [
    {
      title: "No",
      render: (_, __, index) => index + 1,
    },
    { key: "識別コード", title: "識別コード", dataIndex: "識別コード" },
    {
      key: "ピックチェック",
      title: "ピックチェック",
      dataIndex: "ピックチェック",
      render: (text, record) => (
        <Checkbox
          checked={record.ピックチェック || false}
          onChange={(e) => {
            if (!record.ピックチェック) {
              onCheckboxChange(record, "ピックチェック", e.target.checked);
            }
          }}
          disabled={record.ピックチェック} // Disable if checked
        />
      ),
    },
    {
      key: "配車組み",
      title: "配車組み",
      dataIndex: "配車組み",
      render: (text, record) => (
        <Checkbox
          checked={record.配車組み || false}
          onChange={(e) => {
            if (!record.配車組み) {
              onCheckboxChange(record, "配車組み", e.target.checked);
            }
          }}
          disabled={record.配車組み} // Disable if checked
        />
      ),
    },
    {
      key: "空バン返却チェック",
      title: "空バン返却チェック",
      dataIndex: "空バン返却チェック",
      render: (text, record) => (
        <Checkbox
          checked={record.空バン返却チェック || false}
          onChange={(e) => {
            if (!record.空バン返却チェック) {
              onCheckboxChange(record, "空バン返却チェック", e.target.checked);
            }
          }}
          disabled={record.空バン返却チェック} // Disable if checked
        />
      ),
    },
    {
      key: "送り状受領書作成",
      title: "送り状・受領書作成",
      dataIndex: "送り状・受領書作成",
      render: (text, record) => (
        <Checkbox
          checked={record["送り状受領書作成"] || false}
          onChange={(e) => {
            if (!record["送り状受領書作成"]) {
              onCheckboxChange(record, "送り状受領書作成", e.target.checked);
            }
          }}
          disabled={record["送り状受領書作成"]} // Disable if checked
        />
      ),
    },
    // Add other columns here as needed
    { key: "部署コード", title: "部署コード", dataIndex: "部署コード" },
    { key: "区分", title: "区分", dataIndex: "区分" },
    { key: "荷主名", title: "荷主名", dataIndex: "荷主名" },
    { key: "顧客名", title: "顧客名", dataIndex: "顧客名" },
    { key: "配達先", title: "配達先", dataIndex: "配達先" },
    { key: "配達先住所", title: "配達先住所", dataIndex: "配達先住所" },
    { key: "配達先TEL", title: "配達先TEL", dataIndex: "配達先TEL" },
    { key: "配達先担当者", title: "配達先担当者", dataIndex: "配達先担当者" },
    { key: "取場所", title: "取場所", dataIndex: "取場所" },
    { key: "搬入返却場所", title: "搬入返却場所", dataIndex: "搬入返却場所" },
    { key: "船社", title: "船社", dataIndex: "船社" },
    {
      key: "コンテナタイプ",
      title: "コンテナタイプ",
      dataIndex: "コンテナタイプ",
    },
    {
      key: "コンテナサイズ",
      title: "コンテナサイズ",
      dataIndex: "コンテナサイズ",
    },
    { key: "コンテナ種類", title: "コンテナ種類", dataIndex: "コンテナ種類" },
    { key: "危険品", title: "危険品", dataIndex: "危険品" },
    { key: "軸数", title: "軸数", dataIndex: "軸数" },
    { key: "コンテナ№", title: "コンテナ№", dataIndex: "コンテナ№" },
    { key: "シール番号", title: "シール番号", dataIndex: "シール番号" },
    { key: "TW", title: "TW", dataIndex: "TW" },
    { key: "BK№", title: "BK№", dataIndex: "BK№" },
    { key: "BL№", title: "BL№", dataIndex: "BL№" },
    { key: "船名", title: "船名", dataIndex: "船名" },
    { key: "依頼書備考欄", title: "依頼書備考欄", dataIndex: "依頼書備考欄" },
    { key: "ピック日", title: "ピック日", dataIndex: "ピック日" },
    { key: "配送日", title: "配送日", dataIndex: "配送日" },
    { key: "配送時間", title: "配送時間", dataIndex: "配送時間" },
    { key: "倉庫作業日", title: "倉庫作業日", dataIndex: "倉庫作業日" },
    { key: "倉庫作業時間", title: "倉庫作業時間", dataIndex: "倉庫作業時間" },
    { key: "自社車番", title: "自社車番", dataIndex: "自社車番" },
    { key: "自社シャーシ", title: "自社シャーシ", dataIndex: "自社シャーシ" },
    { key: "自社乗務員", title: "自社乗務員", dataIndex: "自社乗務員" },
    { key: "協力会社名", title: "協力会社名", dataIndex: "協力会社名" },
    { key: "輸送料金", title: "輸送料金", dataIndex: "輸送料金" },
    { key: "輸送課税", title: "輸送課税", dataIndex: "輸送課税" },
    { key: "下払会社名1", title: "下払会社名1", dataIndex: "下払会社名1" },
    { key: "下払料金1", title: "下払料金1", dataIndex: "下払料金1" },
    { key: "下払課税1", title: "下払課税1", dataIndex: "下払課税1" },
    { key: "下払自車1", title: "下払自車1", dataIndex: "下払自車1" },
    { key: "下払会社名2", title: "下払会社名2", dataIndex: "下払会社名2" },
    { key: "下払料金2", title: "下払料金2", dataIndex: "下払料金2" },
    { key: "下払課税2", title: "下払課税2", dataIndex: "下払課税2" },
    { key: "下払自車2", title: "下払自車2", dataIndex: "下払自車2" },
    { key: "下払会社名3", title: "下払会社名3", dataIndex: "下払会社名3" },
    { key: "下払料金3", title: "下払料金3", dataIndex: "下払料金3" },
    { key: "下払課税3", title: "下払課税3", dataIndex: "下払課税3" },
    { key: "下払自車3", title: "下払自車3", dataIndex: "下払自車3" },
    { key: "下払会社名4", title: "下払会社名4", dataIndex: "下払会社名4" },
    { key: "下払料金4", title: "下払料金4", dataIndex: "下払料金4" },
    { key: "下払課税4", title: "下払課税4", dataIndex: "下払課税4" },
    { key: "下払自車4", title: "下払自車4", dataIndex: "下払自車4" },
    { key: "下払会社名5", title: "下払会社名5", dataIndex: "下払会社名5" },
    { key: "下払料金5", title: "下払料金5", dataIndex: "下払料金5" },
    { key: "下払課税5", title: "下払課税5", dataIndex: "下払課税5" },
    { key: "下払自車5", title: "下払自車5", dataIndex: "下払自車5" },
    { key: "下払会社名6", title: "下払会社名6", dataIndex: "下払会社名6" },
    { key: "下払料金6", title: "下払料金6", dataIndex: "下払料金6" },
    { key: "下払課税6", title: "下払課税6", dataIndex: "下払課税6" },
    { key: "下払自車6", title: "下払自車6", dataIndex: "下払自車6" },
    { key: "下払会社名7", title: "下払会社名7", dataIndex: "下払会社名7" },
    { key: "下払料金7", title: "下払料金7", dataIndex: "下払料金7" },
    { key: "下払課税7", title: "下払課税7", dataIndex: "下払課税7" },
    { key: "下払自車7", title: "下払自車7", dataIndex: "下払自車7" },
    { key: "空冷", title: "空冷", dataIndex: "空冷" },
  ];

  return (
    <>
      <div className="flex flex-col gap-0">
        <Title level={3}>DBデータ</Title>
        <DatePicker
          defaultValue={dayjs(date)}
          onChange={handleDateChange}
          format="YYYY-MM-DD"
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <Table
            dataSource={filteredData} // Use the filtered data
            columns={columns}
            pagination={{ pageSize: 50 }}
            scroll={{ x: "max-content" }}
            className="w-full"
            rowKey="id" // Ensure each row has a unique key
          />
        )}
      </div>
    </>
  );
};

export default DBPage;
