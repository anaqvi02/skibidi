import React from 'react'
import './AnimatedGradient1.css'

interface AnimatedGradientProps {
  children?: React.ReactNode
}

const AnimatedGradient: React.FC<AnimatedGradientProps> = ({ children }) => {
  return (
    <div className="animated-gradient">
      {children}
    </div>
  )
}

export default AnimatedGradient

