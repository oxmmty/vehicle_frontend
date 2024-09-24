import { DatePicker, Table, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const { Title } = Typography;

export default function CustomerPage() {
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [datas, setDatas] = useState();
  useEffect(() => {
    a();
  }, []);
  const a = async () => {
    const res = await axios.get(process.env.REACT_API_BASE_URL + `/customer`,);
    setDatas(res.data);
  };

  const columns = [
    {
      key: "顧客名称",
      title: "顧客名称",
      dataIndex: "顧客名称",
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

  return (
    <div className="flex flex-col gap-0">
      <Table
        dataSource={datas}
        columns={columns}
        scroll={{ x: "max-content" }}
        className="w-full"
      />
    </div>
  );
}
