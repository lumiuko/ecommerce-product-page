import { useState } from 'react'

import CartDropdown from './CartDropdown'
import iconMenu from '../assets/images/icon-menu.svg'
import iconClose from '../assets/images/icon-close.svg'
import logo from '../assets/images/logo.svg'
import avatar from '../assets/images/image-avatar.png'

export default function Navbar() {
  const [isNavOpened, setIsNavOpened] = useState(false)

  function toggleMenu() {
    setIsNavOpened(prevState => !prevState)
  }

  const overlay = isNavOpened ? 'visible opacity-100' : 'invisible opacity-0'
  const mobileMenuClasses = isNavOpened ? 'translate-x-0' : '-translate-x-full'

  return (
    <nav className="px-6 fixed top-0 left-0 w-full bg-white z-20">
      <div className="lg:container py-[1.375rem] flex justify-between items-center md:py-7 md:border-border md:border-b-[1px]">
        <div className="flex items-center">
          <button aria-label="Open menu" onClick={toggleMenu} className="relative z-30 md:hidden mr-4">
            <img src={isNavOpened ? iconClose : iconMenu} alt="Menu icon" />
          </button>
          <img src={logo} alt="Sneakers logo" />
          <div className={`fixed top-0 left-0 h-full w-full bg-overlay transition-all md:hidden z-10 ${overlay}`}></div>
          <div
            className={`${mobileMenuClasses} z-20 transition-transform fixed top-0 left-0 h-full w-[250px] bg-white md:static md:translate-x-0  md:w-full md:ml-14`}
          >
            <ul className="font-bold text-mobileNav mt-[5.75rem] ml-6 flex flex-col gap-5 md:m-0 md:flex-row md:font-normal md:text-desktopNav md:text-gray md:gap-8">
              <li className="hover:text-black transition-colors">
                <a href="#">Collections</a>
              </li>
              <li className="hover:text-black transition-colors">
                <a href="#">Men</a>
              </li>
              <li className="hover:text-black transition-colors">
                <a href="#">Women</a>
              </li>
              <li className="hover:text-black transition-colors">
                <a href="#">About</a>
              </li>
              <li className="hover:text-black transition-colors">
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center gap-[1.375rem] md:gap-[2.875rem] ">
          <CartDropdown />
          <button
            className="w-[24px] md:w-[50px] rounded-full md:border-[2px] border-transparent hover:border-orange transition-colors"
            aria-label="Your profile"
          >
            <img src={avatar} alt="User avatar" aria-hidden="true" />
          </button>
        </div>
      </div>
    </nav>
  )
}
