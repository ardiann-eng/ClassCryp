import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Bell, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import CoreMemberCard from "@/components/members/CoreMemberCard";
import MemberGrid from "@/components/members/MemberGrid";
import { type CoreMember } from "@shared/schema";

export default function HomePage() {
  // Fetch core members
  const { data: coreMembers, isLoading: isLoadingCoreMembers } = useQuery<CoreMember[]>({
    queryKey: ['/api/core-members'],
  });
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero section */}
      <div className="welcome-section shadow-md mb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8">
            <h1 className="hero-title">
              Welcome to <span className="text-primary">Crypt<span className="text-[#60A5FA]">Gen</span></span> Class Portal
            </h1>
            <p className="hero-subtitle">
              Your one-stop platform for class information, announcements, and financial tracking.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/announcements">
                <Button size="lg" className="btn-accent">
                  <Bell className="mr-2 h-4 w-4" /> Announcements
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="bg-white/90 hover:bg-white border-blue-200 text-blue-700 font-medium">
                Class Members
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&h=400" 
              alt="Students collaborating" 
              className="rounded-lg shadow-lg object-cover w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Core members section */}
      <div className="mb-16">
        <h2 className="section-header text-center">Core Class Members</h2>
        {isLoadingCoreMembers ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="card overflow-hidden">
                <Skeleton className="h-64 w-full" />
                <div className="p-6">
                  <Skeleton className="h-6 w-28 mb-2" />
                  <Skeleton className="h-6 w-48 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreMembers?.map((member) => (
              <CoreMemberCard key={member.id} member={member} />
            ))}
          </div>
        )}
      </div>

      {/* Class members section */}
      <div id="members" className="mb-16">
        <h2 className="section-header text-center">Class Members</h2>
        <MemberGrid />
      </div>
      
      {/* Class Activities Gallery */}
      <div className="mb-16">
        <h2 className="section-header text-center">Class Activities</h2>
        <div className="activities-section">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card overflow-hidden p-0">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&h=400" 
                alt="Students in class discussion" 
                className="w-full h-64 object-cover transition duration-300 transform hover:scale-105"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1 text-primary">Class Discussion</h3>
                <p className="text-sm text-gray-600">Interactive learning sessions</p>
              </div>
            </div>
            <div className="card overflow-hidden p-0">
              <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&h=400" 
                alt="Group project work" 
                className="w-full h-64 object-cover transition duration-300 transform hover:scale-105"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1 text-primary">Group Projects</h3>
                <p className="text-sm text-gray-600">Collaborative research assignments</p>
              </div>
            </div>
            <div className="card overflow-hidden p-0">
              <img 
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&h=400" 
                alt="Class presentation" 
                className="w-full h-64 object-cover transition duration-300 transform hover:scale-105"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1 text-primary">Presentations</h3>
                <p className="text-sm text-gray-600">Sharing knowledge with peers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
