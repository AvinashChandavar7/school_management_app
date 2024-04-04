import { Link, useLocation } from 'react-router-dom';
import { bottombarLinks } from '../../constants';

const Bottombar = () => {
  const { pathname } = useLocation();
  return (
    <section className='z-50 flex justify-between items-center w-full sticky bottom-0 rounded-t-[20px]  px-2 bg-blue-100 py-3 md:hidden'>
      {
        bottombarLinks.map((link) => {
          const isActive = pathname === link.route;
          return (
            <Link key={link.label} to={link.route} className={`flex justify-center items-center flex-col  gap-1  p-2 transition group ${isActive && `bg-blue-200 rounded-md`} `} >
              <img src={link.imgURL} alt="link" className={`${isActive && `invert-white`} `} width={16} height={16} />
              <p className='text-[10px] text-center text-balance font-medium leading-[140%] text-light-2'>{link.label}</p>
            </Link>
          )
        })
      }
    </section>
  )
}

export default Bottombar;