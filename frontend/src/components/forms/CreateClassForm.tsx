import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from '@hookform/devtools';
import { useCreateClass } from "../../api/api";
import Loader from "../shared/Loader";

export type ClassFormProps = {
  action: "Create" | "Update";
}

export type ClassType = {
  name: string;
  year: number;
  studentFees: number;
  maxCapacity: number;
  teacher?: string;
}

const CreateClassForm = ({ action }: ClassFormProps) => {

  const defaultClassValues: ClassType = {
    name: "12th STD",
    year: 2024,
    studentFees: 50000,
    maxCapacity: 60,
    teacher: action === "Update" ? "" : undefined,
  }

  const form = useForm<ClassType>({ defaultValues: defaultClassValues });

  const { register, control, handleSubmit, reset, formState: { errors, isDirty, isValid, isSubmitSuccessful } } = form;

  const { createClassAsync, isLoading } = useCreateClass();

  const onSubmit = async (data: ClassType) => {
    try {
      await createClassAsync(data);

      reset();
    } catch (error) {
      console.error("Failed to create class:", error);
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
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

        <div className='flex flex-col items-start w-full mb-4'>
          <label className='m-2 text-start' htmlFor="year">Year</label>
          <input
            type="number"
            id="year"
            {...register("year", { required: true })}
            className='bg-transparent border w-full md:w-[300px] px-3 py-2 rounded-md outline-none'
          />
          {errors.year && <span className="text-red-500 ">{errors.year.message}</span>}
        </div>

        <div className='flex flex-col items-start w-full mb-4'>
          <label className='m-2 text-start' htmlFor="studentFees">Student Fees</label>
          <input
            type="number"
            id="studentFees"
            {...register("studentFees", { required: true })}
            className='bg-transparent border w-full md:w-[300px] px-3 py-2 rounded-md outline-none'
          />
          {errors.studentFees && <span className="text-red-500 ">{errors.studentFees.message}</span>}
        </div>

        <div className='flex flex-col items-start w-full mb-4'>
          <label className='m-2 text-start' htmlFor="maxCapacity">Max Capacity</label>
          <input
            type="number"
            id="maxCapacity"
            {...register("maxCapacity", { required: true })}
            className='bg-transparent border w-full md:w-[300px] px-3 py-2 rounded-md outline-none'
          />
          {errors.maxCapacity && <span className="text-red-500 ">{errors.maxCapacity.message}</span>}
        </div>


        {action === "Update" && (
          <div className='flex flex-col items-start w-full mb-4'>
            <label className='m-2 text-start' htmlFor="teacher">Teacher</label>
            <input
              type="text"
              id="teacher"
              {...register("teacher")}
              className='bg-transparent border w-full md:w-[300px] px-3 py-2 rounded-md outline-none'
            />
            {errors.teacher && <span className="text-red-500 ">{errors.teacher.message}</span>}
          </div>
        )}

        <div className='flex'>
          <button
            disabled={!isDirty || !isValid || isLoading}
            className={`flex-1 px-4 py-2 mr-2 text-white text-balance bg-blue-800 border border-none rounded-md outline-none
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
  )
}

export default CreateClassForm;
