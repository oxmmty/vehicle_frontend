import React from "react";
import { Table, Tag } from "antd";
import moment from "moment";

const TransportCompanyRequestPage = () => {
  const columns = [
    {
      title: "配送日",
      dataIndex: "deliveryDate",
      key: "deliveryDate",
    },
    {
      title: "ピック日",
      dataIndex: "pickDate",
      key: "pickDate",
    },
    {
      title: "時間",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "コンテナ種類",
      dataIndex: "containerType",
      key: "containerType",
    },
    {
      title: "軸数",
      dataIndex: "axisCount",
      key: "axisCount",
    },
    {
      title: "MG有無",
      dataIndex: "mgPresence",
      key: "mgPresence",
    },
    {
      title: "BOOKING NO.",
      dataIndex: "bookingNo",
      key: "bookingNo",
    },
    {
      title: "コンテナNo.",
      dataIndex: "containerNo",
      key: "containerNo",
    },
    {
      title: "備考",
      dataIndex: "remarks",
      key: "remarks",
    },
    {
      title: "依頼日",
      dataIndex: "requestDate",
      key: "requestDate",
    },
  ];

  const data = [
    {
      key: "1",
      deliveryDate: "7月11日",
      pickDate: "7月15日",
      time: "9:00",
      containerType: "40",
      axisCount: "3",
      mgPresence: "なし",
      bookingNo: "AIHI1234567",
      containerNo: "AIHI1234567",
      remarks: "",
      requestDate: "7月15日",
      isUpdated: true,
    },
    {
      key: "2",
      deliveryDate: "9月13日",
      pickDate: "9月15日",
      time: "10:00",
      containerType: "40",
      axisCount: "3",
      mgPresence: "なし",
      bookingNo: "AIHI1234568",
      containerNo: "AIHI1234568",
      remarks: "",
      requestDate: "9月15日",
      isUpdated: true,
    },
    {
      key: "3",
      deliveryDate: "9月14日",
      pickDate: "9月15日",
      time: "11:00",
      containerType: "40",
      axisCount: "3",
      mgPresence: "なし",
      bookingNo: "AIHI1234569",
      containerNo: "AIHI1234569",
      remarks: "",
      requestDate: "9月15日",
      isUpdated: true,
    },
    {
      key: "4",
      deliveryDate: "9月15日",
      pickDate: "9月15日",
      time: "12:00",
      containerType: "40",
      axisCount: "3",
      mgPresence: "なし",
      bookingNo: "AIHI1234570",
      containerNo: "AIHI1234570",
      remarks: "",
      requestDate: "9月15日",
      isUpdated: true,
    },
    {
      key: "5",
      deliveryDate: "9月16日",
      pickDate: "9月15日",
      time: "13:00",
      containerType: "40",
      axisCount: "3",
      mgPresence: "なし",
      bookingNo: "AIHI1234571",
      containerNo: "AIHI1234571",
      remarks: "",
      requestDate: "9月15日",
      isUpdated: true,
    },
    {
      key: "6",
      deliveryDate: "9月16日",
      pickDate: "9月15日",
      time: "16:00",
      containerType: "40",
      axisCount: "3",
      mgPresence: "なし",
      bookingNo: "AIHI1234574",
      containerNo: "AIHI1234574",
      remarks: "",
      requestDate: "9月15日",
      isUpdated: true,
      isNew: true,
    },
    {
      key: "7",
      deliveryDate: "9月16日",
      pickDate: "9月15日",
      time: "17:00",
      containerType: "40",
      axisCount: "3",
      mgPresence: "なし",
      bookingNo: "AIHI1234575",
      containerNo: "AIHI1234575",
      remarks: "",
      requestDate: "9月15日",
      isUpdated: true,
      isNew: true,
    },
  ];

  const getRowClassName = (record) => {
    const currentDate = moment().format("YYYY-MM-DD");
    const updatedDate = moment("2024-08-31", "YYYY-MM-DD").format("YYYY-MM-DD");
    
    const recordDeliveryDate = moment(record.deliveryDate, "M月D日").format("YYYY-MM-DD");
    
    if (record.isNew) {
      return "bg-yellow-600";
    }
  
    if (moment(recordDeliveryDate).isBefore(updatedDate)) {
      return "bg-gray-500";
    }
  
    return "";
  };
  

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      rowClassName={getRowClassName}
    />
  );
};

export default TransportCompanyRequestPage;
