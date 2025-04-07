import { useQuery } from "@tanstack/react-query";
import { Calendar, Users, User, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";
import { type Assignment } from "@shared/schema";

export default function AssignmentGrid() {
  // Fetch assignments
  const { data: assignments, isLoading } = useQuery<Assignment[]>({
    queryKey: ['/api/assignments'],
  });
  
  // Sort assignments by due date (nearest first)
  const sortedAssignments = assignments
    ? [...assignments].sort((a, b) => {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      })
    : [];
  
  // Get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'due soon':
      case 'upcoming':
        return 'bg-primary text-white';
      case 'overdue':
        return 'bg-red-500 text-white';
      case 'completed':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };
  
  // Get submission indicator color
  const getSubmissionColor = (submitted: number, total: number) => {
    const ratio = submitted / total;
    if (ratio >= 0.75) return 'bg-green-500';
    if (ratio >= 0.5) return 'bg-yellow-500';
    return 'bg-orange-500';
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {isLoading ? (
        Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <Skeleton className="h-4 w-full mb-3" />
              <div className="flex items-center text-xs text-gray-500 mb-4">
                <Skeleton className="h-4 w-32 mr-2" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
          </div>
        ))
      ) : sortedAssignments.length > 0 ? (
        sortedAssignments.map(assignment => (
          <div key={assignment.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-300">
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${getStatusColor(assignment.status)}`}>
                  Due {formatDate(assignment.dueDate)}
                </span>
              </div>
              <p className="mb-3 text-gray-600 text-sm">{assignment.description}</p>
              <div className="flex items-center text-xs text-gray-500 mb-4">
                <Calendar className="h-3 w-3 mr-1" /> Assigned: {formatDate(assignment.assignedDate)}
                <span className="mx-2">•</span>
                {assignment.type === 'group' ? (
                  <div className="flex items-center">
                    <Users className="h-3 w-3 mr-1" /> Group work
                  </div>
                ) : (
                  <div className="flex items-center">
                    <User className="h-3 w-3 mr-1" /> Individual
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center">
                <div className="inline-flex items-center text-xs text-gray-500">
                  <div className={`w-2 h-2 rounded-full ${getSubmissionColor(assignment.submitted, assignment.total)} mr-1`}></div>
                  <span>Submitted: {assignment.submitted}/{assignment.total}</span>
                </div>
                <a href="#" className="text-primary hover:text-primary/80 font-medium text-sm flex items-center">
                  View Details <ChevronRight className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-8">
          <p className="text-gray-500">No assignments found.</p>
        </div>
      )}
    </div>
  );
}
