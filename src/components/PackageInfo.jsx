import React, { useEffect, useState } from "react";
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
import dayjs from "dayjs";

const PackageInfo = ({ setPackageInfoData }, { className = "" }) => {
  const [cutDate, setCutDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [sealNumber, setSealNumber] = useState(null);
  const [tw, setTW] = useState(null);
  const [voy, setVOY] = useState(null);
  const [hoyang, setHoyang] = useState(null);
  const [final, setFinal] = useState(null);
  const [name, setName] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [weight, setWeight] = useState(null);
  const [shape, setShape] = useState(null);

  useEffect(() => {
    setPackageInfoData([
      cutDate,
      sealNumber,
      tw,
      voy,
      hoyang,
      final,
      name,
      quantity,
      weight,
      shape,
    ]);
  }, [
    cutDate,
    sealNumber,
    tw,
    voy,
    hoyang,
    final,
    name,
    quantity,
    weight,
    shape,
  ]);

  return (
    <div className={`${className}`}>
      <Group label={"荷物情報"}>
        <div className="grid grid-cols-3 gap-x-1 sm:gap-x-4 w-full">
          <Form.Item label={"シール番号"} className="w-fit grow">
            <Input
              onChange={(e) => {
                setSealNumber(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label={"T/W"} className="w-fit grow">
            <Input
              onChange={(e) => {
                setTW(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label={"VOY.No."} className="w-fit grow">
            <Input
              onChange={(e) => {
                setVOY(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label={"荷物港"} className="w-fit grow">
            <Input
              onChange={(e) => {
                setHoyang(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label={"最終仕向"} className="w-fit grow">
            <Input
              onChange={(e) => {
                setFinal(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label={"品名"} className="w-fit grow">
            <Input
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label={"個数"} className="w-fit grow">
            <Input
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label={"重量"} className="w-fit grow">
            <Input
              placeholder="Kg"
              type="number"
              onChange={(e) => {
                setWeight(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label={"荷姿"} className="w-fit grow">
            <Input
              onChange={(e) => {
                setShape(e.target.value);
              }}
            />
          </Form.Item>
        </div>
        <div className="flex flex-wrap flex-row items-center gap-4">
          <Form.Item label={"カット日"} className="grow">
            <DatePicker
              className="w-full"
              required
              onChange={(date, dateString) => {
                setCutDate(dateString);
              }}
            />
          </Form.Item>
        </div>
      </Group>
    </div>
  );
};

export default PackageInfo;
