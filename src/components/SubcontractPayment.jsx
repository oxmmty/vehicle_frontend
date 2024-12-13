import React, { useState, useEffect } from "react";
import axios from "axios";
import Group from "./Group";
import { Form, Tabs, Select, Input, Radio } from "antd";

const SubcontractPayment1 = ({ setSubPayData1, editData }) => {
  const [companyData, setCompanyData] = useState([]);
  const [filteredCompanyData, setFilteredCompanyData] = useState([]);
  const [selectedValueSubCompany1, setSelectedValueCompany] = useState("");
  const [inputValueCompany, setInputValueCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [subBasicPay1, setSubBasicPay] = useState(null);
  const [subBasicPayTax1, setSubBasicPayTax] = useState(true);
  const [driver1, setDriver] = useState(true);
  const [truckNumber11, setTruckNumber1] = useState(null);
  const [selfTruckNumber11, setSelfTruckNumber1] = useState(null);
  const [selfTruckNumber12, setSelfTruckNumber2] = useState(null);
  const [truckNumber21, setTruckNumber2] = useState(null);
  const [driverName1, setDriverName] = useState(null);
  const [selfDriverName1, setSelfDriverName] = useState(null);
  const [subExpressBasicFee1, setSubExpressBasicFee] = useState(null);
  const [subScaleFee1, setSubScaleFee] = useState(null);
  const [subScaleFeeTax1, setSubScaleFeeTax] = useState(true);
  const [subChassisFee1, setSubChassisFee] = useState(null);
  const [subChassisFeeTax1, setSubChassisFeeTax] = useState(true);
  const [subOtherFee1, setSubOtherFee] = useState(null);
  const [subOtherFeeTax1, setSubOtherFeeTax] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companies = await axios.get(
          process.env.REACT_API_BASE_URL + `/partnercompany`,
        );

        const partnercompnay = companies.data
          .sort((a, b) => b.カウント - a.カウント)
          .map((item) => item.協力会社);
        setCompanyData(partnercompnay);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (editData) {
      setSelectedValueCompany(editData.下払会社名1);
      setSubBasicPay(editData.下払料金1);
      setSubBasicPayTax(editData.下払課税1);
      setSelfDriverName(editData.自社乗務員1);
      setSelfTruckNumber1(editData.自社車番F1);
      setSelfTruckNumber2(editData.自社車番S1);
      setTruckNumber1(editData.下払自車F1);
      setTruckNumber2(editData.下払自車S1);
      setSubExpressBasicFee(editData.下払高速費1);
      setSubScaleFee(editData.下払スケール費1);
      setSubScaleFeeTax(editData.下払スケール費課税1);
      setSubChassisFee(editData.下払シャーシ留置費1);
      setSubChassisFeeTax(editData.下払シャーシ留置費課税1);
      setSubOtherFee(editData.下払その他費用1);
      setSubOtherFeeTax(editData.下払その他課税1);
    }
  }, [editData]);
  useEffect(() => {
    setSubPayData1([
      selectedValueSubCompany1,
      subBasicPay1,
      subBasicPayTax1,
      driver1,
      truckNumber11,
      truckNumber21,
      driverName1,
      selfTruckNumber11,
      selfTruckNumber12,
      selfDriverName1,
      subExpressBasicFee1,
      subScaleFee1,
      subScaleFeeTax1,
      subChassisFee1,
      subChassisFeeTax1,
      subOtherFee1,
      subOtherFeeTax1,
    ]);
  }, [
    selectedValueSubCompany1,
    subBasicPay1,
    subBasicPayTax1,
    driver1,
    truckNumber11,
    truckNumber21,
    selfTruckNumber11,
    selfTruckNumber12,
    driverName1,
    selfDriverName1,
    subExpressBasicFee1,
    subScaleFee1,
    subScaleFeeTax1,
    subChassisFee1,
    subChassisFeeTax1,
    subOtherFee1,
    subOtherFeeTax1,
  ]);
  //Partner comapany datas
  const companyFilterOptions = () => {
    if (!inputValueCompany.trim()) {
      setFilteredCompanyData(companyData);
    } else {
      const filtered = companyData.filter((option) => {
        // Check if option is a string
        if (typeof option === "string") {
          return option.toLowerCase().includes(inputValueCompany.toLowerCase());
        }
        // Check if option is an object with a 'value' property
        else if (
          typeof option === "object" &&
          option !== null &&
          typeof option.value === "string"
        ) {
          return option.value
            .toLowerCase()
            .includes(inputValueCompany.toLowerCase());
        }
        // Check if option is an object with a 'label' property
        else if (
          typeof option === "object" &&
          option !== null &&
          typeof option.label === "string"
        ) {
          return option.label
            .toLowerCase()
            .includes(inputValueCompany.toLowerCase());
        }
        // If none of the above, log the unexpected option and return false
        console.log("Unexpected option structure:", option);
        return false;
      });
      setFilteredCompanyData(filtered);
    }
  };
  const companyHandleAddNewOption = async () => {
    if (
      inputValueCompany &&
      !companyData.some(
        (option) => option.toLowerCase() === inputValueCompany.toLowerCase(),
      )
    ) {
      try {
        const response = await axios.post(
          process.env.REACT_API_BASE_URL + "/partnercompany",
          {
            協力会社: inputValueCompany,
          },
        );
        const newOption = { value: inputValueCompany };
        setCompanyData((prevOptions) => [...prevOptions, newOption]);
        setSelectedValueCompany(newOption);
        message.success("New option added successfully");
      } catch (error) {
        console.error("Error adding new option:", error);
        message.error("Failed to add new option");
      }
    }
  };
  const companyHandleChange = (newValue) => {
    setSelectedValueCompany(newValue);
  };
  const companyHandleSearch = (newInputValue) => {
    setInputValueCompany(newInputValue);
  };

  useEffect(() => {
    companyFilterOptions();
  }, [inputValueCompany, companyData]);
  return (
    <div>
      <Form.Item label={"会社名"} required>
        <Select
          showSearch
          value={selectedValueSubCompany1}
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          onSearch={companyHandleSearch}
          onChange={companyHandleChange}
          notFoundContent={loading ? "Loading..." : "No match found"}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              companyHandleAddNewOption();
            }
          }}
          allowClear>
          {filteredCompanyData.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item
          label={"料金"}
          style={{ width: 100 }}
          className="grow"
          required>
          <Input
            value={subBasicPay1}
            onChange={(e) => {
              setSubBasicPay(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={subBasicPayTax1}
          defaultValue={true}
          onChange={(e) => {
            setSubBasicPayTax(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
        <Radio.Group defaultValue={true} value={driver1}>
          <div className="flex flex-col">
            <Radio value={true}>自車</Radio>
            <Radio value={false}>庸車</Radio>
          </div>
        </Radio.Group>
      </div>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item label={"車番1"} className="grow">
          <Input
            onChange={(e) => {
              if (driver1 === false) {
                setTruckNumber1(e.target.value);
                setSelfTruckNumber1(null);
              } else {
                setSelfTruckNumber1(e.target.value);
                setTruckNumber1(null);
              }
            }}
          />
        </Form.Item>
        <Form.Item label={"車番2"} className="grow">
          <Input
            onChange={(e) => {
              if (driver1 === false) {
                setTruckNumber2(e.target.value);
                setSelfTruckNumber2(null);
              } else {
                setSelfTruckNumber2(e.target.value);
                setTruckNumber2(null);
              }
            }}
          />
        </Form.Item>
        <Form.Item label={"乗務員"} className="grow">
          <Input
            onChange={(e) => {
              if (driver1 === false) {
                setDriverName(e.target.value);
                setSelfDriverName(true);
              } else {
                setSelfDriverName(e.target.value);
                setDriverName(true);
              }
            }}
          />
        </Form.Item>
      </div>
      <Form.Item label={"高速道路料金"} className=" grow">
        <Input
          value={subExpressBasicFee1}
          onChange={(e) => {
            setSubExpressBasicFee(e.target.value);
          }}
        />
      </Form.Item>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item label={"スケール費"} className="grow w-32">
          <Input
            required
            value={subScaleFee1}
            className="w-full"
            onChange={(e) => {
              setSubScaleFee(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={subScaleFeeTax1}
          onChange={(e) => {
            setSubScaleFeeTax(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
        <Form.Item label={"シャーシ留置費"} className="grow w-32">
          <Input
            required
            value={subChassisFee1}
            className="w-full"
            onChange={(e) => {
              setSubChassisFee(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={subChassisFeeTax1}
          onChange={(e) => {
            setSubChassisFeeTax(e.target.value);
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
            value={subOtherFee1}
            className="w-full"
            onChange={(e) => {
              setSubOtherFee(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={subOtherFeeTax1}
          onChange={(e) => {
            setSubOtherFeeTax(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
      </div>
    </div>
  );
};
const SubcontractPayment2 = ({ setSubPayData2, editData }) => {
  const [companyData, setCompanyData] = useState([]);
  const [filteredCompanyData, setFilteredCompanyData] = useState([]);
  const [selectedValueSubCompany2, setSelectedValueCompany] = useState("");
  const [inputValueCompany, setInputValueCompany] = useState("");
  const [loading, setLoading] = useState(false);

  const [subBasicPay2, setSubBasicPay] = useState(null);
  const [subBasicPayTax2, setSubBasicPayTax] = useState(true);
  const [driver2, setDriver] = useState(true);
  const [truckNumber12, setTruckNumber1] = useState(null);
  const [truckNumber22, setTruckNumber2] = useState(null);
  const [driverName2, setDriverName] = useState(null);
  const [selfTruckNumber12, setSelfTruckNumber1] = useState(null);
  const [selfTruckNumber22, setSelfTruckNumber2] = useState(null);
  const [selfDriverName2, setSelfDriverName] = useState(null);
  const [subExpressBasicFee2, setSubExpressBasicFee] = useState(null);
  const [subScaleFee2, setSubScaleFee] = useState(null);
  const [subScaleFeeTax2, setSubScaleFeeTax] = useState(true);
  const [subChassisFee2, setSubChassisFee] = useState(null);
  const [subChassisFeeTax2, setSubChassisFeeTax] = useState(true);
  const [subOtherFee2, setSubOtherFee] = useState(null);
  const [subOtherFeeTax2, setSubOtherFeeTax] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companies = await axios.get(
          process.env.REACT_API_BASE_URL + `/partnercompany`,
        );

        const partnercompnay = companies.data
          .sort((a, b) => b.カウント - a.カウント)
          .map((item) => item.協力会社);
        setCompanyData(partnercompnay);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (editData) {
      setSelectedValueCompany(editData.下払会社名2);
      setSubBasicPay(editData.下払料金2);
      setSubBasicPayTax(editData.下払課税2);
      setSelfDriverName(editData.自社乗務員2);
      setSelfTruckNumber1(editData.自社車番F2);
      setSelfTruckNumber2(editData.自社車番S2);
      setTruckNumber1(editData.下払自車F2);
      setTruckNumber2(editData.下払自車S2);
      setSubExpressBasicFee(editData.下払高速費2);
      setSubScaleFee(editData.下払スケール費2);
      setSubScaleFeeTax(editData.下払スケール費課税2);
      setSubChassisFee(editData.下払シャーシ留置費2);
      setSubChassisFeeTax(editData.下払シャーシ留置費課税2);
      setSubOtherFee(editData.下払その他費用2);
      setSubOtherFeeTax(editData.下払その他課税2);
    }
  }, [editData]);

  useEffect(() => {
    setSubPayData2([
      selectedValueSubCompany2,
      subBasicPay2,
      subBasicPayTax2,
      driver2,
      truckNumber12,
      truckNumber22,
      driverName2,
      selfTruckNumber12,
      selfTruckNumber22,
      selfDriverName2,
      subExpressBasicFee2,
      subScaleFee2,
      subScaleFeeTax2,
      subChassisFee2,
      subChassisFeeTax2,
      subOtherFee2,
      subOtherFeeTax2,
    ]);
  }, [
    selectedValueSubCompany2,
    subBasicPay2,
    subBasicPayTax2,
    driver2,
    truckNumber12,
    truckNumber22,
    driverName2,
    selfTruckNumber12,
    selfTruckNumber22,
    selfDriverName2,
    subExpressBasicFee2,
    subScaleFee2,
    subScaleFeeTax2,
    subChassisFee2,
    subChassisFeeTax2,
    subOtherFee2,
    subOtherFeeTax2,
  ]);

  //Partner comapany datas
  const companyFilterOptions = () => {
    if (!inputValueCompany.trim()) {
      setFilteredCompanyData(companyData);
    } else {
      const filtered = companyData.filter((option) => {
        // Check if option is a string
        if (typeof option === "string") {
          return option.toLowerCase().includes(inputValueCompany.toLowerCase());
        }
        // Check if option is an object with a 'value' property
        else if (
          typeof option === "object" &&
          option !== null &&
          typeof option.value === "string"
        ) {
          return option.value
            .toLowerCase()
            .includes(inputValueCompany.toLowerCase());
        }
        // Check if option is an object with a 'label' property
        else if (
          typeof option === "object" &&
          option !== null &&
          typeof option.label === "string"
        ) {
          return option.label
            .toLowerCase()
            .includes(inputValueCompany.toLowerCase());
        }
        // If none of the above, log the unexpected option and return false
        console.log("Unexpected option structure:", option);
        return false;
      });
      setFilteredCompanyData(filtered);
    }
  };
  const companyHandleAddNewOption = async () => {
    if (
      inputValueCompany &&
      !companyData.some(
        (option) => option.toLowerCase() === inputValueCompany.toLowerCase(),
      )
    ) {
      try {
        const response = await axios.post(
          process.env.REACT_API_BASE_URL + "/partnercompany",
          {
            協力会社: inputValueCompany,
          },
        );
        const newOption = { value: inputValueCompany };
        setCompanyData((prevOptions) => [...prevOptions, newOption]);
        setSelectedValueCompany(newOption);
        message.success("New option added successfully");
      } catch (error) {
        console.error("Error adding new option:", error);
        message.error("Failed to add new option");
      }
    }
  };
  const companyHandleChange = (newValue) => {
    setSelectedValueCompany(newValue);
  };
  const companyHandleSearch = (newInputValue) => {
    setInputValueCompany(newInputValue);
  };

  useEffect(() => {
    companyFilterOptions();
  }, [inputValueCompany, companyData]);
  return (
    <div>
      <Form.Item label={"会社名"} required>
        <Select
          showSearch
          value={selectedValueSubCompany2}
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          onSearch={companyHandleSearch}
          onChange={companyHandleChange}
          notFoundContent={loading ? "Loading..." : "No match found"}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              companyHandleAddNewOption();
            }
          }}
          allowClear>
          {filteredCompanyData.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item
          label={"料金"}
          style={{ width: 100 }}
          className="grow"
          required>
          <Input
            value={subBasicPay2}
            onChange={(e) => {
              setSubBasicPay(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={subBasicPayTax2}
          defaultValue={true}
          onChange={(e) => {
            setSubBasicPayTax(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
        <Radio.Group defaultValue={true} value={driver2}>
          <div className="flex flex-col">
            <Radio value={true}>自車</Radio>
            <Radio value={false}>庸車</Radio>
          </div>
        </Radio.Group>
      </div>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item label={"車番1"} className="grow">
          <Input
            onChange={(e) => {
              if (driver2 === false) {
                setTruckNumber1(e.target.value);
                setSelfTruckNumber1(null);
              } else {
                setSelfTruckNumber1(e.target.value);
                setTruckNumber1(null);
              }
            }}
          />
        </Form.Item>
        <Form.Item label={"車番2"} className="grow">
          <Input
            onChange={(e) => {
              if (driver2 === false) {
                setTruckNumber2(e.target.value);
                setSelfTruckNumber2(null);
              } else {
                setSelfTruckNumber2(e.target.value);
                setTruckNumber2(null);
              }
            }}
          />
        </Form.Item>
        <Form.Item label={"乗務員"} className="grow">
          <Input
            onChange={(e) => {
              if (driver2 === false) {
                setDriverName(e.target.value);
                setSelfDriverName(null);
              } else {
                setSelfDriverName(e.target.value);
                setDriverName(e.target.value);
              }
            }}
          />
        </Form.Item>
      </div>
      <Form.Item label={"高速道路料金"} className=" grow">
        <Input
          value={subExpressBasicFee2}
          onChange={(e) => {
            setSubExpressBasicFee(e.target.value);
          }}
        />
      </Form.Item>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item label={"スケール費"} className="grow w-32">
          <Input
            required
            value={subScaleFee2}
            className="w-full"
            onChange={(e) => {
              setSubScaleFee(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={subScaleFeeTax2}
          onChange={(e) => {
            setSubScaleFeeTax(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
        <Form.Item label={"シャーシ留置費"} className="grow w-32">
          <Input
            required
            value={subChassisFee2}
            className="w-full"
            onChange={(e) => {
              setSubChassisFee(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={subChassisFeeTax2}
          onChange={(e) => {
            setSubChassisFeeTax(e.target.value);
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
            value={subOtherFee2}
            className="w-full"
            onChange={(e) => {
              setSubOtherFee(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={subOtherFeeTax2}
          onChange={(e) => {
            setSubOtherFeeTax(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
      </div>
    </div>
  );
};
const SubcontractPayment3 = ({ setSubPayData3, editData }) => {
  const [companyData, setCompanyData] = useState([]);
  const [filteredCompanyData, setFilteredCompanyData] = useState([]);
  const [selectedValueSubCompany3, setSelectedValueCompany] = useState("");
  const [inputValueCompany, setInputValueCompany] = useState("");
  const [loading, setLoading] = useState(false);

  const [subBasicPay3, setSubBasicPay] = useState(null);
  const [subBasicPayTax3, setSubBasicPayTax] = useState(true);
  const [driver3, setDriver] = useState(true);
  const [truckNumber13, setTruckNumber1] = useState(null);
  const [truckNumber23, setTruckNumber2] = useState(null);
  const [driverName3, setDriverName] = useState(null);
  const [selfTruckNumber13, setSelfTruckNumber1] = useState(null);
  const [selfTruckNumber23, setSelfTruckNumber2] = useState(null);
  const [selfDriverName3, setSelfDriverName] = useState(null);
  const [subExpressBasicFee3, setSubExpressBasicFee] = useState(null);
  const [subScaleFee3, setSubScaleFee] = useState(null);
  const [subScaleFeeTax3, setSubScaleFeeTax] = useState(true);
  const [subChassisFee3, setSubChassisFee] = useState(null);
  const [subChassisFeeTax3, setSubChassisFeeTax] = useState(true);
  const [subOtherFee3, setSubOtherFee] = useState(null);
  const [subOtherFeeTax3, setSubOtherFeeTax] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companies = await axios.get(
          process.env.REACT_API_BASE_URL + `/partnercompany`,
        );

        const partnercompnay = companies.data
          .sort((a, b) => b.カウント - a.カウント)
          .map((item) => item.協力会社);
        setCompanyData(partnercompnay);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (editData) {
      setSelectedValueCompany(editData.下払会社名3);
      setSubBasicPay(editData.下払料金3);
      setSubBasicPayTax(editData.下払課税3);
      setSelfDriverName(editData.自社乗務員3);
      setSelfTruckNumber1(editData.自社車番F3);
      setSelfTruckNumber2(editData.自社車番S3);
      setTruckNumber1(editData.下払自車F3);
      setTruckNumber2(editData.下払自車S3);
      setSubExpressBasicFee(editData.下払高速費3);
      setSubScaleFee(editData.下払スケール費3);
      setSubScaleFeeTax(editData.下払スケール費課税3);
      setSubChassisFee(editData.下払シャーシ留置費3);
      setSubChassisFeeTax(editData.下払シャーシ留置費課税3);
      setSubOtherFee(editData.下払その他費用3);
      setSubOtherFeeTax(editData.下払その他課税3);
    }
  }, [editData]);
  useEffect(() => {
    setSubPayData3([
      selectedValueSubCompany3,
      subBasicPay3,
      subBasicPayTax3,
      driver3,
      truckNumber13,
      truckNumber23,
      driverName3,
      selfTruckNumber13,
      selfTruckNumber23,
      selfDriverName3,
      subExpressBasicFee3,
      subScaleFee3,
      subScaleFeeTax3,
      subChassisFee3,
      subChassisFeeTax3,
      subOtherFee3,
      subOtherFeeTax3,
    ]);
  }, [
    selectedValueSubCompany3,
    subBasicPay3,
    subBasicPayTax3,
    driver3,
    truckNumber13,
    truckNumber23,
    driverName3,
    selfTruckNumber13,
    selfTruckNumber23,
    selfDriverName3,
    subExpressBasicFee3,
    subScaleFee3,
    subScaleFeeTax3,
    subChassisFee3,
    subChassisFeeTax3,
    subOtherFee3,
    subOtherFeeTax3,
  ]);
  //Partner comapany datas
  const companyFilterOptions = () => {
    if (!inputValueCompany.trim()) {
      setFilteredCompanyData(companyData);
    } else {
      const filtered = companyData.filter((option) => {
        // Check if option is a string
        if (typeof option === "string") {
          return option.toLowerCase().includes(inputValueCompany.toLowerCase());
        }
        // Check if option is an object with a 'value' property
        else if (
          typeof option === "object" &&
          option !== null &&
          typeof option.value === "string"
        ) {
          return option.value
            .toLowerCase()
            .includes(inputValueCompany.toLowerCase());
        }
        // Check if option is an object with a 'label' property
        else if (
          typeof option === "object" &&
          option !== null &&
          typeof option.label === "string"
        ) {
          return option.label
            .toLowerCase()
            .includes(inputValueCompany.toLowerCase());
        }
        // If none of the above, log the unexpected option and return false
        console.log("Unexpected option structure:", option);
        return false;
      });
      setFilteredCompanyData(filtered);
    }
  };
  const companyHandleAddNewOption = async () => {
    if (
      inputValueCompany &&
      !companyData.some(
        (option) => option.toLowerCase() === inputValueCompany.toLowerCase(),
      )
    ) {
      try {
        const response = await axios.post(
          process.env.REACT_API_BASE_URL + "/partnercompany",
          {
            協力会社: inputValueCompany,
          },
        );
        const newOption = { value: inputValueCompany };
        setCompanyData((prevOptions) => [...prevOptions, newOption]);
        setSelectedValueCompany(newOption);
        message.success("New option added successfully");
      } catch (error) {
        console.error("Error adding new option:", error);
        message.error("Failed to add new option");
      }
    }
  };
  const companyHandleChange = (newValue) => {
    setSelectedValueCompany(newValue);
  };
  const companyHandleSearch = (newInputValue) => {
    setInputValueCompany(newInputValue);
  };

  useEffect(() => {
    companyFilterOptions();
  }, [inputValueCompany, companyData]);
  return (
    <div>
      <Form.Item label={"会社名"} required>
        <Select
          showSearch
          value={selectedValueSubCompany3}
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          onSearch={companyHandleSearch}
          onChange={companyHandleChange}
          notFoundContent={loading ? "Loading..." : "No match found"}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              companyHandleAddNewOption();
            }
          }}
          allowClear>
          {filteredCompanyData.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item
          label={"料金"}
          style={{ width: 100 }}
          className="grow"
          required>
          <Input
            value={subBasicPay3}
            onChange={(e) => {
              setSubBasicPay(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={subBasicPayTax3}
          defaultValue={true}
          onChange={(e) => {
            setSubBasicPayTax(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
        <Radio.Group defaultValue={true} value={driver3}>
          <div className="flex flex-col">
            <Radio value={true}>自車</Radio>
            <Radio value={false}>庸車</Radio>
          </div>
        </Radio.Group>
      </div>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item label={"車番1"} className="grow">
          <Input
            onChange={(e) => {
              if (driver3 === false) {
                setTruckNumber1(e.target.value);
                setSelfTruckNumber1(null);
              } else {
                setSelfTruckNumber1(e.target.value);
                setTruckNumber1(null);
              }
            }}
          />
        </Form.Item>
        <Form.Item label={"車番2"} className="grow">
          <Input
            onChange={(e) => {
              if (driver3 === false) {
                setTruckNumber2(e.target.value);
                setSelfTruckNumber2(null);
              } else {
                setSelfTruckNumber2(e.target.value);
                setTruckNumber2(null);
              }
            }}
          />
        </Form.Item>
        <Form.Item label={"乗務員"} className="grow">
          <Input
            onChange={(e) => {
              if (driver3 === false) {
                setDriverName(e.target.value);
                setSelfDriverName(null);
              } else {
                setSelfDriverName(e.target.value);
                setDriverName(e.target.value);
              }
            }}
          />
        </Form.Item>
      </div>
      <Form.Item label={"高速道路料金"} className=" grow">
        <Input
          value={subExpressBasicFee3}
          onChange={(e) => {
            setSubExpressBasicFee(e.target.value);
          }}
        />
      </Form.Item>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item label={"スケール費"} className="grow w-32">
          <Input
            required
            value={subScaleFee3}
            className="w-full"
            onChange={(e) => {
              setSubScaleFee(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={subScaleFeeTax3}
          onChange={(e) => {
            setSubScaleFeeTax(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
        <Form.Item label={"シャーシ留置費"} className="grow w-32">
          <Input
            required
            value={subChassisFee3}
            className="w-full"
            onChange={(e) => {
              setSubChassisFee(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={subChassisFeeTax3}
          onChange={(e) => {
            setSubChassisFeeTax(e.target.value);
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
            value={subOtherFee3}
            className="w-full"
            onChange={(e) => {
              setSubOtherFee(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={subOtherFeeTax3}
          onChange={(e) => {
            setSubOtherFeeTax(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
      </div>
    </div>
  );
};
const SubcontractPayment4 = ({ setSubPayData4, editData }) => {
  const [companyData, setCompanyData] = useState([]);
  const [filteredCompanyData, setFilteredCompanyData] = useState([]);
  const [selectedValueSubCompany4, setSelectedValueCompany] = useState("");
  const [inputValueCompany, setInputValueCompany] = useState("");
  const [loading, setLoading] = useState(false);

  const [subBasicPay4, setSubBasicPay] = useState(null);
  const [subBasicPayTax4, setSubBasicPayTax] = useState(true);
  const [driver4, setDriver] = useState(true);
  const [truckNumber14, setTruckNumber1] = useState(null);
  const [truckNumber24, setTruckNumber2] = useState(null);
  const [driverName4, setDriverName] = useState(null);
  const [selfTruckNumber14, setSelfTruckNumber1] = useState(null);
  const [selfTruckNumber24, setSelfTruckNumber2] = useState(null);
  const [selfDriverName4, setSelfDriverName] = useState(null);
  const [subExpressBasicFee4, setSubExpressBasicFee] = useState(null);
  const [subScaleFee4, setSubScaleFee] = useState(null);
  const [subScaleFeeTax4, setSubScaleFeeTax] = useState(true);
  const [subChassisFee4, setSubChassisFee] = useState(null);
  const [subChassisFeeTax4, setSubChassisFeeTax] = useState(true);
  const [subOtherFee4, setSubOtherFee] = useState(null);
  const [subOtherFeeTax4, setSubOtherFeeTax] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companies = await axios.get(
          process.env.REACT_API_BASE_URL + `/partnercompany`,
        );

        const partnercompnay = companies.data
          .sort((a, b) => b.カウント - a.カウント)
          .map((item) => item.協力会社);
        setCompanyData(partnercompnay);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (editData) {
      setSelectedValueCompany(editData.下払会社名4);
      setSubBasicPay(editData.下払料金4);
      setSubBasicPayTax(editData.下払課税4);
      setSelfDriverName(editData.自社乗務員4);
      setSelfTruckNumber1(editData.自社車番F4);
      setSelfTruckNumber2(editData.自社車番S4);
      setTruckNumber1(editData.下払自車F4);
      setTruckNumber2(editData.下払自車S4);
      setSubExpressBasicFee(editData.下払高速費4);
      setSubScaleFee(editData.下払スケール費4);
      setSubScaleFeeTax(editData.下払スケール費課税4);
      setSubChassisFee(editData.下払シャーシ留置費4);
      setSubChassisFeeTax(editData.下払シャーシ留置費課税4);
      setSubOtherFee(editData.下払その他費用4);
      setSubOtherFeeTax(editData.下払その他課税4);
    }
  }, [editData]);
  useEffect(() => {
    setSubPayData4([
      selectedValueSubCompany4,
      subBasicPay4,
      subBasicPayTax4,
      driver4,
      truckNumber14,
      truckNumber24,
      driverName4,
      selfTruckNumber14,
      selfTruckNumber24,
      selfDriverName4,
      subExpressBasicFee4,
      subScaleFee4,
      subScaleFeeTax4,
      subChassisFee4,
      subChassisFeeTax4,
      subOtherFee4,
      subOtherFeeTax4,
    ]);
  }, [
    selectedValueSubCompany4,
    subBasicPay4,
    subBasicPayTax4,
    driver4,
    truckNumber14,
    truckNumber24,
    driverName4,
    selfTruckNumber14,
    selfTruckNumber24,
    selfDriverName4,
    subExpressBasicFee4,
    subScaleFee4,
    subScaleFeeTax4,
    subChassisFee4,
    subChassisFeeTax4,
    subOtherFee4,
    subOtherFeeTax4,
  ]);
  //Partner comapany datas
  const companyFilterOptions = () => {
    if (!inputValueCompany.trim()) {
      setFilteredCompanyData(companyData);
    } else {
      const filtered = companyData.filter((option) => {
        // Check if option is a string
        if (typeof option === "string") {
          return option.toLowerCase().includes(inputValueCompany.toLowerCase());
        }
        // Check if option is an object with a 'value' property
        else if (
          typeof option === "object" &&
          option !== null &&
          typeof option.value === "string"
        ) {
          return option.value
            .toLowerCase()
            .includes(inputValueCompany.toLowerCase());
        }
        // Check if option is an object with a 'label' property
        else if (
          typeof option === "object" &&
          option !== null &&
          typeof option.label === "string"
        ) {
          return option.label
            .toLowerCase()
            .includes(inputValueCompany.toLowerCase());
        }
        // If none of the above, log the unexpected option and return false
        console.log("Unexpected option structure:", option);
        return false;
      });
      setFilteredCompanyData(filtered);
    }
  };
  const companyHandleAddNewOption = async () => {
    if (
      inputValueCompany &&
      !companyData.some(
        (option) => option.toLowerCase() === inputValueCompany.toLowerCase(),
      )
    ) {
      try {
        const response = await axios.post(
          process.env.REACT_API_BASE_URL + "/partnercompany",
          {
            協力会社: inputValueCompany,
          },
        );
        const newOption = { value: inputValueCompany };
        setCompanyData((prevOptions) => [...prevOptions, newOption]);
        setSelectedValueCompany(newOption);
        message.success("New option added successfully");
      } catch (error) {
        console.error("Error adding new option:", error);
        message.error("Failed to add new option");
      }
    }
  };
  const companyHandleChange = (newValue) => {
    setSelectedValueCompany(newValue);
  };
  const companyHandleSearch = (newInputValue) => {
    setInputValueCompany(newInputValue);
  };

  useEffect(() => {
    companyFilterOptions();
  }, [inputValueCompany, companyData]);
  return (
    <div>
      <Form.Item label={"会社名"} required>
        <Select
          showSearch
          value={selectedValueSubCompany4}
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          onSearch={companyHandleSearch}
          onChange={companyHandleChange}
          notFoundContent={loading ? "Loading..." : "No match found"}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              companyHandleAddNewOption();
            }
          }}
          allowClear>
          {filteredCompanyData.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item
          label={"料金"}
          style={{ width: 100 }}
          className="grow"
          required>
          <Input
            value={subBasicPay4}
            onChange={(e) => {
              setSubBasicPay(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={subBasicPayTax4}
          defaultValue={true}
          onChange={(e) => {
            setSubBasicPayTax(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
        <Radio.Group defaultValue={true} value={driver4}>
          <div className="flex flex-col">
            <Radio value={true}>自車</Radio>
            <Radio value={false}>庸車</Radio>
          </div>
        </Radio.Group>
      </div>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item label={"車番1"} className="grow">
          <Input
            onChange={(e) => {
              if (driver4 === false) {
                setTruckNumber1(e.target.value);
                setSelfTruckNumber1(null);
              } else {
                setSelfTruckNumber1(e.target.value);
                setTruckNumber1(null);
              }
            }}
          />
        </Form.Item>
        <Form.Item label={"車番2"} className="grow">
          <Input
            onChange={(e) => {
              if (driver4 === false) {
                setTruckNumber2(e.target.value);
                setSelfTruckNumber2(null);
              } else {
                setSelfTruckNumber2(e.target.value);
                setTruckNumber2(null);
              }
            }}
          />
        </Form.Item>
        <Form.Item label={"乗務員"} className="grow">
          <Input
            onChange={(e) => {
              if (driver4 === false) {
                setDriverName(e.target.value);
                setSelfDriverName(null);
              } else {
                setSelfDriverName(e.target.value);
                setDriverName(e.target.value);
              }
            }}
          />
        </Form.Item>
      </div>
      <Form.Item label={"高速道路料金"} className=" grow">
        <Input
          value={subExpressBasicFee4}
          onChange={(e) => {
            setSubExpressBasicFee(e.target.value);
          }}
        />
      </Form.Item>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item label={"スケール費"} className="grow w-32">
          <Input
            required
            value={subScaleFee4}
            className="w-full"
            onChange={(e) => {
              setSubScaleFee(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={subScaleFeeTax4}
          onChange={(e) => {
            setSubScaleFeeTax(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
        <Form.Item label={"シャーシ留置費"} className="grow w-32">
          <Input
            required
            value={subChassisFee4}
            className="w-full"
            onChange={(e) => {
              setSubChassisFee(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={subChassisFeeTax4}
          onChange={(e) => {
            setSubChassisFeeTax(e.target.value);
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
            value={subOtherFee4}
            className="w-full"
            onChange={(e) => {
              setSubOtherFee(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={subOtherFeeTax4}
          onChange={(e) => {
            setSubOtherFeeTax(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
      </div>
    </div>
  );
};
const SubcontractPayment5 = ({ setSubPayData5, editData }) => {
  const [companyData, setCompanyData] = useState([]);
  const [filteredCompanyData, setFilteredCompanyData] = useState([]);
  const [selectedValueSubCompany5, setSelectedValueCompany] = useState("");
  const [inputValueCompany, setInputValueCompany] = useState("");
  const [loading, setLoading] = useState(false);

  const [subBasicPay5, setSubBasicPay] = useState(null);
  const [subBasicPayTax5, setSubBasicPayTax] = useState(true);
  const [driver5, setDriver] = useState(true);
  const [truckNumber15, setTruckNumber1] = useState(null);
  const [truckNumber25, setTruckNumber2] = useState(null);
  const [driverName5, setDriverName] = useState(null);
  const [selfTruckNumber15, setSelfTruckNumber1] = useState(null);
  const [selfTruckNumber25, setSelfTruckNumber2] = useState(null);
  const [selfDriverName5, setSelfDriverName] = useState(null);
  const [subExpressBasicFee5, setSubExpressBasicFee] = useState(null);
  const [subScaleFee5, setSubScaleFee] = useState(null);
  const [subScaleFeeTax5, setSubScaleFeeTax] = useState(true);
  const [subChassisFee5, setSubChassisFee] = useState(null);
  const [subChassisFeeTax5, setSubChassisFeeTax] = useState(true);
  const [subOtherFee5, setSubOtherFee] = useState(null);
  const [subOtherFeeTax5, setSubOtherFeeTax] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companies = await axios.get(
          process.env.REACT_API_BASE_URL + `/partnercompany`,
        );

        const partnercompnay = companies.data
          .sort((a, b) => b.カウント - a.カウント)
          .map((item) => item.協力会社);
        setCompanyData(partnercompnay);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (editData) {
      setSelectedValueCompany(editData.下払会社名5);
      setSubBasicPay(editData.下払料金5);
      setSubBasicPayTax(editData.下払課税5);
      setSelfDriverName(editData.自社乗務員5);
      setSelfTruckNumber1(editData.自社車番F5);
      setSelfTruckNumber2(editData.自社車番S5);
      setTruckNumber1(editData.下払自車F5);
      setTruckNumber2(editData.下払自車S5);
      setSubExpressBasicFee(editData.下払高速費5);
      setSubScaleFee(editData.下払スケール費5);
      setSubScaleFeeTax(editData.下払スケール費課税5);
      setSubChassisFee(editData.下払シャーシ留置費5);
      setSubChassisFeeTax(editData.下払シャーシ留置費課税5);
      setSubOtherFee(editData.下払その他費用5);
      setSubOtherFeeTax(editData.下払その他課税5);
    }
  }, [editData]);
  useEffect(() => {
    setSubPayData5([
      selectedValueSubCompany5,
      subBasicPay5,
      subBasicPayTax5,
      driver5,
      truckNumber15,
      truckNumber25,
      driverName5,
      selfTruckNumber15,
      selfTruckNumber25,
      selfDriverName5,
      subExpressBasicFee5,
      subScaleFee5,
      subScaleFeeTax5,
      subChassisFee5,
      subChassisFeeTax5,
      subOtherFee5,
      subOtherFeeTax5,
    ]);
  }, [
    selectedValueSubCompany5,
    subBasicPay5,
    subBasicPayTax5,
    driver5,
    truckNumber15,
    truckNumber25,
    driverName5,
    selfTruckNumber15,
    selfTruckNumber25,
    selfDriverName5,
    subExpressBasicFee5,
    subScaleFee5,
    subScaleFeeTax5,
    subChassisFee5,
    subChassisFeeTax5,
    subOtherFee5,
    subOtherFeeTax5,
  ]);
  //Partner comapany datas
  const companyFilterOptions = () => {
    if (!inputValueCompany.trim()) {
      setFilteredCompanyData(companyData);
    } else {
      const filtered = companyData.filter((option) => {
        // Check if option is a string
        if (typeof option === "string") {
          return option.toLowerCase().includes(inputValueCompany.toLowerCase());
        }
        // Check if option is an object with a 'value' property
        else if (
          typeof option === "object" &&
          option !== null &&
          typeof option.value === "string"
        ) {
          return option.value
            .toLowerCase()
            .includes(inputValueCompany.toLowerCase());
        }
        // Check if option is an object with a 'label' property
        else if (
          typeof option === "object" &&
          option !== null &&
          typeof option.label === "string"
        ) {
          return option.label
            .toLowerCase()
            .includes(inputValueCompany.toLowerCase());
        }
        // If none of the above, log the unexpected option and return false
        console.log("Unexpected option structure:", option);
        return false;
      });
      setFilteredCompanyData(filtered);
    }
  };
  const companyHandleAddNewOption = async () => {
    if (
      inputValueCompany &&
      !companyData.some(
        (option) => option.toLowerCase() === inputValueCompany.toLowerCase(),
      )
    ) {
      try {
        const response = await axios.post(
          process.env.REACT_API_BASE_URL + "/partnercompany",
          {
            協力会社: inputValueCompany,
          },
        );
        const newOption = { value: inputValueCompany };
        setCompanyData((prevOptions) => [...prevOptions, newOption]);
        setSelectedValueCompany(newOption);
        message.success("New option added successfully");
      } catch (error) {
        console.error("Error adding new option:", error);
        message.error("Failed to add new option");
      }
    }
  };
  const companyHandleChange = (newValue) => {
    setSelectedValueCompany(newValue);
  };
  const companyHandleSearch = (newInputValue) => {
    setInputValueCompany(newInputValue);
  };

  useEffect(() => {
    companyFilterOptions();
  }, [inputValueCompany, companyData]);
  return (
    <div>
      <Form.Item label={"会社名"} required>
        <Select
          showSearch
          value={selectedValueSubCompany5}
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          onSearch={companyHandleSearch}
          onChange={companyHandleChange}
          notFoundContent={loading ? "Loading..." : "No match found"}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              companyHandleAddNewOption();
            }
          }}
          allowClear>
          {filteredCompanyData.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item
          label={"料金"}
          style={{ width: 100 }}
          className="grow"
          required>
          <Input
            value={subBasicPay5}
            onChange={(e) => {
              setSubBasicPay(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={subBasicPayTax5}
          defaultValue={true}
          onChange={(e) => {
            setSubBasicPayTax(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
        <Radio.Group defaultValue={true} value={driver5}>
          <div className="flex flex-col">
            <Radio value={true}>自車</Radio>
            <Radio value={false}>庸車</Radio>
          </div>
        </Radio.Group>
      </div>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item label={"車番1"} className="grow">
          <Input
            onChange={(e) => {
              if (driver5 === false) {
                setTruckNumber1(e.target.value);
                setSelfTruckNumber1(null);
              } else {
                setSelfTruckNumber1(e.target.value);
                setTruckNumber1(null);
              }
            }}
          />
        </Form.Item>
        <Form.Item label={"車番2"} className="grow">
          <Input
            onChange={(e) => {
              if (driver5 === false) {
                setTruckNumber2(e.target.value);
                setSelfTruckNumber2(null);
              } else {
                setSelfTruckNumber2(e.target.value);
                setTruckNumber2(null);
              }
            }}
          />
        </Form.Item>
        <Form.Item label={"乗務員"} className="grow">
          <Input
            onChange={(e) => {
              if (driver5 === false) {
                setDriverName(e.target.value);
                setSelfDriverName(null);
              } else {
                setSelfDriverName(e.target.value);
                setDriverName(e.target.value);
              }
            }}
          />
        </Form.Item>
      </div>
      <Form.Item label={"高速道路料金"} className=" grow">
        <Input
          value={subExpressBasicFee5}
          onChange={(e) => {
            setSubExpressBasicFee(e.target.value);
          }}
        />
      </Form.Item>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item label={"スケール費"} className="grow w-32">
          <Input
            required
            value={subScaleFee5}
            className="w-full"
            onChange={(e) => {
              setSubScaleFee(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={subScaleFeeTax5}
          onChange={(e) => {
            setSubScaleFeeTax(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
        <Form.Item label={"シャーシ留置費"} className="grow w-32">
          <Input
            required
            value={subChassisFee5}
            className="w-full"
            onChange={(e) => {
              setSubChassisFee(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={subChassisFeeTax5}
          onChange={(e) => {
            setSubChassisFeeTax(e.target.value);
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
            value={subOtherFee5}
            className="w-full"
            onChange={(e) => {
              setSubOtherFee(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={subOtherFeeTax5}
          onChange={(e) => {
            setSubOtherFeeTax(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
      </div>
    </div>
  );
};
const SubcontractPayment6 = ({ setSubPayData6, editData }) => {
  const [companyData, setCompanyData] = useState([]);
  const [filteredCompanyData, setFilteredCompanyData] = useState([]);
  const [selectedValueSubCompany6, setSelectedValueCompany] = useState("");
  const [inputValueCompany, setInputValueCompany] = useState("");
  const [loading, setLoading] = useState(false);

  const [subBasicPay6, setSubBasicPay] = useState(null);
  const [subBasicPayTax6, setSubBasicPayTax] = useState(true);
  const [driver6, setDriver] = useState(true);
  const [truckNumber16, setTruckNumber1] = useState(null);
  const [truckNumber26, setTruckNumber2] = useState(null);
  const [driverName6, setDriverName] = useState(null);
  const [selfTruckNumber16, setSelfTruckNumber1] = useState(null);
  const [selfTruckNumber26, setSelfTruckNumber2] = useState(null);
  const [selfDriverName6, setSelfDriverName] = useState(null);
  const [subExpressBasicFee6, setSubExpressBasicFee] = useState(null);
  const [subScaleFee6, setSubScaleFee] = useState(null);
  const [subScaleFeeTax6, setSubScaleFeeTax] = useState(true);
  const [subChassisFee6, setSubChassisFee] = useState(null);
  const [subChassisFeeTax6, setSubChassisFeeTax] = useState(true);
  const [subOtherFee6, setSubOtherFee] = useState(null);
  const [subOtherFeeTax6, setSubOtherFeeTax] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companies = await axios.get(
          process.env.REACT_API_BASE_URL + `/partnercompany`,
        );

        const partnercompnay = companies.data
          .sort((a, b) => b.カウント - a.カウント)
          .map((item) => item.協力会社);
        setCompanyData(partnercompnay);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (editData) {
      setSelectedValueCompany(editData.下払会社名6);
      setSubBasicPay(editData.下払料金6);
      setSubBasicPayTax(editData.下払課税6);
      setSelfDriverName(editData.自社乗務員6);
      setSelfTruckNumber1(editData.自社車番F6);
      setSelfTruckNumber2(editData.自社車番S6);
      setTruckNumber1(editData.下払自車F6);
      setTruckNumber2(editData.下払自車S6);
      setSubExpressBasicFee(editData.下払高速費6);
      setSubScaleFee(editData.下払スケール費6);
      setSubScaleFeeTax(editData.下払スケール費課税6);
      setSubChassisFee(editData.下払シャーシ留置費6);
      setSubChassisFeeTax(editData.下払シャーシ留置費課税6);
      setSubOtherFee(editData.下払その他費用6);
      setSubOtherFeeTax(editData.下払その他課税6);
    }
  }, [editData]);
  useEffect(() => {
    setSubPayData6([
      selectedValueSubCompany6,
      subBasicPay6,
      subBasicPayTax6,
      driver6,
      truckNumber16,
      truckNumber26,
      driverName6,
      selfTruckNumber16,
      selfTruckNumber26,
      selfDriverName6,
      subExpressBasicFee6,
      subScaleFee6,
      subScaleFeeTax6,
      subChassisFee6,
      subChassisFeeTax6,
      subOtherFee6,
      subOtherFeeTax6,
    ]);
  }, [
    selectedValueSubCompany6,
    subBasicPay6,
    subBasicPayTax6,
    driver6,
    truckNumber16,
    truckNumber26,
    driverName6,
    selfTruckNumber16,
    selfTruckNumber26,
    selfDriverName6,
    subExpressBasicFee6,
    subScaleFee6,
    subScaleFeeTax6,
    subChassisFee6,
    subChassisFeeTax6,
    subOtherFee6,
    subOtherFeeTax6,
  ]);
  //Partner comapany datas
  const companyFilterOptions = () => {
    if (!inputValueCompany.trim()) {
      setFilteredCompanyData(companyData);
    } else {
      const filtered = companyData.filter((option) => {
        // Check if option is a string
        if (typeof option === "string") {
          return option.toLowerCase().includes(inputValueCompany.toLowerCase());
        }
        // Check if option is an object with a 'value' property
        else if (
          typeof option === "object" &&
          option !== null &&
          typeof option.value === "string"
        ) {
          return option.value
            .toLowerCase()
            .includes(inputValueCompany.toLowerCase());
        }
        // Check if option is an object with a 'label' property
        else if (
          typeof option === "object" &&
          option !== null &&
          typeof option.label === "string"
        ) {
          return option.label
            .toLowerCase()
            .includes(inputValueCompany.toLowerCase());
        }
        // If none of the above, log the unexpected option and return false
        console.log("Unexpected option structure:", option);
        return false;
      });
      setFilteredCompanyData(filtered);
    }
  };
  const companyHandleAddNewOption = async () => {
    if (
      inputValueCompany &&
      !companyData.some(
        (option) => option.toLowerCase() === inputValueCompany.toLowerCase(),
      )
    ) {
      try {
        const response = await axios.post(
          process.env.REACT_API_BASE_URL + "/partnercompany",
          {
            協力会社: inputValueCompany,
          },
        );
        const newOption = { value: inputValueCompany };
        setCompanyData((prevOptions) => [...prevOptions, newOption]);
        setSelectedValueCompany(newOption);
        message.success("New option added successfully");
      } catch (error) {
        console.error("Error adding new option:", error);
        message.error("Failed to add new option");
      }
    }
  };
  const companyHandleChange = (newValue) => {
    setSelectedValueCompany(newValue);
  };
  const companyHandleSearch = (newInputValue) => {
    setInputValueCompany(newInputValue);
  };

  useEffect(() => {
    companyFilterOptions();
  }, [inputValueCompany, companyData]);
  return (
    <div>
      <Form.Item label={"会社名"} required>
        <Select
          showSearch
          value={selectedValueSubCompany6}
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          onSearch={companyHandleSearch}
          onChange={companyHandleChange}
          notFoundContent={loading ? "Loading..." : "No match found"}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              companyHandleAddNewOption();
            }
          }}
          allowClear>
          {filteredCompanyData.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item
          label={"料金"}
          style={{ width: 100 }}
          className="grow"
          required>
          <Input
            value={subBasicPay6}
            onChange={(e) => {
              setSubBasicPay(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={subBasicPayTax6}
          defaultValue={true}
          onChange={(e) => {
            setSubBasicPayTax(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
        <Radio.Group defaultValue={true} value={driver6}>
          <div className="flex flex-col">
            <Radio value={true}>自車</Radio>
            <Radio value={false}>庸車</Radio>
          </div>
        </Radio.Group>
      </div>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item label={"車番1"} className="grow">
          <Input
            onChange={(e) => {
              if (driver6 === false) {
                setTruckNumber1(e.target.value);
                setSelfTruckNumber1(null);
              } else {
                setSelfTruckNumber1(e.target.value);
                setTruckNumber1(null);
              }
            }}
          />
        </Form.Item>
        <Form.Item label={"車番2"} className="grow">
          <Input
            onChange={(e) => {
              if (driver6 === false) {
                setTruckNumber2(e.target.value);
                setSelfTruckNumber2(null);
              } else {
                setSelfTruckNumber2(e.target.value);
                setTruckNumber2(null);
              }
            }}
          />
        </Form.Item>
        <Form.Item label={"乗務員"} className="grow">
          <Input
            onChange={(e) => {
              if (driver6 === false) {
                setDriverName(e.target.value);
                setSelfDriverName(null);
              } else {
                setSelfDriverName(e.target.value);
                setDriverName(e.target.value);
              }
            }}
          />
        </Form.Item>
      </div>
      <Form.Item label={"高速道路料金"} className=" grow">
        <Input
          value={subExpressBasicFee6}
          onChange={(e) => {
            setSubExpressBasicFee(e.target.value);
          }}
        />
      </Form.Item>
      <div className="flex flex-wrap flex-row items-center gap-x-4">
        <Form.Item label={"スケール費"} className="grow w-32">
          <Input
            required
            value={subScaleFee6}
            className="w-full"
            onChange={(e) => {
              setSubScaleFee(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={subScaleFeeTax6}
          onChange={(e) => {
            setSubScaleFeeTax(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
        <Form.Item label={"シャーシ留置費"} className="grow w-32">
          <Input
            required
            value={subChassisFee6}
            className="w-full"
            onChange={(e) => {
              setSubChassisFee(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={subChassisFeeTax6}
          onChange={(e) => {
            setSubChassisFeeTax(e.target.value);
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
            value={subOtherFee6}
            className="w-full"
            onChange={(e) => {
              setSubOtherFee(e.target.value);
            }}
          />
        </Form.Item>
        <Radio.Group
          value={subOtherFeeTax6}
          onChange={(e) => {
            setSubOtherFeeTax(e.target.value);
          }}>
          <div className="flex flex-col">
            <Radio value={true}>課税</Radio>
            <Radio value={false}>非課税</Radio>
          </div>
        </Radio.Group>
      </div>
    </div>
  );
};

const SubcontractPayment = (
  {
    setSubPayData1,
    setSubPayData2,
    setSubPayData3,
    setSubPayData4,
    setSubPayData5,
    setSubPayData6,
    editData,
  },
  { className = "" },
) => {
  const tabNames = ["配車1", "配車2", "配車3", "配車4", "配車5", "配車6"];
  const dialogComponent = [
    <SubcontractPayment1 setSubPayData1={setSubPayData1} editData={editData} />,
    <SubcontractPayment2 setSubPayData2={setSubPayData2} editData={editData} />,
    <SubcontractPayment3 setSubPayData3={setSubPayData3} editData={editData} />,
    <SubcontractPayment4 setSubPayData4={setSubPayData4} editData={editData} />,
    <SubcontractPayment5 setSubPayData5={setSubPayData5} editData={editData} />,
    <SubcontractPayment6 setSubPayData6={setSubPayData6} editData={editData} />,
  ];
  return (
    <div
      className={`${className} w-full overflow-x-auto  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']`}>
      <Group label={"下払"}>
        <Tabs
          type="card"
          id="下払"
          items={tabNames.map((item, index) => {
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

export default SubcontractPayment;
