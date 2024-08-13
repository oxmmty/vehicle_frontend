import { useState } from 'react'

const MaintainerPage = () => {
  const [count, setCount] = useState(0);
  const [droppedImageSrc, setDroppedImageSrc] = useState(null);

  const handleImageDrop = (src) => {
    setDroppedImageSrc(src);
  };

  return (
    <div>
      MaintainerPage
    </div>
  )
}

export default MaintainerPage
