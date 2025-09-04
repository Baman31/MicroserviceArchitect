import { useState, useEffect } from "react";
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trackEvent } from "@/lib/analytics";
import { useToast } from "@/hooks/use-toast";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface BookingData {
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceType: string;
  projectDetails: string;
  selectedDate: string;
  selectedTime: string;
}

const serviceTypes = [
  "Web Development",
  "Web Applications", 
  "Cloud Solutions",
  "DevOps Services",
  "SEO & Digital Marketing",
  "Web Optimization",
  "General Consultation"
];

const timeSlots: TimeSlot[] = [
  { time: "09:00", available: true },
  { time: "10:00", available: true },
  { time: "11:00", available: false },
  { time: "14:00", available: true },
  { time: "15:00", available: true },
  { time: "16:00", available: true },
  { time: "17:00", available: false },
];

export default function CalendarBooking() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [step, setStep] = useState<"date" | "time" | "details" | "confirmation">("date");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    serviceType: "",
    projectDetails: "",
    selectedDate: "",
    selectedTime: ""
  });
  const { toast } = useToast();

  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const today = new Date();
      const isDisabled = date < today || date.getDay() === 0; // Disable past dates and Sundays
      days.push({ date, day, isDisabled });
    }
    
    return days;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleDateSelect = (date: Date) => {
    const formattedDate = formatDate(date);
    setSelectedDate(formattedDate);
    setBookingData(prev => ({ ...prev, selectedDate: formattedDate }));
    setStep("time");
    trackEvent('calendar_booking', 'date_selected', formattedDate);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setBookingData(prev => ({ ...prev, selectedTime: time }));
    setStep("details");
    trackEvent('calendar_booking', 'time_selected', time);
  };

  const handleInputChange = (field: keyof BookingData, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitBooking = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      trackEvent('calendar_booking', 'booking_submitted', bookingData.serviceType);
      
      toast({
        title: "Booking Confirmed! 🎉",
        description: `Your consultation is scheduled for ${formatDisplayDate(bookingData.selectedDate)} at ${bookingData.selectedTime}. We'll send you a confirmation email shortly.`,
      });
      
      setStep("confirmation");
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return bookingData.name && 
           bookingData.email && 
           bookingData.phone && 
           bookingData.serviceType && 
           bookingData.selectedDate && 
           bookingData.selectedTime;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="max-w-4xl mx-auto p-6" data-testid="calendar-booking">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold font-poppins mb-4">Schedule Your Free Consultation</h2>
        <p className="text-muted-foreground text-lg">
          Book a 30-minute consultation to discuss your project requirements
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Calendar Section */}
        <Card className="modern-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Select Date & Time</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {step === "date" && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
                    data-testid="calendar-prev-month"
                  >
                    ←
                  </Button>
                  <h3 className="text-lg font-semibold">
                    {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h3>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
                    data-testid="calendar-next-month"
                  >
                    →
                  </Button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2 text-center text-sm font-medium text-muted-foreground">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-2">{day}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, index) => (
                    <div key={index} className="h-10">
                      {day && (
                        <Button
                          variant={selectedDate === formatDate(day.date) ? "default" : "ghost"}
                          className="w-full h-full text-sm"
                          disabled={day.isDisabled}
                          onClick={() => handleDateSelect(day.date)}
                          data-testid={`calendar-day-${day.day}`}
                        >
                          {day.day}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            {step === "time" && (
              <div className="space-y-4">
                <Button
                  variant="outline"
                  onClick={() => setStep("date")}
                  className="mb-4"
                  data-testid="calendar-back-to-date"
                >
                  ← Back to Date
                </Button>
                
                <div className="text-center mb-4">
                  <Badge variant="secondary" className="text-sm">
                    {formatDisplayDate(selectedDate)}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.time}
                      variant={selectedTime === slot.time ? "default" : "outline"}
                      disabled={!slot.available}
                      onClick={() => handleTimeSelect(slot.time)}
                      className="h-12"
                      data-testid={`time-slot-${slot.time}`}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      {slot.time}
                      {!slot.available && (
                        <span className="ml-2 text-xs text-muted-foreground">(Booked)</span>
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {(step === "details" || step === "confirmation") && (
              <div className="text-center space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <h3 className="font-semibold text-primary mb-2">Selected Appointment</h3>
                  <p className="text-sm">{formatDisplayDate(selectedDate)}</p>
                  <p className="text-sm font-medium">{selectedTime}</p>
                </div>
                
                {step === "details" && (
                  <Button
                    variant="outline"
                    onClick={() => setStep("time")}
                    data-testid="calendar-back-to-time"
                  >
                    ← Change Time
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Booking Details Form */}
        <Card className="modern-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {step === "confirmation" ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Booking Confirmed</span>
                </>
              ) : (
                <>
                  <User className="h-5 w-5 text-primary" />
                  <span>Your Details</span>
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {step === "confirmation" ? (
              <div className="text-center space-y-4">
                <div className="text-green-500 text-6xl">✓</div>
                <h3 className="text-xl font-semibold">Thank You!</h3>
                <p className="text-muted-foreground">
                  Your consultation has been booked successfully. We'll send you a confirmation email with meeting details.
                </p>
                <Button
                  onClick={() => {
                    setStep("date");
                    setSelectedDate("");
                    setSelectedTime("");
                    setBookingData({
                      name: "",
                      email: "",
                      phone: "",
                      company: "",
                      serviceType: "",
                      projectDetails: "",
                      selectedDate: "",
                      selectedTime: ""
                    });
                  }}
                  className="w-full"
                  data-testid="book-another-appointment"
                >
                  Book Another Appointment
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {step !== "details" && (
                  <div className="text-center text-muted-foreground">
                    <p>Select a date and time to continue</p>
                  </div>
                )}

                {step === "details" && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Name *</label>
                        <Input
                          placeholder="Your full name"
                          value={bookingData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          data-testid="booking-name-input"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Company</label>
                        <Input
                          placeholder="Company name"
                          value={bookingData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          data-testid="booking-company-input"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Email *</label>
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
                          value={bookingData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          data-testid="booking-email-input"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Phone *</label>
                        <Input
                          type="tel"
                          placeholder="+91 9876543210"
                          value={bookingData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          data-testid="booking-phone-input"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Service Needed *</label>
                      <Select
                        value={bookingData.serviceType}
                        onValueChange={(value) => handleInputChange("serviceType", value)}
                      >
                        <SelectTrigger data-testid="booking-service-select">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceTypes.map((service) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Project Details</label>
                      <Textarea
                        placeholder="Tell us about your project requirements, goals, and any specific questions you have..."
                        value={bookingData.projectDetails}
                        onChange={(e) => handleInputChange("projectDetails", e.target.value)}
                        rows={4}
                        data-testid="booking-details-textarea"
                      />
                    </div>

                    <Button
                      onClick={handleSubmitBooking}
                      disabled={!isFormValid() || isSubmitting}
                      className="w-full"
                      data-testid="submit-booking-button"
                    >
                      {isSubmitting ? "Booking..." : "Confirm Booking"}
                    </Button>

                    <div className="text-xs text-muted-foreground text-center space-y-1">
                      <p>* Required fields</p>
                      <p>💬 Free 30-minute consultation • 🔒 No commitment required</p>
                    </div>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}