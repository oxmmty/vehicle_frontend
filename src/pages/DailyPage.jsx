import React from 'react';

const DailyPage = () => {
  const formData = [
    { label: '配送コード', value: 'MA240618-0001' },
    { label: '区分', value: '受入れ取り' },
    { label: '依頼日', value: '2024/6/19' },
    { label: '搬出場所', value: '青海-A4' },
    { label: '積数', value: '' },
    { label: 'コンテナNo.', value: 'C12345' },
    { label: 'コンテナタイプ', value: '' },
    { label: 'コンテナサイズ', value: '40' },
    { label: 'コンテナ本数', value: '' },
    { label: '危険品', value: 'いいえ' },
    { label: '配送先の', value: '株式会社アルプス物流' },
    { label: '配送日', value: '2024/1/3' },
    { label: '納期日', value: '2024/1/2' },
    { label: '配送時間', value: '1:00' },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl font-bold mb-4">仮依頼書</h1>
      <div className="grid grid-cols-4 gap-4 border p-4">
        {formData.map((field, index) => (
          <React.Fragment key={index}>
            <div className="font-bold bg-gray-200 p-2 border">{field.label}</div>
            <div className="p-2 border">{field.value}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default DailyPage;
