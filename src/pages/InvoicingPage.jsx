import { Divider } from 'antd';
import { useState } from 'react'

const InvoicingPage = () => {
  const [count, setCount] = useState(0);
  const [droppedImageSrc, setDroppedImageSrc] = useState(null);

  const handleImageDrop = (src) => {
    setDroppedImageSrc(src);
  };

  return (
    <div className='flex flex-col justify-center w-full'>
      <h2 className='m-auto'>御請求書</h2>
      <Divider className='w-full m-2' />
      <div className="flex justify-around w-full">
        <div>
          <b>請求元情報</b>
          <p className='text-text-300 pt-1'>作成日: 2024/08/15</p>
        </div>
        <div>
          <b>㈱近鉄エクスプレス 輸入 御中</b>
          <p className='text-text-300 pt-1'>2024年1月締め</p>
        </div>
      </div>
      <h3 className='py-5'>請求先情報</h3>
      <div class="flex flex-wrap flex-row justify-between items-center gap-4 w-full">
        <p><b>顧客</b>: LogiTechnoService株式会社</p>
        <p><b>住所</b>: 東京都武蔵村山市神明2-51-15</p>
        <p><b>事業者登録番号</b>: T1012801022526</p>
        <p><b>銀行名</b>: 山梨中央銀行（銀行コード0142）</p>
        <p><b>支店名</b>: 立川支店（支店コード207）</p>
        <p><b>口座名</b>: 普通 704264 ロジテクノサービス（カ）</p>
    </div>
    </div>
  )
}

export default InvoicingPage
