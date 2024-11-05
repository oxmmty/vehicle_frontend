import React, { useEffect, useState } from "react";
import Group from "./Group";
import { Form, Input, DatePicker } from "antd";
import dayjs from "dayjs";

const PackageInfo = ({ setPackageInfoData, editData }, { className = "" }) => {
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
    if (editData) {
      setSealNumber(editData.シール番号);
      setTW(editData.TW);
      setVOY(editData.VOYNo);
      setHoyang(editData.荷揚港);
      setFinal(editData.最終仕向);
      setName(editData.品名);
      setQuantity(editData.個数);
      setWeight(editData.重量);
      setShape(editData.荷姿);
      setCutDate(editData.カット日);
    }
  }, [editData]);
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
              value={sealNumber}
              onChange={(e) => {
                setSealNumber(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label={"T/W"} className="w-fit grow">
            <Input
              value={tw}
              onChange={(e) => {
                setTW(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label={"VOY.No."} className="w-fit grow">
            <Input
              value={voy}
              onChange={(e) => {
                setVOY(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label={"荷揚港"} className="w-fit grow">
            <Input
              value={hoyang}
              onChange={(e) => {
                setHoyang(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label={"最終仕向"} className="w-fit grow">
            <Input
              value={final}
              onChange={(e) => {
                setFinal(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label={"品名"} className="w-fit grow">
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label={"個数"} className="w-fit grow">
            <Input
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label={"重量"} className="w-fit grow">
            <Input
              placeholder="Kg"
              type="number"
              value={weight}
              onChange={(e) => {
                setWeight(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label={"荷姿"} className="w-fit grow">
            <Input
              value={shape}
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
              value={dayjs(cutDate)}
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
