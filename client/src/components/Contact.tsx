import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

interface FieldErrors {
  name?: string[];
  email?: string[];
  company?: string[];
  message?: string[];
}

interface ApiErrorResponse {
  error: string;
  details?: {
    fieldErrors?: FieldErrors;
  };
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      setFieldErrors({});
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", company: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    },
    onError: async (error: Error) => {
      try {
        const errorData = JSON.parse(error.message.replace(/^\d+:\s*/, "")) as ApiErrorResponse;
        if (errorData.details?.fieldErrors) {
          setFieldErrors(errorData.details.fieldErrors);
          toast({
            title: "Please fix the errors below",
            description: "Some fields need your attention.",
            variant: "destructive",
          });
        } else {
          setFieldErrors({});
          toast({
            title: "Failed to send message",
            description: errorData.error || "Please try again later.",
            variant: "destructive",
          });
        }
      } catch {
        setFieldErrors({});
        toast({
          title: "Failed to send message",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    mutation.mutate(formData);
  };

  const getFieldError = (field: keyof FieldErrors): string | undefined => {
    const errors = fieldErrors[field];
    return errors && errors.length > 0 ? errors[0] : undefined;
  };

  const contactInfo = [
    { icon: MapPin, label: "Address", value: "F-22, Orchid Greens, Girdharnagar,\nShahibaug, Ahmedabad, GJ 380004, India" },
    { icon: Phone, label: "Phone", value: "+91 7405862260\n+91 8866441188\n+91 9537315566" },
    { icon: Mail, label: "Email", value: "zerixcapital@gmail.com" },
    { icon: Clock, label: "Hours", value: "Mon - Fri: 9:00 AM - 6:00 PM IST" },
  ];

  return (
    <section id="contact" className="py-12 bg-card mb-12" data-testid="section-contact">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-contact-title">
            Get in Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Interested in learning more about our investment strategies? 
            We'd love to hear from you.
          </p>
        </div>

        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, index) => (
              <Card key={index} className="h-full" data-testid={`card-contact-${item.label.toLowerCase()}`}>
                <CardContent className="p-6 flex flex-col items-center text-center gap-4 h-full">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex flex-col flex-grow">
                    <p className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">{item.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
