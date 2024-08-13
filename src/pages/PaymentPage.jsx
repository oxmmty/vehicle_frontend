import { useState } from 'react'

const PaymentPage = () => {
  const [count, setCount] = useState(0);
  const [droppedImageSrc, setDroppedImageSrc] = useState(null);

  const handleImageDrop = (src) => {
    setDroppedImageSrc(src);
  };

  return (
    <div>
      PaymentPage
    </div>
  )
}

export default PaymentPage
