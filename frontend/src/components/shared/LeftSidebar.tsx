import { Link, NavLink, useLocation, } from 'react-router-dom';
import { sidebarLinks } from '../../constants';


const LeftSidebar = () => {

  const { pathname } = useLocation();



  return (
    <nav className=" hidden md:flex px-4 py-10 flex-col justify-between min-w-[270px] bg-blue-100">
      <div className="flex flex-col gap-11">
        <Link to="/dashboard" className="flex items-center justify-center gap-3 border rounded-md transform-cpu">
          <img src="/assets/icons/logo.svg" alt="logo" className='w-10 h-20 rounded-full' />
        </Link>

        <ul className='flex flex-col gap-5'>
          {
            sidebarLinks.map((link) => {
              const isActive = pathname === link.route;
              return (
                <li key={link.label} className={`rounded-lg base-medium hover:bg-blue-300 transition group ${isActive && `bg-blue-200`}`}>
                  <NavLink to={link.route} className='flex items-center gap-2 px-1 py-2' >
                    <img src={link.imgURL} alt="link" className={`group-hover:invert-white  ${isActive && `invert-white`} `} />
                    {link.label}
                  </NavLink>
                </li>
              )
            })
          }
        </ul>
      </div>

    </nav>
  )
}

export default LeftSidebar