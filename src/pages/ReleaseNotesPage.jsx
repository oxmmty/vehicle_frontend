import React from "react";
import { Button, Table } from "antd";
import Mail from "src/components/Mail";

const ReleaseNotesPage = () => {
  const fileColumns = [
    {
      key: "no",
      title: "＃",
      dataIndex: "no",
      align: "center",
    },
    {
      key: "変更理由",
      title: "変更理由",
      dataIndex: "変更理由",
      align: "center",
    },
    {
      key: "項目",
      title: "項目",
      dataIndex: "項目",
      align: "center",
    },
    {
      key: "対象",
      title: "対象",
      dataIndex: "対象",
      align: "center",
    },
    {
      key: "内容",
      title: "内容",
      dataIndex: "内容",
      align: "center",
    },
    {
      key: "反映バージョン",
      title: "反映バージョン",
      dataIndex: "反映バージョン",
      align: "center",
    },
    {
      key: "実装日時",
      title: "実装日時",
      dataIndex: "実装日時",
      align: "center",
    },
    {
      key: "確認日時",
      title: "確認日時",
      dataIndex: "確認日時",
      align: "center",
    },
  ];

  const fileData = [
    {
      key: "1",
      fileName:
        "エムズ物流株式会社2401030100 株式会社アルプス物流 HA240419-0001.pdf",
      cooperationCompany: "エムズ物流株式会社",
      deliveryDestination: "株式会社アルプス物流",
      deliveryDate: "1/3",
      transmissionDate: "4/25",
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <Table
        columns={fileColumns}
        dataSource={fileData}
        pagination={false}
        bordered
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default ReleaseNotesPage;
