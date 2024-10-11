import { Table, InputNumber, DatePicker, Typography } from "antd";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

const { Title } = Typography;

const MonthlyCustomerPage = () => {
  const [date, setDate] = useState(dayjs().format("YYYY-MM"));

  const dataSource = [
    {
      key: "1",
      name: "鈴与カ",
      type: "得意先",
      taxTotal: 30000,
      nonTaxTotal: 50000,
      highSpeedCost: 40000,
      scaleCost: 60000,
      previousMonth: "",
      noTitle1: "",
    },
  ];

  const len = dataSource.length;
  const columns = [
    {
      key: "No",
      title: "No",
      dataIndex: "key",
    },
    {
      key: "顧客　名称",
      title: "顧客　名称",
      dataIndex: "name",
    },
    {
      key: "種別",
      title: "種別",
      dataIndex: "type",
    },
    {
      key: "入金確認",
      title: "入金確認",
      dataIndex: "入金確認",
    },
    {
      key: "課税",
      title: "課税",
      dataIndex: "課税",
    },
    {
      key: "非課税",
      title: "非課税",
      dataIndex: "非課税",
    },
    {
      key: "高速代<br>（内税）",
      title: (
        <div>
          高速代
          <br />
          （内税）
        </div>
      ),
      dataIndex: "高速代<br>（内税）",
    },
    {
      key: "高速代",
      title: "高速代",
      dataIndex: "高速代",
    },
    {
      key: "高速代<br>（消費税）",
      title: (
        <div>
          高速代
          <br />
          （消費税）
        </div>
      ),
      dataIndex: "高速代<br>（消費税）",
    },
    {
      key: "税抜合計",
      title: "税抜合計",
      dataIndex: "税抜合計",
    },
    {
      key: "消費税",
      title: "消費税",
      dataIndex: "消費税",
    },
    {
      key: "入金合計",
      title: "入金合計",
      dataIndex: "入金合計",
    },
    {
      key: "入金日",
      title: "入金日",
      dataIndex: "入金日",
    },
    {
      key: "前月比",
      title: "前月比",
      dataIndex: "previousMonth",
      onCell: (_, index) => ({
        colSpan: index === len + 5 ? 2 : 1,
      }),
    },
    {
      key: "買掛計<br>税抜",
      title: (
        <div>
          買掛計
          <br />
          税抜
        </div>
      ),
      dataIndex: "買掛計<br>税抜",
      onCell: (_, index) => ({
        colSpan: index === len + 5 ? 0 : 1,
      }),
    },
    {
      key: "支払比率",
      title: "支払比率",
      dataIndex: "支払比率",
    },
    {
      key: "1",
      title: "",
      dataIndex: "noTitle1",
    },
    {
      key: "2",
      title: "",
      dataIndex: "noTitle2",
    },
  ];

  const inseartHeader = () => {
    const header = [
      "前月",
      "翌末",
      "翌々末",
      "合計",
      "小計",
      "",
      "支払合計(課税＋非課税）",
      "差益",
      "差益率",
      "売上前月比",
      "売上前年同月比",
      "得意先売上",
      "得意先下払利率",
      "協力会社売上",
      "協力会社下払利率",
    ];
    header.map((item, index) => {
      if (index == 5) {
        dataSource.push({ previousMonth: "実際の売掛数値", noTitle1: "誤差" });
      } else dataSource.push({ type: item });
    });
  };

  inseartHeader();

  const onChange = (_, dateString) => {
    setDate(dateString);
  };

  return (
    <div className="flex flex-col gap-0">
      <DatePicker
        onChange={onChange}
        defaultValue={dayjs(date, "YYYY-MM")}
        className="grow max-w-96"
        picker="month"
      />
      <Typography className="flex justify-center">
        <Title level={3}>{date}</Title>
      </Typography>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        bordered
        scroll={{ x: "max-content" }}
        className="w-full"
      />
    </div>
  );
};

export default MonthlyCustomerPage;
