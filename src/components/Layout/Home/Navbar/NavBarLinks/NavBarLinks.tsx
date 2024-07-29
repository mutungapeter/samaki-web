import React from 'react'
import { navItems } from '@/public/data/nav'
import classes from '../navbar.module.css'
import Link from "next/link"

// console.log(navItems)
interface Props{
    active:number;
}
const NavbarLinks = ({active}:Props) => {
  return (
    <div className='block lg:flex lg:items-center'>
         {
            navItems && navItems.map((i, index) => (
                <div className="flex" key={index}>
                    <Link href={i.url} 
                    className={`${active === index + 1 ? "text-black" : "text-black lg:text-black"} pb-[30px] lg:pb-0 font-[500] px-6 cursor-pointer}`}
                    >
                    {i.title}
                    </Link>
                </div>
            ))
         }
    </div>
  )
}

export default NavbarLinks
