import { motion } from 'framer-motion'
function Marquee({direction}) {

const headings = [ "Home automation systems are becoming a key component of modern smart homes","IoT-based smart lighting can reduce energy consumption significantly","Connected devices are transforming urban infrastructure and mobility","AI-enabled IoT systems help industries monitor and optimize operations in real time"]


  return (
    <div className='flex w-full overflow-hidden '>
      <motion.div initial={{x:direction==='right'?'0':'-100%'}} animate={{x:direction==='left'?'-100%':'0'}} transition={{ease:'linear',duration: 15, repeat:Infinity}} className='flex flex-shrink-0  gap-10'>
                {headings.map(heading => <h1 className='text-2xl font-bold'>{heading}</h1>)}
      </motion.div>

      
    </div>
  )
}

export default Marquee