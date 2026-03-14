import { motion } from 'framer-motion'
import React from 'react'
function Marquee({direction}) {

const headings = [ "Home automation systems are becoming a key component of modern smart homes","IoT-based smart lighting can reduce energy consumption significantly","Connected devices are transforming urban infrastructure and mobility","AI-enabled IoT systems help industries monitor and optimize operations in real time"]


  return (
    <div className='flex w-full overflow-hidden '>
      <motion.div initial={{x:direction==='right'?'-50%':'0'}} animate={{x:direction==='left'?'-50%':'0'}} transition={{ease:'linear',duration: 15, repeat:Infinity}} className='flex flex-shrink-0'>
          <div className='flex gap-10 pr-10'>
              {headings.map((heading, index) => <h1 key={index} className='text-2xl font-bold whitespace-nowrap'>{heading}</h1>)}
          </div>
          <div className='flex gap-10 pr-10'>
              {headings.map((heading, index) => <h1 key={'dup-'+index} className='text-2xl font-bold whitespace-nowrap'>{heading}</h1>)}
          </div>
      </motion.div>
    </div>
  )
}

export default Marquee