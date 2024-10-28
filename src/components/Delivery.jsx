import React from "react";
import { useState, useEffect } from "react";
import Group from "./Group";
import {
  Form,
  Tabs,
  Select,
  Input,
  DatePicker,
  TimePicker,
  Radio,
  Space,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";
const format = "HH:mm";
const { TextArea } = Input;
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
];
const dateFormat = "YYYY-MM-DD";

const Delivery1 = ({ setDate, setDeliveryData1 }) => {
  const today = dayjs().format("YYYY-MM-DD");
  const [date1, setDate1] = useState(dayjs().format("YYYY-MM-DD"));
  const [dates1, setDates1] = useState(dayjs().format("YYYY-MM-DD"));
  const [time1, setTime1] = useState(dayjs().format("HH:MM"));
  const [deliveryData, setDeliveryData] = useState([]);
  const [filteredDeliveryData1, setFilteredDeliveryData1] = useState([]);
  const [selectedValueDelivery1, setSelectedValueDelivery1] = useState("");
  const [inputValueDelivery1, setInputValueDelivery1] = useState("");
  const [address1, setAddress1] = useState(null);
  const [tel1, setTEL1] = useState(null);
  const [charge1, setCharge1] = useState(null);
  const [basicFee1, setBasicFee1] = useState(null);
  const [basicFeeTax1, setBasicFeeTax1] = useState(true);
  const [fee3Angle1, setFee3Angle1] = useState(null);
  const [fee3AngleTax1, setFee3AngleTax1] = useState(true);
  const [CRUFee1, setCRUFee1] = useState(null);
  const [CRUFeeTax1, setCRUFeeTax1] = useState(true);
  const [highSpeedFee1, setHighSpeedFee1] = useState(null);
  const [scaleFee1, setScaleFee1] = useState(null);
  const [scaleFeeTax1, setScaleFeeTax1] = useState(true);
  const [chassisFee1, setChassisFee1] = useState(null);
  const [chassisFeeTax1, setChassisFeeTax1] = useState(true);
  const [otherFee1, setOtherFee1] = useState(null);
  const [otherFeeTax1, setOtherFeeTax1] = useState(true);
  const [requestText1, setRequestText1] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const workstations = await axios.get(
          process.env.REACT_API_BASE_URL + `/workstation`,
        );
        const deliveryFilter = workstations.data
          .filter((item) => item.配達場所 !== null)
          .sort((a, b) => b.配達場所 - a.配達場所);
        const delivery = deliveryFilter;
        setDeliveryData(delivery);
        setFilteredDeliveryData1(delivery);
        if (dates1 === null) {
          setDate(today);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setDeliveryData1([
      date1,
      dates1,
      time1,
      selectedValueDelivery1,
      address1,
      tel1,
      charge1,
      basicFee1,
      basicFeeTax1,
      fee3Angle1,
      fee3AngleTax1,
      CRUFee1,
      CRUFeeTax1,
      highSpeedFee1,
      scaleFee1,
      scaleFeeTax1,
      chassisFee1,
      chassisFeeTax1,
      otherFee1,
      otherFeeTax1,
      requestText1,
    ]);
  }, [
    date1,
    dates1,
    time1,
    selectedValueDelivery1,
    address1,
    tel1,
    charge1,
    basicFee1,
    basicFeeTax1,
    fee3Angle1,
    fee3AngleTax1,
    CRUFee1,
    CRUFeeTax1,
    highSpeedFee1,
    scaleFee1,
    scaleFeeTax1,
    chassisFee1,
    chassisFeeTax1,
    otherFee1,
    otherFeeTax1,
    requestText1,
  ]);

  // Delivery Datas
  const handleSelectDelivery1 = (value, key) => {
    setSelectedValueDelivery1(value);
    if (selectedValueDelivery1 == "" && null) {
      setAddress1("");
      setTEL1("");
      setCharge1("");
      setRequestText1("");
    } else {
      let delivery = deliveryData.filter((item) => {
        if (item._id === key.key) {
          return item._id;
        }
      });
      setAddress1(delivery[0]["住所"]);
      setTEL1(delivery[0].TEL);
      setCharge1(delivery[0]["担当者"]);
      setRequestText1(delivery[0]["依頼書備考コメント"]);
    }
  };
  const handleChangeDelivery1 = (value) => {
    setInputValueDelivery1(value);
    // Filter delivery data based on input value
    const filteredData = deliveryData.filter((delivery) =>
      delivery.作業地名称.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredDeliveryData1(filteredData); // Update filtered Delivery data
  };
  const handleKeyPressDelivery1 = async (event) => {
    if (
      event.key === "Enter" &&
      inputValueDelivery1 &&
      !deliveryData.includes(inputValueDelivery1)
    ) {
      // const savedValue = await saveToDatabase(inputValueDelivery);
      setSelectedValueDelivery1(inputValueDelivery1);
      setInputValueDelivery1("");
      setFilteredDeliveryData1([...deliveryData, inputValueDelivery1]); // Add to filtered list
    }
  };

  useEffect(() => {
    if (!inputValueDelivery1) {
      setSelectedValueDelivery1("");
      setAddress1("");
      setTEL1("");
      setCharge1("");
    }
  }, [inputValueDelivery1]);

  return (
    <div>
      <Form.Item label={"配達先"} required>
        <div className="flex flex-wrap flex-row items-center gap-4">
          <Select
            showSearch
            defaultValue={today}
            value={selectedValueDelivery1}
            onSearch={handleChangeDelivery1}
            onSelect={handleSelectDelivery1}
            onInputKeyDown={handleKeyPressDelivery1}
            style={{ width: 200 }}
            filterOption={false}
            notFoundContent={null}
            className="grow">
            {inputValueDelivery1 && filteredDeliveryData1.length > 0 ? (
              filteredDeliveryData1.map((data) => (
                <Option key={data._id} value={data.作業地名称}>
                  {data.作業地名称}
                </Option>
              ))
            ) : inputValueDelivery1 ? (
              <Option disabled>No matching data</Option>
            ) : (
              deliveryData.map((data) => (
                <Option key={data._id} value={data.作業地名称}>
                  {data.作業地名称}
                </Option>
              ))
            )}
          </Select>
        </div>
      </Form.Item>
      <Form.Item label={"住所"}>
        <div className="flex flex-wrap flex-row items-center gap-4">
          <Input
            className="w-fit grow"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
          />
        </div>
      </Form.Item>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item label={"TEL"} className="w-fit grow">
          <Input value={tel1} onChange={(e) => setTEL1(e.target.value)} />
        </Form.Item>
        <Form.Item label={"担当者"} className="w-fit grow">
          <Input value={charge1} onChange={(e) => setCharge1(e.target.value)} />
        </Form.Item>
      </div>
      <Form.Item required label={"積日"}>
        <div className="flex flex-wrap flex-row items-center gap-4">
          <DatePicker
            className="w-full"
            onChange={(date, dateString) => {
              setDates1(dateString);
            }}
          />
        </div>
      </Form.Item>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item required label={"配達日"} className="grow">
          <DatePicker
            className="w-full"
            defaultValue={dayjs(today, dateFormat)}
            onChange={(date, dateString) => {
              setDate1(dateString);
              setDate(dateString);
            }}
          />
        </Form.Item>
        <Form.Item required label={"配達時間"} className="grow">
          <TimePicker
            className="w-full"
            onChange={(time, timeString) => {
              setTime1(timeString);
            }}
            format={format}
          />
        </Form.Item>
      </div>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item required label={"基本料金"} className="grow">
          <Input
            required
            className="w-full"
            onChange={(e) => {
              setBasicFee1(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={basicFeeTax1}
          onChange={(e) => {
            setBasicFeeTax1(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
        <Form.Item label={"3軸料金"} className="grow">
          <Input
            required
            className="w-full"
            onChange={(e) => {
              setFee3Angle1(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={fee3AngleTax1}
          onChange={(e) => {
            setFee3AngleTax1(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
      </div>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item label={"CRU変更料金"} className="grow">
          <Input
            required
            className="w-full"
            onChange={(e) => {
              setCRUFee1(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={CRUFeeTax1}
          onChange={(e) => {
            setCRUFeeTax1(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
        <Form.Item label={"高速道路料金"} className="grow">
          <Input
            required
            className="w-full"
            onChange={(e) => {
              setHighSpeedFee1(e.target.value);
            }}
          />
        </Form.Item>
      </div>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item label={"スケール費"} className="grow w-32">
          <Input
            required
            className="w-full"
            onChange={(e) => {
              setScaleFee1(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={scaleFeeTax1}
          onChange={(e) => {
            setScaleFeeTax1(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
        <Form.Item label={"シャーシ留置費"} className="grow w-32">
          <Input
            required
            className="w-full"
            onChange={(e) => {
              setChassisFee1(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={chassisFeeTax1}
          onChange={(e) => {
            setChassisFeeTax1(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
      </div>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item label={"その他費用"} className="grow w-32">
          <Input
            required
            className="w-full"
            onChange={(e) => {
              setOtherFee1(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={otherFeeTax1}
          onChange={(e) => {
            setOtherFeeTax1(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
      </div>
      <Form.Item label={"依頼書備考欄"} rules={[{ required: true }]}>
        <div className="flex flex-wrap flex-row items-center gap-x-4">
          <TextArea
            rows={4}
            value={requestText1}
            className="grow"
            onChange={(e) => setRequestText1(e.target.value)}
          />
        </div>
      </Form.Item>
    </div>
  );
};

const Delivery2 = ({ setDate, setDeliveryData2 }) => {
  const today = dayjs().format("YYYY-MM-DD");
  const [date2, setDate2] = useState(dayjs().format("YYYY-MM-DD"));
  const [dates2, setDates2] = useState(dayjs().format("YYYY-MM-DD"));
  const [time2, setTime2] = useState(dayjs().format("HH:MM"));
  const [deliveryData, setDeliveryData] = useState([]);
  const [filteredDeliveryData2, setFilteredDeliveryData2] = useState([]);
  const [selectedValueDelivery2, setSelectedValueDelivery2] = useState("");
  const [inputValueDelivery2, setInputValueDelivery2] = useState("");
  const [address2, setAddress2] = useState(null);
  const [tel2, setTEL2] = useState(null);
  const [charge2, setCharge2] = useState(null);
  const [basicFee2, setBasicFee2] = useState(null);
  const [basicFeeTax2, setBasicFeeTax2] = useState(true);
  const [fee3Angle2, setFee3Angle2] = useState(null);
  const [fee3AngleTax2, setFee3AngleTax2] = useState(true);
  const [CRUFee2, setCRUFee2] = useState(null);
  const [CRUFeeTax2, setCRUFeeTax2] = useState(true);
  const [highSpeedFee2, setHighSpeedFee2] = useState(null);
  const [scaleFee2, setScaleFee2] = useState(null);
  const [scaleFeeTax2, setScaleFeeTax2] = useState(true);
  const [chassisFee2, setChassisFee2] = useState(null);
  const [chassisFeeTax2, setChassisFeeTax2] = useState(true);
  const [otherFee2, setOtherFee2] = useState(null);
  const [otherFeeTax2, setOtherFeeTax2] = useState(true);
  const [requestText2, setRequestText2] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const workstations = await axios.get(
          process.env.REACT_API_BASE_URL + `/workstation`,
        );
        const deliveryFilter = workstations.data
          .filter((item) => item.配達場所 !== null)
          .sort((a, b) => b.配達場所 - a.配達場所);
        const delivery = deliveryFilter;
        setDeliveryData(delivery);
        if (dates2 === null) {
          setDate(today);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    setDeliveryData2([
      date2,
      dates2,
      time2,
      selectedValueDelivery2,
      address2,
      tel2,
      charge2,
      basicFee2,
      basicFeeTax2,
      fee3Angle2,
      fee3AngleTax2,
      CRUFee2,
      CRUFeeTax2,
      highSpeedFee2,
      scaleFee2,
      scaleFeeTax2,
      chassisFee2,
      chassisFeeTax2,
      otherFee2,
      otherFeeTax2,
      requestText2,
    ]);
  }, [
    date2,
    dates2,
    time2,
    selectedValueDelivery2,
    address2,
    tel2,
    charge2,
    basicFee2,
    basicFeeTax2,
    fee3Angle2,
    fee3AngleTax2,
    CRUFee2,
    CRUFeeTax2,
    highSpeedFee2,
    scaleFee2,
    scaleFeeTax2,
    chassisFee2,
    chassisFeeTax2,
    otherFee2,
    otherFeeTax2,
    requestText2,
  ]);
  // Delivery Datas
  const handleSelectDelivery2 = (value, key) => {
    setSelectedValueDelivery2(value);
    if (selectedValueDelivery2 == "") {
      setAddress2("");
      setTEL2("");
      setCharge2("");
    } else {
      let delivery = deliveryData.filter((item) => {
        if (item._id === key.key) {
          return item._id;
        }
      });
      setAddress2(delivery[0].住所);
      setTEL2(delivery[0].TEL);
      setCharge2(delivery[0].担当者);
    }
  };
  const handleChangeDelivery2 = (value) => {
    setInputValueDelivery2(value);
    // Filter delivery data based on input value
    const filteredData = deliveryData.filter((delivery) =>
      delivery.作業地名称.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredDeliveryData2(filteredData); // Update filtered Delivery data
  };
  const handleKeyPressDelivery2 = async (event) => {
    if (
      event.key === "Enter" &&
      inputValueDelivery2 &&
      !deliveryData.includes(inputValueDelivery2)
    ) {
      // const savedValue = await saveToDatabase(inputValueDelivery);
      setSelectedValueDelivery2(inputValueDelivery2);
      setInputValueDelivery2("");
      setFilteredDeliveryData2([...deliveryData, inputValueDelivery2]); // Add to filtered list
    }
  };

  useEffect(() => {
    if (!inputValueDelivery2) {
      setSelectedValueDelivery2("");
      setAddress2("");
      setTEL2("");
      setCharge2("");
    }
  }, [inputValueDelivery2]);
  return (
    <div>
      <Form.Item label={"配達先"} required>
        <div className="flex flex-wrap flex-row items-center gap-4">
          <Select
            showSearch
            defaultValue={today}
            value={selectedValueDelivery2}
            onSearch={handleChangeDelivery2}
            onSelect={handleSelectDelivery2}
            onInputKeyDown={handleKeyPressDelivery2}
            style={{ width: 200 }}
            filterOption={false}
            notFoundContent={null}
            className="grow">
            {inputValueDelivery2 && filteredDeliveryData2.length > 0 ? (
              filteredDeliveryData2.map((data) => (
                <Option key={data._id} value={data.作業地名称}>
                  {data.作業地名称}
                </Option>
              ))
            ) : inputValueDelivery2 ? (
              <Option disabled>No matching data</Option>
            ) : (
              deliveryData.map((data) => (
                <Option key={data._id} value={data.作業地名称}>
                  {data.作業地名称}
                </Option>
              ))
            )}
          </Select>
        </div>
      </Form.Item>
      <Form.Item label={"住所"}>
        <div className="flex flex-wrap flex-row items-center gap-4">
          <Input className="w-fit grow" value={address2} />
        </div>
      </Form.Item>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item label={"TEL"} className="w-fit grow">
          <Input value={tel2} />
        </Form.Item>
        <Form.Item label={"担当者"} className="w-fit grow">
          <Input value={charge2} />
        </Form.Item>
      </div>
      <Form.Item required label={"積日"}>
        <div className="flex flex-wrap flex-row items-center gap-4">
          <DatePicker
            className="w-full"
            onChange={(date, dateString) => {
              setDates2(dateString);
            }}
          />
        </div>
      </Form.Item>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item required label={"配達日"} className="grow">
          <DatePicker
            className="w-full"
            defaultValue={dayjs(today, dateFormat)}
            onChange={(date, dateString) => {
              setDate2(dateString);
              setDate(dateString);
            }}
          />
        </Form.Item>
        <Form.Item label={"配達時間"} className="grow" required>
          <TimePicker
            className="w-full"
            onChange={(time, timeString) => {
              setTime2(timeString);
            }}
          />
        </Form.Item>
      </div>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item label={"基本料金"} className="grow" required>
          <Input
            required
            className="w-full"
            onChange={(e) => {
              setBasicFee2(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={basicFeeTax2}
          onChange={(e) => {
            setBasicFeeTax2(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
        <Form.Item label={"3軸料金"} className="grow">
          <Input
            required
            className="w-full"
            onChange={(e) => {
              setFee3Angle2(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={fee3AngleTax2}
          onChange={(e) => {
            setFee3AngleTax2(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
      </div>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item label={"CRU変更料金"} className="grow">
          <Input
            required
            className="w-full"
            onChange={(e) => {
              setCRUFee2(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={CRUFeeTax2}
          onChange={(e) => {
            setCRUFeeTax2(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
        <Form.Item label={"高速道路料金"} className="grow">
          <Input
            required
            className="w-full"
            onChange={(e) => {
              setHighSpeedFee2(e.target.value);
            }}
          />
        </Form.Item>
      </div>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item label={"スケール費"} className="grow w-32">
          <Input
            required
            className="w-full"
            onChange={(e) => {
              setScaleFee2(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={scaleFeeTax2}
          onChange={(e) => {
            setScaleFeeTax2(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
        <Form.Item label={"シャーシ留置費"} className="grow w-32">
          <Input
            required
            className="w-full"
            onChange={(e) => {
              setChassisFee2(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={chassisFeeTax2}
          onChange={(e) => {
            setChassisFeeTax2(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
      </div>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item label={"その他費用"} className="grow w-32">
          <Input
            required
            className="w-full"
            onChange={(e) => {
              setOtherFee2(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={otherFeeTax2}
          onChange={(e) => {
            setOtherFeeTax2(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
      </div>
      <Form.Item label={"依頼書備考欄"} rules={[{ required: true }]}>
        <div className="flex flex-wrap flex-row items-center gap-x-4">
          <TextArea
            rows={4}
            className="grow"
            onChange={(e) => setRequestText2(e.target.value)}
          />
        </div>
      </Form.Item>
    </div>
  );
};

const Delivery3 = ({ setDate, setDeliveryData3 }) => {
  const today = dayjs().format("YYYY-MM-DD");
  const [date3, setDate3] = useState(dayjs().format("YYYY-MM-DD"));
  const [dates3, setDates3] = useState(dayjs().format("YYYY-MM-DD"));
  const [time3, setTime3] = useState(dayjs().format("HH:MM"));
  const [deliveryData, setDeliveryData] = useState([]);
  const [filteredDeliveryData3, setFilteredDeliveryData3] = useState([]);
  const [selectedValueDelivery3, setSelectedValueDelivery3] = useState("");
  const [inputValueDelivery3, setInputValueDelivery3] = useState("");
  const [address3, setAddress3] = useState(null);
  const [tel3, setTEL3] = useState(null);
  const [charge3, setCharge3] = useState(null);
  const [basicFee3, setBasicFee3] = useState(null);
  const [basicFeeTax3, setBasicFeeTax3] = useState(true);
  const [fee3Angle3, setFee3Angle3] = useState(null);
  const [fee3AngleTax3, setFee3AngleTax3] = useState(true);
  const [CRUFee3, setCRUFee3] = useState(null);
  const [CRUFeeTax3, setCRUFeeTax3] = useState(true);
  const [highSpeedFee3, setHighSpeedFee3] = useState(null);
  const [scaleFee3, setScaleFee3] = useState(null);
  const [scaleFeeTax3, setScaleFeeTax3] = useState(true);
  const [chassisFee3, setChassisFee3] = useState(null);
  const [chassisFeeTax3, setChassisFeeTax3] = useState(true);
  const [otherFee3, setOtherFee3] = useState(null);
  const [otherFeeTax3, setOtherFeeTax3] = useState(true);
  const [requestText3, setRequestText3] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const workstations = await axios.get(
          process.env.REACT_API_BASE_URL + `/workstation`,
        );
        const deliveryFilter = workstations.data
          .filter((item) => item.配達場所 !== null)
          .sort((a, b) => b.配達場所 - a.配達場所);
        const delivery = deliveryFilter;
        setDeliveryData(delivery);
        if (dates3 === null) {
          setDate(today);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setDeliveryData3([
      date3,
      dates3,
      time3,
      selectedValueDelivery3,
      address3,
      tel3,
      charge3,
      basicFee3,
      basicFeeTax3,
      fee3Angle3,
      fee3AngleTax3,
      CRUFee3,
      CRUFeeTax3,
      highSpeedFee3,
      scaleFee3,
      scaleFeeTax3,
      chassisFee3,
      chassisFeeTax3,
      otherFee3,
      otherFeeTax3,
      requestText3,
    ]);
  }, [
    date3,
    dates3,
    time3,
    selectedValueDelivery3,
    address3,
    tel3,
    charge3,
    basicFee3,
    basicFeeTax3,
    fee3Angle3,
    fee3AngleTax3,
    CRUFee3,
    CRUFeeTax3,
    highSpeedFee3,
    scaleFee3,
    scaleFeeTax3,
    chassisFee3,
    chassisFeeTax3,
    otherFee3,
    otherFeeTax3,
    requestText3,
  ]);
  // Delivery Datas
  const handleSelectDelivery3 = (value, key) => {
    setSelectedValueDelivery3(value);
    if (selectedValueDelivery3 == "") {
      setAddress3("");
      setTEL3("");
      setCharge3("");
    } else {
      let delivery = deliveryData.filter((item) => {
        if (item._id === key.key) {
          return item._id;
        }
      });
      setAddress3(delivery[0].住所);
      setTEL3(delivery[0].TEL);
      setCharge3(delivery[0].担当者);
    }
  };
  const handleChangeDelivery3 = (value) => {
    setInputValueDelivery3(value);
    // Filter delivery data based on input value
    const filteredData = deliveryData.filter((delivery) =>
      delivery.作業地名称.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredDeliveryData3(filteredData); // Update filtered Delivery data
  };
  const handleKeyPressDelivery3 = async (event) => {
    if (
      event.key === "Enter" &&
      inputValueDelivery3 &&
      !deliveryData.includes(inputValueDelivery3)
    ) {
      // const savedValue = await saveToDatabase(inputValueDelivery);
      setSelectedValueDelivery3(inputValueDelivery3);
      setInputValueDelivery3("");
      setFilteredDeliveryData3([...deliveryData, inputValueDelivery3]); // Add to filtered list
    }
  };

  useEffect(() => {
    if (!inputValueDelivery3) {
      setSelectedValueDelivery3("");
      setAddress3("");
      setTEL3("");
      setCharge3("");
    }
  }, [inputValueDelivery3]);
  return (
    <div>
      <Form.Item label={"配達先"} required>
        <div className="flex flex-wrap flex-row items-center gap-4">
          <Select
            showSearch
            defaultValue={today}
            value={selectedValueDelivery3}
            onSearch={handleChangeDelivery3}
            onSelect={handleSelectDelivery3}
            onInputKeyDown={handleKeyPressDelivery3}
            style={{ width: 200 }}
            filterOption={false}
            notFoundContent={null}
            className="grow">
            {inputValueDelivery3 && filteredDeliveryData3.length > 0 ? (
              filteredDeliveryData3.map((data) => (
                <Option key={data._id} value={data.作業地名称}>
                  {data.作業地名称}
                </Option>
              ))
            ) : inputValueDelivery3 ? (
              <Option disabled>No matching data</Option>
            ) : (
              deliveryData.map((data) => (
                <Option key={data._id} value={data.作業地名称}>
                  {data.作業地名称}
                </Option>
              ))
            )}
          </Select>
        </div>
      </Form.Item>
      <Form.Item label={"住所"}>
        <div className="flex flex-wrap flex-row items-center gap-4">
          <Input className="w-fit grow" value={address3} />
        </div>
      </Form.Item>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item label={"TEL"} className="w-fit grow">
          <Input value={tel3} />
        </Form.Item>
        <Form.Item label={"担当者"} className="w-fit grow">
          <Input value={charge3} />
        </Form.Item>
      </div>
      <Form.Item required label={"積日"}>
        <div className="flex flex-wrap flex-row items-center gap-4">
          <DatePicker
            className="w-full"
            onChange={(date, dateString) => {
              setDates3(dateString);
            }}
          />
        </div>
      </Form.Item>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item required label={"配達日"} className="grow">
          <DatePicker
            className="w-full"
            defaultValue={dayjs(today, dateFormat)}
            onChange={(date, dateString) => {
              setDate3(dateString);
              setDate(dateString);
            }}
          />
        </Form.Item>
        <Form.Item label={"配達時間"} className="grow" required>
          <TimePicker
            className="w-full"
            onChange={(time, timeString) => {
              setTime3(timeString);
            }}
          />
        </Form.Item>
      </div>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item label={"基本料金"} className="grow" required>
          <Input
            required
            className="w-full"
            onChange={(e) => {
              setBasicFee3(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={basicFeeTax3}
          onChange={(e) => {
            setBasicFeeTax3(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
        <Form.Item label={"3軸料金"} className="grow">
          <Input
            required
            className="w-full"
            onChange={(e) => {
              setFee3Angle3(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={fee3AngleTax3}
          onChange={(e) => {
            setFee3AngleTax3(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
      </div>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item label={"CRU変更料金"} className="grow">
          <Input
            required
            className="w-full"
            onChange={(e) => {
              setCRUFee3(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={CRUFeeTax3}
          onChange={(e) => {
            setCRUFeeTax3(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
        <Form.Item label={"高速道路料金"} className="grow">
          <Input
            required
            className="w-full"
            onChange={(e) => {
              setHighSpeedFee3(e.target.value);
            }}
          />
        </Form.Item>
      </div>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item label={"スケール費"} className="grow w-32">
          <Input
            required
            className="w-full"
            onChange={(e) => {
              setScaleFee3(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={scaleFeeTax3}
          onChange={(e) => {
            setScaleFeeTax3(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
        <Form.Item label={"シャーシ留置費"} className="grow w-32">
          <Input
            required
            className="w-full"
            onChange={(e) => {
              setChassisFee3(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={chassisFeeTax3}
          onChange={(e) => {
            setChassisFeeTax3(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
      </div>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item label={"その他費用"} className="grow w-32">
          <Input
            required
            className="w-full"
            onChange={(e) => {
              setOtherFee3(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={otherFeeTax3}
          onChange={(e) => {
            setOtherFeeTax3(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
      </div>
      <Form.Item label={"依頼書備考欄"} rules={[{ required: true }]}>
        <div className="flex flex-wrap flex-row items-center gap-x-4">
          <TextArea
            rows={4}
            className="grow"
            onChange={(e) => setRequestText3(e.target.value)}
          />
        </div>
      </Form.Item>
    </div>
  );
};

const Delivery = (
  { setDate, setDeliveryData1, setDeliveryData2, setDeliveryData3 },
  { className = "" },
) => {
  const deliveryTab = ["配達1", "配達2", "配達3"];
  const dialogComponent = [
    <Delivery1 setDate={setDate} setDeliveryData1={setDeliveryData1} />,
    <Delivery2 setDate={setDate} setDeliveryData2={setDeliveryData2} />,
    <Delivery3 setDate={setDate} setDeliveryData3={setDeliveryData3} />,
  ];
  return (
    <div className={`${className}`}>
      <Group label={"配達"}>
        <Tabs
          id="配達"
          className="anchor-section"
          type="card"
          items={deliveryTab.map((item, index) => {
            return {
              label: item,
              key: index,
              children: dialogComponent[index],
            };
          })}
        />
      </Group>
    </div>
  );
};

export default Delivery;
