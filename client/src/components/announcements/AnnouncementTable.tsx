import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Eye, Download, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination } from "@/components/ui/pagination";
import { formatDate, getStatusColor } from "@/lib/utils";
import { type Announcement } from "@shared/schema";

export default function AnnouncementTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Fetch announcements
  const { data: announcements, isLoading } = useQuery<Announcement[]>({
    queryKey: ['/api/announcements'],
  });
  
  // Filter announcements based on search query
  const filteredAnnouncements = announcements?.filter(announcement => 
    announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    announcement.postedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
    announcement.status.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];
  
  // Sort announcements by date (newest first)
  const sortedAnnouncements = [...filteredAnnouncements].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  
  // Calculate pagination
  const totalPages = Math.ceil(sortedAnnouncements.length / itemsPerPage);
  const displayedAnnouncements = sortedAnnouncements.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  return (
    <>
      <div className="mb-6 flex justify-between items-center">
        <div className="relative w-64">
          <Input
            type="text"
            placeholder="Search announcements..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
        </div>
        
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-slate-950">
          <Bell className="h-4 w-4 mr-2" /> New Announcement
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Date</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Posted By</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-20" /></TableCell>
                </TableRow>
              ))
            ) : displayedAnnouncements.length > 0 ? (
              displayedAnnouncements.map((announcement) => {
                const statusColors = getStatusColor(announcement.status);
                
                return (
                  <TableRow key={announcement.id} className="hover:bg-gray-50">
                    <TableCell className="text-sm text-gray-500">
                      {formatDate(announcement.date)}
                    </TableCell>
                    <TableCell className="text-sm font-medium text-gray-900">
                      {announcement.title}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {announcement.postedBy}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors.bg} ${statusColors.text}`}>
                        {announcement.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 mr-3" title="View">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700" title="Download">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                  No announcements found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
