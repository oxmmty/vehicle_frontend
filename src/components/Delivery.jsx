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
  message,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";
const format = "HH:mm";
const { TextArea } = Input;

const dateFormat = "YYYY-MM-DD";

const Delivery1 = ({ setDate, setDeliveryData1, editData }) => {
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
  const [keys1, setKeys1] = useState("");

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
    if (editData) {
      setSelectedValueDelivery1(editData.配達先1);
      setAddress1(editData.配達先住所1 || "");
      setTEL1(editData.配達先TEL1 || "");
      setCharge1(editData.配達先担当者1 || "");
      setRequestText1(editData.依頼書備考1 || "");
      setDates1(editData.積日1);
      setDate1(editData.配達日1);
      setDate(editData.配達日1);
      setTime1(editData.配達時間1);
      setBasicFee1(editData.基本料金1);
      setBasicFeeTax1(editData.基本課税1);
      setFee3Angle1(editData["3軸料金1"]);
      setFee3AngleTax1(editData["3軸課税1"]);
      setCRUFee1(editData.CRU変更料金1);
      setCRUFeeTax1(editData.CRU変更課税1);
      setHighSpeedFee1(editData.高速費);
      setScaleFee1(editData.スケール費);
      setScaleFeeTax1(editData.スケール費課税1);
      setChassisFee1(editData.シャーシ留置費);
      setChassisFeeTax1(editData.シャーシ留置費課税1);
      setOtherFee1(editData.その他費用);
      setOtherFeeTax1(editData.その他課税);
    }
  }, [editData]);

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
    if (!value) {
      setAddress1("");
      setTEL1("");
      setCharge1("");
      setRequestText1("");
    } else {
      setKeys1(key.key);
      const delivery = deliveryData.find((item) => item._id === key.key);
      if (delivery) {
        setAddress1(delivery["住所"] || "");
        setTEL1(delivery.TEL || "");
        setCharge1(delivery["担当者"] || "");
        setRequestText1(delivery["依頼書備考コメント"] || "");
      }
    }
  };

  const handleChangeDelivery1 = (value) => {
    setInputValueDelivery1(value);
    if (!value.trim()) {
      setFilteredDeliveryData1(deliveryData);
    } else {
      const filteredData = deliveryData.filter((delivery) => {
        if (typeof delivery === "string") {
          return delivery.toLowerCase().includes(value.toLowerCase());
        } else if (
          typeof delivery === "object" &&
          delivery !== null &&
          typeof delivery.作業地名称 === "string"
        ) {
          return delivery.作業地名称
            .toLowerCase()
            .includes(value.toLowerCase());
        }
        console.log("Unexpected delivery structure:", delivery);
        return false;
      });
      setFilteredDeliveryData1(filteredData);
    }
  };

  const handleKeyPressDelivery1 = async (event) => {
    if (event.key === "Enter" && inputValueDelivery1) {
      const exists = deliveryData.some(
        (delivery) =>
          (typeof delivery === "string" &&
            delivery.toLowerCase() === inputValueDelivery1.toLowerCase()) ||
          (typeof delivery === "object" &&
            delivery !== null &&
            delivery.作業地名称.toLowerCase() ===
              inputValueDelivery1.toLowerCase()),
      );

      if (!exists) {
        try {
          // Assuming you have an API endpoint for adding new delivery options
          const response = await axios.post(
            `${process.env.REACT_API_BASE_URL}/workstation`,
            {
              作業地名称: inputValueDelivery1,
              配達場所: 0,
            },
          );
          const newOption = { 作業地名称: inputValueDelivery1 };
          setDeliveryData((prevOptions) => [...prevOptions, newOption]);
          setSelectedValueDelivery1(newOption);
          setInputValueDelivery1("");
          message.success("New delivery option added successfully");
        } catch (error) {
          console.error("Error adding new delivery option:", error);
          message.error("Failed to add new delivery option");
        }
      }
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
          {selectedValueDelivery1 ? (
            <Input
              className="w-fit grow"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const delivery = deliveryData.find(
                    (item) => item._id === keys1,
                  );
                  if (delivery) {
                    if (e.target.value !== delivery["住所"])
                      try {
                        const response = async () => {
                          await axios.put(
                            process.env.REACT_API_BASE_URL +
                              `/workstation/${keys1}`,
                            {
                              住所: e.target.value,
                            },
                          );
                        };
                        response();
                        message.success("New option added successfully");
                      } catch (error) {
                        console.error("Error adding new option:", error);
                        message.error("Failed to add new option");
                      }
                  }
                }
              }}
              allowClear
            />
          ) : (
            <Input
              className="w-fit grow"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              disabled
            />
          )}
        </div>
      </Form.Item>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item label={"TEL"} className="w-fit grow">
          {selectedValueDelivery1 ? (
            <Input
              value={tel1}
              onChange={(e) => setTEL1(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const delivery = deliveryData.find(
                    (item) => item._id === keys1,
                  );
                  if (delivery) {
                    if (e.target.value !== delivery["TEL"])
                      try {
                        const response = async () => {
                          await axios.put(
                            process.env.REACT_API_BASE_URL +
                              `/workstation/${keys1}`,
                            {
                              TEL: e.target.value,
                            },
                          );
                        };
                        response();
                        message.success("New option added successfully");
                      } catch (error) {
                        console.error("Error adding new option:", error);
                        message.error("Failed to add new option");
                      }
                  }
                }
              }}
              allowClear
            />
          ) : (
            <Input
              value={tel1}
              onChange={(e) => setTEL1(e.target.value)}
              disabled
            />
          )}
        </Form.Item>
        <Form.Item label={"担当者"} className="w-fit grow">
          {selectedValueDelivery1 ? (
            <Input
              value={charge1}
              onChange={(e) => setCharge1(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const delivery = deliveryData.find(
                    (item) => item._id === keys1,
                  );
                  if (delivery) {
                    if (e.target.value !== delivery["担当者"])
                      try {
                        const response = async () => {
                          await axios.put(
                            process.env.REACT_API_BASE_URL +
                              `/workstation/${keys1}`,
                            {
                              担当者: e.target.value,
                            },
                          );
                        };
                        response();
                        message.success("New option added successfully");
                      } catch (error) {
                        console.error("Error adding new option:", error);
                        message.error("Failed to add new option");
                      }
                  }
                }
              }}
              allowClear
            />
          ) : (
            <Input
              value={charge1}
              onChange={(e) => setCharge1(e.target.value)}
              disabled
            />
          )}
        </Form.Item>
      </div>
      <Form.Item required label={"積日"}>
        <div className="flex flex-wrap flex-row items-center gap-4">
          <DatePicker
            className="w-full"
            value={dayjs(dates1)}
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
            value={dayjs(date1)}
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
            value={dayjs(time1 || "10:00", "HH:MM")}
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
            value={basicFee1}
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
          {selectedValueDelivery1 ? (
            <TextArea
              rows={4}
              value={requestText1}
              className="grow"
              onChange={(e) => setRequestText1(e.target.value)}
            />
          ) : (
            <TextArea
              rows={4}
              value={requestText1}
              className="grow"
              onChange={(e) => setRequestText1(e.target.value)}
              disabled
            />
          )}
        </div>
      </Form.Item>
    </div>
  );
};

const Delivery2 = ({ setDate, setDeliveryData2, editData }) => {
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
  const [keys2, setKeys2] = useState("");

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
    if (editData) {
      setSelectedValueDelivery2(editData.配達先2);
      setAddress2(editData.配達先住所2 || "");
      setTEL2(editData.配達先TEL2 || "");
      setCharge2(editData.配達先担当者2 || "");
      setRequestText2(editData.依頼書備考2 || "");
      setDates2(editData.積日2);
      setDate2(editData.配達日2);
      setDate(editData.配達日2);
      setTime2(editData.配達時間2);
      setBasicFee2(editData.基本料金2);
      setBasicFeeTax2(editData.基本課税2);
      setFee3Angle2(editData["3軸料金2"]);
      setFee3AngleTax2(editData["3軸課税2"]);
      setCRUFee2(editData.CRU変更料金2);
      setCRUFeeTax2(editData.CRU変更課税2);
      setHighSpeedFee2(editData.高速費2);
      setScaleFee2(editData.スケール費2);
      setScaleFeeTax2(editData.スケール費課税2);
      setChassisFee2(editData.シャーシ留置費2);
      setChassisFeeTax2(editData.シャーシ留置費課税2);
      setOtherFee2(editData.その他費用2);
      setOtherFeeTax2(editData.その他課税2);
    }
  }, [editData]);
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
    if (!value) {
      setAddress2("");
      setTEL2("");
      setCharge2("");
      setRequestText2("");
    } else {
      const delivery = deliveryData.find((item) => item._id === key.key);
      setKeys2(key.key);
      if (delivery) {
        setAddress2(delivery["住所"] || "");
        setTEL2(delivery.TEL || "");
        setCharge2(delivery["担当者"] || "");
        setRequestText2(delivery["依頼書備考コメント"] || "");
      }
    }
  };

  const handleChangeDelivery2 = (value) => {
    setInputValueDelivery2(value);
    if (!value.trim()) {
      setFilteredDeliveryData2(deliveryData);
    } else {
      const filteredData = deliveryData.filter((delivery) => {
        if (typeof delivery === "string") {
          return delivery.toLowerCase().includes(value.toLowerCase());
        } else if (
          typeof delivery === "object" &&
          delivery !== null &&
          typeof delivery.作業地名称 === "string"
        ) {
          return delivery.作業地名称
            .toLowerCase()
            .includes(value.toLowerCase());
        }
        console.log("Unexpected delivery structure:", delivery);
        return false;
      });
      setFilteredDeliveryData2(filteredData);
    }
  };

  const handleKeyPressDelivery2 = async (event) => {
    if (event.key === "Enter" && inputValueDelivery2) {
      const exists = deliveryData.some(
        (delivery) =>
          (typeof delivery === "string" &&
            delivery.toLowerCase() === inputValueDelivery2.toLowerCase()) ||
          (typeof delivery === "object" &&
            delivery !== null &&
            delivery.作業地名称.toLowerCase() ===
              inputValueDelivery2.toLowerCase()),
      );

      if (!exists) {
        try {
          // Assuming you have an API endpoint for adding new delivery options
          const response = await axios.post(
            `${process.env.REACT_API_BASE_URL}/workstation`,
            {
              作業地名称: inputValueDelivery2,
              配達場所: 0,
            },
          );
          const newOption = { 作業地名称: inputValueDelivery2 };
          setDeliveryData((prevOptions) => [...prevOptions, newOption]);
          setSelectedValueDelivery2(newOption);
          setInputValueDelivery2("");
          message.success("New delivery option added successfully");
        } catch (error) {
          console.error("Error adding new delivery option:", error);
          message.error("Failed to add new delivery option");
        }
      }
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
          {selectedValueDelivery2 ? (
            <Input
              className="w-fit grow"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const delivery = deliveryData.find(
                    (item) => item._id === keys2,
                  );
                  if (delivery) {
                    if (e.target.value !== delivery["住所"])
                      try {
                        const response = async () => {
                          await axios.put(
                            process.env.REACT_API_BASE_URL +
                              `/workstation/${keys2}`,
                            {
                              住所: e.target.value,
                            },
                          );
                        };
                        response();
                        message.success("New option added successfully");
                      } catch (error) {
                        console.error("Error adding new option:", error);
                        message.error("Failed to add new option");
                      }
                  }
                }
              }}
              allowClear
            />
          ) : (
            <Input
              className="w-fit grow"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              disabled
            />
          )}
        </div>
      </Form.Item>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item label={"TEL"} className="w-fit grow">
          {selectedValueDelivery2 ? (
            <Input
              value={tel2}
              onChange={(e) => setTEL2(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const delivery = deliveryData.find(
                    (item) => item._id === keys2,
                  );
                  if (delivery) {
                    if (e.target.value !== delivery["TEL"])
                      try {
                        const response = async () => {
                          await axios.put(
                            process.env.REACT_API_BASE_URL +
                              `/workstation/${keys2}`,
                            {
                              TEL: e.target.value,
                            },
                          );
                        };
                        response();
                        message.success("New option added successfully");
                      } catch (error) {
                        console.error("Error adding new option:", error);
                        message.error("Failed to add new option");
                      }
                  }
                }
              }}
              allowClear
            />
          ) : (
            <Input
              value={tel2}
              onChange={(e) => setTEL2(e.target.value)}
              disabled
            />
          )}
        </Form.Item>
        <Form.Item label={"担当者"} className="w-fit grow">
          {selectedValueDelivery2 ? (
            <Input
              value={charge2}
              onChange={(e) => setCharge2(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const delivery = deliveryData.find(
                    (item) => item._id === keys2,
                  );
                  if (delivery) {
                    if (e.target.value !== delivery["担当者"])
                      try {
                        const response = async () => {
                          await axios.put(
                            process.env.REACT_API_BASE_URL +
                              `/workstation/${keys2}`,
                            {
                              担当者: e.target.value,
                            },
                          );
                        };
                        response();
                        message.success("New option added successfully");
                      } catch (error) {
                        console.error("Error adding new option:", error);
                        message.error("Failed to add new option");
                      }
                  }
                }
              }}
              allowClear
            />
          ) : (
            <Input
              value={charge2}
              onChange={(e) => setCharge2(e.target.value)}
              disabled
            />
          )}
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
          {selectedValueDelivery2 ? (
            <TextArea
              rows={4}
              value={requestText2}
              className="grow"
              onChange={(e) => setRequestText2(e.target.value)}
            />
          ) : (
            <TextArea
              rows={4}
              value={requestText2}
              className="grow"
              onChange={(e) => setRequestText2(e.target.value)}
              disabled
            />
          )}
        </div>
      </Form.Item>
    </div>
  );
};

const Delivery3 = ({ setDate, setDeliveryData3, editData }) => {
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
  const [keys3, setKeys3] = useState("");
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
    if (editData) {
      setSelectedValueDelivery3(editData.配達先3);
      setAddress3(editData.配達先住所3 || "");
      setTEL3(editData.配達先TEL3 || "");
      setCharge3(editData.配達先担当者3 || "");
      setRequestText3(editData.依頼書備考3 || "");
      setDates3(editData.積日3);
      setDate3(editData.配達日3);
      setDate(editData.配達日3);
      setTime3(editData.配達時間3);
      setBasicFee3(editData.基本料金3);
      setBasicFeeTax3(editData.基本課税3);
      setFee3Angle3(editData["3軸料金3"]);
      setFee3AngleTax3(editData["3軸課税3"]);
      setCRUFee3(editData.CRU変更料金3);
      setCRUFeeTax3(editData.CRU変更課税3);
      setHighSpeedFee3(editData.高速費3);
      setScaleFee3(editData.スケール費3);
      setScaleFeeTax3(editData.スケール費課税3);
      setChassisFee3(editData.シャーシ留置費3);
      setChassisFeeTax3(editData.シャーシ留置費課税3);
      setOtherFee3(editData.その他費用3);
      setOtherFeeTax3(editData.その他課税3);
    }
  }, [editData]);
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
    if (!value) {
      setAddress3("");
      setTEL3("");
      setCharge3("");
      setRequestText3("");
    } else {
      const delivery = deliveryData.find((item) => item._id === key.key);
      if (delivery) {
        setAddress3(delivery["住所"] || "");
        setTEL3(delivery.TEL || "");
        setCharge3(delivery["担当者"] || "");
        setRequestText3(delivery["依頼書備考コメント"] || "");
      }
    }
  };

  const handleChangeDelivery3 = (value) => {
    setInputValueDelivery3(value);
    if (!value.trim()) {
      setFilteredDeliveryData3(deliveryData);
    } else {
      const filteredData = deliveryData.filter((delivery) => {
        if (typeof delivery === "string") {
          return delivery.toLowerCase().includes(value.toLowerCase());
        } else if (
          typeof delivery === "object" &&
          delivery !== null &&
          typeof delivery.作業地名称 === "string"
        ) {
          return delivery.作業地名称
            .toLowerCase()
            .includes(value.toLowerCase());
        }
        console.log("Unexpected delivery structure:", delivery);
        return false;
      });
      setFilteredDeliveryData3(filteredData);
    }
  };

  const handleKeyPressDelivery3 = async (event) => {
    if (event.key === "Enter" && inputValueDelivery3) {
      const exists = deliveryData.some(
        (delivery) =>
          (typeof delivery === "string" &&
            delivery.toLowerCase() === inputValueDelivery3.toLowerCase()) ||
          (typeof delivery === "object" &&
            delivery !== null &&
            delivery.作業地名称.toLowerCase() ===
              inputValueDelivery3.toLowerCase()),
      );

      if (!exists) {
        try {
          // Assuming you have an API endpoint for adding new delivery options
          const response = await axios.post(
            `${process.env.REACT_API_BASE_URL}/workstation`,
            {
              作業地名称: inputValueDelivery3,
              配達場所: 0,
            },
          );
          const newOption = { 作業地名称: inputValueDelivery3 };
          setDeliveryData((prevOptions) => [...prevOptions, newOption]);
          setSelectedValueDelivery3(newOption);
          setInputValueDelivery3("");
          message.success("New delivery option added successfully");
        } catch (error) {
          console.error("Error adding new delivery option:", error);
          message.error("Failed to add new delivery option");
        }
      }
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
          {selectedValueDelivery3 ? (
            <Input
              className="w-fit grow"
              value={address3}
              onChange={(e) => setAddress3(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const delivery = deliveryData.find(
                    (item) => item._id === keys3,
                  );
                  if (delivery) {
                    if (e.target.value !== delivery["住所"])
                      try {
                        const response = async () => {
                          await axios.put(
                            process.env.REACT_API_BASE_URL +
                              `/workstation/${keys3}`,
                            {
                              住所: e.target.value,
                            },
                          );
                        };
                        response();
                        message.success("New option added successfully");
                      } catch (error) {
                        console.error("Error adding new option:", error);
                        message.error("Failed to add new option");
                      }
                  }
                }
              }}
              allowClear
            />
          ) : (
            <Input
              className="w-fit grow"
              value={address3}
              onChange={(e) => setAddress3(e.target.value)}
              disabled
            />
          )}
        </div>
      </Form.Item>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item label={"TEL"} className="w-fit grow">
          {selectedValueDelivery3 ? (
            <Input
              value={tel3}
              onChange={(e) => setTEL3(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const delivery = deliveryData.find(
                    (item) => item._id === keys3,
                  );
                  if (delivery) {
                    if (e.target.value !== delivery["TEL"])
                      try {
                        const response = async () => {
                          await axios.put(
                            process.env.REACT_API_BASE_URL +
                              `/workstation/${keys3}`,
                            {
                              TEL: e.target.value,
                            },
                          );
                        };
                        response();
                        message.success("New option added successfully");
                      } catch (error) {
                        console.error("Error adding new option:", error);
                        message.error("Failed to add new option");
                      }
                  }
                }
              }}
              allowClear
            />
          ) : (
            <Input
              value={tel3}
              onChange={(e) => setTEL3(e.target.value)}
              disabled
            />
          )}
        </Form.Item>
        <Form.Item label={"担当者"} className="w-fit grow">
          {selectedValueDelivery3 ? (
            <Input
              value={charge3}
              onChange={(e) => setCharge3(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const delivery = deliveryData.find(
                    (item) => item._id === keys3,
                  );
                  if (delivery) {
                    if (e.target.value !== delivery["担当者"])
                      try {
                        const response = async () => {
                          await axios.put(
                            process.env.REACT_API_BASE_URL +
                              `/workstation/${keys3}`,
                            {
                              担当者: e.target.value,
                            },
                          );
                        };
                        response();
                        message.success("New option added successfully");
                      } catch (error) {
                        console.error("Error adding new option:", error);
                        message.error("Failed to add new option");
                      }
                  }
                }
              }}
              allowClear
            />
          ) : (
            <Input
              value={charge3}
              onChange={(e) => setCharge3(e.target.value)}
              disabled
            />
          )}
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
          {selectedValueDelivery3 ? (
            <TextArea
              rows={4}
              value={requestText3}
              className="grow"
              onChange={(e) => setRequestText3(e.target.value)}
            />
          ) : (
            <TextArea
              rows={4}
              value={requestText3}
              className="grow"
              onChange={(e) => setRequestText3(e.target.value)}
              disabled
            />
          )}
        </div>
      </Form.Item>
    </div>
  );
};

const Delivery = (
  { setDate, setDeliveryData1, setDeliveryData2, setDeliveryData3, editData },
  { className = "" },
) => {
  const deliveryTab = ["配達1", "配達2", "配達3"];
  const dialogComponent = [
    <Delivery1
      setDate={setDate}
      setDeliveryData1={setDeliveryData1}
      editData={editData}
    />,
    <Delivery2
      setDate={setDate}
      setDeliveryData2={setDeliveryData2}
      editData={editData}
    />,
    <Delivery3
      setDate={setDate}
      setDeliveryData3={setDeliveryData3}
      editData={editData}
    />,
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
