import "src/components/Notification";
import Header from "src/components/Header";
import Footer from "src/components/Footer";
import { axiosSetting } from "src/components/AxiosSetting";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import { Processbar } from "src/components/Processbar";
import "nprogress/nprogress.css";
import { useLocation } from "react-router-dom"; // Use location from react-router-dom
import { PicRightOutlined } from "@ant-design/icons";
import { CalendarOutlined } from "@ant-design/icons";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { DatabaseOutlined } from "@ant-design/icons";
import { UnorderedListOutlined } from "@ant-design/icons";
import { FilePdfOutlined } from "@ant-design/icons";
import { PullRequestOutlined } from "@ant-design/icons";
import { MailOutlined } from "@ant-design/icons";
import { PayCircleOutlined } from "@ant-design/icons";
import { FileDoneOutlined } from "@ant-design/icons";
import { FileAddOutlined } from "@ant-design/icons";
import { AppstoreOutlined } from "@ant-design/icons";
import { UsergroupAddOutlined } from "@ant-design/icons";
import { UserAddOutlined } from "@ant-design/icons";
import { MoneyCollectOutlined } from "@ant-design/icons";
import { MoneyCollectFilled } from "@ant-design/icons";
import DirectionsBoatOutlinedIcon from "@mui/icons-material/DirectionsBoatOutlined";
import FloodOutlinedIcon from "@mui/icons-material/FloodOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import SettingsApplicationsOutlinedIcon from "@mui/icons-material/SettingsApplicationsOutlined";
import NewReleasesOutlinedIcon from "@mui/icons-material/NewReleasesOutlined";
import AirportShuttleOutlinedIcon from "@mui/icons-material/AirportShuttleOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import CurrencyYenOutlinedIcon from "@mui/icons-material/CurrencyYenOutlined";
import ScoreOutlinedIcon from "@mui/icons-material/ScoreOutlined";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import SsidChartOutlinedIcon from "@mui/icons-material/SsidChartOutlined";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";

axiosSetting();

const dashboard = [
  {
    key: "overview",
    label: "Overview",
    icon: <PicRightOutlined />,
  },
];

const orders_invoices = [
  {
    key: "calendar",
    label: "カレンダー",
    icon: <CalendarOutlined />,
  },
  {
    key: "newOrderForm",
    label: "受注入力",
    icon: <FileAddOutlined />,
  },
  {
    key: "db",
    label: "DB",
    icon: <DatabaseOutlined />,
  },
  {
    key: "orderDB",
    label: "受注DB",
    icon: <UnorderedListOutlined />,
  },

  {
    key: "requestPdfList",
    label: "依頼書作成",
    icon: <FilePdfOutlined />,
  },
  {
    key: "requestList",
    label: "依頼リスト",
    icon: <PullRequestOutlined />,
  },
  {
    key: "mail",
    label: "Mail",
    icon: <MailOutlined />,
  },
  {
    key: "billingList",
    label: "請求一覧",
    icon: <PayCircleOutlined />,
  },
  {
    key: "invoice_receipt",
    label: "送り状・受領書",
    icon: <FileDoneOutlined />,
  },
];

const containers = [
  {
    key: "storageContainer",
    label: "実入り保管コンテナ一覧",
    icon: <AppstoreAddOutlined />,
  },
  {
    key: "inventoryContainer",
    label: "空バン在庫コンテナ一覧",
    icon: <AppstoreOutlined />,
  },
];

const masterDatas = [
  {
    key: "customer",
    label: "顧客",
    icon: <UserAddOutlined />,
  },
  {
    key: "partnerCompany",
    label: "協力会社",
    icon: <UsergroupAddOutlined />,
  },
  {
    key: "customerList",
    label: "顧客別料金表",
    icon: <MoneyCollectOutlined />,
  },
  {
    key: "partnerCompanyList",
    label: "協力会社別料金表",
    icon: <MoneyCollectFilled />,
  },
  { key: "shipperList", label: "荷主", icon: <DirectionsBoatOutlinedIcon /> },
  { key: "shipCompany", label: "船社", icon: <FloodOutlinedIcon /> },
  {
    key: "businessLocation",
    label: "作業地",
    icon: <EngineeringOutlinedIcon />,
  },
];

const analysis_reports = [
  {
    key: "monthlyCustomerDBGraph",
    label: "顧客別 月次グラフDB",
    icon: <QueryStatsOutlinedIcon />,
  },
  {
    key: "monthlyPartnerCompanyDBGraph",
    label: "協力会社別 月次グラフDB",
    icon: <SsidChartOutlinedIcon />,
  },
  {
    key: "db_s",
    label: "DB_S",
    icon: <ReceiptLongOutlinedIcon />,
  },
  {
    key: "monthlyCustomerDB",
    label: "顧客別 月次DB",
    icon: <StorageOutlinedIcon />,
  },
  {
    key: "storageContainerDB",
    label: "保管コンテナ一覧DB",
    icon: <WarehouseOutlinedIcon />,
  },
  {
    key: "monthlyCustomer",
    label: "顧客別　月次",
    icon: <CreditScoreOutlinedIcon />,
  },

  {
    key: "monthlyPartnerCompany",
    label: "協力会社別 月次",
    icon: <ScoreOutlinedIcon />,
  },
  {
    key: "departmentProfit",
    label: "部署別損益",
    icon: <CurrencyYenOutlinedIcon />,
  },
  {
    key: "monthlyDepartmentReport",
    label: "部署別月次報告",
    icon: <AssessmentOutlinedIcon />,
  },
  {
    key: "transportCompanyRequest",
    label: "輸送会社依頼一覧",
    icon: <AirportShuttleOutlinedIcon />,
  },
];

const document_notes = [
  {
    key: "releaseNotes",
    label: "リリースノート",
    icon: <NewReleasesOutlinedIcon />,
  },
  {
    key: "data",
    label: "データ",
    icon: <SettingsApplicationsOutlinedIcon />,
  },
];

const settings_administration = [
  {
    key: "userManagements",
    label: "ユーザー管理",
  },
  { key: "businessOffice", label: "事業所" },
  // {
  //   key: "systemSettings",
  //   label: "システム設定",
  // },
];

const items = {
  dashboard,
  orders_invoices,
  containers,
  masterDatas,
  analysis_reports,
  document_notes,
  settings_administration,
};

function App() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div
      className={`bg-bg-light min-h-screen grid grid-rows-[64px_1fr_auto] grid-cols-1 grid-areas-layout ${
        currentPath === "/dashboard/overview"
          ? ``
          : `xl:grid-cols-[auto_minmax(0,1fr)]`
      }`}>
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
        <Main className="z-10 ml-[14px] mr-6 flex flex-col grid-in-main pt-4 bg-bg-dark" />
      </div>
      <Footer className="  xl:col-start-2 xl:col-span-1 2xl:col-span-2 2xl:col-start-2 text-center text-txt-100 grid-in-footer bg-bg-dark" />
    </div>
  );
}

export default App;
