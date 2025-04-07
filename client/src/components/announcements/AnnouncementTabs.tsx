import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnnouncementTable from "./AnnouncementTable";
import ScheduleTable from "./ScheduleTable";
import AssignmentGrid from "./AssignmentGrid";

export default function AnnouncementTabs() {
  const [activeTab, setActiveTab] = useState("announcements");
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
      <h2 className="text-3xl font-bold text-primary mb-8 font-accent">Announcements & Schedule</h2>
      
      <Tabs defaultValue="announcements" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="border-b border-gray-200 mb-8 w-full justify-start">
          <TabsTrigger 
            value="announcements" 
            className="px-4 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none"
          >
            Announcements
          </TabsTrigger>
          <TabsTrigger 
            value="schedule" 
            className="px-4 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none"
          >
            Class Schedule
          </TabsTrigger>
          <TabsTrigger 
            value="assignments" 
            className="px-4 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none"
          >
            Assignments
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="announcements">
          <AnnouncementTable />
        </TabsContent>
        
        <TabsContent value="schedule">
          <ScheduleTable />
        </TabsContent>
        
        <TabsContent value="assignments">
          <AssignmentGrid />
        </TabsContent>
      </Tabs>
    </div>
  );
}
