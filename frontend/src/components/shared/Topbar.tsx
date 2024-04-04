
import { Link, } from 'react-router-dom';

const Topbar = () => {
  return (
    <section className="sticky top-0 z-50 w-full bg-blue-100 md:hidden">
      <div className="flex items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-3">
          <img src="/assets/icons/logo.svg" alt="logo" className='w-12 h-12 rounded-full'
          />
        </Link>

        <Link to={`/`} className="gap-3 flex-center ">
          <img
            src="/assets/icons/profile-placeholder.svg"
            alt="profile"

            className='w-8 h-8 rounded-full ' />
        </Link>
      </div>
    </section >
  )
}

export default Topbar;