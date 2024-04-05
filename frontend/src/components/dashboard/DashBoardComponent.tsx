import { useClassAnalytics, useFinancialAnalytics } from "../../api/analytics-api";
import { useGetClass, useGetStudent, useGetTeacher } from "../../api/get-api";
import BarChartComponent from "../charts/BarChartComponent";
import PieChartComponent from "../charts/PieChartComponent";
import CardsLoadingSkeleton from "../skeleton/CardsLoadingSkeleton";
import ChartLoadingSkeleton from "../skeleton/ChartLoadingSkeleton";
import Cards from "./Cards";

const DashBoardComponent = () => {
  const { teachers, isLoading: isTeacherLoading } = useGetTeacher();
  const { students, isLoading: isStudentLoading } = useGetStudent();
  const { classes, isLoading: isClassLoading } = useGetClass();

  const classId = "660dabe9dececd4599101b15" as string;

  const {
    classAnalytics,
    isLoading: isClassAnalyticsLoading,
    isError: isClassError,
  } = useClassAnalytics(classId);

  const {
    financialAnalytics,
    isLoading: isFinancialLoading,
    isError: isFinancialError,
  } = useFinancialAnalytics(classId);


  if (isTeacherLoading || isStudentLoading || isClassLoading || isClassAnalyticsLoading || isFinancialLoading) {
    return (
      <>
        <CardsLoadingSkeleton />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ChartLoadingSkeleton />
          <ChartLoadingSkeleton />
        </div>
      </>
    );
  }
  if (isClassError || isFinancialError) {
    return <div>Error fetching data.</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Cards title="Total Teachers" value={teachers?.length} bgColor="bg-blue-400" />
        <Cards title="Total Students" value={students?.length} bgColor="bg-green-400" />
        <Cards title="Total Classes" value={classes.data?.length} bgColor="bg-purple-400" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="col-span-1 p-10 border border-gray-200 rounded-md">
          {classAnalytics && <PieChartComponent data={classAnalytics} />}
        </div>

        <div className="col-span-1 p-10 border border-gray-200 rounded-md">
          {financialAnalytics && <BarChartComponent data={financialAnalytics} />}
        </div>
      </div>
    </>
  );
};

export default DashBoardComponent;
