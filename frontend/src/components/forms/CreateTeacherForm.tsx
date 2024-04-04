import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from '@hookform/devtools';
import { useCreateTeacher } from "../../api/api";
import Loader from "../shared/Loader";

export type TeacherFormProps = {
  action: "Create" | "Update";
}

export type TeacherType = {
  name: string;
  gender: string;
  dob: string;
  contactDetails: string;
  salary: number;
  assignedClass?: string;
}

const CreateTeacherForm = ({ action }: TeacherFormProps) => {

  const defaultTeacherValues: TeacherType = {
    name: "John",
    gender: "male",
    dob: "",
    contactDetails: "john@gmail.com",
    salary: 50000,
    assignedClass: action === "Update" ? "" : undefined
  }

  const form = useForm<TeacherType>({ defaultValues: defaultTeacherValues });

  const { createTeacherAsync, isLoading } = useCreateTeacher();

  const {
    register, control, handleSubmit, reset,
    formState: { errors, isDirty, isValid, isSubmitSuccessful },
  } = form;

  const onSubmit = async (data: TeacherType) => {
    try {
      await createTeacherAsync(data);
      reset();
    } catch (error) {
      console.error("Failed to create teacher:", error);
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);



  return (
    <>
      <div className='flex flex-col w-full bg-gray-100 md:py-5 md:px-4'>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className='h-full p-4 bg-white rounded-md shadow-md md:p-8'>

          <div className='flex flex-col items-start w-full mb-4'>
            <label className='m-2 text-start' htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              {...register("name", { required: true })}
              className='bg-transparent border w-full md:w-[300px] px-3 py-2 rounded-md outline-none'
            />
            {errors.name && <span className="text-red-500 ">{errors.name.message}</span>}
          </div>

          <div className='flex flex-col items-start mb-4'>
            <label className='m-2 text-start' htmlFor="gender">Gender</label>
            <select
              id="gender"
              {...register("gender", { required: "Gender is required" })}
              className='bg-transparent border w-full md:w-[300px] px-3 py-2 rounded-md outline-none'
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && <span className="mt-4 text-red-500">{errors.gender.message}</span>}
          </div>

          <div className='flex flex-col items-start mb-4'>
            <label className='m-2 text-start' htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              {...register("dob", { required: { value: true, message: "Date of Birth is required" } })}
              className='bg-transparent border w-full md:w-[300px] px-3 py-2 rounded-md outline-none'
            />
            {errors.dob && <span className="mt-4 text-red-500">{errors.dob.message}</span>}

          </div>

          <div className='flex flex-col items-start mb-4'>
            <label className='m-2 text-start' htmlFor="contactDetails">Contact Details</label>
            <input
              type="text"
              id="contactDetails"
              {...register("contactDetails", {
                required: "Contact Details are required",
                pattern: {
                  value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z-0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: 'Invalid email address'
                },
              })}
              className='bg-transparent border w-full md:w-[300px] px-3 py-2 rounded-md outline-none'
            />
            {errors.contactDetails && <span className="mt-4 text-red-500">{errors.contactDetails.message}</span>}
          </div>

          <div className='flex flex-col items-start mb-4'>
            <label className='m-2 text-start' htmlFor="salary">Salary</label>
            <input
              type="number"
              id="salary"
              {...register("salary", { valueAsNumber: true, required: { value: true, message: "Salary is required" } })}
              className='bg-transparent border w-full md:w-[300px] px-3 py-2 rounded-md outline-none'
            />
            <p className="text-red-500">{errors.salary?.message}</p>
            {errors.salary && <span className="mt-4 text-red-500">{errors.salary.message}</span>}
          </div>

          {action === "Update" && (
            <div className='flex flex-col items-start mb-4'>
              <label className='m-2 text-start' htmlFor="assignedClass">Assigned Class</label>
              <input
                type="text"
                id="assignedClass"
                {...register("assignedClass")}
                className='bg-transparent border w-full md:w-[300px] px-3 py-2 rounded-md outline-none'
              />
              {errors.assignedClass && <span className="mt-4 text-red-500">{errors.assignedClass.message}</span>}
            </div>

          )}

          <div className='flex'>
            <button
              disabled={!isDirty || !isValid || isLoading}
              className={`flex-1 px-4 py-2 mr-2 text-white  text-balance bg-blue-800 border border-none rounded-md outline-none
                ${(!isDirty || !isValid) && "bg-red-600"}`}
            >
              {isLoading && <Loader />} Submit
            </button>
            <button
              type='button' onClick={() => reset()}
              className='flex-1 px-4 py-2 mr-2 text-gray-700 bg-gray-300 border border-none rounded-md outline-none text-balance'
            >
              Reset
            </button>
          </div>

        </form>

        <DevTool control={control} />
      </div>
    </>
  )
}

export default CreateTeacherForm;
