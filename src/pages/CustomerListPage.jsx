import { DatePicker, Table, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const { Title } = Typography;

const CustomerListPage = () => {
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [datas, setDatas] = useState([]);

  const columns = [
    {
      key: "1",
      title: "顧客名",
      dataIndex: "name",
      onCell: (_, index) => {
        if (index === 0) {
          return {
            rowSpan: 7,
          };
        }
        if (index === 7) {
          return {
            rowSpan: 5,
          };
        }
        if (index > 0 && index < 7) {
          return {
            rowSpan: 0,
          };
        }
        if (index > 7 && index < 12) {
          return {
            rowSpan: 0,
          };
        }
      },
    },
    {
      key: "2",
      title: "配達先名称",
      dataIndex: "deliver",
    },
    {
      key: "3",
      title: "サイズ",
      dataIndex: "size",
    },
    {
      key: "4",
      title: "料金",
      dataIndex: "fee",
    },
    {
      key: "5",
      title: "距離",
      dataIndex: "distance",
    },
    {
      key: "6",
      title: "タリフ比率",
      dataIndex: "ratio",
    },
  ];

  const data = [
    {
      key: "1",
      name: "株式会社エスワイプロモーション",
      deliver:
        "①キューソー流通システム栗橋第二　➁キューソー流通システム五霞第二　2ヵ所降ろし",
      size: "40F",
      fee: "50000",
      distance: "150",
      ratio: "",
    },
    {
      key: "2",
      name: "株式会社エスワイプロモーション",
      deliver: "キューソー流通システム栗橋第二営業所",
      size: "40F",
      fee: "45000",
      distance: "",
      ratio: "",
    },
    {
      key: "3",
      name: "株式会社エスワイプロモーション",
      deliver: "キューソー流通システム五霞第二営業所",
      size: "40F",
      fee: "40000",
      distance: "",
      ratio: "",
    },
    {
      key: "4",
      name: "株式会社エスワイプロモーション",
      deliver: "キューソー流通システム川崎営業所",
      size: "40F",
      fee: "50000",
      distance: "",
      ratio: "",
    },
    {
      key: "5",
      name: "株式会社エスワイプロモーション",
      deliver: "ヒューテックノオリン埼玉支店",
      size: "40F",
      fee: "35000",
      distance: "",
      ratio: "",
    },
    {
      key: "6",
      name: "株式会社エスワイプロモーション",
      deliver: "ヒューテックノオリン埼玉支店",
      size: "40F",
      fee: "48000",
      distance: "",
      ratio: "",
    },
    {
      key: "7",
      name: "株式会社エスワイプロモーション",
      deliver: "",
      size: "20F",
      fee: "450000",
      distance: "",
      ratio: "",
    },
    {
      key: "8",
      name: "株式会社ハズプランニング",
      deliver: "①合同流通　➁しまむら桶川商品センター　2ヵ所降ろし",
      size: "40F",
      fee: "90000",
      distance: "",
      ratio: "",
    },
    {
      key: "9",
      name: "株式会社ハズプランニング",
      deliver: "",
      size: "20F",
      fee: "80000",
      distance: "",
      ratio: "",
    },
    {
      key: "10",
      name: "株式会社ハズプランニング",
      deliver: "①合同流通　➁しまむら東村山商品センター　2ヵ所降ろし",
      size: "40F",
      fee: "78000",
      distance: "",
      ratio: "",
    },
    {
      key: "11",
      name: "株式会社ハズプランニング",
      deliver: "しまむら東松山商品センター",
      size: "20F",
      fee: "60000",
      distance: "",
      ratio: "",
    },
    {
      key: "12",
      name: "株式会社ハズプランニング",
      deliver: "株式会社　合同流通",
      size: "20F",
      fee: "50000",
      distance: "",
      ratio: "",
    },
  ];

  return (
    <div className="flex flex-col gap-0">
      <Table
        dataSource={data}
        columns={columns}
        scroll={{ x: "max-content" }}
        pagination={false}
        className="w-full"
      />
    </div>
  );
};

export default CustomerListPage;
