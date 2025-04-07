import CoreMembers from "@/components/home/CoreMembers";
import ClassMembers from "@/components/home/ClassMembers";
import ClassActivities from "@/components/home/ClassActivities";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-primary-700 to-primary-800 rounded-xl shadow-lg p-8 md:p-12 text-white">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to CryptGen Class</h1>
            <p className="text-lg mb-6">
              A community of aspiring cryptography and computer science enthusiasts working together to achieve excellence.
            </p>
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold">
              Join Our Community
            </Button>
          </div>
        </div>
      </section>

      {/* Core Members Section */}
      <CoreMembers />
      
      {/* Class Members Section */}
      <ClassMembers />
      
      {/* Class Activities Section */}
      <ClassActivities />
    </div>
  );
};

export default Home;
