import React, { useState, useEffect } from "react";
import axios from "axios";
import Group from "./Group";
import { Form, Tabs, Select, Input, DatePicker, Radio, Space } from "antd";
import moment from "moment";

const Storage = ({ setStorageData }, { className = "" }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalDays, setTotalDays] = useState(0); // New state for total days
  const [shipperLiftOff, setShipperLiftOff] = useState(0);
  const [shipperLiftOn, setShipperLiftOn] = useState(0);
  const [shipperPrice, setShipperPrice] = useState(0);
  const [totalShipperAmount, setTotalShipperAmount] = useState(0); // New state for total shipper amount
  const [shipperStorageTax, setShipperStorageTax] = useState(true);
  const [subLiftOff, setSubLiftOff] = useState(0);
  const [subLiftOn, setSubLiftOn] = useState(0);
  const [subPrice, setSubPrice] = useState(0);
  const [totalSubAmount, setTotalSubAmount] = useState(0); // New state for total sub amount
  const [subTax, setSubTax] = useState(true);
  const [storageLocationData, setStorageLocationData] = useState([]);
  const [filteredStorageLocationData, setFilteredStorageLocationData] =
    useState([]);
  const [selectedValueStorageLocation, setSelectedValueStorageLocation] =
    useState("");
  const [inputValueStorageLocation, setInputValueStorageLocation] =
    useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const workstations = await axios.get(
          process.env.REACT_API_BASE_URL + `/workstation`,
        );

        const storageLocationFilter = workstations.data
          .filter((item) => item.保管場所 !== null)
          .sort((a, b) => b.保管場所 - a.保管場所);
        const storageLocation = storageLocationFilter.map(
          (item) => item.作業地名称,
        );
        setStorageLocationData(storageLocation);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Set storage data
    setStorageData([
      selectedValueStorageLocation,
      startDate,
      endDate,
      shipperLiftOff,
      shipperLiftOn,
      shipperPrice,
      shipperStorageTax,
      subLiftOff,
      subLiftOn,
      subPrice,
      subTax,
      totalDays,
      totalShipperAmount,
      totalSubAmount,
    ]);
  }, [
    selectedValueStorageLocation,
    startDate,
    endDate,
    shipperLiftOff,
    shipperLiftOn,
    shipperPrice,
    shipperStorageTax,
    subLiftOff,
    subLiftOn,
    subPrice,
    subTax,
    totalDays,
    totalShipperAmount,
    totalSubAmount,
  ]);

  useEffect(() => {
    // Calculate total days between startDate and endDate
    if (startDate && endDate) {
      const days = moment(endDate).diff(moment(startDate), "days");
      setTotalDays(days + 1);
    } else {
      setTotalDays(0);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    // Calculate total amounts for 荷主 and 下払
    const totalShipper =
      (parseFloat(shipperLiftOff) || 0) +
      (parseFloat(shipperLiftOn) || 0) +
      (parseFloat(shipperPrice) || 0) * totalDays;
    setTotalShipperAmount(totalShipper);

    const totalSub =
      (parseFloat(subLiftOff) || 0) +
      (parseFloat(subLiftOn) || 0) +
      (parseFloat(subPrice) || 0) * totalDays;
    setTotalSubAmount(totalSub);
  }, [
    shipperLiftOff,
    shipperLiftOn,
    shipperPrice,
    subLiftOff,
    subLiftOn,
    subPrice,
    totalDays,
  ]);

  const handleSelectStorageLocation = (value) => {
    setSelectedValueStorageLocation(value);
  };

  const handleChangeStorageLocation = (value) => {
    setInputValueStorageLocation(value);
    const filteredData = storageLocationData.filter((storageLocation) =>
      storageLocation.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredStorageLocationData(filteredData);
  };

  const handleKeyPressStorageLocation = async (event) => {
    if (
      event.key === "Enter" &&
      inputValueStorageLocation &&
      !storageLocationData.includes(inputValueStorageLocation)
    ) {
      setSelectedValueStorageLocation(inputValueStorageLocation);
      setInputValueStorageLocation("");
      setFilteredStorageLocationData([
        ...storageLocationData,
        inputValueStorageLocation,
      ]);
    }
  };

  useEffect(() => {
    if (!inputValueStorageLocation) {
      setSelectedValueStorageLocation("");
    }
  }, [inputValueStorageLocation]);

  return (
    <div className={`${className}`}>
      <Group label={"保管"}>
        <Form.Item label={"保管場所"}>
          <Select
            showSearch
            value={selectedValueStorageLocation}
            onSearch={handleChangeStorageLocation}
            onSelect={handleSelectStorageLocation}
            onInputKeyDown={handleKeyPressStorageLocation}
            filterOption={false}
            notFoundContent={null}>
            {filteredStorageLocationData.length > 0 ? (
              filteredStorageLocationData.map((data) => (
                <Option key={data} value={data}>
                  {data}
                </Option>
              ))
            ) : inputValueStorageLocation ? (
              <Option disabled>No matching data</Option>
            ) : (
              storageLocationData.map((data) => (
                <Option key={data} value={data}>
                  {data}
                </Option>
              ))
            )}
          </Select>
        </Form.Item>
        <div className="flex flex-wrap flex-row items-center gap-x-4">
          <Form.Item label={"入庫日"} style={{ width: 100 }} className="grow">
            <DatePicker
              className="w-full"
              required
              onChange={(date, dateString) => {
                setStartDate(dateString);
                if (!endDate || moment(date).isAfter(endDate)) {
                  setEndDate(null);
                }
              }}
            />
          </Form.Item>
          <Form.Item label={"出庫日"} style={{ width: 100 }} className="grow">
            <DatePicker
              className="w-full"
              required
              onChange={(date, dateString) => {
                setEndDate(dateString);
              }}
              disabledDate={(current) => {
                return current && current < moment(startDate, "YYYY-MM-DD");
              }}
            />
          </Form.Item>
        </div>

        <Group label={"料金"}>
          <div className="flex flex-wrap flex-row items-center gap-x-4">
            <Form.Item label={"荷主リフトオフ"} className="grow w-32">
              <Input
                required
                className="w-full"
                onChange={(e) => setShipperLiftOff(e.target.value)}
              />
            </Form.Item>
            <Form.Item label={"荷主リフトオン"} className="grow w-32">
              <Input
                required
                className="w-full"
                onChange={(e) => setShipperLiftOn(e.target.value)}
              />
            </Form.Item>
            <Form.Item label={"荷主保管/日"} className="grow w-32">
              <Input
                required
                className="w-full"
                onChange={(e) => setShipperPrice(e.target.value)}
              />
            </Form.Item>
            <Radio.Group
              value={shipperStorageTax}
              onChange={(e) => setShipperStorageTax(e.target.value)}>
              <div className="flex flex-col">
                <Radio value={true}>課税</Radio>
                <Radio value={false}>非課税</Radio>
              </div>
            </Radio.Group>
          </div>

          <div className="flex flex-wrap flex-row items-center gap-x-4">
            <Form.Item label={"下払リフトオフ"} className="grow w-32">
              <Input
                required
                className="w-full"
                onChange={(e) => setSubLiftOff(e.target.value)}
              />
            </Form.Item>
            <Form.Item label={"下払リフトオン"} className="grow w-32">
              <Input
                required
                className="w-full"
                onChange={(e) => setSubLiftOn(e.target.value)}
              />
            </Form.Item>
            <Form.Item label={"下払保管/日"} className="grow w-32">
              <Input
                required
                className="w-full"
                onChange={(e) => setSubPrice(e.target.value)}
              />
            </Form.Item>
            <Radio.Group
              value={subTax}
              onChange={(e) => setSubTax(e.target.value)}>
              <div className="flex flex-col">
                <Radio value={true}>課税</Radio>
                <Radio value={false}>非課税</Radio>
              </div>
            </Radio.Group>
          </div>
          <div className="flex justify-between w-3/5 pl-4">
            <div>{totalDays} 日</div>
            <div> 荷主: {totalShipperAmount} 円</div>
            <div>下払: {totalSubAmount} 円</div>
          </div>
        </Group>
      </Group>
    </div>
  );
};

export default Storage;
