import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnnouncementTable from "@/components/announcements/AnnouncementTable";
import ScheduleTable from "@/components/announcements/ScheduleTable";

const Announcements = () => {
  return (
    <div>
      <Card className="bg-white rounded-xl shadow-md mb-8">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-primary-800">Announcements & Schedule</h2>
          
          <Tabs defaultValue="announcements">
            <TabsList className="grid w-full md:w-auto grid-cols-2 md:inline-flex mb-6">
              <TabsTrigger value="announcements">Announcements</TabsTrigger>
              <TabsTrigger value="schedule">Class Schedule</TabsTrigger>
            </TabsList>
            
            <TabsContent value="announcements">
              <AnnouncementTable />
            </TabsContent>
            
            <TabsContent value="schedule">
              <ScheduleTable />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Announcements;
