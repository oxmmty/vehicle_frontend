import React from "react";
import { DatePicker, Table, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const { Title } = Typography;

export default function PartnerCompanyPage() {
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [datas, setDatas] = useState();
  useEffect(() => {
    a();
  }, []);
  const a = async () => {
    const res = await axios.get(
      process.env.REACT_API_BASE_URL + `/partnercompnay`,
    );
    setDatas(res.data);
    console.log(res.data);
  };
  const columns = [
    {
      key: "協力会社",
      title: "協力会社",
      dataIndex: "協力会社",
    },
    {
      key: "カウント",
      title: "カウント",
      dataIndex: "カウント",
    },
    {
      key: "担当",
      title: "担当",
      dataIndex: "担当",
    },
    {
      key: "アドレス",
      title: "アドレス",
      dataIndex: "アドレス",
    },
    {
      key: "CC",
      title: "CC",
      dataIndex: "CC",
    },
    {
      key: "TEL",
      title: "TEL",
      dataIndex: "TEL",
    },
    {
      key: "FAX",
      title: "FAX",
      dataIndex: "FAX",
    },
    {
      key: "住所",
      title: "住所",
      dataIndex: "住所",
    },
  ];

  // const fileData = [
  //   {
  //     key: '1',
  //     fileName: 'エムズ物流株式会社2401030100 株式会社アルプス物流 HA240419-0001.pdf',
  //     cooperationCompany: 'エムズ物流株式会社',
  //     deliveryDestination: '株式会社アルプス物流',
  //     deliveryDate: '1/3',
  //     transmissionDate: '4/25',
  //   },
  // ];

  return (
    <div className="flex flex-col gap-2">
      <Table
        columns={columns}
        dataSource={datas}
        pagination={false}
        bordered
        scroll={{ x: "max-content" }}
      />
    </div>
  );
}