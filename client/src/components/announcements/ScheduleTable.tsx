import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { type Schedule } from "@shared/schema";

export default function ScheduleTable() {
  const [currentWeek, setCurrentWeek] = useState("October 16 - October 22, 2023");
  
  // Fetch schedules
  const { data: schedules, isLoading } = useQuery<Schedule[]>({
    queryKey: ['/api/schedules'],
  });
  
  // Group schedules by day
  const scheduleByDay = schedules?.reduce((acc, schedule) => {
    if (!acc[schedule.day]) {
      acc[schedule.day] = [];
    }
    acc[schedule.day].push(schedule);
    return acc;
  }, {} as Record<string, Schedule[]>) || {};
  
  // Get all time slots
  const allTimeSlots = schedules
    ? [...new Set(schedules.map(s => `${s.startTime} - ${s.endTime}`))]
        .sort((a, b) => {
          const timeA = a.split(' - ')[0];
          const timeB = b.split(' - ')[0];
          return timeA.localeCompare(timeB);
        })
    : [];
  
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  
  return (
    <>
      <div className="bg-yellow-500 bg-opacity-10 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-slate-950 flex items-center">
          <Calendar className="text-yellow-500 mr-2 h-5 w-5" /> Current Week Schedule
        </h3>
        <p className="text-gray-600">{currentWeek}</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="py-3 px-4 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Time</th>
              {days.map(day => (
                <th key={day} className="py-3 px-4 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 3 }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="py-4 px-4 border border-gray-200 bg-gray-50 font-medium">
                    <Skeleton className="h-4 w-32" />
                  </td>
                  {days.map((_, colIndex) => (
                    <td key={colIndex} className="py-4 px-4 border border-gray-200">
                      <Skeleton className="h-16 w-full" />
                    </td>
                  ))}
                </tr>
              ))
            ) : allTimeSlots.map((timeSlot, index) => (
              <tr key={index}>
                <td className="py-4 px-4 border border-gray-200 bg-gray-50 font-medium">
                  {timeSlot}
                </td>
                {days.map(day => {
                  // Find schedule for this day and time slot
                  const scheduleForSlot = scheduleByDay[day]?.find(s => 
                    `${s.startTime} - ${s.endTime}` === timeSlot
                  );
                  
                  return (
                    <td key={day} className="py-4 px-4 border border-gray-200">
                      {scheduleForSlot ? (
                        <div className={`${
                          scheduleForSlot.color === 'primary' 
                            ? 'bg-primary bg-opacity-10' 
                            : 'bg-yellow-500 bg-opacity-10'
                        } p-2 rounded`}>
                          <p className={`font-medium ${
                            scheduleForSlot.color === 'primary' 
                              ? 'text-primary' 
                              : 'text-slate-950'
                          }`}>
                            {scheduleForSlot.subject}
                          </p>
                          <p className="text-xs text-gray-500">{scheduleForSlot.location}</p>
                        </div>
                      ) : "-"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-8 flex justify-center space-x-4">
        <Button variant="secondary" size="sm" className="flex items-center">
          <ChevronLeft className="h-4 w-4 mr-2" /> Previous Week
        </Button>
        <Button className="flex items-center">
          <ChevronRight className="h-4 w-4 mr-2" /> Next Week
        </Button>
      </div>
    </>
  );
}
