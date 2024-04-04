import CreateStudentForm from "../components/forms/CreateStudentForm";
import Heading from "../components/shared/Heading"

const CreateStudent = () => {
  return (
    <div className="flex flex-1">
      <div className="flex flex-col items-center flex-1 gap-5 px-5 py-10 overflow-scroll md:px-8 lg:p-14 custom-scrollbar">
        <div className="flex flex-row items-center justify-start w-full max-w-5xl gap-1">
          <img src="/assets/icons/add-post.svg" alt="add-post" width={24} height={24} />
          <Heading title={"Add Student Details"} />
        </div>

        <CreateStudentForm action="Create" />
      </div>
    </div>
  )
}

export default CreateStudent;