import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertContactSchema, InsertContact } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAnalyticsTracking } from "@/hooks/use-session";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const services = [
  { value: "web-development", label: "Web Development" },
  { value: "web-applications", label: "Web Applications" },
  { value: "seo-marketing", label: "SEO & Digital Marketing" },
  { value: "cloud-solutions", label: "Cloud Solutions" },
  { value: "devops", label: "DevOps Services" },
  { value: "optimization", label: "Web Optimization" },
];

const budgetRanges = [
  { value: "50000-100000", label: "₹50,000 - ₹1,00,000" },
  { value: "100000-250000", label: "₹1,00,000 - ₹2,50,000" },
  { value: "250000-500000", label: "₹2,50,000 - ₹5,00,000" },
  { value: "500000+", label: "₹5,00,000+" },
];

const timelines = [
  { value: "asap", label: "ASAP" },
  { value: "1-2-months", label: "1-2 months" },
  { value: "3-6-months", label: "3-6 months" },
  { value: "6+-months", label: "6+ months" },
];

export default function ContactForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const { sessionId, trackEvent, trackServiceInterest } = useAnalyticsTracking();

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      budget: "",
      timeline: "",
      description: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      if (sessionId) {
        headers['X-Session-ID'] = sessionId;
      }
      
      return fetch('/api/contacts', {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      }).then(res => {
        if (!res.ok) throw new Error('Failed to submit form');
        return res.json();
      });
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      
      // Track successful submission
      if (variables.service) {
        trackServiceInterest(variables.service);
      }
      trackEvent('form_submission', 'conversion', { label: 'contact', value: 1 });
      
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to send message",
        description: error.message,
        variant: "destructive",
      });
      trackEvent('form_error', 'contact_form', { label: 'submission_failed' });
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: InsertContact) => {
    setIsSubmitting(true);
    contactMutation.mutate(data);
  };

  return (
    <div className="bg-card/50 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-border/30" data-testid="contact-form">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-bold text-foreground drop-shadow-sm">Name *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your full name" 
                      {...field} 
                      data-testid="input-name"
                    />
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
                  <FormLabel className="text-base font-bold text-foreground drop-shadow-sm">Email *</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="your@email.com" 
                      {...field} 
                      data-testid="input-email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-bold text-foreground drop-shadow-sm">Phone *</FormLabel>
                  <FormControl>
                    <Input 
                      type="tel" 
                      placeholder="+91 9876543210" 
                      {...field} 
                      data-testid="input-phone"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-bold text-foreground drop-shadow-sm">Company Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your company" 
                      {...field}
                      value={field.value || ""} 
                      data-testid="input-company"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-bold text-foreground drop-shadow-sm">Service Interested In</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                    <FormControl>
                      <SelectTrigger data-testid="select-service">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.value} value={service.value}>
                          {service.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-bold text-foreground drop-shadow-sm">Project Budget</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                    <FormControl>
                      <SelectTrigger data-testid="select-budget">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {budgetRanges.map((budget) => (
                        <SelectItem key={budget.value} value={budget.value}>
                          {budget.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-bold text-foreground drop-shadow-sm">Project Description</FormLabel>
                <FormControl>
                  <Textarea 
                    rows={4} 
                    placeholder="Tell us about your project requirements..." 
                    {...field} 
                    data-testid="textarea-description"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="timeline"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-bold text-foreground drop-shadow-sm">Project Timeline</FormLabel>
                <FormControl>
                  <RadioGroup 
                    onValueChange={field.onChange} 
                    defaultValue={field.value || ""}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    data-testid="radio-timeline"
                  >
                    {timelines.map((timeline) => (
                      <div key={timeline.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={timeline.value} id={timeline.value} />
                        <Label htmlFor={timeline.value} className="text-base font-bold text-foreground drop-shadow-sm">{timeline.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full modern-button font-bold text-lg py-4 shadow-2xl hover:shadow-glow-secondary hover-lift" 
            disabled={isSubmitting}
            data-testid="button-submit-contact"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
