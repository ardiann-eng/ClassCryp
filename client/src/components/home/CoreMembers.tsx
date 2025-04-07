import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CoreMember } from "@shared/schema";

const CoreMembers = () => {
  const { data: coreMembers, isLoading, error } = useQuery<CoreMember[]>({
    queryKey: ["/api/core-members"],
  });

  if (error) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-primary-800">Core Team Members</h2>
        <p className="text-red-500">Failed to load core team members. Please try again later.</p>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-primary-800">Core Team Members</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading ? (
          // Loading skeletons
          [...Array(3)].map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <Skeleton className="h-56 w-full" />
              <CardContent className="p-6">
                <Skeleton className="h-4 w-1/3 mb-2" />
                <Skeleton className="h-5 w-2/3 mb-1" />
                <Skeleton className="h-4 w-1/2 mb-3" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))
        ) : (
          // Actual content
          coreMembers?.map((member) => (
            <Card key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
              <div className="h-56 overflow-hidden">
                <img 
                  src={member.imageUrl} 
                  alt={`${member.position} - ${member.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-2">
                  {member.position}
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-gray-600 mb-3">NIM: {member.studentId}</p>
                <p className="text-gray-700">{member.description}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </section>
  );
};

export default CoreMembers;
