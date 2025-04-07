import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you soon!",
      });
      
      // Reset form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setIsSubscribed(false);
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Contact Form */}
      <Card className="bg-white rounded-xl shadow-md">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-primary-800">Get in Touch</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="contact-name">Your Name</Label>
                <Input 
                  id="contact-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="contact-email">Email Address</Label>
                <Input 
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="contact-subject">Subject</Label>
              <Input 
                id="contact-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="contact-message">Message</Label>
              <Textarea 
                id="contact-message"
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="contact-subscribe" 
                checked={isSubscribed}
                onCheckedChange={(checked) => setIsSubscribed(checked as boolean)}
              />
              <Label 
                htmlFor="contact-subscribe" 
                className="text-sm text-gray-700 font-normal"
              >
                Subscribe to newsletter and updates
              </Label>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-primary-600 hover:bg-primary-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {/* Contact Information */}
      <div>
        <Card className="bg-white rounded-xl shadow-md mb-6">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-primary-800">Contact Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 rounded-full bg-primary-100 p-3 mr-4">
                  <Phone className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                  <p className="mt-1 text-gray-600">+62 812-3456-7890</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 rounded-full bg-primary-100 p-3 mr-4">
                  <Mail className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Email</h3>
                  <p className="mt-1 text-gray-600">cryptgen.class@university.edu</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 rounded-full bg-primary-100 p-3 mr-4">
                  <MapPin className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Address</h3>
                  <p className="mt-1 text-gray-600">
                    Computer Science Building, Room 305<br />
                    University Campus, Jakarta 12345
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Social Media */}
        <Card className="bg-white rounded-xl shadow-md">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-4 text-gray-900">Follow Us</h3>
            
            <div className="flex space-x-4 mb-8">
              <a 
                href="#" 
                className="rounded-full bg-blue-100 p-3 text-blue-600 hover:bg-blue-200 transition-all"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              
              <a 
                href="#" 
                className="rounded-full bg-pink-600 p-3 text-white hover:bg-pink-500 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              
              <a 
                href="#" 
                className="rounded-full bg-blue-500 p-3 text-white hover:bg-blue-400 transition-all"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
              
              <a 
                href="#" 
                className="rounded-full bg-red-600 p-3 text-white hover:bg-red-500 transition-all"
                aria-label="YouTube"
              >
                <Youtube className="h-6 w-6" />
              </a>
            </div>
            
            {/* Office Hours */}
            <div>
              <h3 className="text-lg font-bold mb-3 text-gray-900">Office Hours</h3>
              <table className="min-w-full text-sm">
                <tbody>
                  <tr>
                    <td className="py-2 pr-6 font-medium">Monday - Friday</td>
                    <td className="py-2">9:00 AM - 5:00 PM</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-6 font-medium">Saturday</td>
                    <td className="py-2">10:00 AM - 2:00 PM</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-6 font-medium">Sunday</td>
                    <td className="py-2">Closed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
