import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button, Modal } from "antd";
import { nanoid } from "nanoid";
import NewOrderFormPage from "./NewOrderFormPage";
import { Row, Col, FormGroup, Label, Container } from "reactstrap";
import CustomModal from "../components/CustomModal";
import "./custom.css";

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

  const fetchData = async () => {
    try {
      const response = await axios.get("/orderlist");
      const rawData = response.data;
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
        : item["ピックチェック"] && !item["配車組み"]
        ? "warning"
        : item["ピックチェック"] && item["配車組み"]
        ? "success"
        : null;

      let backgroundColor;
      let borderColor;
      let textColor = "#ffffff";

      if (type === "error") {
        backgroundColor = "#f44336";
        borderColor = "#f44336";
      } else if (type === "warning") {
        backgroundColor = "#ff9800";
        borderColor = "#ff9800";
      } else if (type === "success") {
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
            <div className="w-[75%]">
              <FullCalendar
                height={800}
                expandRows={false}
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                  left: "prev,today,next",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                initialView="dayGridMonth"
                weekends={true}
                events={events}
                eventClick={handleEventClick}
              />
            </div>
            <div className="w-[25%]">
              <div className="pt-10 pl-10">
                <Button onClick={orderOpen}>aaa</Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <CustomModal
        title={title}
        isOpen={modal}
        toggle={handleCloseModal}
        onCancel={handleCloseModal}>
        <FormGroup>
          <div className="block">
            <strong>識別コード:</strong>
            <Label> {title}</Label>
          </div>
          <div className="block">
            <strong>作業日と時間:</strong>
            <Label> {start.toLocaleString()}</Label>
          </div>
          <div className="block">
            <strong>取場所:</strong>
            <Label> {eventPickupLocation}</Label>
          </div>
          <div className="block">
            <strong>配達先:</strong>
            <Label> {eventDeliveryLocation}</Label>
          </div>
        </FormGroup>
      </CustomModal>
      <Modal
        open={orderModal}
        onCancel={orderClose}
        className="w-[80%]"
        footer={false}>
        <NewOrderFormPage />
      </Modal>
    </div>
  );
};

export default CalendarPage;
