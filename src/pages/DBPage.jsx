import {
  DatePicker,
  Typography,
  Checkbox,
  Button,
  notification,
  Modal,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import dayjs from "dayjs";
import CTable from "src/components/CTable";
const { Title } = Typography;

const DBPage = () => {
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      setDate(selectedDate);
      const formattedDate = selectedDate.format("YYYY-MM-DD");
      const filtered = allData.filter((item) =>
        dayjs(item.createdAt).isSame(formattedDate, "day"),
      );
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
      if (field == "配車組み") {
        const train = "true";
        await handleAddRecords(record, train);
      } else {
        const train = "false";
        await handleAddRecords(record, train);
      }
    } catch (err) {
      console.error("Error updating data:", err);
      setError("Failed to update data. Please try again.");
    }
  };
  const confirmDelete = (id) => {
    Modal.confirm({
      title: "削除確認",
      content: `本当に注文「${id}」をキャンセルしますか？`,
      okText: "はい",
      cancelText: "いいえ",
      onOk: () => handleDelete(id),
    });
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/order/cancel/${id}`);
      setAllData((prevDatas) =>
        prevDatas.map((item) =>
          item.識別コード === id ? { ...item, delete: true } : item,
        ),
      );
      setFilteredData((prevFilteredDatas) =>
        prevFilteredDatas.map((item) =>
          item.識別コード === id ? { ...item, delete: true } : item,
        ),
      );
      notification.success({
        message: "成功",
        description: `注文「${id}」がキャンセルされました。`,
      });
    } catch (error) {
      console.error("Error deleting item:", error);
      notification.error({
        message: "エラー",
        description: `注文「${id}」のキャンセルに失敗しました。`,
      });
    }
  };

  const handleAddRecords = async (record, train) => {
    let axles;
    let 危険品;
    if (record["3軸数"] !== true) {
      axles = "";
    } else {
      axles = "3";
    }
    if (record.危険品 !== true) {
      危険品 = "";
    } else {
      危険品 = "危険品";
    }
    const 依頼日 = moment().format("YYYY-MM-DD");
    const a = record.識別コード.replace(/^MA/, "HA");
    record.区分 = "配達";
    record.識別コード = a;
    const {
      識別コード,
      区分,
      取場所,
      コンテナNo,
      コンテナタイプ,
      コンテナサイズ,
      コンテナ種類,
      配達先1,
      積日1,
      配達日1,
      配達時間1,
      配達先住所1,
      配達先TEL1,
      配達先担当者1,
      配達先2,
      積日2,
      配達日2,
      配達時間2,
      配達先住所2,
      配達先TEL2,
      配達先担当者2,
      配達先3,
      積日3,
      配達日3,
      配達時間3,
      配達先住所3,
      配達先TEL3,
      配達先担当者3,
      搬入返却場所,
      船名,
      VOYNo,
      船社,
      BKNo,
      BLNo,
      荷揚港,
      最終仕向,
      荷主名,
      依頼書備考1,
      下払会社名1,
      下払料金1,
      下払スケール費1,
      下払その他費用1,
      下払高速費1,
      下払シャーシ留置費1,
      下払会社名2,
      下払料金2,
      下払スケール費2,
      下払その他費用2,
      下払高速費2,
      下払シャーシ留置費2,
      下払会社名3,
      下払料金3,
      下払スケール費3,
      下払その他費用3,
      下払高速費3,
      下払シャーシ留置費3,
      下払会社名4,
      下払料金4,
      下払スケール費4,
      下払その他費用4,
      下払高速費4,
      下払シャーシ留置費4,
      下払会社名5,
      下払料金5,
      下払スケール費5,
      下払その他費用5,
      下払高速費5,
      下払シャーシ留置費5,
      下払会社名6,
      下払料金6,
      下払スケール費6,
      下払その他費用6,
      下払高速費6,
      下払シャーシ留置費6,
      依頼書備考欄,
      部署コード,
      下払課税1,
      下払その他課税1,
      下払スケール費課税1,
      下払シャーシ留置費課税1,
      下払課税2,
      下払その他課税2,
      下払スケール費課税2,
      下払シャーシ留置費課税2,
      下払課税3,
      下払その他課税3,
      下払スケール費課税3,
      下払シャーシ留置費課税3,
      下払課税4,
      下払その他課税4,
      下払スケール費課税4,
      下払シャーシ留置費課税4,
      下払課税5,
      下払その他課税5,
      下払スケール費課税5,
      下払シャーシ留置費課税5,
      下払課税6,
      下払その他課税6,
      下払スケール費課税6,
      下払シャーシ留置費課税6,
    } = record;
    if (train == "true") {
      if (下払会社名1) {
        const requestsToAdd = {
          リクエスト番号: `${record.識別コード}-0001`,
          受注コード: 識別コード,
          部署コード: 部署コード,
          支払い確認: false,
          下払会社名: 下払会社名1,
          区分: 区分,
          依頼日: 依頼日,
          搬出場所: 取場所,
          軸数: axles,
          コンテナNo: コンテナNo,
          コンテナタイプ: コンテナタイプ,
          コンテナサイズ: コンテナサイズ,
          コンテナ種類: コンテナ種類,
          危険品: 危険品,
          配達先: 配達先1,
          積日1: 積日1,
          配達日1: 配達日1,
          配達時間1: 配達時間1,
          配達先住所1: 配達先住所1,
          配達先TEL1: 配達先TEL1,
          配達先担当者1: 配達先担当者1,
          "3軸料金1": record["3軸料金1"],
          配達先2: 配達先2,
          積日2: 積日2,
          配達日2: 配達日2,
          配達時間2: 配達時間2,
          配達先住所2: 配達先住所2,
          配達先TEL2: 配達先TEL2,
          配達先担当者2: 配達先担当者2,
          配達先3: 配達先3,
          積日3: 積日3,
          配達日3: 配達日3,
          配達時間3: 配達時間3,
          配達先住所3: 配達先住所3,
          配達先TEL3: 配達先TEL3,
          配達先担当者3: 配達先担当者3,
          搬入返却場所: 搬入返却場所,
          船名: 船名,
          VOYNo: VOYNo,
          船社: 船社,
          BKNo: BKNo,
          BLNo: BLNo,
          荷揚港: 荷揚港,
          最終仕向: 最終仕向,
          荷主名: 荷主名,
          依頼書備考1: 依頼書備考1,
          基本料金: 下払料金1,
          基本料金課税: 下払課税1,
          その他費用課税: 下払その他課税1,
          スケール費課税: 下払スケール費課税1,
          シャーシ留置費課税: 下払シャーシ留置費課税1,
          その他費用: 下払その他費用1,
          スケール費: 下払スケール費1,
          高速費: 下払高速費1,
          シャーシ留置費: 下払シャーシ留置費1,
          備考欄: 依頼書備考欄,
        };
        try {
          await axios.post(
            `${process.env.REACT_API_BASE_URL}/pdfList`,
            requestsToAdd,
          );
          console.log("Records added successfully:", requestsToAdd);
        } catch (error) {
          console.error("Error adding records:", error);
        }
      }
      if (下払会社名2) {
        const requestsToAdd = {
          リクエスト番号: `${record.識別コード}-0002`,
          受注コード: 識別コード,
          部署コード: 部署コード,
          支払い確認: false,

          下払会社名: 下払会社名2,
          区分: 区分,
          依頼日: 依頼日,
          搬出場所: 取場所,
          軸数: axles,
          コンテナNo: コンテナNo,
          コンテナタイプ: コンテナタイプ,
          コンテナサイズ: コンテナサイズ,
          コンテナ種類: コンテナ種類,
          危険品: 危険品,
          配達先: 配達先1,
          積日1: 積日1,
          配達日1: 配達日1,
          配達時間1: 配達時間1,
          配達先住所1: 配達先住所1,
          配達先TEL1: 配達先TEL1,
          配達先担当者1: 配達先担当者1,
          "3軸料金1": record["3軸料金1"],
          配達先2: 配達先2,
          積日2: 積日2,
          配達日2: 配達日2,
          配達時間2: 配達時間2,
          配達先住所2: 配達先住所2,
          配達先TEL2: 配達先TEL2,
          配達先担当者2: 配達先担当者2,
          配達先3: 配達先3,
          積日3: 積日3,
          配達日3: 配達日3,
          配達時間3: 配達時間3,
          配達先住所3: 配達先住所3,
          配達先TEL3: 配達先TEL3,
          配達先担当者3: 配達先担当者3,
          搬入返却場所: 搬入返却場所,
          船名: 船名,
          VOYNo: VOYNo,
          船社: 船社,
          BKNo: BKNo,
          BLNo: BLNo,
          荷揚港: 荷揚港,
          最終仕向: 最終仕向,
          荷主名: 荷主名,
          依頼書備考1: 依頼書備考1,
          基本料金: 下払料金2,
          その他費用: 下払その他費用2,
          スケール費: 下払スケール費2,
          高速費: 下払高速費2,
          シャーシ留置費: 下払シャーシ留置費2,
          備考欄: 依頼書備考欄,
          基本料金課税: 下払課税2,
          その他費用課税: 下払その他課税2,
          スケール費課税: 下払スケール費課税2,
          シャーシ留置費課税: 下払シャーシ留置費課税2,
        };
        try {
          await axios.post(
            `${process.env.REACT_API_BASE_URL}/pdfList`,
            requestsToAdd,
          );
          console.log("Records added successfully:", requestsToAdd);
        } catch (error) {
          console.error("Error adding records:", error);
        }
      }
      if (下払会社名3) {
        requestsToAdd = {
          リクエスト番号: `${record.識別コード}-0003`,
          受注コード: 識別コード,
          部署コード: 部署コード,
          支払い確認: false,
          下払会社名: 下払会社名3,
          区分: 区分,
          依頼日: 依頼日,
          搬出場所: 取場所,
          軸数: axles,
          コンテナNo: コンテナNo,
          コンテナタイプ: コンテナタイプ,
          コンテナサイズ: コンテナサイズ,
          コンテナ種類: コンテナ種類,
          危険品: 危険品,
          配達先: 配達先1,
          積日1: 積日1,
          配達日1: 配達日1,
          配達時間1: 配達時間1,
          配達先住所1: 配達先住所1,
          配達先TEL1: 配達先TEL1,
          配達先担当者1: 配達先担当者1,
          "3軸料金1": record["3軸料金1"],
          配達先2: 配達先2,
          積日2: 積日2,
          配達日2: 配達日2,
          配達時間2: 配達時間2,
          配達先住所2: 配達先住所2,
          配達先TEL2: 配達先TEL2,
          配達先担当者2: 配達先担当者2,
          配達先3: 配達先3,
          積日3: 積日3,
          配達日3: 配達日3,
          配達時間3: 配達時間3,
          配達先住所3: 配達先住所3,
          配達先TEL3: 配達先TEL3,
          配達先担当者3: 配達先担当者3,
          搬入返却場所: 搬入返却場所,
          船名: 船名,
          VOYNo: VOYNo,
          船社: 船社,
          BKNo: BKNo,
          BLNo: BLNo,
          荷揚港: 荷揚港,
          最終仕向: 最終仕向,
          荷主名: 荷主名,
          依頼書備考1: 依頼書備考1,
          基本料金: 下払料金3,
          その他費用: 下払その他費用3,
          スケール費: 下払スケール費3,
          高速費: 下払高速費3,
          シャーシ留置費: 下払シャーシ留置費3,
          備考欄: 依頼書備考欄,
          基本料金課税: 下払課税3,
          その他費用課税: 下払その他課税3,
          スケール費課税: 下払スケール費課税3,
          シャーシ留置費課税: 下払シャーシ留置費課税3,
        };
        try {
          await axios.post(
            `${process.env.REACT_API_BASE_URL}/pdfList`,
            requestsToAdd,
          );
          console.log("Records added successfully:", requestsToAdd);
        } catch (error) {
          console.error("Error adding records:", error);
        }
      }
      if (下払会社名4) {
        const requestsToAdd = {
          リクエスト番号: `${record.識別コード}-0004`,
          受注コード: 識別コード,
          部署コード: 部署コード,
          支払い確認: false,
          下払会社名: 下払会社名4,
          区分: 区分,
          依頼日: 依頼日,
          搬出場所: 取場所,
          軸数: axles,
          コンテナNo: コンテナNo,
          コンテナタイプ: コンテナタイプ,
          コンテナサイズ: コンテナサイズ,
          コンテナ種類: コンテナ種類,
          危険品: 危険品,
          配達先: 配達先1,
          積日1: 積日1,
          配達日1: 配達日1,
          配達時間1: 配達時間1,
          配達先住所1: 配達先住所1,
          配達先TEL1: 配達先TEL1,
          配達先担当者1: 配達先担当者1,
          "3軸料金1": record["3軸料金1"],
          配達先2: 配達先2,
          積日2: 積日2,
          配達日2: 配達日2,
          配達時間2: 配達時間2,
          配達先住所2: 配達先住所2,
          配達先TEL2: 配達先TEL2,
          配達先担当者2: 配達先担当者2,
          配達先3: 配達先3,
          積日3: 積日3,
          配達日3: 配達日3,
          配達時間3: 配達時間3,
          配達先住所3: 配達先住所3,
          配達先TEL3: 配達先TEL3,
          配達先担当者3: 配達先担当者3,
          搬入返却場所: 搬入返却場所,
          船名: 船名,
          VOYNo: VOYNo,
          船社: 船社,
          BKNo: BKNo,
          BLNo: BLNo,
          荷揚港: 荷揚港,
          最終仕向: 最終仕向,
          荷主名: 荷主名,
          依頼書備考1: 依頼書備考1,
          基本料金: 下払料金4,
          その他費用: 下払その他費用4,
          スケール費: 下払スケール費4,
          高速費: 下払高速費4,
          シャーシ留置費: 下払シャーシ留置費4,
          備考欄: 依頼書備考欄,
          基本料金課税: 下払課税4,
          その他費用課税: 下払その他課税4,
          スケール費課税: 下払スケール費課税4,
          シャーシ留置費課税: 下払シャーシ留置費課税4,
        };
        try {
          await axios.post(
            `${process.env.REACT_API_BASE_URL}/pdfList`,
            requestsToAdd,
          );
          console.log("Records added successfully:", requestsToAdd);
        } catch (error) {
          console.error("Error adding records:", error);
        }
      }
      if (下払会社名5) {
        const requestsToAdd = {
          リクエスト番号: `${record.識別コード}-0005`,
          受注コード: 識別コード,
          部署コード: 部署コード,
          支払い確認: false,
          下払会社名: 下払会社名5,
          区分: 区分,
          依頼日: 依頼日,
          搬出場所: 取場所,
          軸数: axles,
          コンテナNo: コンテナNo,
          コンテナタイプ: コンテナタイプ,
          コンテナサイズ: コンテナサイズ,
          コンテナ種類: コンテナ種類,
          危険品: 危険品,
          配達先: 配達先1,
          積日1: 積日1,
          配達日1: 配達日1,
          配達時間1: 配達時間1,
          配達先住所1: 配達先住所1,
          配達先TEL1: 配達先TEL1,
          配達先担当者1: 配達先担当者1,
          "3軸料金1": record["3軸料金1"],
          配達先2: 配達先2,
          積日2: 積日2,
          配達日2: 配達日2,
          配達時間2: 配達時間2,
          配達先住所2: 配達先住所2,
          配達先TEL2: 配達先TEL2,
          配達先担当者2: 配達先担当者2,
          配達先3: 配達先3,
          積日3: 積日3,
          配達日3: 配達日3,
          配達時間3: 配達時間3,
          配達先住所3: 配達先住所3,
          配達先TEL3: 配達先TEL3,
          配達先担当者3: 配達先担当者3,
          搬入返却場所: 搬入返却場所,
          船名: 船名,
          VOYNo: VOYNo,
          船社: 船社,
          BKNo: BKNo,
          BLNo: BLNo,
          荷揚港: 荷揚港,
          最終仕向: 最終仕向,
          荷主名: 荷主名,
          依頼書備考1: 依頼書備考1,
          基本料金: 下払料金5,
          その他費用: 下払その他費用5,
          スケール費: 下払スケール費5,
          高速費: 下払高速費5,
          シャーシ留置費: 下払シャーシ留置費5,
          備考欄: 依頼書備考欄,
          基本料金課税: 下払課税5,
          その他費用課税: 下払その他課税5,
          スケール費課税: 下払スケール費課税5,
          シャーシ留置費課税: 下払シャーシ留置費課税5,
        };
        try {
          await axios.post(
            `${process.env.REACT_API_BASE_URL}/pdfList`,
            requestsToAdd,
          );
          console.log("Records added successfully:", requestsToAdd);
        } catch (error) {
          console.error("Error adding records:", error);
        }
      }
      if (下払会社名6) {
        const requestsToAdd = {
          リクエスト番号: `${record.識別コード}-0006`,
          受注コード: 識別コード,
          部署コード: 部署コード,
          支払い確認: false,
          下払会社名: 下払会社名6,
          区分: 区分,
          依頼日: 依頼日,
          搬出場所: 取場所,
          軸数: axles,
          コンテナNo: コンテナNo,
          コンテナタイプ: コンテナタイプ,
          コンテナサイズ: コンテナサイズ,
          コンテナ種類: コンテナ種類,
          危険品: 危険品,
          配達先: 配達先1,
          積日1: 積日1,
          配達日1: 配達日1,
          配達時間1: 配達時間1,
          配達先住所1: 配達先住所1,
          配達先TEL1: 配達先TEL1,
          配達先担当者1: 配達先担当者1,
          "3軸料金1": record["3軸料金1"],
          配達先2: 配達先2,
          積日2: 積日2,
          配達日2: 配達日2,
          配達時間2: 配達時間2,
          配達先住所2: 配達先住所2,
          配達先TEL2: 配達先TEL2,
          配達先担当者2: 配達先担当者2,
          配達先3: 配達先3,
          積日3: 積日3,
          配達日3: 配達日3,
          配達時間3: 配達時間3,
          配達先住所3: 配達先住所3,
          配達先TEL3: 配達先TEL3,
          配達先担当者3: 配達先担当者3,
          搬入返却場所: 搬入返却場所,
          船名: 船名,
          VOYNo: VOYNo,
          船社: 船社,
          BKNo: BKNo,
          BLNo: BLNo,
          荷揚港: 荷揚港,
          最終仕向: 最終仕向,
          荷主名: 荷主名,
          依頼書備考1: 依頼書備考1,
          基本料金: 下払料金6,
          その他費用: 下払その他費用6,
          スケール費: 下払スケール費6,
          高速費: 下払高速費6,
          シャーシ留置費: 下払シャーシ留置費6,
          備考欄: 依頼書備考欄,
          基本料金課税: 下払課税6,
          その他費用課税: 下払その他課税6,
          スケール費課税: 下払スケール費課税6,
          シャーシ留置費課税: 下払シャーシ留置費課税6,
        };
        try {
          await axios.post(
            `${process.env.REACT_API_BASE_URL}/pdfList`,
            requestsToAdd,
          );
          console.log("Records added successfully:", requestsToAdd);
        } catch (error) {
          console.error("Error adding records:", error);
        }
      }
    }
    fetchData();
  };

  const columns = [
    {
      title: "No",
      render: (_, __, index) => index + 1,
      align: "center",
    },
    {
      key: "識別コード",
      title: "識別コード",
      dataIndex: "識別コード",
      align: "center",

      sorter: function (a, b) {
        return b.識別コード.localeCompare(a.識別コード);
      },
    },
    {
      key: "ピックチェック",
      title: "ピックチェック",
      dataIndex: "ピックチェック",
      align: "center",

      render: (text, record) =>
        record.delete == true ? (
          <Checkbox
            disabled
            checked={record.ピックチェック || false}
            onChange={(e) => {
              onCheckboxChange(record, "ピックチェック", e.target.checked);
            }}
          />
        ) : (
          <Checkbox
            checked={record.ピックチェック || false}
            onChange={(e) => {
              onCheckboxChange(record, "ピックチェック", e.target.checked);
            }}
          />
        ),
    },
    {
      key: "配車組み",
      title: "配車組み",
      dataIndex: "配車組み",
      align: "center",

      render: (text, record) =>
        record.delete == true ? (
          <Checkbox
            disabled
            checked={record.配車組み || false}
            onChange={(e) => {
              onCheckboxChange(record, "配車組み", e.target.checked);
            }}
          />
        ) : (
          <Checkbox
            checked={record.配車組み || false}
            onChange={(e) => {
              onCheckboxChange(record, "配車組み", e.target.checked);
            }}
          />
        ),
    },
    {
      key: "空バン返却チェック",
      title: "空バン返却チェック",
      dataIndex: "空バン返却チェック",
      align: "center",

      render: (text, record) =>
        record.delete == true ? (
          <Checkbox
            disabled
            checked={record.空バン返却チェック || false}
            onChange={(e) => {
              onCheckboxChange(record, "空バン返却チェック", e.target.checked);
            }}
          />
        ) : (
          <Checkbox
            checked={record.空バン返却チェック || false}
            onChange={(e) => {
              onCheckboxChange(record, "空バン返却チェック", e.target.checked);
            }}
          />
        ),
    },
    {
      key: "送り状受領書作成",
      title: "送り状・受領書作成",
      dataIndex: "送り状・受領書作成",
      align: "center",

      render: (text, record) =>
        record.delete == true ? (
          <Checkbox
            disabled
            checked={record["送り状受領書作成"] || false}
            onChange={(e) => {
              onCheckboxChange(record, "送り状受領書作成", e.target.checked);
            }}
          />
        ) : (
          <Checkbox
            checked={record["送り状受領書作成"] || false}
            onChange={(e) => {
              onCheckboxChange(record, "送り状受領書作成", e.target.checked);
            }}
          />
        ),
    },
    {
      key: "部署コード",
      title: "部署コード",
      dataIndex: "部署コード",
      align: "center",

      sorter: function (a, b) {
        return b.部署コード.localeCompare(a.部署コード);
      },
    },
    { key: "区分", title: "区分", dataIndex: "区分", align: "center" },
    {
      key: "荷主名",
      title: "荷主名",
      dataIndex: "荷主名",
      align: "center",
      sorter: function (a, b) {
        return b.荷主名.localeCompare(a.荷主名);
      },
    },
    { key: "顧客名", title: "顧客名", dataIndex: "顧客名", align: "center" },
    { key: "配達先", title: "配達先", dataIndex: "配達先", align: "center" },
    {
      key: "配達先住所",
      title: "配達先住所",
      dataIndex: "配達先住所",
      align: "center",
    },
    {
      key: "配達先TEL",
      title: "配達先TEL",
      dataIndex: "配達先TEL",
      align: "center",
    },
    {
      key: "配達先担当者",
      title: "配達先担当者",
      dataIndex: "配達先担当者",
      align: "center",
    },
    { key: "取場所", title: "取場所", dataIndex: "取場所", align: "center" },
    {
      key: "搬入返却場所",
      title: "搬入返却場所",
      dataIndex: "搬入返却場所",
      align: "center",
    },
    { key: "船社", title: "船社", dataIndex: "船社", align: "center" },
    {
      key: "コンテナタイプ",
      title: "コンテナタイプ",
      dataIndex: "コンテナタイプ",
      align: "center",
    },
    {
      key: "コンテナサイズ",
      title: "コンテナサイズ",
      dataIndex: "コンテナサイズ",
      align: "center",
    },
    {
      key: "コンテナ種類",
      title: "コンテナ種類",
      dataIndex: "コンテナ種類",
      align: "center",
    },
    { key: "危険品", title: "危険品", dataIndex: "危険品", align: "center" },
    { key: "軸数", title: "軸数", dataIndex: "軸数", align: "center" },
    {
      key: "コンテナ№",
      title: "コンテナ№",
      dataIndex: "コンテナ№",
      align: "center",
    },
    {
      key: "シール番号",
      title: "シール番号",
      dataIndex: "シール番号",
      align: "center",
    },
    { key: "TW", title: "TW", dataIndex: "TW", align: "center" },
    { key: "BK№", title: "BK№", dataIndex: "BK№", align: "center" },
    { key: "BL№", title: "BL№", dataIndex: "BL№", align: "center" },
    { key: "船名", title: "船名", dataIndex: "船名", align: "center" },
    {
      key: "依頼書備考欄",
      title: "依頼書備考欄",
      dataIndex: "依頼書備考欄",
      align: "center",
    },
    {
      key: "ピック日",
      title: "ピック日",
      dataIndex: "ピック日",
      align: "center",
    },
    { key: "配送日", title: "配送日", dataIndex: "配送日", align: "center" },
    {
      key: "配送時間",
      title: "配送時間",
      dataIndex: "配送時間",
      align: "center",
    },
    {
      key: "倉庫作業日",
      title: "倉庫作業日",
      dataIndex: "倉庫作業日",
      align: "center",
    },
    {
      key: "倉庫作業時間",
      title: "倉庫作業時間",
      dataIndex: "倉庫作業時間",
      align: "center",
    },
    {
      key: "自社車番",
      title: "自社車番",
      dataIndex: "自社車番",
      align: "center",
    },
    {
      key: "自社シャーシ",
      title: "自社シャーシ",
      dataIndex: "自社シャーシ",
      align: "center",
    },
    {
      key: "自社乗務員",
      title: "自社乗務員",
      dataIndex: "自社乗務員",
      align: "center",
    },
    {
      key: "協力会社名",
      title: "協力会社名",
      dataIndex: "協力会社名",
      align: "center",
    },
    {
      key: "輸送料金",
      title: "輸送料金",
      dataIndex: "輸送料金",
      align: "center",
    },
    {
      key: "輸送課税",
      title: "輸送課税",
      dataIndex: "輸送課税",
      align: "center",
    },
    {
      key: "下払会社名1",
      title: "下払会社名1",
      dataIndex: "下払会社名1",
      align: "center",
    },
    {
      key: "下払料金1",
      title: "下払料金1",
      dataIndex: "下払料金1",
      align: "center",
    },
    {
      key: "下払課税1",
      title: "下払課税1",
      dataIndex: "下払課税1",
      align: "center",
    },
    {
      key: "下払自車1",
      title: "下払自車1",
      dataIndex: "下払自車1",
      align: "center",
    },
    {
      key: "下払会社名2",
      title: "下払会社名2",
      dataIndex: "下払会社名2",
      align: "center",
    },
    {
      key: "下払料金2",
      title: "下払料金2",
      dataIndex: "下払料金2",
      align: "center",
    },
    {
      key: "下払課税2",
      title: "下払課税2",
      dataIndex: "下払課税2",
      align: "center",
    },
    {
      key: "下払自車2",
      title: "下払自車2",
      dataIndex: "下払自車2",
      align: "center",
    },
    {
      key: "下払会社名3",
      title: "下払会社名3",
      dataIndex: "下払会社名3",
      align: "center",
    },
    {
      key: "下払料金3",
      title: "下払料金3",
      dataIndex: "下払料金3",
      align: "center",
    },
    {
      key: "下払課税3",
      title: "下払課税3",
      dataIndex: "下払課税3",
      align: "center",
    },
    {
      key: "下払自車3",
      title: "下払自車3",
      dataIndex: "下払自車3",
      align: "center",
    },
    {
      key: "下払会社名4",
      title: "下払会社名4",
      dataIndex: "下払会社名4",
      align: "center",
    },
    {
      key: "下払料金4",
      title: "下払料金4",
      dataIndex: "下払料金4",
      align: "center",
    },
    {
      key: "下払課税4",
      title: "下払課税4",
      dataIndex: "下払課税4",
      align: "center",
    },
    {
      key: "下払自車4",
      title: "下払自車4",
      dataIndex: "下払自車4",
      align: "center",
    },
    {
      key: "下払会社名5",
      title: "下払会社名5",
      dataIndex: "下払会社名5",
      align: "center",
    },
    {
      key: "下払料金5",
      title: "下払料金5",
      dataIndex: "下払料金5",
      align: "center",
    },
    {
      key: "下払課税5",
      title: "下払課税5",
      dataIndex: "下払課税5",
      align: "center",
    },
    {
      key: "下払自車5",
      title: "下払自車5",
      dataIndex: "下払自車5",
      align: "center",
    },
    {
      key: "下払会社名6",
      title: "下払会社名6",
      dataIndex: "下払会社名6",
      align: "center",
    },
    {
      key: "下払料金6",
      title: "下払料金6",
      dataIndex: "下払料金6",
      align: "center",
    },
    {
      key: "下払課税6",
      title: "下払課税6",
      dataIndex: "下払課税6",
      align: "center",
    },
    {
      key: "下払自車6",
      title: "下払自車6",
      dataIndex: "下払自車6",
      align: "center",
    },
    {
      title: "削除",
      key: "actions",
      align: "center",
      fixed: "right",
      render: (text, record) =>
        record.delete == true ? (
          <Button
            type="primary"
            danger
            disabled
            onClick={() => confirmDelete(record.識別コード)}>
            削除
          </Button>
        ) : (
          <Button
            type="primary"
            danger
            onClick={() => confirmDelete(record.識別コード)}>
            削除
          </Button>
        ),
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-0">
        <Title level={3}>DBデータ</Title>
        <DatePicker
          defaultValue={dayjs(date)}
          onChange={handleDateChange}
          format="YYYY-MM-DD"
          className=""
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <CTable
            dataSource={filteredData} // Use the filtered data
            columns={columns}
            scroll={{ x: "max-content" }}
            ps={10}
            className="w-full h-full"
            rowKey="id" // Ensure each row has a unique key
          />
        )}
      </div>
    </>
  );
};

export default DBPage;
