// import React from "react";
// import { Badge, Button, Calendar } from "antd";
// const getListData = (value) => {
//   let listData = [];
//   switch (value.date()) {
//     case 8:
//       listData = [
//         {
//           type: "warning",
//           content: "MA240831-0001",
//         },
//         {
//           type: "success",
//           content: "This is usual event.",
//         },
//       ];
//       break;
//     case 10:
//       listData = [
//         {
//           type: "warning",
//           content: "This is warning event.",
//         },
//         {
//           type: "success",
//           content: "This is usual event.",
//         },
//         {
//           type: "error",
//           content: "This is error event.",
//         },
//       ];
//       break;
//     case 15:
//       listData = [
//         {
//           type: "warning",
//           content: "This is warning event",
//         },
//         {
//           type: "success",
//           content: "This is very long usual event......",
//         },
//         {
//           type: "error",
//           content: "This is error event 1.",
//         },
//         {
//           type: "error",
//           content: "This is error event 2.",
//         },
//         {
//           type: "error",
//           content: "This is error event 3.",
//         },
//         {
//           type: "error",
//           content: "This is error event 4.",
//         },
//       ];
//       break;
//     default:
//   }
//   return listData || [];
// };
// const getMonthData = (value) => {
//   if (value.month() === 8) {
//     return 1394;
//   }
// };
// const CalendarPage = () => {
//   const monthCellRender = (value) => {
//     const num = getMonthData(value);
//     return num ? (
//       <div className="notes-month">
//         <section>{num}</section>
//         <span>Backlog number</span>
//       </div>
//     ) : null;
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
//     <div className="flex flex-col items-center gap-2 w-full">
//       <div className="flex justify-evenly max-w-[500px] w-full">
//         <Button>カレンダー</Button>
//         <Button>カレンダー全件</Button>
//       </div>
//       <Calendar cellRender={cellRender} />
//     </div>
//   );
// };
// export default CalendarPage;

import React, { useEffect, useState } from "react";
import { Badge, Button, Calendar } from "antd";
import axios from "axios";

const CalendarPage = () => {
  const [events, setEvents] = useState([]);

  // Fetch data from the backend
  const fetchData = async () => {
    try {
      const response = await axios.get("/orderlist"); // Adjust the endpoint as necessary
      const rawData = response.data;

      const formattedEvents = rawData.flatMap((item) => {
        const eventsList = [];
        const hasDeliveryDates = [
          item["配達日1"],
          item["配達日2"],
          item["配達日3"],
        ].filter(Boolean).length;

        // Check 配達日1
        if (item["配達日1"]) {
          const content =
            hasDeliveryDates > 1
              ? `${item["識別コード"]}-01`
              : item["識別コード"];
          addEvent(eventsList, item["配達日1"], content, item);
        }

        // Check 配達日2
        if (item["配達日2"]) {
          const content = `${item["識別コード"]}-02`;
          addEvent(eventsList, item["配達日2"], content, item);
        }

        // Check 配達日3
        if (item["配達日3"]) {
          const content = `${item["識別コード"]}-03`;
          addEvent(eventsList, item["配達日3"], content, item);
        }

        return eventsList;
      });

      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to add an event to the list, ensuring uniqueness
  const addEvent = (eventsList, date, content, item) => {
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

      if (type) {
        eventsList.push({ date, content, type });
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getListData = (value) => {
    return events
      .filter(
        (event) =>
          new Date(event.date).toDateString() === value.toDate().toDateString(),
      )
      .map(({ type, content }) => ({ type, content }));
  };

  const monthCellRender = (value) => {
    // Optional: implement month data rendering if needed
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <div className="flex justify-evenly max-w-[500px] w-full">
        <Button>カレンダー</Button>
        <Button>カレンダー全件</Button>
      </div>
      <Calendar cellRender={cellRender} />
    </div>
  );
};

export default CalendarPage;
