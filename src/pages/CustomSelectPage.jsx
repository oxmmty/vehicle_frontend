import React, { useState, useEffect } from "react";
import { Select, message } from "antd";
import axios from "axios";

const { Option } = Select;

const CustomSelect = () => {
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [allOptions, setAllOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllOptions();
  }, []);

  useEffect(() => {
    filterOptions();
  }, [inputValue, allOptions]);

  const fetchAllOptions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        process.env.REACT_API_BASE_URL + `/customer`,
      );
      const customers = response.data
        .sort((a, b) => b.カウント - a.カウント)
        .map((item) => ({ value: item.顧客名称, label: item.顧客名称 }));
      setAllOptions(customers);
      setFilteredOptions(customers);
    } catch (error) {
      console.error("Error fetching options:", error);
      message.error("Failed to fetch options");
    } finally {
      setLoading(false);
    }
  };

  const filterOptions = () => {
    if (!inputValue.trim()) {
      setFilteredOptions(allOptions);
    } else {
      const filtered = allOptions.filter((option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase()),
      );
      setFilteredOptions(filtered);
    }
  };
  const handleAddNewOption = async () => {
    if (
      inputValue &&
      !allOptions.some(
        (option) => option.label.toLowerCase() === inputValue.toLowerCase(),
      )
    ) {
      try {
        const response = await axios.post(
          process.env.REACT_API_BASE_URL + "/customer",
          {
            顧客名称: inputValue,
          },
        );
        const newOption = { value: inputValue, label: inputValue };
        setAllOptions((prevOptions) => [...prevOptions, newOption]);
        setValue(newOption.value);
        message.success("New option added successfully");
      } catch (error) {
        console.error("Error adding new option:", error);
        message.error("Failed to add new option");
      }
    }
  };
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const handleSearch = (newInputValue) => {
    setInputValue(newInputValue);
  };

  return (
    <Select
      showSearch
      value={value}
      style={{ width: 200 }}
      placeholder="Select or input a value"
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={loading ? "Loading..." : "No match found"}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleAddNewOption();
        }
      }}
      allowClear>
      <Option value="">Select a customer</Option>
      {filteredOptions.map((option) => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
};

export default CustomSelect;
