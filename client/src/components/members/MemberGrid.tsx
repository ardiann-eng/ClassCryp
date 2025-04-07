import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Grid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination } from "@/components/ui/pagination";
import { type ClassMember } from "@shared/schema";

interface MemberGridProps {
  searchPlaceholder?: string;
}

export default function MemberGrid({ searchPlaceholder = "Search members..." }: MemberGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const itemsPerPage = 8;
  
  // Fetch class members
  const { data: members, isLoading } = useQuery<ClassMember[]>({
    queryKey: ['/api/class-members'],
  });
  
  // Filter members based on search query
  const filteredMembers = members?.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.nim.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const displayedMembers = filteredMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-64">
          <Input
            type="text"
            placeholder={searchPlaceholder}
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant={viewMode === "grid" ? "default" : "secondary"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4 mr-1" /> Grid
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "secondary"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4 mr-1" /> List
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className={`grid ${viewMode === "grid" 
          ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
          : "grid-cols-1"} gap-6`}
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow">
              <Skeleton className="h-40 w-full" />
              <div className="p-4">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : displayedMembers.length > 0 ? (
        <div className={`grid ${viewMode === "grid" 
          ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
          : "grid-cols-1"} gap-6`}
        >
          {displayedMembers.map((member) => (
            <div 
              key={member.id} 
              className="bg-gray-50 rounded-lg overflow-hidden shadow transition-transform duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <div className="h-40 overflow-hidden">
                <img 
                  src={member.imageUrl} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">{member.name}</h3>
                <p className="text-gray-600 text-sm">NIM: {member.nim}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No members found matching your search.</p>
        </div>
      )}
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
