import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import { ClassMember } from "@shared/schema";

const ClassMembers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllMembers, setShowAllMembers] = useState(false);
  
  const { data: classMembers, isLoading, error } = useQuery<ClassMember[]>({
    queryKey: ["/api/class-members"],
  });
  
  // Filter members based on search term
  const filteredMembers = classMembers?.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Display 8 members initially, or all if showAllMembers is true
  const displayedMembers = showAllMembers 
    ? filteredMembers 
    : filteredMembers?.slice(0, 8);
  
  if (error) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-primary-800">Class Members</h2>
        <p className="text-red-500">Failed to load class members. Please try again later.</p>
      </section>
    );
  }
  
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary-800">Class Members</h2>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            id="member-search"
            placeholder="Search members..."
            className="pl-10 pr-4 py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          // Loading skeletons
          [...Array(8)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4 flex items-center space-x-3">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div>
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          ))
        ) : displayedMembers?.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">No members found matching your search.</p>
          </div>
        ) : (
          // Actual content
          displayedMembers?.map((member) => (
            <div key={member.id} className="bg-white rounded-lg shadow hover:shadow-md p-4 transition-all flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img 
                  src={member.imageUrl} 
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.studentId}</p>
              </div>
            </div>
          ))
        )}
      </div>
      
      {!isLoading && filteredMembers && filteredMembers.length > 8 && (
        <div className="mt-6 flex justify-center">
          <Button
            onClick={() => setShowAllMembers(!showAllMembers)}
            className="bg-primary-600 hover:bg-primary-700 text-white font-medium"
          >
            {showAllMembers ? "Show Less" : "View All Members"}
          </Button>
        </div>
      )}
    </section>
  );
};

export default ClassMembers;
