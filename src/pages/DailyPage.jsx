import { useState } from 'react'

const DailyPage = () => {
  const [count, setCount] = useState(0);
  const [droppedImageSrc, setDroppedImageSrc] = useState(null);

  const handleImageDrop = (src) => {
    setDroppedImageSrc(src);
  };

  return (
    <div>
      DailyPage
    </div>
  )
}

export default DailyPage
