import React, { Dispatch, SetStateAction, useState } from 'react'
import Link from 'next/link';

import { motion } from 'framer-motion'

const closeicon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 font-bold hover:animate-pulse">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>;

const arrowupicon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
</svg>;

const arrowdownicon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
</svg>;

const minusicon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
</svg>;



//Animation variants
const Links = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
}

const LinksContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.05,
    }
  },
}

const FeildContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
    }
  },
}

type MenuProps = {
  navbarItems: { title: string; content: string[]; }[];
  setMenuStatus: Dispatch<SetStateAction<boolean>>;
}

const Menu: React.FC<MenuProps> = ({ navbarItems, setMenuStatus }) => {

  const [selectedFeild, setSelectedFeild] = useState("");

  return (
    // Wrapper
    <motion.div
      key="wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex md:hidden justify-end fixed right-0 
      top-0 h-screen w-full bg-black/50 z-20" onClick={() => { setMenuStatus(false), setSelectedFeild("") }}>

      {/* main menu section */}
      <motion.div
        key="menu"
        initial={{ x: "50%" }}
        animate={{ x: "0%" }}
        exit={{ x: "50%" }}
        transition={{ type: "tween" }}
        className="relative bg-secondary rounded-2xl w-4/5 px-2 py-8 sm:w-3/5 sm:px-8 overflow-y-scroll" onClick={(e) => e.stopPropagation()}>

        <div className=' flex flex-col space-y-8'>

          <motion.span onClick={() => { setMenuStatus(false), setSelectedFeild("") }} className='cursor-pointer flex justify-end w-full text-white '>{closeicon}</motion.span>

          <motion.div
            variants={FeildContainer}
            initial="hidden"
            animate="show"
            className=' flex flex-col space-y-2'>
            {
              navbarItems.map((item) => (

                <motion.div
                  key={item.title}
                  variants={Links}
                  className=' flex flex-col' >

                  <div onClick={() => setSelectedFeild((prev) => prev === item.title ? "" : item.title)} className=' flex items-center'>
                    <span className=' cursor-pointer text-2xl font-prostone text-gradient bg-gradient-to-r from-rose-300 to-pink-200'>{item.title}</span>
                    {item.content.length > 0 &&
                      <span className=' cursor-pointer text-2xl font-prostone text-rose-300'>{selectedFeild == item.title ? arrowdownicon : arrowupicon}</span>
                    }
                  </div>

                  {selectedFeild === item.title && item.content.length > 0 &&
                    < motion.div
                      layout
                      variants={LinksContainer}
                      initial="hidden"
                      animate="show"
                      transition={{ delay: 1, ease: "backInOut" }}
                      className=' flex flex-col mt-2 space-y-2'>
                      {
                        item.content.map((link) => (
                          <motion.span
                            key={link}
                            layout
                            variants={Links}
                            className=' flex items-center ml-4 text-sm font-poppins font-semibold text-indigo-200 hover:text-boagreen cursor-pointer'>
                            {minusicon}{link}
                          </motion.span>
                        ))
                      }
                    </motion.div>
                  }

                </motion.div>

              ))
            }
          </motion.div>

          <Link href={`/contact-us/contact-form-page`}>
            <motion.span whileTap={{ scale: 0.8 }} className=' text-center inline-block cursor-pointer w-full text-white text-lg font-medium font-dynapuff rounded-2xl py-2 border-2 border-cyan-100'>Contact us</motion.span>
          </Link>

        </div>

      </motion.div>

    </motion.div>
  )
}

export default Menu