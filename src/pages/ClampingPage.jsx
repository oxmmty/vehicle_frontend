import { useState } from 'react'

const ClampingPage = () => {
  const [count, setCount] = useState(0);
  const [droppedImageSrc, setDroppedImageSrc] = useState(null);

  const handleImageDrop = (src) => {
    setDroppedImageSrc(src);
  };

  return (
    <div>
      ClampingPage
    </div>
  )
}

export default ClampingPage
