import { useState } from 'react'

const ContainerPage = () => {
  const [count, setCount] = useState(0);
  const [droppedImageSrc, setDroppedImageSrc] = useState(null);

  const handleImageDrop = (src) => {
    setDroppedImageSrc(src);
  };

  return (
    <div>
      ContainerPage
      <img src='./logo.png' />
    </div>
  )
}

export default ContainerPage
