import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Announcement } from "@shared/schema";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const AnnouncementTable = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  
  const { data: announcements, isLoading, error } = useQuery<Announcement[]>({
    queryKey: ["/api/announcements"],
  });
  
  if (error) {
    return <div className="text-red-500">Failed to load announcements. Please try again later.</div>;
  }
  
  const categories = ["All", "Urgent", "Event", "Class Activity", "Finance", "Information"];
  
  // Filter announcements by category
  const filteredAnnouncements = activeCategory === "All" 
    ? announcements 
    : announcements?.filter(announcement => announcement.category === activeCategory);
  
  const getBadgeVariant = (category: string) => {
    switch (category) {
      case "Urgent":
        return "destructive";
      case "Event":
        return "success";
      case "Class Activity":
        return "info";
      case "Finance":
        return "warning";
      case "Information":
        return "secondary";
      default:
        return "default";
    }
  };
  
  const columns = [
    {
      key: "date",
      header: "Date",
      cell: (announcement: Announcement) => (
        <span className="text-sm text-gray-500">
          {format(new Date(announcement.date), "MMM d, yyyy")}
        </span>
      ),
    },
    {
      key: "title",
      header: "Title",
      cell: (announcement: Announcement) => (
        <div>
          <div className="text-sm font-medium text-gray-900">{announcement.title}</div>
          <div className="text-sm text-gray-500 mt-1">{announcement.content}</div>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      cell: (announcement: Announcement) => (
        <Badge variant={getBadgeVariant(announcement.category)}>
          {announcement.category}
        </Badge>
      ),
    },
    {
      key: "postedBy",
      header: "Posted By",
      cell: (announcement: Announcement) => (
        <span className="text-sm text-gray-500">{announcement.postedBy}</span>
      ),
    },
  ];
  
  return (
    <div className="space-y-4">
      {/* Category Filters */}
      <div className="flex flex-wrap space-x-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            size="sm"
            className="mb-2"
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      
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
          data={filteredAnnouncements || []}
          columns={columns}
          searchable
          searchPlaceholder="Search announcements..."
          pagination
          itemsPerPage={5}
        />
      )}
    </div>
  );
};

export default AnnouncementTable;
