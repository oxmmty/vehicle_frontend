import { Button, DatePicker, Table, Typography } from "antd";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CTable from "src/components/CTable";
const RequestPdfListPage = () => {
  const [date, setDate] = useState(dayjs().startOf("month"));
  const [datas, setDatas] = useState([]);
  const [filteredDatas, setFilteredDatas] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.data;
  const columns = [
    {
      title: "選択",
      dataIndex: "選択",
      align: "center",
      render: (_, record) => (
        <input
          type="checkbox"
          checked={selectedRowKeys.includes(record.リクエスト番号)}
          onChange={() => handleCheckboxChange(record.リクエスト番号)}
        />
      ),
    },
    {
      title: "No",
      align: "center",
      render: (_, __, index) => index + 1,
    },
    {
      title: "リクエスト番号",
      dataIndex: "リクエスト番号",
      key: "リクエスト番号",
      align: "center",
    },
    {
      title: "部署コード",
      dataIndex: "部署コード",
      key: "部署コード",
      align: "center",
    },
    {
      title: "支払い確認",
      dataIndex: "支払い確認",
      key: "支払い確認",
      align: "center",
      render: (text, record) => (
        <input
          type="checkbox"
          checked={record.支払い確認 === true}
          onChange={() => handlePaymentConfirmationChange(record)}
        />
      ),
    },
    {
      title: "下払会社名",
      dataIndex: "下払会社名",
      key: "下払会社名",
      align: "center",
    },
    {
      title: "区分",
      dataIndex: "区分",
      key: "区分",
      align: "center",
    },
    {
      title: "依頼日",
      dataIndex: "依頼日",
      key: "依頼日",
      align: "center",
    },
    {
      title: "搬出場所",
      dataIndex: "搬出場所",
      key: "搬出場所",
      align: "center",
    },
    {
      title: "軸数",
      dataIndex: "軸数",
      key: "軸数",
      align: "center",
    },
    {
      title: "コンテナNo",
      dataIndex: "コンテナNo",
      key: "コンテナNo",
      align: "center",
    },
    {
      title: "コンテナタイプ",
      dataIndex: "コンテナタイプ",
      key: "コンテナタイプ",
      align: "center",
    },
    {
      title: "コンテナサイズ",
      dataIndex: "コンテナサイズ",
      key: "コンテナサイズ",
      align: "center",
    },
    {
      title: "コンテナ種類",
      dataIndex: "コンテナ種類",
      key: "コンテナ種類",
      align: "center",
    },
    {
      title: "危険品",
      dataIndex: "危険品",
      key: "危険品",
      align: "center",
    },
    {
      title: "配達先",
      dataIndex: "配達先",
      key: "配達先",
      align: "center",
    },
    {
      title: "積日1",
      dataIndex: "積日1",
      key: "積日1",
      align: "center",
      render: (text, record) => {
        if (record.積日1) {
          return dayjs(record.積日1).format("YYYY-MM-DD");
        }
      },
    },
    {
      title: "配達日1",
      dataIndex: "配達日1",
      key: "配達日1",
      align: "center",
      render: (text, record) => {
        if (record.配達日1) {
          return dayjs(record.配達日1).format("YYYY-MM-DD");
        }
      },
    },
    {
      title: "配達時間1",
      dataIndex: "配達時間1",
      key: "配達時間1",
      align: "center",
    },
    {
      title: "配達先住所1",
      dataIndex: "配達先住所1",
      key: "配達先住所1",
      align: "center",
    },
    {
      title: "配達先TEL1",
      dataIndex: "配達先TEL1",
      key: "配達先TEL1",
      align: "center",
    },
    {
      title: "配達先担当者1",
      dataIndex: "配達先担当者1",
      key: "配達先担当者1",
      align: "center",
    },
    {
      title: "3軸料金1",
      dataIndex: "3軸料金1",
      key: "3軸料金1",
      align: "center",
    },
    {
      title: "配達先2",
      dataIndex: "配達先2",
      key: "配達先2",
      align: "center",
    },
    {
      title: "積日2",
      dataIndex: "積日2",
      key: "積日2",
      align: "center",
      render: (text, record) => {
        if (record.積日2) {
          return dayjs(record.積日2).format("YYYY-MM-DD");
        }
      },
    },
    {
      title: "配達日2",
      dataIndex: "配達日2",
      key: "配達日2",
      align: "center",
      render: (text, record) => {
        if (record.配達日2) {
          return dayjs(record.配達日2).format("YYYY-MM-DD");
        }
      },
    },
    {
      title: "配達時間2",
      dataIndex: "配達時間2",
      key: "配達時間2",
      align: "center",
    },
    {
      title: "配達先住所2",
      dataIndex: "配達先住所2",
      key: "配達先住所2",
      align: "center",
    },
    {
      title: "配達先TEL2",
      dataIndex: "配達先TEL2",
      key: "配達先TEL2",
      align: "center",
    },
    {
      title: "配達先担当者2",
      dataIndex: "配達先担当者2",
      key: "配達先担当者2",
      align: "center",
    },
    {
      title: "配達先3",
      dataIndex: "配達先3",
      key: "配達先3",
      align: "center",
    },
    {
      title: "積日3",
      dataIndex: "積日3",
      key: "積日3",
      align: "center",
      render: (text, record) => {
        if (record.積日3) {
          return dayjs(record.積日3).format("YYYY-MM-DD");
        }
      },
    },
    {
      title: "配達日3",
      dataIndex: "配達日3",
      key: "配達日3",
      align: "center",
      render: (text, record) => {
        if (record.配達日3) {
          return dayjs(record.配達日3).format("YYYY-MM-DD");
        }
      },
    },
    {
      title: "配達時間3",
      dataIndex: "配達時間3",
      key: "配達時間3",
      align: "center",
    },
    {
      title: "配達先住所3",
      dataIndex: "配達先住所3",
      key: "配達先住所3",
      align: "center",
    },
    {
      title: "配達先TEL3",
      dataIndex: "配達先TEL3",
      key: "配達先TEL3",
      align: "center",
    },
    {
      title: "配達先担当者3",
      dataIndex: "配達先担当者3",
      key: "配達先担当者3",
      align: "center",
    },
    {
      title: "搬入返却場所",
      dataIndex: "搬入返却場所",
      key: "搬入返却場所",
      align: "center",
    },
    {
      title: "船名",
      dataIndex: "船名",
      key: "船名",
      align: "center",
    },
    {
      title: "VOYNo",
      dataIndex: "VOYNo",
      key: "VOYNo",
      align: "center",
    },
    {
      title: "船社",
      dataIndex: "船社",
      key: "船社",
      align: "center",
    },
    {
      title: "BKNo",
      dataIndex: "BKNo",
      key: "BKNo",
      align: "center",
    },
    {
      title: "BLNo",
      dataIndex: "BLNo",
      key: "BLNo",
      align: "center",
    },
    {
      title: "荷揚港",
      dataIndex: "荷揚港",
      key: "荷揚港",
      align: "center",
    },
    {
      title: "最終仕向",
      dataIndex: "最終仕向",
      key: "最終仕向",
      align: "center",
    },
    {
      title: "荷主名",
      dataIndex: "荷主名",
      key: "荷主名",
      align: "center",
    },
    {
      title: "依頼書備考1",
      dataIndex: "依頼書備考1",
      key: "依頼書備考1",
      align: "center",
    },
    {
      title: "基本料金",
      dataIndex: "基本料金",
      key: "基本料金",
      align: "center",
    },
    {
      title: "その他費用",
      dataIndex: "その他費用",
      key: "その他費用",
      align: "center",
    },
    {
      title: "スケール費",
      dataIndex: "スケール費",
      key: "スケール費",
      align: "center",
    },
    {
      title: "高速費",
      dataIndex: "高速費",
      key: "高速費",
      align: "center",
    },
    {
      title: "シャーシ留置費",
      dataIndex: "シャーシ留置費",
      key: "シャーシ留置費",
      align: "center",
    },
    {
      title: "備考欄",
      dataIndex: "備考欄",
      key: "備考欄",
      align: "center",
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/pdfList");
        setDatas(res.data);
        filterData(dayjs().format("YYYY-MM"), res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const filterData = (selectedDate, dataToFilter) => {
    if (data) {
      const filtered = dataToFilter.filter((item) => {
        const invoiceDate = dayjs(item.依頼日).format("YYYY-MM");
        return invoiceDate === selectedDate, data === item.受注コード;
      });
      setFilteredDatas(filtered);
    } else {
      const filtered = dataToFilter.filter((item) => {
        const invoiceDate = dayjs(item.依頼日).format("YYYY-MM");
        return invoiceDate === selectedDate;
      });
      setFilteredDatas(filtered);
    }
  };
  const handleDateChange = (date) => {
    if (date) {
      setDate(date);
      filterData(date.format("YYYY-MM"), datas);
    }
  };

  const handleCheckboxChange = (リクエスト番号) => {
    setSelectedRowKeys((prevKeys) =>
      prevKeys.includes(リクエスト番号)
        ? prevKeys.filter((key) => key !== リクエスト番号)
        : [...prevKeys, リクエスト番号],
    );
  };

  const handlePaymentConfirmationChange = async (record) => {
    const newValue = !record.支払い確認;

    setFilteredDatas((prevDatas) =>
      prevDatas.map((data) =>
        data._id === record._id ? { ...data, 支払い確認: newValue } : data,
      ),
    );

    try {
      await axios.put(`/pdfList/status/${record._id}`, {
        支払い確認: newValue,
      });
    } catch (error) {
      console.error("Error updating payment confirmation:", error);

      setFilteredDatas((prevDatas) =>
        prevDatas.map((data) =>
          data._id === record._id ? { ...data, 支払い確認: !newValue } : data,
        ),
      );
    }
  };

  const handlePdfButtonClick = (param) => {
    console.log(param);
    const selectedRows = filteredDatas.filter((row) =>
      selectedRowKeys.includes(row.リクエスト番号),
    );
    if (selectedRows.length > 0) {
      if (param == "依頼書") {
        navigate("/orders_invoices/newRequestForm", {
          state: { data: selectedRows, req: "real" },
        });
      } else if (param == "仮依頼書") {
        navigate("/orders_invoices/newRequestForm", {
          state: { data: selectedRows, req: "fake" },
        });
      }
    } else {
      alert("Please select at least one request.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="sm:flex-row justify-evenly w-full">
        <Typography className="ml-10 mt-5 justify-center">
          <DatePicker picker="month" value={date} onChange={handleDateChange} />
        </Typography>
        <div className="ml-4 flex-row flex gap-4">
          <Button
            type="primary"
            onClick={(e) => handlePdfButtonClick("仮依頼書")}
            className="mt-5">
            仮依頼書
          </Button>
          <Button
            type="primary"
            onClick={(e) => handlePdfButtonClick("依頼書")}
            className="mt-5">
            依頼書
          </Button>
        </div>
      </div>

      <div className="w-full">
        <CTable
          dataSource={filteredDatas}
          columns={columns}
          scroll={{ x: "max-content" }}
          size="small"
          className="table-fixed"
          // pagination={{ pageSize: 12, position: ["bottomCenter"] }}
          ps={12}
        />
      </div>
    </div>
  );
};

export default RequestPdfListPage;
