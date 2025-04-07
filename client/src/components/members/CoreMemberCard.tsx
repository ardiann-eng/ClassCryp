import { Card, CardContent } from "@/components/ui/card";
import { type CoreMember } from "@shared/schema";

interface CoreMemberCardProps {
  member: CoreMember;
}

export default function CoreMemberCard({ member }: CoreMemberCardProps) {
  // Map role to display title
  const roleMap: Record<string, string> = {
    president: "Class President",
    secretary: "Secretary",
    treasurer: "Treasurer"
  };

  const displayRole = roleMap[member.role] || member.role;
  
  return (
    <Card className="overflow-hidden transition duration-300 transform hover:scale-105">
      <div className="h-64 overflow-hidden">
        <img 
          src={member.imageUrl} 
          alt={`${displayRole} - ${member.name}`} 
          className="w-full h-full object-cover object-center"
        />
      </div>
      <CardContent className="p-6 bg-white">
        <div className="inline-block px-3 py-1 bg-primary text-white text-sm font-semibold rounded-full mb-2">
          {displayRole}
        </div>
        <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
        <p className="text-gray-600">NIM: {member.nim}</p>
      </CardContent>
    </Card>
  );
}
