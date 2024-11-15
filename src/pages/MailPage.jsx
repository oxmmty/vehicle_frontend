import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import CTable from "src/components/CTable";
import { Modal, Input, DatePicker, Select, Button } from "antd";
const { TextArea } = Input;
const { Option } = Select;

const MailPage = () => {
  const [data, setData] = useState([]);
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("輸送依頼書の送信");
  const [body, setBody] = useState(
    "いつもお世話になっております。輸送リストと輸送依頼書をお送りいたします。\nよろしくお願いいたします。",
  );
  const [filterDate, setFilterDate] = useState(null);
  const [filterCompany, setFilterCompany] = useState("");
  const [selectedRowKey, setSelectedRowKey] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/pdfList");
        const responseData = response.data.filter((item) => item.選択 === true);
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const fetchRecipientEmail = async (companyName) => {
    try {
      const response = await axios.get("/partnerCompany/filter", {
        params: {
          companyName,
        },
      });
      setRecipient(response.data.アドレス); // Adjust based on your actual API response structure
    } catch (error) {
      console.error("Error fetching recipient email:", error);
    }
  };

  const filteredData = data.filter((item) => {
    const matchesDate = filterDate
      ? dayjs(item.updatedAt).format("YYYY-MM-DD") ===
        filterDate.format("YYYY-MM-DD")
      : true;
    const matchesCompany = filterCompany
      ? item.下払会社名.includes(filterCompany)
      : true;
    return matchesDate && matchesCompany;
  });

  const handleSendEmail = async () => {
    if (!recipient) {
      alert("Please enter the recipient's email address.");
      return;
    }

    if (selectedRowKey === null) {
      alert("Please select a row before sending an email.");
      return;
    }

    const selectedRow = filteredData.find(
      (item) => item.リクエスト番号 === selectedRowKey,
    );

    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);

    const mailtoLink = `mailto:${recipient}?subject=${encodedSubject}&body=${encodedBody}`;

    window.location.href = mailtoLink;

    const updatedDeliveryDate = dayjs().format("YYYY-MM-DD HH:mm:ss"); // Set the current date and time

    try {
      await axios.put(`/order/update`, {
        selectedRowKey: selectedRowKey,
        mail作成日: updatedDeliveryDate,
      });

      setData((prevData) =>
        prevData.map((item) =>
          item.リクエスト番号 === selectedRow.リクエスト番号
            ? { ...item, 配信日: updatedDeliveryDate }
            : item,
        ),
      );

      console.log("Delivery date updated successfully.");
    } catch (error) {
      console.error("Error updating delivery date:", error);
    }
    setIsModalOpen(false);
  };

  const handleRowSelect = (record) => {
    setSelectedRowKey(record.リクエスト番号);
    fetchRecipientEmail(record.下払会社名); // Fetch the email when a row is selected
  };

  const columns = [
    {
      title: "選択",
      align: "center",
      render: (_, record) => (
        <input
          type="radio"
          checked={selectedRowKey === record.リクエスト番号}
          onChange={() => {
            handleRowSelect(record);
            showModal();
          }} // Update selection handling
        />
      ),
    },
    {
      title: "ファイル名",
      dataIndex: "fileName",
      key: "fileName",
      align: "center",
      render: (text, record) => {
        return `${record.下払会社名} ${dayjs(record.配達日1).format(
          "YYMMDD",
        )} ${dayjs(record.配達時間1).format("HHmm")} ${record.配達先} ${
          record.受注コード
        }.pdf`;
      },
    },
    {
      title: "協力会社",
      dataIndex: "下払会社名",
      align: "center",
      key: "下払会社名",
    },
    {
      title: "配達先",
      dataIndex: "配達先",
      key: "配達先",
      align: "center",
    },
    {
      title: "配達日",
      dataIndex: "updatedAt",
      key: "updatedAt",
      align: "center",
      render: (text) => {
        return dayjs(text).format("YYYY-MM-DD");
      },
    },
    {
      title: "配信日",
      dataIndex: "配信日",
      key: "配信日",
      align: "center",
      render: (text) => {
        return dayjs(text).format("YYYY-MM-DD");
      },
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="filter-controls">
        <DatePicker
          onChange={(date) => setFilterDate(date)}
          placeholder="Filter by Date"
          style={{ marginRight: 10 }}
          allowClear
        />
        <Select
          placeholder="Filter by Company"
          allowClear
          onChange={(value) => setFilterCompany(value)}
          style={{ width: 200, marginRight: 10 }}>
          {data
            .map((item) => item.下払会社名)
            .filter((value, index, self) => self.indexOf(value) === index)
            .map((company) => (
              <Option key={company} value={company}>
                {company}
              </Option>
            ))}
        </Select>
        <Button onClick={() => setFilterDate(null) || setFilterCompany("")}>
          Clear Filters
        </Button>
      </div>

      <CTable
        columns={columns}
        dataSource={filteredData}
        pagination={false}
        bordered
        ps={10}
        scroll={{ x: "max-content" }}
      />
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
          <div>
            <label htmlFor="recipient">Recipient Email:</label>
            <Input
              type="email"
              id="recipient"
              placeholder="recipient@example.com"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />
          </div>

          <div>
            <label htmlFor="subject">Subject:</label>
            <Input
              type="text"
              id="subject"
              placeholder="Email Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />
          </div>

          <div>
            <label htmlFor="body">Email Body:</label>
            <TextArea
              id="body"
              placeholder="Write your message here..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                height: "100px",
              }}
            />
          </div>

          <Button onClick={handleSendEmail}>Send Email</Button>
        </div>
      </Modal>
    </div>
  );
};

export default MailPage;
