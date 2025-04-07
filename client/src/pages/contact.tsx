import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { 
  RectangleEllipsis, 
  Phone, 
  MapPin, 
  Clock,
  Map
} from "lucide-react";
import { 
  FaInstagram, 
  FaWhatsapp, 
  FaTelegram, 
  FaDiscord 
} from "react-icons/fa";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";

// Extend the schema with validation rules
const contactFormSchema = insertContactMessageSchema.extend({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

export default function ContactPage() {
  const [location] = useLocation();
  const { toast } = useToast();
  
  // Set document title
  useEffect(() => {
    document.title = "Contact | CryptGen";
  }, []);
  
  // Setup form
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      urgent: false
    }
  });
  
  // Handle form submission
  const submitMutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent",
        description: "Thank you for your message. We'll get back to you soon.",
        variant: "default"
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive"
      });
    }
  });
  
  const onSubmit = (data: z.infer<typeof contactFormSchema>) => {
    submitMutation.mutate(data);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
        <h2 className="text-3xl font-bold text-primary mb-8 font-accent">Contact Us</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Get in Touch</h3>
              <p className="text-gray-600 mb-6">
                Have questions about the class, assignments, or need to discuss something with the class representatives? 
                Reach out to us using any of the contact methods below or fill out the contact form.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary rounded-full p-2 text-white">
                    <RectangleEllipsis size={16} />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-800">Email</h4>
                    <p className="text-gray-600">cryptgen.class@university.edu</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary rounded-full p-2 text-white">
                    <Phone size={16} />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-800">Phone</h4>
                    <p className="text-gray-600">+62 123 456 7890 (Class President)</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary rounded-full p-2 text-white">
                    <MapPin size={16} />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-800">Class Location</h4>
                    <p className="text-gray-600">Building 3, Floor 2, Room 301<br />University Campus</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-primary rounded-full p-2 text-white">
                    <Clock size={16} />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-800">Office Hours</h4>
                    <p className="text-gray-600">Monday - Friday: 10:00 AM - 2:00 PM<br />Student Lounge Area</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="bg-yellow-500 hover:bg-yellow-600 text-slate-950 rounded-full w-10 h-10 flex items-center justify-center transition duration-300"
                >
                  <FaWhatsapp />
                </a>
                <a 
                  href="#" 
                  className="bg-primary hover:bg-primary-foreground text-white rounded-full w-10 h-10 flex items-center justify-center transition duration-300"
                >
                  <FaInstagram />
                </a>
                <a 
                  href="#" 
                  className="bg-primary hover:bg-primary-foreground text-white rounded-full w-10 h-10 flex items-center justify-center transition duration-300"
                >
                  <FaTelegram />
                </a>
                <a 
                  href="#" 
                  className="bg-primary hover:bg-primary-foreground text-white rounded-full w-10 h-10 flex items-center justify-center transition duration-300"
                >
                  <FaDiscord />
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <Card className="bg-gray-50 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Send us a Message</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter subject" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Type your message here" 
                              rows={5} 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="urgent"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox 
                              checked={field.value} 
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="!mt-0">Mark as urgent</FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary-foreground text-white font-bold"
                      disabled={submitMutation.isPending}
                    >
                      {submitMutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Map or additional contact information */}
        <div className="mt-12">
          <div className="bg-gray-100 rounded-xl p-4 h-80 flex items-center justify-center">
            <div className="text-center">
              <Map className="h-20 w-20 text-gray-400 mb-4 mx-auto" />
              <p className="text-gray-500">Interactive campus map would be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
