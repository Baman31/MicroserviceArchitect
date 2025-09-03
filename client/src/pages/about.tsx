import { Helmet } from "react-helmet-async";
import { Award, Users, Target, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in every project, delivering solutions that exceed expectations and drive real business value."
  },
  {
    icon: Users,
    title: "Partnership",
    description: "We build long-term partnerships with our clients, becoming an extension of their team and sharing in their success."
  },
  {
    icon: Target,
    title: "Results-Driven",
    description: "Our focus is always on delivering measurable results that contribute to our clients' growth and success."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We embrace cutting-edge technologies and innovative approaches to solve complex business challenges."
  }
];

const teamMembers = [
  {
    name: "Rajesh Sharma",
    position: "Founder & CEO",
    bio: "10+ years of experience in IT solutions and business strategy. Expert in digital transformation and team leadership.",
    skills: ["Strategic Planning", "Digital Transformation", "Team Leadership"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
  },
  {
    name: "Priya Gupta",
    position: "CTO & Lead Developer",
    bio: "Full-stack developer with expertise in modern web technologies and cloud architecture. Passionate about clean code and scalable solutions.",
    skills: ["Full-Stack Development", "Cloud Architecture", "DevOps"],
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
  },
  {
    name: "Amit Jain",
    position: "Digital Marketing Specialist",
    bio: "SEO and digital marketing expert with a proven track record of driving online growth for businesses across various industries.",
    skills: ["SEO Strategy", "Digital Marketing", "Analytics"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
  }
];

const milestones = [
  { year: "2022", title: "Company Founded", description: "TechVantage Solutions was established in Jaipur with a vision to empower local businesses with cutting-edge technology." },
  { year: "2023", title: "Team Expansion", description: "Grew our team to include specialized developers, designers, and digital marketing experts." },
  { year: "2024", title: "50+ Projects", description: "Successfully completed over 50 projects for clients across Rajasthan and India." },
  { year: "2024", title: "Service Expansion", description: "Expanded our services to include cloud solutions, DevOps, and advanced web optimization." }
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us - TechVantage Solutions</title>
        <meta name="description" content="Learn about TechVantage Solutions, our mission, team, and values. Based in Jaipur, we're committed to delivering exceptional IT solutions for businesses across Rajasthan." />
      </Helmet>

      <div data-testid="about-page">
        {/* Hero Section */}
        <section className="py-20 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold font-poppins mb-6" data-testid="about-title">
                About TechVantage Solutions
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8" data-testid="about-description">
                Your trusted digital engineering partner, committed to empowering businesses across Rajasthan with innovative IT solutions that drive growth and success.
              </p>
            </div>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div data-testid="company-story">
                <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="story-title">
                  Our Story
                </h2>
                <p className="text-lg text-muted-foreground mb-6" data-testid="story-paragraph-1">
                  Founded in 2022 in the heart of Jaipur, TechVantage Solutions emerged from a simple yet powerful vision: to bridge the gap between traditional businesses and cutting-edge technology. We recognized that many businesses in Rajasthan had tremendous potential but lacked access to world-class IT solutions.
                </p>
                <p className="text-lg text-muted-foreground mb-6" data-testid="story-paragraph-2">
                  What started as a small team of passionate developers has grown into a comprehensive IT services company. We've had the privilege of working with businesses ranging from local startups to established enterprises, helping them navigate their digital transformation journey.
                </p>
                <p className="text-lg text-muted-foreground mb-8" data-testid="story-paragraph-3">
                  Today, we're proud to be recognized as a trusted technology partner, known for our commitment to excellence, innovation, and results. Our success is measured by the success of our clients, and we continue to evolve our services to meet the changing needs of the digital landscape.
                </p>
                <Button asChild data-testid="button-view-portfolio">
                  <Link href="/portfolio">View Our Work</Link>
                </Button>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Team collaboration at TechVantage Solutions" 
                  className="rounded-xl shadow-lg w-full h-auto" 
                  data-testid="story-image"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="values-title">
                Our Core Values
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="values-description">
                The principles that guide everything we do and shape our relationships with clients and partners
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center" data-testid={`value-${index}`}>
                  <CardHeader>
                    <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl" data-testid={`value-${index}-title`}>{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground" data-testid={`value-${index}-description`}>{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="team-title">
                Meet Our Team
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="team-description">
                The talented individuals who make TechVantage Solutions a trusted technology partner
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="text-center" data-testid={`team-member-${index}`}>
                  <CardHeader>
                    <div className="mb-4">
                      <img 
                        src={member.image} 
                        alt={`${member.name} headshot`} 
                        className="w-32 h-32 rounded-full mx-auto object-cover" 
                        data-testid={`team-member-${index}-image`}
                      />
                    </div>
                    <CardTitle className="text-xl" data-testid={`team-member-${index}-name`}>{member.name}</CardTitle>
                    <p className="text-primary font-medium" data-testid={`team-member-${index}-position`}>{member.position}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4" data-testid={`team-member-${index}-bio`}>{member.bio}</p>
                    <div className="flex flex-wrap gap-2 justify-center" data-testid={`team-member-${index}-skills`}>
                      {member.skills.map((skill) => (
                        <span key={skill} className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 bg-muted">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="timeline-title">
                Our Journey
              </h2>
              <p className="text-xl text-muted-foreground" data-testid="timeline-description">
                Key milestones in our company's growth and evolution
              </p>
            </div>

            <div className="space-y-8" data-testid="timeline">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-4" data-testid={`milestone-${index}`}>
                  <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">
                    {milestone.year}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2" data-testid={`milestone-${index}-title`}>
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground" data-testid={`milestone-${index}-description`}>
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div data-testid="location-info">
                <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="location-title">
                  Based in the Pink City
                </h2>
                <p className="text-lg text-muted-foreground mb-6" data-testid="location-description-1">
                  Our headquarters is located in Malviya Nagar, Jaipur - the vibrant capital city of Rajasthan. Being based in Jaipur allows us to serve businesses across the state while maintaining close relationships with our local clients.
                </p>
                <p className="text-lg text-muted-foreground mb-6" data-testid="location-description-2">
                  We're proud to contribute to the growing tech ecosystem in Rajasthan and help put Jaipur on the map as a destination for quality IT services. Our local presence ensures we understand the unique needs and challenges of businesses in our region.
                </p>
                <div className="space-y-4" data-testid="location-details">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Serving clients across Rajasthan and India</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Remote collaboration capabilities</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>On-site consultations available</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="h-80 bg-muted rounded-xl flex items-center justify-center" data-testid="location-map">
                  <p className="text-muted-foreground">Interactive map showing our Jaipur location</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="cta-title">
              Ready to Work With Us?
            </h2>
            <p className="text-xl text-blue-100 mb-8" data-testid="cta-description">
              Let's discuss how we can help transform your business with innovative technology solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90" data-testid="button-get-in-touch">
                <Link href="/contact">Get In Touch</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary" data-testid="button-view-services">
                <Link href="/#services">View Our Services</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
