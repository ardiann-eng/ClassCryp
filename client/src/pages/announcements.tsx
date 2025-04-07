import { useEffect } from "react";
import { useLocation } from "wouter";
import AnnouncementTabs from "@/components/announcements/AnnouncementTabs";

export default function AnnouncementsPage() {
  const [location] = useLocation();
  
  // Set document title
  useEffect(() => {
    document.title = "Announcements | CryptGen";
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <AnnouncementTabs />
    </div>
  );
}
