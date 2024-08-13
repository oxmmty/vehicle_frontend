import { useState } from 'react'

const InvoicingPage = () => {
  const [count, setCount] = useState(0);
  const [droppedImageSrc, setDroppedImageSrc] = useState(null);

  const handleImageDrop = (src) => {
    setDroppedImageSrc(src);
  };

  return (
    <div>
      InvoicingPage
    </div>
  )
}

export default InvoicingPage
