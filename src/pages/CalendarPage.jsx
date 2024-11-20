import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Group from "../components/Group";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Button, Modal, FloatButton } from "antd";
import { AreaChartOutlined } from "@ant-design/icons";
import { nanoid } from "nanoid";
import NewOrderFormPage from "./NewOrderFormPage";
import { useNavigate } from "react-router-dom";
import { Row, Col, Container } from "reactstrap";
import CustomModal from "../components/CustomModal";
import "./custom.css";
import jaLocale from "@fullcalendar/core/locales/ja";
const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [modal, setModal] = useState(false);
  const calendarRef = useRef(null);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(new Date());
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [eventPickupLocation, setEventPickupLocation] = useState("");
  const [eventDeliveryLocation, setEventDeliveryLocation] = useState("");
  const [orderModal, setOrderModal] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get("/orderlist");
      const rawData = response.data.filter(
        (item) =>
          !item.hasOwnProperty("支払い確認") || item.支払い確認 !== true,
      );
      const formattedEvents = rawData.flatMap((item) => {
        const eventsList = [];
        const hasDeliveryDates = [
          item["配達日1"],
          item["配達日2"],
          item["配達日3"],
        ].filter(Boolean).length;

        if (item["配達日1"]) {
          const content =
            hasDeliveryDates > 1
              ? `${item["識別コード"]}-01`
              : item["識別コード"];
          addEvent(
            eventsList,
            item["配達日1"],
            item["配達時間1"],
            content,
            item,
            item["取場所"],
            item["配達先1"],
          );
        }
        if (item["配達日2"]) {
          const content = `${item["識別コード"]}-02`;
          addEvent(
            eventsList,
            item["配達日2"],
            item["配達時間2"],
            content,
            item,
            item["取場所"],
            item["配達先2"],
          );
        }
        if (item["配達日3"]) {
          const content = `${item["識別コード"]}-03`;
          addEvent(
            eventsList,
            item["配達日3"],
            item["配達時間3"],
            content,
            item,
            item["取場所"],
            item["配達先3"],
          );
        }
        return eventsList;
      });

      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const addEvent = (
    eventsList,
    date,
    time,
    content,
    item,
    pickupLocation,
    deliveryLocation,
  ) => {
    const existingEvent = eventsList.find(
      (event) => event.content === content && event.date === date,
    );

    if (!existingEvent) {
      const type = item["送り状受領書作成"]
        ? "error"
        : item["ピックチェック"] == true && item["配車組み"] !== true
        ? "warning"
        : item["ピックチェック"] == true && item["配車組み"] == true
        ? "success"
        : null;

      let backgroundColor;
      let borderColor;
      let textColor = "#ffffff";

      if (type === "success") {
        backgroundColor = "#f44336";
        borderColor = "#f44336";
      } else if (type === "warning") {
        backgroundColor = "#ff9800";
        borderColor = "#ff9800";
      } else if (type === "error") {
        backgroundColor = "#4caf50";
        borderColor = "#4caf50";
      }

      if (type) {
        const formattedDate = date
          ? new Date(date).toISOString().slice(0, 10)
          : null;
        const formattedTime = time ? `T${time}` : "";
        setEventPickupLocation(pickupLocation);
        setEventDeliveryLocation(deliveryLocation);

        if (formattedDate) {
          eventsList.push({
            id: nanoid(),
            title: content,
            start: formattedDate + formattedTime,
            backgroundColor,
            borderColor,
            textColor,
            eventPickupLocation: pickupLocation,
            eventDeliveryLocation: deliveryLocation,
          });
        }
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const dashboard = () => {
    navigate("/dashboard");
  };
  const newCustomer = () => {
    navigate("/masterDatas/customer");
  };
  const newCompany = () => {
    navigate("/masterDatas/partnerCompany");
  };
  const newShipper = () => {
    navigate("/masterDatas/shipperList");
  };
  const newShip = () => {
    navigate("/masterDatas/shipCompany");
  };
  const newWorkstation = () => {
    navigate("/masterDatas/businessLocation");
  };
  const handleCloseModal = () => {
    handleClose();
    setModal(false);
  };

  function handleEventClick(clickInfo) {
    setTitle(clickInfo.event.title);
    setStart(clickInfo.event.start);
    setPickupLocation(clickInfo.event.pickupLocation);
    setDeliveryLocation(clickInfo.event.deliveryLocation);
    setModal(true);
  }

  const orderOpen = () => {
    setOrderModal(true);
  };
  const orderClose = () => {
    setOrderModal(false);
  };
  function handleClose() {
    setModal(false);
  }
  return (
    <div>
      <Container className="w-full">
        <Row>
          <Col md={12} className="flex justify-between">
            <div className="md:w-[10%] hidden md:block w-0">
              <div className="pl-auto pr-auto pt-10 w-fit flex flex-col gap-10">
                <Button onClick={orderOpen} className="w-2/3">
                  受注入力
                </Button>
                <div className="w-2/3">
                  <Group label={"新規登録"}>
                    <Button onClick={newCustomer} className="w-full my-2">
                      顧客
                    </Button>
                    <Button onClick={newCompany} className="w-full my-2">
                      協力会社
                    </Button>
                    <Button onClick={newShipper} className="w-full my-2">
                      荷主
                    </Button>
                    <Button onClick={newShip} className="w-full my-2">
                      船社
                    </Button>
                    <Button onClick={newWorkstation} className="w-full my-2">
                      作業地
                    </Button>
                  </Group>
                </div>
              </div>
            </div>
            <div className="md:w-[90%] w-full h-[calc(100vh-100px)]">
              <FullCalendar
                height="100%"
                expandRows={false}
                ref={calendarRef}
                plugins={[
                  dayGridPlugin,
                  timeGridPlugin,
                  interactionPlugin,
                  listPlugin,
                ]}
                initialView="dayGridMonth"
                headerToolbar={{
                  left: "prevYear,prev,today,next,nextYear",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                }}
                locale={jaLocale}
                weekends={true}
                events={events}
                selectable={true}
                eventClick={handleEventClick}
              />
            </div>
          </Col>
        </Row>
      </Container>

      <CustomModal
        title={title}
        start={start}
        isOpen={modal}
        toggle={handleCloseModal}
        onCancel={handleCloseModal}>
        <NewOrderFormPage title={title} start={start} />
      </CustomModal>
      <Modal
        open={orderModal}
        onCancel={orderClose}
        className="w-[80%]"
        footer={false}>
        <NewOrderFormPage />
      </Modal>
      <FloatButton
        shape="square"
        type="primary"
        className="mb-2 mr-2 animate-bounce"
        onClick={dashboard}
        icon={<AreaChartOutlined />}
      />
    </div>
  );
};

export default CalendarPage;
