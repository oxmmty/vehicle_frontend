// import React, { useEffect, useState } from "react";
// import { Badge, Button, Calendar } from "antd";
// import axios from "axios";

// const CalendarPage = () => {
//   const [events, setEvents] = useState([]);

//   // Fetch data from the backend
//   const fetchData = async () => {
//     try {
//       const response = await axios.get("/orderlist"); // Adjust the endpoint as necessary
//       const rawData = response.data;

//       const formattedEvents = rawData.flatMap((item) => {
//         const eventsList = [];
//         const hasDeliveryDates = [
//           item["配達日1"],
//           item["配達日2"],
//           item["配達日3"],
//         ].filter(Boolean).length;

//         // Check 配達日1
//         if (item["配達日1"]) {
//           const content =
//             hasDeliveryDates > 1
//               ? `${item["識別コード"]}-01`
//               : item["識別コード"];
//           addEvent(eventsList, item["配達日1"], content, item);
//         }

//         // Check 配達日2
//         if (item["配達日2"]) {
//           const content = `${item["識別コード"]}-02`;
//           addEvent(eventsList, item["配達日2"], content, item);
//         }

//         // Check 配達日3
//         if (item["配達日3"]) {
//           const content = `${item["識別コード"]}-03`;
//           addEvent(eventsList, item["配達日3"], content, item);
//         }

//         return eventsList;
//       });

//       setEvents(formattedEvents);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   // Function to add an event to the list, ensuring uniqueness
//   const addEvent = (eventsList, date, content, item) => {
//     const existingEvent = eventsList.find(
//       (event) => event.content === content && event.date === date,
//     );
//     if (!existingEvent) {
//       const type = item["送り状受領書作成"]
//         ? "error"
//         : item["ピックチェック"] && !item["配車組み"]
//         ? "warning"
//         : item["ピックチェック"] && item["配車組み"]
//         ? "success"
//         : null;

//       if (type) {
//         eventsList.push({ date, content, type });
//       }
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const getListData = (value) => {
//     return events
//       .filter(
//         (event) =>
//           new Date(event.date).toDateString() === value.toDate().toDateString(),
//       )
//       .map(({ type, content }) => ({ type, content }));
//   };

//   const monthCellRender = (value) => {
//     // Optional: implement month data rendering if needed
//   };

//   const dateCellRender = (value) => {
//     const listData = getListData(value);
//     return (
//       <ul className="events">
//         {listData.map((item) => (
//           <li key={item.content}>
//             <Badge status={item.type} text={item.content} />
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   const cellRender = (current, info) => {
//     if (info.type === "date") return dateCellRender(current);
//     if (info.type === "month") return monthCellRender(current);
//     return info.originNode;
//   };

//   return (
//     <div className="flex flex-col items-center gap-2 w-full max-h-[700px]">
//       {/* <div className="flex justify-evenly max-w-[500px] w-full">
//         <Button>カレンダー</Button>
//         <Button>カレンダー全件</Button>
//       </div> */}
//       <Calendar cellRender={cellRender} />
//     </div>
//   );
// };

// export default CalendarPage;

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { nanoid } from "nanoid";
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

  function handleClose() {
    setModal(false);
  }

  return (
    <div className="">
      <Container>
        <Row>
          <Col md={12}>
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
    </div>
  );
};

export default CalendarPage;
