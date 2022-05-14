import NetflixLogo from '../assets/images/logo.svg'
import SearchButton from '../assets/icons/search.svg'
import BellButton from '../assets/icons/bell.svg'
import AccountButton from '../assets/icons/user.svg'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import React from 'react'
import useAuth from '../hooks/useAuth'
function Header() {
  const [isScroll, setIsScroll] = useState(false)
  const { logOut } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScroll(true)
      } else {
        setIsScroll(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className={`${isScroll && 'bg-[#141414]'}`}>
      <div className="flex items-center space-x-2 py-[5px] md:space-x-4">
        <Link href={'/'}>
          <a>
            <NetflixLogo className="w-[100px] cursor-pointer" />
          </a>
        </Link>
        <ul className="hidden  items-center space-x-4 md:flex">
          <li className="headerLink">Home</li>
          <li className="headerLink">Tv Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">My Lists</li>
        </ul>
      </div>
      <div className="flex items-center space-x-4 text-sm font-light">
        <SearchButton className="h-[20px] w-[20px] cursor-pointer" />
        <p className="hidden lg:inline">Kids</p>
        <BellButton className="h-[20px] w-[20px] cursor-pointer" />
        <span onClick={() => logOut()} className="cursor-pointer">
          <a>
            <img
              src="http://zoeice.com/assets/img/uploads/profile.png"
              alt="Account"
              className="h-[30px] w-[30px] rounded-sm"
            />
          </a>
        </span>
      </div>
    </header>
  )
}

export default Header
