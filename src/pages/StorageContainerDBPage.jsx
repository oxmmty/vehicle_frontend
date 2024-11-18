import React from "react";
import CTable from "src/components/CTable";

const StorageContainerDBPage = () => {
  const columns = [
    {
      key: "搬入日",
      title: "搬入日",
      dataIndex: "搬入日",
      align: "center",
    },
    {
      key: "搬出日",
      title: "搬出日",
      dataIndex: "搬出日",
      align: "center",
    },
    {
      key: "コンテナ№",
      title: "コンテナ№",
      dataIndex: "コンテナ№",
      align: "center",
    },
    {
      key: "コンテナサイズ",
      title: "コンテナサイズ",
      dataIndex: "コンテナサイズ",
      align: "center",
    },
    {
      key: "コンテナタイプ",
      title: "コンテナタイプ",
      dataIndex: "コンテナタイプ",
      align: "center",
    },
    {
      key: "船社",
      title: "船社",
      dataIndex: "船社",
      align: "center",
    },
    {
      key: "保管先",
      title: "保管先",
      dataIndex: "保管先",
      align: "center",
    },
    {
      key: "搬入顧客",
      title: "搬入顧客",
      dataIndex: "搬入顧客",
      align: "center",
    },
    {
      key: "搬出顧客",
      title: "搬出顧客",
      dataIndex: "搬出顧客",
      align: "center",
    },
    {
      key: "搬出ブッキング№",
      title: "搬出ブッキング№",
      dataIndex: "搬出ブッキング№",
      align: "center",
    },
  ];

  return (
    <div className="flex flex-col items-center w-full p-4">
      <CTable
        columns={columns}
        ps={10}
        bordered
        scroll={({ x: "max-content" }, { y: 900 })}
      />
    </div>
  );
};

export default StorageContainerDBPage;
