import { useEffect, useState } from "react";

const stats = [
  { value: "50+", label: "Successful Projects", testId: "stat-projects" },
  { value: "95%", label: "Client Satisfaction Rate", testId: "stat-satisfaction" },
  { value: "2+", label: "Years of Excellence", testId: "stat-experience" },
  { value: "24/7", label: "Support Available", testId: "stat-support" }
];

export default function Statistics() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('stats-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats-section" className="py-20 bg-primary text-white" data-testid="statistics-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="statistics-title">Our Track Record</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto" data-testid="statistics-description">
            Numbers that speak to our commitment to excellence and client satisfaction.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`text-center ${isVisible ? 'animate-count-up' : ''}`}
              data-testid={stat.testId}
            >
              <div className="text-4xl lg:text-5xl font-bold font-poppins mb-2" data-testid={`${stat.testId}-value`}>
                {stat.value}
              </div>
              <div className="text-blue-100 text-lg" data-testid={`${stat.testId}-label`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
