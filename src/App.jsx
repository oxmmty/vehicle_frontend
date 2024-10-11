import "src/components/Notification";
import Header from "src/components/Header";
import Footer from "src/components/Footer";
import { axiosSetting } from "src/components/AxiosSetting";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import { Processbar } from "src/components/Processbar";
import "nprogress/nprogress.css";

axiosSetting();

const dashboard = [
  {
    key: "overview",
    label: "Overview",
  },
  {
    key: "quick",
    label: "Quick",
  },
];

const orders_invoices = [
  {
    key: "newOrderForm",
    label: "新依頼書",
  },
  {
    key: "db",
    label: "DB",
  },
  {
    key: "orderDB",
    label: "受注DB",
  },
  {
    key: "calendar",
    label: "カレンダー",
  },
  {
    key: "requestPdfList",
    label: "要求書作成リスト",
  },
  // {
  //   key: "newRequestForm",
  //   label: "依頼書",
  // },
  {
    key: "requestList",
    label: "依頼リスト",
  },
  {
    key: "mail",
    label: "Mail",
  },
  {
    key: "billingList",
    label: "請求一覧",
  },
  // {
  //   key: "invoice",
  //   label: "請求書",
  // },
  // {
  //   key: "invoice_Ms",
  //   label: "請求書_エムズ",
  // },
  {
    key: "invoice_receipt",
    label: "送り状・受領書",
  },
];

const containers = [
  {
    key: "storageContainer",
    label: "実入り保管コンテナ一覧",
  },
  {
    key: "inventoryContainer",
    label: "空バン在庫コンテナ一覧",
  },
];

// const calendar_schedules = [
//   {
//     key: "calendar",
//     label: "カレンダー",
//   },
//   // {
//   //   key: "dispatchSpecification",
//   //   label: "配車表仕様書",
//   // },
//   // {
//   //   key: "taskSchedule",
//   //   label: "Task Schedule",
//   // },
// ];

const masterDatas = [
  {
    key: "customer",
    label: "顧客",
  },
  {
    key: "partnerCompany",
    label: "協力会社",
  },
  {
    key: "customerList",
    label: "顧客別料金表",
  },
  {
    key: "partnerCompanyList",
    label: "協力会社別料金表",
  },
  { key: "shipperList", label: "荷主" },
  { key: "shipCompany", label: "船社" },
  { key: "businessLocation", label: "作業地" },
];

const analysis_reports = [
  {
    key: "monthlyCustomerDBGraph",
    label: "顧客別 月次グラフDB",
  },
  {
    key: "monthlyPartnerCompanyDBGraph",
    label: "協力会社別 月次グラフDB",
  },
  {
    key: "db_s",
    label: "DB_S",
  },
  {
    key: "monthlyCustomerDB",
    label: "顧客別 月次DB",
  },
  {
    key: "storageContainerDB",
    label: "保管コンテナ一覧DB",
  },
  {
    key: "monthlyCustomer",
    label: "顧客別　月次",
  },
  {
    key: "monthlyPartnerCompany",
    label: "協力会社別 月次",
  },
  {
    key: "departmentProfit",
    label: "部署別損益",
  },
  {
    key: "monthlyDepartmentReport",
    label: "部署別月次報告",
  },
  {
    key: "transportCompanyRequest",
    label: "輸送会社依頼一覧",
  },
];

const document_notes = [
  {
    key: "releaseNotes",
    label: "リリースノート",
  },
  {
    key: "data",
    label: "データ",
  },
];

const settings_administration = [
  {
    key: "userManagements",
    label: "ユーザー管理",
  },
  { key: "businessOffice", label: "事業所" },
  {
    key: "systemSettings",
    label: "システム設定",
  },
];

const items = {
  dashboard,
  orders_invoices,
  containers,
  // calendar_schedules,
  masterDatas,
  analysis_reports,
  document_notes,
  settings_administration,
};

function App() {
  return (
    <div className="bg-bg-light min-h-screen grid grid-rows-[64px_1fr_auto] grid-cols-1 xl:grid-cols-[auto_minmax(0,1fr)] grid-areas-layout">
      {" "}
      {/* 2xl:grid-cols-[auto_minmax(0,1fr)_200px] */}
      <Processbar />
      <Header
        items={items}
        className="sticky top-0 backdrop-blur-sm bg-bg-light z-50 border-b border-border-100 xl:col-span-2 2xl:col-span-3 grid-in-head"
      />
      <Sidebar
        items={items}
        className="bg-bg-dark hidden xl:inline row-span-2 overflow-auto sticky top-[64px] max-h-[calc(100vh-64px)] box-border grid-in-sidebar pr-[10px]"
      />
      <div className="bg-bg-dark">
        <Main className="z-10 ml-[14px] mr-6 flex flex-col grid-in-main pt-4" />
      </div>
      <Footer className="xl:col-start-2 xl:col-span-1 2xl:col-span-2 2xl:col-start-2 text-center text-txt-100 grid-in-footer bg-bg-dark" />
    </div>
  );
}

export default App;
