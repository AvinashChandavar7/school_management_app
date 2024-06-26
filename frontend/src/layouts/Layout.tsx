import { Outlet } from "react-router-dom"
import Topbar from "../components/shared/Topbar"
import Bottombar from "../components/shared/Bottombar"
import LeftSidebar from "../components/shared/LeftSidebar"


const Layout = () => {
  return (
    <div className="w-full md:flex">
      <Topbar />

      <LeftSidebar />

      <section className="flex flex-1 overflow-auto">
        <Outlet />
      </section>

      <Bottombar />
    </div>
  )
}

export default Layout