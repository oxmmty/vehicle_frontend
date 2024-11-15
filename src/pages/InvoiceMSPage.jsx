import { Button, Divider, Select, Table, Typography } from "antd";

const { Title, Text } = Typography;

const InvoiceMSPage = () => {
  const dataSource = [
    {
      key: "0",
      name: "課税（10％対象）",
      value: 8193,
    },
    {
      key: "1",
      name: "消費税（10％）",
      value: 819,
    },
    {
      key: "2",
      name: "非課税",
      value: 0,
    },
    {
      key: "3",
      name: "御請求金額	",
      value: 9012,
    },
  ];

  const orderData = [
    {
      key: "0",
      code: "MA240422-0004",
      date: "2024/1/3",
      loading: "青海A-4",
      deliver: "株式会社アルプス物流",
      item: "C12345",
      kind: "40",
      classify: "課税",
      basicMount: 5000,
      amount: 1,
      subTotal: 5000,
      tax: 500,
      sum: 5500,
    },
    {
      key: "1",
      code: "MA240422-0003",
      date: "2024/1/3",
      loading: "青海A-4",
      deliver: "株式会社アルプス物流",
      item: "C12345",
      kind: "40",
      classify: "課税",
      basicMount: 2000,
      amount: 1,
      subTotal: 2000,
      tax: 200,
      sum: 2200,
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (num) => `${num.toLocaleString()}円`,
    },
  ];

  const orderColumns = [
    {
      key: "受注コード",
      title: "受注コード",
      dataIndex: "受注コード",
    },
    {
      key: "積日",
      title: "積日",
      dataIndex: "積日",
    },
    {
      key: "卸日",
      title: "卸日",
      dataIndex: "卸日",
    },
    {
      key: "車番1",
      title: "車番1",
      dataIndex: "車番1",
    },
    {
      key: "車番2",
      title: "車番2",
      dataIndex: "車番2",
    },
    {
      key: "積地",
      title: "積地",
      dataIndex: "積地",
    },
    {
      key: "卸地",
      title: "卸地",
      dataIndex: "卸地",
    },
    {
      key: "品目",
      title: "品目",
      dataIndex: "品目",
    },
    {
      key: "種類",
      title: "種類",
      dataIndex: "種類",
    },
    {
      key: "税区分",
      title: "税区分",
      dataIndex: "税区分",
    },
    {
      key: "単価",
      title: "単価",
      dataIndex: "単価",
    },
    {
      key: "数量",
      title: "数量",
      dataIndex: "数量",
    },
    {
      key: "回数",
      title: "回数",
      dataIndex: "回数",
    },
    {
      key: "小計",
      title: "小計",
      dataIndex: "小計",
    },
    {
      key: "消費税",
      title: "消費税",
      dataIndex: "消費税",
    },
    {
      key: "合計",
      title: "合計",
      dataIndex: "合計",
    },
    {
      key: "備考",
      title: "備考",
      dataIndex: "備考",
    },
  ];

  const option = [
    {
      value: 0,
      label: "お客様",
    },
    {
      value: 1,
      label: "船社",
    },
    {
      value: 2,
      label: "下払",
    },
    {
      value: 3,
      label: "保管",
    },
  ];

  const columns2 = [
    {
      key: "請求先",
      title: "請求先",
      dataIndex: "請求先",
    },
    {
      key: "会社名",
      title: "会社名",
      dataIndex: "会社名",
    },
    {
      key: "会社住所",
      title: "会社住所",
      dataIndex: "会社住所",
    },
    {
      key: "事業者登録番号",
      title: "事業者登録番号",
      dataIndex: "事業者登録番号",
    },
    {
      key: "タグ",
      title: "タグ",
      dataIndex: "タグ",
    },
    {
      key: "銀行名",
      title: "銀行名",
      dataIndex: "銀行名",
    },
    {
      key: "支店名",
      title: "支店名",
      dataIndex: "支店名",
    },
    {
      key: "口座名",
      title: "口座名",
      dataIndex: "口座名",
    },
    {
      key: "口座名義",
      title: "口座名義",
      dataIndex: "口座名義",
    },
    {
      key: "件名",
      title: "件名",
      dataIndex: "件名",
    },
  ];
  return (
    <div className="flex flex-col justify-center w-full">
      <Title level={2} className="m-auto">
        御請求書
      </Title>
      <Divider className="w-full m-2" />
      <div className="flex justify-around w-full">
        <div>
          <Title level={5}>請求元情報</Title>
          <Text type="secondary">作成日: 2024/08/15</Text>
        </div>
        <div>
          <Title level={5}>㈱近鉄エクスプレス 輸入 御中</Title>
          <Text type="secondary">2024年1月締め</Text>
        </div>
      </div>
      <div className="flex flex-col md:flex-row px-2">
        <div className="md:w-[50%]">
          <Title level={4} className="m-auto py-4">
            請求先情報
          </Title>
          <div className="flex flex-wrap flex-row items-center gap-5">
            <Typography>
              <Text strong>顧客</Text>: LogiTechnoService株式会社
            </Typography>
            <Typography>
              <Text strong>住所</Text>: 東京都武蔵村山市神明2-51-15
            </Typography>
            <Typography>
              <Text strong>事業者登録番号</Text>: T1012801022526
            </Typography>
            <Typography>
              <Text strong>銀行名</Text>: 山梨中央銀行（銀行コード0142）
            </Typography>
            <Typography>
              <Text strong>支店名</Text>: 立川支店（支店コード207）
            </Typography>
            <Typography>
              <Text strong>口座名</Text>: 普通 704264 ロジテクノサービス（カ）
            </Typography>
          </div>
        </div>
        <div className="md:w-[50%]">
          <Title level={4} className="m-auto pt-4">
            御請求金額
          </Title>
          <div className="pt-2">
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              size="small"
            />
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center py-5">
        <Table
          dataSource={orderData}
          columns={orderColumns}
          scroll={{ x: "max-content" }}
          pagination={false}
          className="w-full"
        />
      </div>
      <div className="flex flex-wrap flex-row items-center justify-end gap-5">
        <div className="flex justify-center items-center">請求先</div>
        <Select options={option} defaultValue={1} className="max-w-72 grow" />
        <Button type="primary">PDF作成</Button>
      </div>
    </div>
  );
};

export default InvoiceMSPage;
