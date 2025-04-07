import { Card } from "@/components/ui/card";

const ClassActivities = () => {
  const activities = [
    {
      title: "Weekly Study Sessions",
      description: "Collaborative learning to master concepts and solve problems together.",
      imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Coding Competitions",
      description: "Participating in programming challenges to sharpen technical skills.",
      imageUrl: "https://images.unsplash.com/photo-1544531585-9847b68c8c86?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-primary-800">Class Activities</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activities.map((activity, index) => (
          <div key={index} className="group relative rounded-xl overflow-hidden shadow-lg h-72">
            <img 
              src={activity.imageUrl} 
              alt={activity.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6 text-white">
                <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
                <p>{activity.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClassActivities;
