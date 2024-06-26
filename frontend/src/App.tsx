import { Navigate, Route, Routes, } from "react-router-dom"

import Layout from "./layouts/Layout"

import DashBoard from "./pages/DashBoard"
import CreateClass from "./pages/CreateClass"
import CreateTeacher from "./pages/CreateTeacher"
import CreateStudent from "./pages/CreateStudent"


import ClassTable from "./components/tables/ClassTable"
import TeacherTable from "./components/tables/TeacherTable"
import StudentTable from "./components/tables/StudentTable"

const App = () => {
  return (
    <main className='flex h-screen'>
      <Routes>

        <Route element={<Layout />} >
          <Route path="/" element={<DashBoard />} />
          <Route path="/create-class" element={<CreateClass />} />
          <Route path="/class-table" element={<ClassTable />} />
          <Route path="/edit-class/:id" element={"edit class"} />


          <Route path="/create-teacher" element={<CreateTeacher />} />
          <Route path="/teacher-table" element={<TeacherTable />} />
          <Route path="/edit-teacher/:id" element={"edit teacher"} />

          <Route path="/create-student" element={<CreateStudent />} />
          <Route path="/student-table" element={<StudentTable />} />
          <Route path="/edit-student/:id" element={"edit student"} />


        </Route>


        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  )
}

export default App