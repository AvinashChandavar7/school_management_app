import { useGetClass, useGetStudent, useGetTeacher } from "../../api/get-api";
import Cards from "./Cards";

const DashBoardComponent = () => {
  const { teachers } = useGetTeacher();
  const { students } = useGetStudent();
  const { classes } = useGetClass();

  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Cards title="Total Teachers" value={teachers?.length} bgColor="bg-blue-400" />
        <Cards title="Total Students" value={students?.length} bgColor="bg-green-400" />
        <Cards title="Total Classes" value={classes.data?.length} bgColor="bg-purple-400" />
      </div>
    </>
  );
};

export default DashBoardComponent;
