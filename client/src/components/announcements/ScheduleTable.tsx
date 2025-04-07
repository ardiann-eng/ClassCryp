import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/ui/data-table";
import { Schedule } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

const ScheduleTable = () => {
  const { data: schedules, isLoading, error } = useQuery<Schedule[]>({
    queryKey: ["/api/schedules"],
  });
  
  if (error) {
    return <div className="text-red-500">Failed to load class schedule. Please try again later.</div>;
  }
  
  const columns = [
    {
      key: "day",
      header: "Day",
      cell: (schedule: Schedule) => (
        <span className="text-sm font-medium text-gray-900">{schedule.day}</span>
      ),
    },
    {
      key: "time",
      header: "Time",
      cell: (schedule: Schedule) => (
        <span className="text-sm text-gray-500">
          {schedule.startTime} - {schedule.endTime}
        </span>
      ),
    },
    {
      key: "subject",
      header: "Subject",
      cell: (schedule: Schedule) => (
        <span className="text-sm text-gray-900">{schedule.subject}</span>
      ),
    },
    {
      key: "instructor",
      header: "Instructor",
      cell: (schedule: Schedule) => (
        <span className="text-sm text-gray-500">{schedule.instructor}</span>
      ),
    },
    {
      key: "room",
      header: "Room",
      cell: (schedule: Schedule) => (
        <span className="text-sm text-gray-500">{schedule.room}</span>
      ),
    },
  ];
  
  return (
    <div className="space-y-6">
      {isLoading ? (
        // Loading skeleton
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          ))}
        </div>
      ) : (
        <DataTable
          data={schedules || []}
          columns={columns}
          searchable
          searchPlaceholder="Search schedules..."
        />
      )}
      
      <div className="mt-6">
        <h3 className="font-medium text-lg mb-3">Important Dates</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="text-sm">
              <span className="font-medium">Jun 20, 2023:</span> Mid-term Examination
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="text-sm">
              <span className="font-medium">Jul 15, 2023:</span> Project Presentation Day
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="text-sm">
              <span className="font-medium">Aug 10, 2023:</span> Final Examination
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <div className="text-sm">
              <span className="font-medium">Aug 25, 2023:</span> End of Semester
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleTable;
