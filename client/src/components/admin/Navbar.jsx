import {Link} from "react-router-dom";
import { UserButton } from "@clerk/clerk-react"

const Navbar = () => {
  return (
    <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white'>
      <Link to="/">
        <img src="/favicon.svg" alt="Stayza" className="h-9" />
      </Link>
      <UserButton />
    </div>
  )
}

export default Navbar
