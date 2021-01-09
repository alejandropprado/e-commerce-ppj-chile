import React, { useRef, useEffect } from 'react'
import Lottie from 'lottie-react'
import marioLoading from '../svg/mario-loading.json'

const Loading = ({ width = 300, height = 300 }) => {
  const lottieRef = useRef()

  useEffect(() => {
    lottieRef.current?.setSpeed(0.6)
  }, [lottieRef])

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={marioLoading}
      style={{ width, height }}
    />
  )
}

export default Loading