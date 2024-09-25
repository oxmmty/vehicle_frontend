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

const SeaComponent = () => {
  const [dates, setDates] = useState(dayjs().format("YYYY-MM-DD"));
  const today = dayjs().format("YYYY-MM-DD");

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

  const [pick, setPick] = useState();
  const [vehicle, setVehicle] = useState();

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
        setCompanyData(partnercompnay);

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

        const deliveryFilter = workstations.data
          .filter((item) => item.配達場所 !== null)
          .sort((a, b) => b.配達場所 - a.配達場所);
        const delivery = deliveryFilter.map((item) => item.作業地名称);

        const loadFilter = workstations.data
          .filter((item) => item.搬入返却場所 !== null)
          .sort((a, b) => b.搬入返却場所 - a.搬入返却場所);
        const load = loadFilter.map((item) => item.作業地名称);
        setLoadData(load);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

  const distinguish = [
    {
      value: 0,
      label: "実入り取り",
    },
    {
      value: 1,
      label: "空バン取り",
    },
    {
      value: 2,
      label: "実入り取りCRU",
    },
    {
      value: 3,
      label: "実入り取りFDR",
    },
    {
      value: 4,
      label: "実入り取りPIC",
    },
    {
      value: 5,
      label: "保管",
    },
    {
      value: 6,
      label: "空バン在庫",
    },
    {
      value: 7,
      label: "船社請求",
    },
  ];
  const number = [
    {
      value: 0,
      label: "99",
    },
    {
      value: 1,
      label: "98",
    },
    {
      value: 2,
      label: "2",
    },
  ];
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
  return (
    <div className="flex flex-col md:flex-row md:gap-4">
      <Form layout="vertical" id="請求日" className="anchor-section md:w-[50%]">
        <Form.Item label={"請求日"}>
          <div className="flex flex-wrap flex-row items-center gap-4">
            <DatePicker
              className="grow"
              defaultValue={dayjs(today, dateFormat)}
              minDate={dayjs(today, dateFormat)}
              onChange={(date, dateString) => {
                setDates(dateString);
              }}
            />
            <Checkbox onChange={checkPick} value={pick}>
              ピックチェック
            </Checkbox>
            <Checkbox onChange={checkVehicle} value={vehicle}>
              配車組み
            </Checkbox>
          </div>
        </Form.Item>
        <Form.Item label={"部署コード"} required>
          <div className="flex flex-wrap flex-row items-center gap-4">
            <Input required className="w-fit grow" />
            <Checkbox>空バン返却チェック</Checkbox>
            <Checkbox>送り状・受領書作成</Checkbox>
          </div>
        </Form.Item>
        <Form.Item label={"区分"} required>
          <div className="flex flex-wrap flex-row items-center gap-4">
            <Select
              defaultValue={1}
              style={{ width: 100 }}
              className="grow"
              options={distinguish}
            />
            <Checkbox>未定</Checkbox>
          </div>
        </Form.Item>
        <Form.Item label={"荷主名"}>
          <div className="flex flex-wrap flex-row items-center gap-4">
            <Select
              showSearch
              value={selectedValueShipper} // Set the selected value here
              onSearch={handleChangeShipper} // Track input changes
              onSelect={handleSelectShipper} // Handle option selection
              onInputKeyDown={handleKeyPressShipper} // Capture Enter key press
              style={{ width: 200 }}
              filterOption={false} // Disable default filter to handle custom search
              notFoundContent={null} // Optional: Customize "No data" message
              className="grow">
              {filteredShipperData.length > 0 ? (
                filteredShipperData.map((data) => (
                  <Option key={data} value={data}>
                    {data}
                  </Option>
                ))
              ) : (
                <Option disabled>Loading...</Option>
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
              ) : (
                <Option disabled>Loading...</Option>
              )}
            </Select>
          </div>
        </Form.Item>

        <Form.Item label={"CRU顧客名"}>
          <div className="flex flex-wrap flex-row items-center gap-4">
            <Select
              showSearch
              value={selectedValueCompany} // Set the selected value here
              onSearch={handleChangeCompany} // Track input changes
              onSelect={handleSelectCompany} // Handle option selection
              onInputKeyDown={handleKeyPressCompany} // Capture Enter key press
              style={{ width: 200 }}
              filterOption={false} // Disable default filter to handle custom search
              notFoundContent={null} // Optional: Customize "No data" message
              className="grow">
              {filteredCompanyData.length > 0 ? (
                filteredCompanyData.map((data) => (
                  <Option key={data} value={data}>
                    {data}
                  </Option>
                ))
              ) : (
                <Option disabled>Loading...</Option>
              )}
            </Select>
          </div>
        </Form.Item>
        <Form.Item label={"取場所"}>
          <div className="flex flex-wrap flex-row items-center gap-4">
            <Select
              showSearch
              value={selectedValueLocation} // Set the selected value here
              onSearch={handleChangeLocation} // Track input changes
              onSelect={handleSelectLocation} // Handle option selection
              onInputKeyDown={handleKeyPressLocation} // Capture Enter key press
              style={{ width: 200 }}
              filterOption={false} // Disable default filter to handle custom search
              notFoundContent={null} // Optional: Customize "No data" message
              className="grow">
              {filteredLocationData.length > 0 ? (
                filteredLocationData.map((data) => (
                  <Option key={data} value={data}>
                    {data}
                  </Option>
                ))
              ) : (
                <Option disabled>Loading...</Option>
              )}
            </Select>
          </div>
        </Form.Item>
        <Form.Item label={"搬入・返却場所"}>
          <div className="flex flex-wrap flex-row items-center gap-4">
            <Select
              showSearch
              value={selectedValueLoad} // Set the selected value here
              onSearch={handleChangeLoad} // Track input changes
              onSelect={handleSelectLoad} // Handle option selection
              onInputKeyDown={handleKeyPressLoad} // Capture Enter key press
              style={{ width: 200 }}
              filterOption={false} // Disable default filter to handle custom search
              notFoundContent={null} // Optional: Customize "No data" message
              className="grow">
              {filteredLoadData.length > 0 ? (
                filteredLoadData.map((data) => (
                  <Option key={data} value={data}>
                    {data}
                  </Option>
                ))
              ) : (
                <Option disabled>Loading...</Option>
              )}
            </Select>
          </div>
        </Form.Item>
        <Form.Item label={"船社"}>
          <div className="flex flex-wrap flex-row items-center gap-4">
            <Select
              showSearch
              value={selectedValueShip} // Set the selected value here
              onSearch={handleChangeShip} // Track input changes
              onSelect={handleSelectShip} // Handle option selection
              onInputKeyDown={handleKeyPressShip} // Capture Enter key press
              style={{ width: 200 }}
              filterOption={false} // Disable default filter to handle custom search
              notFoundContent={null} // Optional: Customize "No data" message
              className="grow">
              {filteredShipData.length > 0 ? (
                filteredShipData.map((data) => (
                  <Option key={data} value={data}>
                    {data}
                  </Option>
                ))
              ) : (
                <Option disabled>Loading...</Option>
              )}
            </Select>
          </div>
        </Form.Item>
        <Group label={"受注入力"}>
          <div
            className="flex flex-wrap flex-row items-center gap-x-4 w-full anchor-section"
            id="受注入力">
            <Form.Item label={"No."} className="w-10 grow">
              <Input />
            </Form.Item>
            <Form.Item label={"タイプ"}>
              <Select defaultValue={1} style={{ width: 70 }} options={number} />
            </Form.Item>
            <Form.Item label={"サイズ"}>
              <Select defaultValue={1} style={{ width: 70 }} options={number} />
            </Form.Item>
            <Form.Item label={"種類"}>
              <Select
                defaultValue={1}
                style={{ width: 140 }}
                options={distinguish}
              />
            </Form.Item>
            <div className="flex flex-col">
              <Checkbox>3軸</Checkbox>
              <Checkbox>危険品</Checkbox>
            </div>
          </div>
        </Group>
        <Form.Item name="name" rules={[{ required: true }]}>
          <div className="flex flex-wrap flex-row items-center gap-x-4">
            <Form.Item label={"BK No."} className="w-10 grow">
              <Input />
            </Form.Item>
            <Form.Item label={"BL No."} className="w-10 grow">
              <Input />
            </Form.Item>
            <Form.Item label={"船名"} className="w-10 grow">
              <Input />
            </Form.Item>
          </div>
        </Form.Item>
        <Delivery />
        <Form.Item label={"依頼書備考欄"} rules={[{ required: true }]}>
          <div className="flex flex-wrap flex-row items-center gap-x-4">
            <TextArea rows={4} className="grow" />
          </div>
        </Form.Item>
      </Form>
      <Form layout="vertical" className="md:w-[50%]">
        <PackageInfo />
        <SubcontractPayment />
        <Storage />
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
  const [count, setCount] = useState(0);
  const [droppedImageSrc, setDroppedImageSrc] = useState(null);
  const dialogComponent = [
    <SeaComponent />,
    <TruckComponent />,
    <OtherComponent />,
  ];
  const handleImageDrop = (src) => {
    setDroppedImageSrc(src);
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
        <Button>保存</Button>
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
