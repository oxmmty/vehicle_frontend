import { Button, DatePicker, Table, Typography, Checkbox } from "antd";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";

const OrderDBPage = () => {
  const [date, setDate] = useState(dayjs().format("YYYY-MM"));
  const [datas, setDatas] = useState([]);
  const [filteredDatas, setFilteredDatas] = useState([]);
  // const [toFirstPane, setToFirstPane] = useState(false);
  // const [searchWord, setSearchWord] = useState("");

  const columns = [
    {
      title: "No",
      render: (_, __, index) => index + 1,
      align: "center",
    },
    {
      title: "識別コード",
      dataIndex: "識別コード",
      key: "識別コード",
      align: "center",
      sorter: function (a, b) {
        return b.識別コード.localeCompare(a.識別コード);
      },
    },
    {
      title: "請求日",
      dataIndex: "請求日",
      align: "center",
      key: "請求日",
      sorter: function (a, b) {
        return b.請求日.localeCompare(a.請求日);
      },
    },
    {
      title: "部署コード",
      dataIndex: "部署コード",
      key: "部署コード",
      align: "center",
    },
    {
      title: "区分",
      dataIndex: "区分",
      key: "区分",
      align: "center",
    },
    {
      title: "支払い確認",
      dataIndex: "支払い確認",
      key: "支払い確認",
      align: "center",
      render: (text, record) => (
        <Checkbox
          checked={record.支払い確認}
          onChange={(e) => handleCheckboxChange(e, record)}
        />
      ),
    },
    {
      title: "荷主名",
      dataIndex: "荷主名",
      key: "荷主名",
      align: "center",
    },
    {
      title: "顧客名",
      dataIndex: "顧客名",
      key: "顧客名",
      align: "center",
    },
    {
      title: "配達先1",
      dataIndex: "配達先1",
      key: "配達先1",
      align: "center",
    },
    {
      title: "配達先2",
      dataIndex: "配達先2",
      align: "center",
      key: "配達先2",
    },
    {
      title: "配達先3",
      dataIndex: "配達先3",
      key: "配達先3",
      align: "center",
    },
    {
      title: "取場所",
      dataIndex: "取場所",
      key: "取場所",
      align: "center",
    },
    {
      title: "搬入返却場所",
      dataIndex: "搬入返却場所",
      key: "搬入返却場所",
      align: "center",
    },
    {
      title: "船社",
      dataIndex: "船社",
      key: "船社",
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
      title: "コンテナNo",
      dataIndex: "コンテナNo",
      key: "コンテナNo",
      align: "center",
    },
    {
      title: "自社車番1",
      dataIndex: "自社車番1",
      key: "自社車番1",
      align: "center",
    },
    {
      title: "自社車番2",
      dataIndex: "自社車番2",
      key: "自社車番2",
      align: "center",
    },
    {
      title: "自社乗務員",
      dataIndex: "自社乗務員",
      key: "自社乗務員",
      align: "center",
    },
    {
      title: "協力会社名",
      dataIndex: "協力会社名",
      key: "協力会社名",
      align: "center",
    },
    {
      title: "下払会社名1",
      dataIndex: "下払会社名1",
      key: "下払会社名1",
      align: "center",
    },
    {
      title: "下払料金1",
      dataIndex: "下払料金1",
      key: "下払料金1",
      align: "center",
    },
    {
      title: "下払課税1",
      dataIndex: "下払課税1",
      key: "下払課税1",
      align: "center",
    },
    {
      title: "下払自車1",
      dataIndex: "下払自車1",
      key: "下払自車1",
      align: "center",
    },
    {
      title: "下払会社名2",
      dataIndex: "下払会社名2",
      key: "下払会社名2",
      align: "center",
    },
    {
      title: "下払料金2",
      dataIndex: "下払料金2",
      key: "下払料金2",
      align: "center",
    },
    {
      title: "下払課税2",
      dataIndex: "下払課税2",
      key: "下払課税2",
      align: "center",
    },
    {
      title: "下払自車2",
      dataIndex: "下払自車2",
      key: "下払自車2",
      align: "center",
    },
    {
      title: "下払会社名3",
      dataIndex: "下払会社名3",
      key: "下払会社名3",
      align: "center",
    },
    {
      title: "下払料金3",
      dataIndex: "下払料金3",
      key: "下払料金3",
      align: "center",
    },
    {
      title: "下払課税3",
      dataIndex: "下払課税3",
      key: "下払課税3",
      align: "center",
    },
    {
      title: "下払自車3",
      dataIndex: "下払自車3",
      key: "下払自車3",
      align: "center",
    },
    {
      title: "下払会社名4",
      dataIndex: "下払会社名4",
      key: "下払会社名4",
      align: "center",
    },
    {
      title: "下払料金4",
      dataIndex: "下払料金4",
      key: "下払料金4",
      align: "center",
    },
    {
      title: "下払課税4",
      dataIndex: "下払課税4",
      key: "下払課税4",
      align: "center",
    },
    {
      title: "下払自車4",
      dataIndex: "下払自車4",
      key: "下払自車4",
      align: "center",
    },
    {
      title: "下払会社名5",
      dataIndex: "下払会社名5",
      key: "下払会社名5",
      align: "center",
    },
    {
      title: "下払料金5",
      dataIndex: "下払料金5",
      key: "下払料金5",
      align: "center",
    },
    {
      title: "下払課税5",
      dataIndex: "下払課税5",
      key: "下払課税5",
      align: "center",
    },
    {
      title: "下払自車5",
      dataIndex: "下払自車5",
      key: "下払自車5",
      align: "center",
    },
    {
      title: "下払会社名6",
      dataIndex: "下払会社名6",
      key: "下払会社名6",
      align: "center",
    },
    {
      title: "下払料金6",
      dataIndex: "下払料金6",
      key: "下払料金6",
      align: "center",
    },
    {
      title: "下払課税6",
      dataIndex: "下払課税6",
      key: "下払課税6",
      align: "center",
    },
    {
      title: "下払自車6",
      dataIndex: "下払自車6",
      key: "下払自車6",
      align: "center",
    },
    {
      title: "高速費",
      dataIndex: "高速費",
      key: "高速費",
      align: "center",
    },
    {
      title: "入庫日",
      dataIndex: "入庫日",
      key: "入庫日",
      align: "center",
    },
    {
      title: "出庫日",
      dataIndex: "出庫日",
      key: "出庫日",
      align: "center",
    },
    {
      title: "荷主保管料金リフトオフ",
      dataIndex: "荷主保管料金リフトオフ",
      key: "荷主保管料金リフトオフ",
      align: "center",
    },
    {
      title: "荷主保管料金リフトオン",
      dataIndex: "荷主保管料金リフトオン",
      key: "荷主保管料金リフトオン",
      align: "center",
    },
    {
      title: "荷主保管料金1日",
      dataIndex: "荷主保管料金1日",
      key: "荷主保管料金1日",
      align: "center",
    },
    {
      title: "荷主保管課税",
      dataIndex: "荷主保管課税",
      key: "荷主保管課税",
      align: "center",
    },
    {
      title: "下払保管料金リフトオフ",
      dataIndex: "下払保管料金リフトオフ",
      key: "下払保管料金リフトオフ",
      align: "center",
    },
    {
      title: "下払保管料金リフトオン",
      dataIndex: "下払保管料金リフトオン",
      key: "下払保管料金リフトオン",
      align: "center",
    },
    {
      title: "下払保管料金1日",
      dataIndex: "下払保管料金1日",
      key: "下払保管料金1日",
      align: "center",
    },
    {
      title: "下払保管課税",
      dataIndex: "下払保管課税",
      key: "下払保管課税",
      align: "center",
    },
    {
      title: "依頼書備考",
      dataIndex: "依頼書備考",
      align: "center",

      key: "依頼書備考",
    },
    {
      title: "請求書備考",
      dataIndex: "請求書備考",
      align: "center",

      key: "請求書備考",
    },
    {
      title: "送り状受領書備考",
      dataIndex: "送り状受領書備考",
      align: "center",

      key: "送り状受領書備考",
    },
    {
      title: "スケール費",
      dataIndex: "スケール費",
      align: "center",

      key: "スケール費",
    },
    {
      title: "シャーシ留置費",
      dataIndex: "シャーシ留置費",
      align: "center",

      key: "シャーシ留置費",
    },
    {
      title: "その他費用",
      dataIndex: "その他費用",
      align: "center",

      key: "その他費用",
    },
    {
      title: "依頼書備考2",
      dataIndex: "依頼書備考2",
      key: "依頼書備考2",
      align: "center",
    },
    {
      title: "依頼書備考3",
      dataIndex: "依頼書備考3",
      align: "center",

      key: "依頼書備考3",
    },
    {
      title: "重量",
      dataIndex: "重量",
      align: "center",

      key: "重量",
    },
    {
      title: "その他課税",
      dataIndex: "その他課税",
      align: "center",

      key: "その他課税",
    },
    {
      title: "自社車番F2",
      dataIndex: "自社車番F2",
      key: "自社車番F2",
      align: "center",
    },
    {
      title: "自社車番S2",
      dataIndex: "自社車番S2",
      key: "自社車番S2",
      align: "center",
    },
    {
      title: "自社乗務員2",
      dataIndex: "自社乗務員2",
      key: "自社乗務員2",
      align: "center",
    },
    {
      title: "自社車番F3",
      dataIndex: "自社車番F3",
      key: "自社車番F3",
      align: "center",
    },
    {
      title: "自社車番S3",
      dataIndex: "自社車番S3",
      key: "自社車番S3",
      align: "center",
    },
    {
      title: "自社乗務員3",
      dataIndex: "自社乗務員3",
      key: "自社乗務員3",
      align: "center",
    },
    {
      title: "自社車番F4",
      dataIndex: "自社車番F4",
      align: "center",

      key: "自社車番F4",
    },
    {
      title: "自社車番S4",
      dataIndex: "自社車番S4",
      align: "center",

      key: "自社車番S4",
    },
    {
      title: "自社乗務員4",
      dataIndex: "自社乗務員4",
      align: "center",

      key: "自社乗務員4",
    },
    {
      title: "自社車番F5",
      dataIndex: "自社車番F5",
      align: "center",

      key: "自社車番F5",
    },
    {
      title: "自社車番S5",
      dataIndex: "自社車番S5",
      align: "center",

      key: "自社車番S5",
    },
    {
      title: "自社乗務員5",
      dataIndex: "自社乗務員5",
      align: "center",

      key: "自社乗務員5",
    },
    {
      title: "自社車番F6",
      dataIndex: "自社車番F6",
      key: "自社車番F6",
      align: "center",
    },
    {
      title: "自社車番S6",
      dataIndex: "自社車番S6",
      key: "自社車番S6",
      align: "center",
    },
    {
      title: "自社乗務員6",
      dataIndex: "自社乗務員6",
      key: "自社乗務員6",
      align: "center",
    },
    {
      title: "保管場所",
      dataIndex: "保管場所",
      key: "保管場所",
      align: "center",
    },
    {
      title: "空バン返却",
      dataIndex: "空バン返却",
      key: "空バン返却",
      align: "center",
    },
    {
      title: "CRU顧客名",
      dataIndex: "CRU顧客名",
      key: "CRU顧客名",
      align: "center",
    },
    {
      title: "軸数",
      dataIndex: "軸数",
      key: "軸数",
      align: "center",
    },
    {
      title: "スケール費課税1",
      dataIndex: "スケール費課税1",
      key: "スケール費課税1",
      align: "center",
    },
    {
      title: "シャーシ留置費課税1",
      dataIndex: "シャーシ留置費課税1",
      key: "シャーシ留置費課税1",
      align: "center",
    },
    {
      title: "高速費2",
      dataIndex: "高速費2",
      key: "高速費2",
      align: "center",
    },
    {
      title: "スケール費2",
      dataIndex: "スケール費2",
      key: "スケール費2",
      align: "center",
    },
    {
      title: "スケール費課税2",
      dataIndex: "スケール費課税2",
      key: "スケール費課税2",
      align: "center",
    },
    {
      title: "シャーシ留置費2",
      dataIndex: "シャーシ留置費2",
      key: "シャーシ留置費2",
      align: "center",
    },
    {
      title: "シャーシ留置費課税2",
      dataIndex: "シャーシ留置費課税2",
      key: "シャーシ留置費課税2",
      align: "center",
    },
    {
      title: "その他費用2",
      dataIndex: "その他費用2",
      key: "その他費用2",
      align: "center",
    },
    {
      title: "その他費用課税2",
      dataIndex: "その他費用課税2",
      key: "その他費用課税2",
      align: "center",
    },
    {
      title: "高速費3",
      dataIndex: "高速費3",
      key: "高速費3",
      align: "center",
    },
    {
      title: "スケール費3",
      dataIndex: "スケール費3",
      key: "スケール費3",
      align: "center",
    },
    {
      title: "スケール費課税3",
      dataIndex: "スケール費課税3",
      key: "スケール費課税3",
      align: "center",
    },
    {
      title: "シャーシ留置費3",
      dataIndex: "シャーシ留置費3",
      key: "シャーシ留置費3",
      align: "center",
    },
    {
      title: "シャーシ留置費課税3",
      dataIndex: "シャーシ留置費課税3",
      key: "シャーシ留置費課税3",
      align: "center",
    },
    {
      title: "その他費用3",
      dataIndex: "その他費用3",
      key: "その他費用3",
      align: "center",
    },
    {
      title: "その他費用課税3",
      dataIndex: "その他費用課税3",
      key: "その他費用課税3",
      align: "center",
    },
    {
      title: "請求内容",
      dataIndex: "請求内容",
      key: "請求内容",
      align: "center",
    },
    {
      title: "配車日",
      dataIndex: "配車日",
      key: "配車日",
      align: "center",
    },
    {
      title: "仮依頼書作成日",
      dataIndex: "仮依頼書作成日",
      key: "仮依頼書作成日",
      align: "center",
    },
    {
      title: "依頼書作成日",
      dataIndex: "依頼書作成日",
      key: "依頼書作成日",
      align: "center",
    },
    {
      title: "送り状受領書作成日",
      dataIndex: "送り状受領書作成日",
      key: "送り状受領書作成日",
      align: "center",
    },
    {
      title: "mail作成日",
      dataIndex: "mail作成日",
      key: "mail作成日",
      align: "center",
    },
    {
      title: "請求書作成日",
      dataIndex: "請求書作成日",
      key: "請求書作成日",
      align: "center",
    },
    {
      title: "フォーム",
      dataIndex: "フォーム",
      key: "フォーム",
      align: "center",
    },
    {
      title: "備考",
      dataIndex: "備考",
      key: "備考",
      align: "center",
    },
    {
      title: "配車シート名",
      dataIndex: "配車シート名",
      key: "配車シート名",
      align: "center",
    },
    {
      title: "配車シート記録X",
      dataIndex: "配車シート記録X",
      key: "配車シート記録X",
      align: "center",
    },
    {
      title: "配車シート記録Y",
      dataIndex: "配車シート記録Y",
      key: "配車シート記録Y",
      align: "center",
    },
    {
      title: "登録年月",
      dataIndex: "登録年月",
      key: "登録年月",
      align: "center",
    },
    {
      title: "案件コード",
      dataIndex: "案件コード",
      key: "案件コード",
      align: "center",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/orderlist");
      const data = res.data.sort((a, b) => b.識別コード - a.識別コード);
      setDatas(data);
      filterData(dayjs().format("YYYY-MM"), res.data);
    };
    fetchData();
  }, []);

  const filterData = (selectedDate, dataToFilter) => {
    const filtered = dataToFilter.filter((item) => {
      const invoiceDate = dayjs(item.請求日).format("YYYY-MM"); // Assuming '
      return invoiceDate === selectedDate;
    });
    setFilteredDatas(filtered);
  };

  const handleDateChange = (date, dateString) => {
    setDate(dateString);
    filterData(dateString, datas);
  };
  const handleCheckboxChange = async (e, record) => {
    const newValue = e.target.checked;

    try {
      await axios.put(`/orderlist/${record._id}`, {
        支払い確認: newValue,
      });

      // Update local state after successful DB update
      setDatas((prevDatas) =>
        prevDatas
          .map((data) =>
            data._id === record._id ? { ...data, 支払い確認: newValue } : data,
          )
          .sort((a, b) => b.識別コード - a.識別コード),
      );
    } catch (error) {
      console.error("Error updating payment confirmation:", error);
    }
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="sm:flex-row justify-evenly w-full">
        <Typography className="ml-10 mt-5 justify-center">
          <DatePicker
            picker="month"
            value={dayjs(date, "YYYY-MM")}
            onChange={handleDateChange}
          />
        </Typography>
      </div>
      {/* <div>
        <div className="relative flex flex-wrap  items-stretch w-full ">
          <input
            autoFocus
            type="search"
            value={searchWord}
            placeholder={"Search"}
            onChange={(e) => {
              setSearchWord(e.target.value);
              setToFirstPane(true);
            }}
            className="input min-h-full p-1 h-full input-bordered w-full max-w-xs"
          />
        </div>
      </div> */}
      <div className="w-full">
        <Table
          dataSource={datas}
          columns={columns}
          scroll={{ x: "max-content" }}
          size="small"
          className="table-fixed"
          pagination={{ pageSize: 14, position: ["bottomCenter"] }}
        />
      </div>
    </div>
  );
};

export default OrderDBPage;
