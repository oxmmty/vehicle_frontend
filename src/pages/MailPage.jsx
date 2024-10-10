// import React from 'react';
// import { Table } from 'antd';
// import Mail from 'src/components/Mail';

// const MailPage = () => {
//   const fileColumns = [
//     {
//       title: 'ファイル名',
//       dataIndex: 'fileName',
//       key: 'fileName',
//     },
//     {
//       title: '協力会社',
//       dataIndex: 'cooperationCompany',
//       key: 'cooperationCompany',
//     },
//     {
//       title: '配達先',
//       dataIndex: 'deliveryDestination',
//       key: 'deliveryDestination',
//     },
//     {
//       title: '配達日',
//       dataIndex: 'deliveryDate',
//       key: 'deliveryDate',
//     },
//     {
//       title: '配信日',
//       dataIndex: 'transmissionDate',
//       key: 'transmissionDate',
//     },
//   ];

//   const fileData = [
//     {
//       key: '1',
//       fileName: 'エムズ物流株式会社2401030100 株式会社アルプス物流 HA240419-0001.pdf',
//       cooperationCompany: 'エムズ物流株式会社',
//       deliveryDestination: '株式会社アルプス物流',
//       deliveryDate: '1/3',
//       transmissionDate: '4/25',
//     },
//   ];

//   const emailContent = {
//     start: 'いつもお世話になっております。<br /><br />輸送リストと輸送依頼書をお送りいたします。',
//     end: 'よろしくお願いいたします。',
//   };

//   return (
//     <div className="flex flex-col gap-2">
//       <Table
//         columns={fileColumns}
//         dataSource={fileData}
//         pagination={false}
//         bordered
//         scroll={{ x: 'max-content' }}
//       />
//       <Mail data={emailContent} className='w-full' />
//     </div>
//   );
// };

// export default MailPage;

// EmailForm.js

// import React, { useState } from "react";
// import emailjs from "emailjs-com";

const EmailForm = () => {
  // const [to, setTo] = useState("");
  // const [subject, setSubject] = useState("");
  // const [text, setText] = useState("");
  // const [message, setMessage] = useState("");

  // const sendEmail = (e) => {
  //   e.preventDefault();

  //   emailjs
  //     .send(
  //       "service_nxgvp9j", // Replace with your EmailJS service ID
  //       "template_eqpt0lr", // Replace with your EmailJS template ID
  //       { to, subject, text },
  //       "tEEiWQVbxe9mSqvix", // Replace with your EmailJS user ID
  //     )
  //     .then(
  //       (result) => {
  //         setMessage("Email sent successfully");
  //       },
  //       (error) => {
  //         setMessage("Error sending email: " + error.text);
  //       },
  //     );

  //   // Clear the form
  //   setTo("");
  //   setSubject("");
  //   setText("");
  // };

  return (
    <div>adsf</div>
    // <form onSubmit={sendEmail}>
    //   <input
    //     type="email"
    //     placeholder="Recipient Email"
    //     value={to}
    //     onChange={(e) => setTo(e.target.value)}
    //     required
    //   />
    //   <input
    //     type="text"
    //     placeholder="Subject"
    //     value={subject}
    //     onChange={(e) => setSubject(e.target.value)}
    //     required
    //   />
    //   <textarea
    //     placeholder="Email Body"
    //     value={text}
    //     onChange={(e) => setText(e.target.value)}
    //     required
    //   />
    //   <button type="submit">Send Email</button>
    //   {message && <p>{message}</p>}
    // </form>
  );
};

export default EmailForm;
