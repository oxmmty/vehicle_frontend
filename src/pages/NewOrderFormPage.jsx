import {
  Button,
  Tabs,
  Form,
  DatePicker,
  Checkbox,
  Input,
  Select,
  message,
} from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import Group from "src/components/Group";
import Delivery from "src/components/Delivery";
import PackageInfo from "src/components/PackageInfo";
import SubcontractPayment from "src/components/SubcontractPayment";
import Storage from "src/components/Storage";
import dayjs from "dayjs";

const { TextArea } = Input;
const dateFormat = "YYYY-MM-DD";
const SeaComponent = ({ setData }) => {
  const [deliveryData1, setDeliveryData1] = useState([]);
  const [deliveryData2, setDeliveryData2] = useState([]);
  const [deliveryData3, setDeliveryData3] = useState([]);
  const [packageInfoData, setPackageInfoData] = useState([]);
  const [subPayData1, setSubPayData1] = useState([]);
  const [subPayData2, setSubPayData2] = useState([]);
  const [subPayData3, setSubPayData3] = useState([]);
  const [subPayData4, setSubPayData4] = useState([]);
  const [subPayData5, setSubPayData5] = useState([]);
  const [subPayData6, setSubPayData6] = useState([]);
  const [storageData, setStorageData] = useState([]);

  const [date, setDate] = useState();
  const [customerData, setCustomerData] = useState([]);
  const [filteredCustomerData, setFilteredCustomerData] = useState([]);
  const [selectedValueCustomer, setSelectedValueCustomer] = useState("");
  const [inputValueCustomer, setInputValueCustomer] = useState("");

  const [companyData, setCompanyData] = useState([]);
  const [filteredCompanyData, setFilteredCompanyData] = useState([]);
  const [selectedValueCompany, setSelectedValueCompany] = useState("");
  const [inputValueCompany, setInputValueCompany] = useState("");

  const [locationData, setLocationData] = useState([]);
  const [filteredLocationData, setFilteredLocationData] = useState([]);
  const [selectedValueLocation, setSelectedValueLocation] = useState("");
  const [inputValueLocation, setInputValueLocation] = useState("");

  const [loadData, setLoadData] = useState([]);
  const [filteredLoadData, setFilteredLoadData] = useState([]);
  const [selectedValueLoad, setSelectedValueLoad] = useState("");
  const [inputValueLoad, setInputValueLoad] = useState("");

  const [shipData, setShipData] = useState([]);
  const [filteredShipData, setFilteredShipData] = useState([]);
  const [selectedValueShip, setSelectedValueShip] = useState("");
  const [inputValueShip, setInputValueShip] = useState("");

  const [shipperData, setShipperData] = useState([]);
  const [filteredShipperData, setFilteredShipperData] = useState([]);
  const [selectedValueShipper, setSelectedValueShipper] = useState("");
  const [inputValueShipper, setInputValueShipper] = useState("");

  const [selectedValueDivide, setSelectedValueDivide] = useState("");

  const [pick, setPick] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [vehicle, setVehicle] = useState(false);
  const [blank, setBlank] = useState(false);
  const [invoice, setInvoice] = useState(false);
  const [angle, setAngle] = useState(null);
  const [risk, setRisk] = useState(null);

  const [no, setNo] = useState(null);
  const [size, setSize] = useState(null);
  const [type, setType] = useState(null);
  const [kinds, setKinds] = useState(null);
  const [bk, setBk] = useState(null);
  const [bl, setBl] = useState(null);
  const [shipName, setShipName] = useState(null);
  const [code, setCode] = useState(null);

  const [requestRemark, setRequestRemark] = useState(null);
  const [invoiceRemark, setInvoiceRemark] = useState(null);

  const lastDay = dayjs(date).endOf("month").format("YYYY-MM-DD");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customers, companies, ships, shippers, workstations] =
          await Promise.all([
            axios.get(process.env.REACT_API_BASE_URL + `/customer`),
            axios.get(process.env.REACT_API_BASE_URL + `/partnercompany`),
            axios.get(process.env.REACT_API_BASE_URL + `/ship`),
            axios.get(process.env.REACT_API_BASE_URL + `/shipper`),
            axios.get(process.env.REACT_API_BASE_URL + `/workstation`),
          ]);

        const customer = customers.data
          .sort((a, b) => b.カウント - a.カウント)
          .map((item) => item.顧客名称);
        setCustomerData(customer);

        const partnercompnay = companies.data
          .sort((a, b) => b.カウント - a.カウント)
          .map((item) => item.協力会社);
        setCompanyData(customer);

        const ship = ships.data
          .sort((a, b) => b.カウント - a.カウント)
          .map((item) => item.船社名称);
        setShipData(ship);

        const shipper = shippers.data
          .sort((a, b) => b.カウント - a.カウント)
          .map((item) => item.荷主名称);
        setShipperData(shipper);

        const locationFilter = workstations.data
          .filter((item) => item.取場所 !== null)
          .sort((a, b) => b.取場所 - a.取場所);
        const location = locationFilter.map((item) => item.作業地名称);
        setLocationData(location);

        const loadFilter = workstations.data
          .filter((item) => item.搬入返却場所 !== null)
          .sort((a, b) => b.搬入返却場所 - a.搬入返却場所);
        const load = loadFilter.map((item) => item.作業地名称);
        setLoadData(load);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const distinguish = [
    "実入り取り",
    "空バン取り",
    "実入り取りCRU",
    "実入り取りFDR",
    "実入り取りPIC",
    "保管",
    "空バン在庫",
    "船社請求",
  ];
  const typeData = [86, 96];
  const sizeData = [20, 40];
  const kindsData = ["Dry", "TNK", "REEFER", "FRAT"];

  // Customer Datas
  const handleSelectCustomer = (value) => {
    setSelectedValueCustomer(value);
  };
  const handleChangeCustomer = (value) => {
    setInputValueCustomer(value);
    // Filter customer data based on input value
    const filteredData = customerData.filter((customer) =>
      customer.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredCustomerData(filteredData); // Update filtered customer data
  };
  const handleKeyPressCustomer = async (event) => {
    if (
      event.key === "Enter" &&
      inputValueCustomer &&
      !customerData.includes(inputValueCustomer)
    ) {
      // const savedValue = await saveToDatabase(inputValueCustomer);
      setSelectedValueCustomer(inputValueCustomer);
      setInputValueCustomer("");
      setFilteredCustomerData([...customerData, inputValueCustomer]); // Add to filtered list
    }
  };
  //Partner comapany datas
  const handleSelectCompany = (value) => {
    setSelectedValueCompany(value);
  };
  const handleChangeCompany = (value) => {
    setInputValueCompany(value);
    const filteredData = companyData.filter((company) =>
      company.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredCompanyData(filteredData);
  };
  const handleKeyPressCompany = async (event) => {
    if (
      event.key === "Enter" &&
      inputValueCompany &&
      !companyData.includes(inputValueCompany)
    ) {
      // const savedValue = await saveToDatabase(inputValueCompany);
      setSelectedValueCompany(inputValueCompany);
      setInputValueCompany("");
      setFilteredCompanyData([...companyData, inputValueCompany]);
    }
  };
  // Location datas
  const handleSelectLocation = (value) => {
    setSelectedValueLocation(value);
  };
  const handleChangeLocation = (value) => {
    setInputValueLocation(value);
    const filteredData = locationData.filter((location) =>
      location.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredLocationData(filteredData);
  };
  const handleKeyPressLocation = async (event) => {
    if (
      event.key === "Enter" &&
      inputValueLocation &&
      !locationData.includes(inputValueLocation)
    ) {
      // const savedValue = await saveToDatabase(inputValueLocation);
      setSelectedValueLocation(inputValueLocation);
      setInputValueLocation("");
      setFilteredLocationData([...locationData, inputValueLocation]);
    }
  };
  //Load Datas
  const handleSelectLoad = (value) => {
    setSelectedValueLoad(value);
  };
  const handleChangeLoad = (value) => {
    setInputValueLoad(value);
    const filteredData = loadData.filter((load) =>
      load.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredLoadData(filteredData);
  };
  const handleKeyPressLoad = async (event) => {
    if (
      event.key === "Enter" &&
      inputValueLoad &&
      !loadData.includes(inputValueLoad)
    ) {
      // const savedValue = await saveToDatabase(inputValueLoad);
      setSelectedValueLoad(inputValueLoad);
      setInputValueLoad("");
      setFilteredLoadData([...loadData, inputValueLoad]);
    }
  };
  //Ship Data
  const handleSelectShip = (value) => {
    setSelectedValueShip(value);
  };
  const handleChangeShip = (value) => {
    setInputValueShip(value);
    const filteredData = shipData.filter((ship) =>
      ship.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredShipData(filteredData);
  };
  const handleKeyPressShip = async (event) => {
    if (
      event.key === "Enter" &&
      inputValueShip &&
      !shipData.includes(inputValueShip)
    ) {
      // const savedValue = await saveToDatabase(inputValueShip);
      setSelectedValueShip(inputValueShip);
      setInputValueShip("");
      setFilteredShipData([...shipData, inputValueShip]);
    }
  };
  //Shipper Data
  const handleSelectShipper = (value) => {
    setSelectedValueShipper(value);
  };
  const handleChangeShipper = (value) => {
    setInputValueShipper(value);
    const filteredData = shipperData.filter((shipper) =>
      shipper.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredShipperData(filteredData);
  };
  const handleKeyPressShipper = async (event) => {
    if (
      event.key === "Enter" &&
      inputValueShipper &&
      !shipperData.includes(inputValueShipper)
    ) {
      // const savedValue = await saveToDatabase(inputValueShipper);
      setSelectedValueShipper(inputValueShipper);
      setInputValueShipper("");
      setFilteredShipperData([...shipperData, inputValueShipper]);
    }
  };
  //Divide Data
  const handleSelectDivide = (value) => {
    setSelectedValueDivide(value);
  };
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    setSelectedValueDivide(null);
  };

  const checkPick = () => {
    if (pick !== true) {
      setPick(true);
    } else {
      setPick(false);
    }
  };
  const checkVehicle = () => {
    if (vehicle !== true) {
      setVehicle(true);
    } else {
      setVehicle(false);
    }
  };
  const checkBlank = () => {
    if (blank !== true) {
      setBlank(true);
    } else {
      setBlank(false);
    }
  };
  const checkInvoice = () => {
    if (invoice !== true) {
      setInvoice(true);
    } else {
      setInvoice(false);
    }
  };
  const checkAngle = () => {
    if (angle !== true) {
      setAngle(true);
    } else {
      setAngle(false);
    }
  };
  const checkRisk = () => {
    if (risk !== true) {
      setRisk(true);
    } else {
      setRisk(false);
    }
  };
  const today = dayjs().format("YYYY-MM-DD");
  const a = dayjs(today).format("YYMMDD");
  if (selectedValueDivide == "実入り取り") {
    const b = "MA" + a + "-";
    console.log(b);
  } else if (selectedValueDivide == "空バン取り") {
    const b = "KA" + a + "-";
    console.log(b);
  } else if (selectedValueDivide == "実入り取りCRU") {
    const b = "MA" + a + "-";
    console.log(b);
  } else if (selectedValueDivide == "実入り取りFDR") {
    const b = "MA" + a + "-";
    console.log(b);
  } else if (selectedValueDivide == "実入り取りPIC") {
    const b = "PA" + a + "-";
    console.log(b);
  } else if (selectedValueDivide == "保管") {
    const b = "XA" + a + "-";
    console.log(b);
  }
  useEffect(() => {
    setData({
      請求日: lastDay,
      ピックチェック: pick,
      配車組み: vehicle,
      部署コード: code,
      空バン返却チェック: blank,
      送り状受領書作成: invoice,
      区分: selectedValueDivide,
      未定: isChecked,
      荷主名: selectedValueShipper,
      顧客名: selectedValueCustomer,
      CRU顧客名: selectedValueCompany,
      取場所: selectedValueLocation,
      搬入返却場所: selectedValueLoad,
      船社: selectedValueShip,
      コンテナNo: no,
      コンテナタイプ: type,
      コンテナサイズ: size,
      コンテナ種類: kinds,
      軸3: angle,
      危険品: risk,
      BKNo: bk,
      BLNo: bl,
      船名: shipName,
      配達先1: deliveryData1[3],
      配達先TEL1: deliveryData1[5],
      配達先住所1: deliveryData1[4],
      配達先担当者: deliveryData1[6],
      積日1: deliveryData1[1],
      配達日1: deliveryData1[0],
      配達時間1: deliveryData1[2],
      基本料金1: deliveryData1[7],
      基本課税1: deliveryData1[8],
      "3軸料金1": deliveryData1[9],
      "3軸課税1": deliveryData1[10],
      CRU変更料金1: deliveryData1[11],
      CRU変更課税1: deliveryData1[12],
      高速費: deliveryData1[13],
      スケール費: deliveryData1[14],
      スケール費課税1: deliveryData1[15],
      シャーシ留置費: deliveryData1[16],
      シャーシ留置費課税1: deliveryData1[17],
      その他費用: deliveryData1[18],
      その他課税: deliveryData1[19],
      依頼書備考: deliveryData1[20],
      配達先2: deliveryData2[3],
      配達先TEL2: deliveryData2[5],
      配達先住所2: deliveryData2[4],
      配達先担当者2: deliveryData2[6],
      積日2: deliveryData2[1],
      配達日2: deliveryData2[0],
      配達時間2: deliveryData2[2],
      基本料金2: deliveryData2[7],
      基本課税2: deliveryData2[8],
      "3軸料金2": deliveryData2[9],
      "3軸課税2": deliveryData2[10],
      CRU変更料金2: deliveryData2[11],
      CRU変更課税2: deliveryData2[12],
      高速費2: deliveryData2[13],
      スケール費2: deliveryData2[14],
      スケール費課税2: deliveryData2[15],
      シャーシ留置費2: deliveryData2[16],
      シャーシ留置費課税2: deliveryData2[17],
      その他費用2: deliveryData2[18],
      その他課税2: deliveryData2[19],
      依頼書備考2: deliveryData2[20],
      配達先3: deliveryData3[3],
      配達先TEL3: deliveryData3[5],
      配達先住所3: deliveryData3[4],
      配達先担当者3: deliveryData3[6],
      積日3: deliveryData3[1],
      配達日3: deliveryData3[0],
      配達時間3: deliveryData3[2],
      基本料金3: deliveryData3[7],
      基本課税3: deliveryData3[8],
      "3軸料金3": deliveryData3[9],
      "3軸課税3": deliveryData3[10],
      CRU変更料金3: deliveryData3[11],
      CRU変更課税3: deliveryData3[12],
      高速費3: deliveryData3[13],
      スケール費3: deliveryData3[14],
      スケール費課税3: deliveryData3[15],
      シャーシ留置費3: deliveryData3[16],
      シャーシ留置費課税3: deliveryData3[17],
      その他費用3: deliveryData3[18],
      その他課税3: deliveryData3[19],
      依頼書備考3: deliveryData3[20],
      下払会社名1: subPayData1[0],
      下払料金1: subPayData1[1],
      下払課税1: subPayData1[2],
      下払自車F1: subPayData1[4],
      下払自車S1: subPayData1[6],
      自社車番F1: subPayData1[7],
      自社車番S1: subPayData1[8],
      自社乗務員1: subPayData1[9],
      下払高速費1: subPayData1[10],
      下払スケール費1: subPayData1[11],
      下払スケール費課税1: subPayData1[12],
      下払シャーシ留置費1: subPayData1[13],
      下払シャーシ留置費課税1: subPayData1[14],
      下払その他費用1: subPayData1[15],
      下払その他課税1: subPayData1[16],
      下払会社名2: subPayData2[0],
      下払料金2: subPayData2[1],
      下払課税2: subPayData2[2],
      下払自車F2: subPayData2[4],
      下払自車S2: subPayData2[6],
      自社車番F2: subPayData2[7],
      自社車番S2: subPayData2[8],
      自社乗務員2: subPayData2[9],
      下払高速費2: subPayData2[10],
      下払スケール費2: subPayData2[11],
      下払スケール費課税2: subPayData2[12],
      下払シャーシ留置費2: subPayData2[13],
      下払シャーシ留置費課税2: subPayData2[14],
      下払その他費用2: subPayData2[15],
      下払その他課税2: subPayData2[16],
      下払会社名3: subPayData3[0],
      下払料金3: subPayData3[1],
      下払課税3: subPayData3[2],
      下払自車F3: subPayData3[4],
      下払自車S3: subPayData3[6],
      自社車番F3: subPayData3[7],
      自社車番S3: subPayData3[8],
      自社乗務員3: subPayData3[9],
      下払高速費3: subPayData3[10],
      下払スケール費3: subPayData3[11],
      下払スケール費課税3: subPayData3[12],
      下払シャーシ留置費3: subPayData3[13],
      下払シャーシ留置費課税3: subPayData3[14],
      下払その他費用3: subPayData3[15],
      下払その他課税3: subPayData3[16],
      下払会社名4: subPayData4[0],
      下払料金4: subPayData4[1],
      下払課税4: subPayData4[2],
      下払自車F4: subPayData4[4],
      下払自車S4: subPayData4[6],
      自社車番F4: subPayData4[7],
      自社車番S4: subPayData4[8],
      自社乗務員4: subPayData4[9],
      下払高速費4: subPayData4[10],
      下払スケール費4: subPayData4[11],
      下払スケール費課税4: subPayData4[12],
      下払シャーシ留置費4: subPayData4[13],
      下払シャーシ留置費課税4: subPayData4[14],
      下払その他費用4: subPayData4[15],
      下払その他課税4: subPayData4[16],
      下払会社名5: subPayData5[0],
      下払料金5: subPayData5[1],
      下払課税5: subPayData5[2],
      下払自車F5: subPayData5[4],
      下払自車S5: subPayData5[6],
      自社車番F5: subPayData5[7],
      自社車番S5: subPayData5[8],
      自社乗務員5: subPayData5[9],
      下払高速費5: subPayData5[10],
      下払スケール費5: subPayData5[11],
      下払スケール費課税5: subPayData5[12],
      下払シャーシ留置費5: subPayData5[13],
      下払シャーシ留置費課税5: subPayData5[14],
      下払その他費用5: subPayData5[15],
      下払その他課税5: subPayData5[16],
      下払会社名6: subPayData6[0],
      下払料金6: subPayData6[1],
      下払課税6: subPayData6[2],
      下払自車F6: subPayData6[4],
      下払自車S6: subPayData6[6],
      自社車番F6: subPayData6[7],
      自社車番S6: subPayData6[8],
      自社乗務員6: subPayData6[9],
      下払高速費6: subPayData6[10],
      下払スケール費6: subPayData6[11],
      下払スケール費課税6: subPayData6[12],
      下払シャーシ留置費6: subPayData6[13],
      下払シャーシ留置費課税6: subPayData6[14],
      下払その他費用6: subPayData6[15],
      下払その他課税6: subPayData6[16],
      シール番号: packageInfoData[1],
      TW: packageInfoData[2],
      VOYNo: packageInfoData[3],
      荷揚港: packageInfoData[4],
      最終仕向: packageInfoData[5],
      品名: packageInfoData[6],
      個数: packageInfoData[7],
      重量: packageInfoData[8],
      荷姿: packageInfoData[9],
      カット日: packageInfoData[0],
      保管場所: storageData[0],
      入庫日: storageData[1],
      出庫日: storageData[2],
      荷主保管料金リフトオフ: storageData[3],
      荷主保管料金リフトオン: storageData[4],
      荷主保管料金1日: storageData[5],
      荷主保管課税: storageData[6],
      下払保管料金リフトオフ: storageData[7],
      下払保管料金リフトオン: storageData[8],
      下払保管料金1日: storageData[9],
      下払保管課税: storageData[10],
      請求書備考: requestRemark,
      送り状受領書備考: invoiceRemark,
    });
  }, [
    lastDay,
    pick,
    vehicle,
    code,
    blank,
    invoice,
    selectedValueDivide,
    isChecked,
    selectedValueShipper,
    selectedValueCustomer,
    selectedValueCompany,
    selectedValueLocation,
    selectedValueLoad,
    selectedValueShip,
    no,
    type,
    size,
    kinds,
    angle,
    risk,
    bk,
    bl,
    shipName,
    deliveryData1[3],
    deliveryData1[4],
    deliveryData1[5],
    deliveryData1[6],
    deliveryData1[1],
    deliveryData1[0],
    deliveryData1[2],
    deliveryData1[7],
    deliveryData1[8],
    deliveryData1[9],
    deliveryData1[10],
    deliveryData1[11],
    deliveryData1[12],
    deliveryData1[13],
    deliveryData1[14],
    deliveryData1[15],
    deliveryData1[16],
    deliveryData1[17],
    deliveryData1[18],
    deliveryData1[19],
    deliveryData1[20],
    deliveryData2[3],
    deliveryData2[4],
    deliveryData2[5],
    deliveryData2[6],
    deliveryData2[1],
    deliveryData2[0],
    deliveryData2[2],
    deliveryData2[7],
    deliveryData2[8],
    deliveryData2[9],
    deliveryData2[10],
    deliveryData2[11],
    deliveryData2[12],
    deliveryData2[13],
    deliveryData2[14],
    deliveryData2[15],
    deliveryData2[16],
    deliveryData2[17],
    deliveryData2[18],
    deliveryData2[19],
    deliveryData2[20],
    deliveryData3[3],
    deliveryData3[4],
    deliveryData3[5],
    deliveryData3[6],
    deliveryData3[1],
    deliveryData3[0],
    deliveryData3[2],
    deliveryData3[7],
    deliveryData3[8],
    deliveryData3[9],
    deliveryData3[10],
    deliveryData3[11],
    deliveryData3[12],
    deliveryData3[13],
    deliveryData3[14],
    deliveryData3[15],
    deliveryData3[16],
    deliveryData3[17],
    deliveryData3[18],
    deliveryData3[19],
    deliveryData3[20],
    subPayData1[0],
    subPayData1[1],
    subPayData1[2],
    subPayData1[3],
    subPayData1[4],
    subPayData1[5],
    subPayData1[6],
    subPayData1[7],
    subPayData1[8],
    subPayData1[9],
    subPayData1[10],
    subPayData1[11],
    subPayData1[12],
    subPayData1[13],
    subPayData1[14],
    subPayData1[15],
    subPayData1[16],
    subPayData2[0],
    subPayData2[1],
    subPayData2[2],
    subPayData2[3],
    subPayData2[4],
    subPayData2[5],
    subPayData2[6],
    subPayData2[7],
    subPayData2[8],
    subPayData2[9],
    subPayData2[10],
    subPayData2[11],
    subPayData2[12],
    subPayData2[13],
    subPayData2[14],
    subPayData2[15],
    subPayData2[16],
    subPayData3[0],
    subPayData3[1],
    subPayData3[2],
    subPayData3[3],
    subPayData3[4],
    subPayData3[5],
    subPayData3[6],
    subPayData3[7],
    subPayData3[8],
    subPayData3[9],
    subPayData3[10],
    subPayData3[11],
    subPayData3[12],
    subPayData3[13],
    subPayData3[14],
    subPayData3[15],
    subPayData3[16],
    subPayData4[0],
    subPayData4[1],
    subPayData4[2],
    subPayData4[3],
    subPayData4[4],
    subPayData4[5],
    subPayData4[6],
    subPayData4[7],
    subPayData4[8],
    subPayData4[9],
    subPayData4[10],
    subPayData4[11],
    subPayData4[12],
    subPayData4[13],
    subPayData4[14],
    subPayData4[15],
    subPayData4[16],
    subPayData5[0],
    subPayData5[1],
    subPayData5[2],
    subPayData5[3],
    subPayData5[4],
    subPayData5[5],
    subPayData5[6],
    subPayData5[7],
    subPayData5[8],
    subPayData5[9],
    subPayData5[10],
    subPayData5[11],
    subPayData5[12],
    subPayData5[13],
    subPayData5[14],
    subPayData5[15],
    subPayData5[16],
    subPayData6[0],
    subPayData6[1],
    subPayData6[2],
    subPayData6[3],
    subPayData6[4],
    subPayData6[5],
    subPayData6[6],
    subPayData6[7],
    subPayData6[8],
    subPayData6[9],
    subPayData6[10],
    subPayData6[11],
    subPayData6[12],
    subPayData6[13],
    subPayData6[14],
    subPayData6[15],
    subPayData6[16],
    packageInfoData[1],
    packageInfoData[2],
    packageInfoData[3],
    packageInfoData[4],
    packageInfoData[5],
    packageInfoData[6],
    packageInfoData[7],
    packageInfoData[8],
    packageInfoData[9],
    packageInfoData[0],
    storageData[0],
    storageData[1],
    storageData[2],
    storageData[3],
    storageData[4],
    storageData[5],
    storageData[6],
    storageData[7],
    storageData[8],
    storageData[9],
    storageData[10],
    requestRemark,
    invoiceRemark,
  ]);

  return (
    <div className="flex flex-col md:flex-row md:gap-4">
      <Form layout="vertical" id="請求日" className="anchor-section md:w-[50%]">
        <Form.Item label={"請求日"}>
          <div className="flex flex-wrap flex-row items-center gap-4">
            <DatePicker className="grow" value={dayjs(lastDay, dateFormat)} />
            <Checkbox onChange={checkPick} value={pick}>
              ピックチェック
            </Checkbox>
            <Checkbox onChange={checkVehicle} value={vehicle}>
              配車組み
            </Checkbox>
          </div>
        </Form.Item>
        <Form.Item label={"部署コード"}>
          <div className="flex flex-wrap flex-row items-center gap-4">
            <Input
              required
              className="w-fit grow"
              onChange={(e) => setCode(e.target.value)}
            />
            <Checkbox onChange={checkBlank} value={blank}>
              空バン返却チェック
            </Checkbox>
            <Checkbox onChange={checkInvoice} value={invoice}>
              送り状・受領書作成
            </Checkbox>
          </div>
        </Form.Item>
        <Form.Item label={"区分"} required>
          <div className="flex flex-wrap flex-row items-center gap-4">
            <Select
              value={selectedValueDivide}
              onSelect={handleSelectDivide}
              style={{ width: 200 }}
              filterOption={false}
              notFoundContent={null}
              disabled={isChecked}
              className="grow">
              {distinguish.length > 0 ? (
                distinguish.map((data) => (
                  <Option key={data} value={data}>
                    {data}
                  </Option>
                ))
              ) : (
                <Option disabled>Loading...</Option>
              )}
            </Select>
            <Checkbox onChange={handleCheckboxChange}>未定</Checkbox>
          </div>
        </Form.Item>
        <Form.Item label={"荷主名"}>
          <div className="flex flex-wrap flex-row items-center gap-4">
            <Select
              showSearch
              value={selectedValueShipper}
              onSearch={handleChangeShipper}
              onSelect={handleSelectShipper}
              onInputKeyDown={handleKeyPressShipper}
              style={{ width: 200 }}
              filterOption={false}
              notFoundContent={null}
              className="grow">
              {inputValueShipper && filteredShipperData.length > 0 ? (
                filteredShipperData.map((data) => (
                  <Option key={data} value={data}>
                    {data}
                  </Option>
                ))
              ) : inputValueShipper ? (
                <Option disabled>No matching data</Option>
              ) : (
                shipperData.map((data) => (
                  <Option key={data} value={data}>
                    {data}
                  </Option>
                ))
              )}
            </Select>
          </div>
        </Form.Item>
        <Form.Item label={"顧客名"} required>
          <div className="flex flex-wrap flex-row items-center gap-4">
            <Select
              showSearch
              value={selectedValueCustomer}
              onSearch={handleChangeCustomer}
              onSelect={handleSelectCustomer}
              onInputKeyDown={handleKeyPressCustomer}
              style={{ width: 200 }}
              filterOption={false}
              notFoundContent={null}
              className="grow">
              {filteredCustomerData.length > 0 ? (
                filteredCustomerData.map((data) => (
                  <Option key={data} value={data}>
                    {data}
                  </Option>
                ))
              ) : inputValueCustomer ? (
                <Option disabled>No matching data</Option>
              ) : (
                customerData.map((data) => (
                  <Option key={data} value={data}>
                    {data}
                  </Option>
                ))
              )}
            </Select>
          </div>
        </Form.Item>
        <Form.Item label={"CRU顧客名"}>
          <div className="flex flex-wrap flex-row items-center gap-4">
            <Select
              showSearch
              value={selectedValueCompany}
              onSearch={handleChangeCompany}
              onSelect={handleSelectCompany}
              onInputKeyDown={handleKeyPressCompany}
              style={{ width: 200 }}
              filterOption={false}
              notFoundContent={null}
              className="grow">
              {filteredCompanyData.length > 0 ? (
                filteredCompanyData.map((data) => (
                  <Option key={data} value={data}>
                    {data}
                  </Option>
                ))
              ) : inputValueCompany ? (
                <Option disabled>No matching data</Option>
              ) : (
                companyData.map((data) => (
                  <Option key={data} value={data}>
                    {data}
                  </Option>
                ))
              )}
            </Select>
          </div>
        </Form.Item>
        <Form.Item label={"取場所"}>
          <div className="flex flex-wrap flex-row items-center gap-4">
            <Select
              showSearch
              value={selectedValueLocation}
              onSearch={handleChangeLocation}
              onSelect={handleSelectLocation}
              onInputKeyDown={handleKeyPressLocation}
              style={{ width: 200 }}
              filterOption={false}
              notFoundContent={null}
              className="grow">
              {filteredLocationData.length > 0 ? (
                filteredLocationData.map((data) => (
                  <Option key={data} value={data}>
                    {data}
                  </Option>
                ))
              ) : inputValueLocation ? (
                <Option disabled>No matching data</Option>
              ) : (
                locationData.map((data) => (
                  <Option key={data} value={data}>
                    {data}
                  </Option>
                ))
              )}
            </Select>
          </div>
        </Form.Item>
        <Form.Item label={"搬入・返却場所"}>
          <div className="flex flex-wrap flex-row items-center gap-4">
            <Select
              showSearch
              value={selectedValueLoad}
              onSearch={handleChangeLoad}
              onSelect={handleSelectLoad}
              onInputKeyDown={handleKeyPressLoad}
              style={{ width: 200 }}
              filterOption={false}
              notFoundContent={null}
              className="grow">
              {filteredLoadData.length > 0 ? (
                filteredLoadData.map((data) => (
                  <Option key={data} value={data}>
                    {data}
                  </Option>
                ))
              ) : inputValueLoad ? (
                <Option disabled>No matching data</Option>
              ) : (
                loadData.map((data) => (
                  <Option key={data} value={data}>
                    {data}
                  </Option>
                ))
              )}
            </Select>
          </div>
        </Form.Item>
        <Form.Item label={"船社"}>
          <div className="flex flex-wrap flex-row items-center gap-4">
            <Select
              showSearch
              value={selectedValueShip}
              onSearch={handleChangeShip}
              onSelect={handleSelectShip}
              onInputKeyDown={handleKeyPressShip}
              style={{ width: 200 }}
              filterOption={false}
              notFoundContent={null}
              className="grow">
              {filteredShipData.length > 0 ? (
                filteredShipData.map((data) => (
                  <Option key={data} value={data}>
                    {data}
                  </Option>
                ))
              ) : inputValueShip ? (
                <Option disabled>No matching data</Option>
              ) : (
                shipData.map((data) => (
                  <Option key={data} value={data}>
                    {data}
                  </Option>
                ))
              )}
            </Select>
          </div>
        </Form.Item>
        <Group label={"受注入力"}>
          <div
            className="flex flex-wrap flex-row items-center gap-x-4 w-full anchor-section"
            id="受注入力">
            <Form.Item label={"No."} className="w-10 grow">
              <Input
                onChange={(e) => {
                  setNo(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item label={"タイプ"}>
              <Select
                style={{ width: 70 }}
                onSelect={(value) => {
                  setType(value);
                }}>
                {typeData.map((data) => (
                  <Option key={data} value={data}>
                    {data}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label={"サイズ"}>
              <Select
                style={{ width: 70 }}
                onChange={(value) => {
                  setSize(value);
                }}>
                {sizeData.map((data) => (
                  <Option key={data} value={data}>
                    {data}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label={"種類"}>
              <Select
                style={{ width: 140 }}
                onChange={(value) => {
                  setKinds(value);
                }}>
                {kindsData.map((data) => (
                  <Option key={data} value={data}>
                    {data}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <div className="flex flex-col">
              <Checkbox onChange={checkAngle} value={angle}>
                3軸
              </Checkbox>
              <Checkbox onChange={checkRisk} value={risk}>
                危険品
              </Checkbox>
            </div>
          </div>
        </Group>
        <Form.Item name="name" rules={[{ required: true }]}>
          <div className="flex flex-wrap flex-row items-center gap-x-4">
            <Form.Item label={"BK No."} className="w-10 grow">
              <Input onChange={(e) => setBk(e.target.value)} />
            </Form.Item>
            <Form.Item label={"BL No."} className="w-10 grow">
              <Input onChange={(e) => setBl(e.target.value)} />
            </Form.Item>
            <Form.Item label={"船名"} className="w-10 grow">
              <Input onChange={(e) => setShipName(e.target.value)} />
            </Form.Item>
          </div>
        </Form.Item>
        <Delivery
          className="h-0 invisible"
          setDate={setDate}
          setDeliveryData1={setDeliveryData1}
          setDeliveryData2={setDeliveryData2}
          setDeliveryData3={setDeliveryData3}
        />
      </Form>
      <Form layout="vertical" className="md:w-[50%]">
        <PackageInfo setPackageInfoData={setPackageInfoData} />
        <SubcontractPayment
          setSubPayData1={setSubPayData1}
          setSubPayData2={setSubPayData2}
          setSubPayData3={setSubPayData3}
          setSubPayData4={setSubPayData4}
          setSubPayData5={setSubPayData5}
          setSubPayData6={setSubPayData6}
        />
        <Storage setStorageData={setStorageData} />
        <Group label={"備考"}>
          <Form.Item label={"請求書備考"} rules={[{ required: true }]}>
            <div
              className="flex flex-wrap flex-row items-center gap-x-4 anchor-section"
              id="備考">
              <TextArea
                rows={4}
                className="grow"
                onChange={(e) => {
                  setRequestRemark(e.target.value);
                }}
              />
            </div>
          </Form.Item>
          <Form.Item
            label={"送り状・受領書備考欄"}
            rules={[{ required: true }]}>
            <div className="flex flex-wrap flex-row items-center gap-x-4">
              <TextArea
                rows={4}
                className="grow"
                onChange={(e) => {
                  setInvoiceRemark(e.target.value);
                }}
              />
            </div>
          </Form.Item>
        </Group>
      </Form>
    </div>
  );
};

const TruckComponent = () => {
  return <div className="h-[900px] overflow-y-auto">2</div>;
};

const OtherComponent = () => {
  return <div className="h-[500px] overflow-y-auto">3</div>;
};

const NewOrderFormPage = () => {
  const tabNames = ["海上コンテナ", "トラック", "その他"];
  const [data, setData] = useState();

  const dialogComponent = [
    <SeaComponent setData={setData} />,
    <TruckComponent />,
    <OtherComponent />,
  ];

  const sendData = async () => {
    const jsonString = JSON.stringify(
      data,
      (key, value) => {
        return value === undefined ? null : value;
      },
      2,
    );
    const jsonObject = JSON.parse(jsonString);
    try {
      const res = await axios.post(process.env.REACT_API_BASE_URL + "/order", {
        jsonObject,
      });
      console.log(res);
    } catch (error) {
      console.log(error, res.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Tabs
        type="card"
        className="w-full"
        items={tabNames.map((item, index) => {
          return {
            label: item,
            key: index,
            children: dialogComponent[index],
          };
        })}
      />
      <div className="flex flex-row flex-wrap justify-center items-center gap-4 mb-[24px]">
        <Button>デバックボタン</Button>
        <Button>動作確認設定</Button>
        <Button>画面リフレッシュ</Button>
        <Button>記録データ削除</Button>
        <Button onClick={sendData}>保存</Button>
        <Button>閉じる</Button>
      </div>
      <div className="flex justify-around max-w-96 w-full">
        <Button type="primary">初期化</Button>
        <Button type="default">請求済削除</Button>
      </div>
    </div>
  );
};

export default NewOrderFormPage;
