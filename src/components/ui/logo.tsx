import React from 'react'
import Image from 'next/image'
import avitaCare from '../../../public/Avita Health.png'

const Logo = () => {
  return (
                <Image className="w-16 object-cover m-3" src={avitaCare} alt="Website Logo"/>
  )
}

export default Logo