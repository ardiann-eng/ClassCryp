import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnnouncementTable from "./AnnouncementTable";
import ScheduleTable from "./ScheduleTable";
import AssignmentGrid from "./AssignmentGrid";

export default function AnnouncementTabs() {
  const [activeTab, setActiveTab] = useState("announcements");
  
  return (
    <div className="announcement-container rounded-xl shadow-md p-6 md:p-8 mb-12">
      <h2 className="section-header text-primary mb-6 font-accent">Announcements & Schedule</h2>
      
      <Tabs defaultValue="announcements" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="border-b border-[#E9ECEF] mb-8 w-full justify-start bg-transparent">
          <TabsTrigger 
            value="announcements" 
            className="px-4 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none data-[state=active]:shadow-none"
          >
            Announcements
          </TabsTrigger>
          <TabsTrigger 
            value="schedule" 
            className="px-4 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none data-[state=active]:shadow-none"
          >
            Class Schedule
          </TabsTrigger>
          <TabsTrigger 
            value="assignments" 
            className="px-4 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none data-[state=active]:shadow-none"
          >
            Assignments
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="announcements" className="tab-content">
          <AnnouncementTable />
        </TabsContent>
        
        <TabsContent value="schedule" className="tab-content">
          <ScheduleTable />
        </TabsContent>
        
        <TabsContent value="assignments" className="tab-content">
          <AssignmentGrid />
        </TabsContent>
      </Tabs>
    </div>
  );
}
