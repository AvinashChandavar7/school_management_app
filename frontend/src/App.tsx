import { Navigate, Route, Routes, } from "react-router-dom"
import Layout from "./layouts/Layout"
import CreateTeacher from "./pages/CreateTeacher"

const App = () => {
  return (
    <main className='flex h-screen'>
      <Routes>

        <Route element={<Layout />} >
          <Route path="/" element={"DashBoard"} />
          <Route path="/create-class" element={"Class"} />
          <Route path="/edit-class/:id" element={"edit class"} />


          <Route path="/create-teacher" element={<CreateTeacher />} />
          <Route path="/edit-teacher/:id" element={"edit teacher"} />

          <Route path="/create-student" element={"Student"} />
          <Route path="/edit-student/:id" element={"edit student"} />


        </Route>


        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  )
}

export default App