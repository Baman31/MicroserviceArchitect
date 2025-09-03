import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import { BlogPost } from "@shared/schema";
import { Link } from "wouter";

const categories = [
  { value: "all", label: "All Posts" },
  { value: "technical", label: "Technical" },
  { value: "industry-insights", label: "Industry Insights" },
  { value: "case-studies", label: "Case Studies" }
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: blogPosts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog-posts'],
  });

  const filteredPosts = selectedCategory === "all" 
    ? blogPosts.filter(post => post.published)
    : blogPosts.filter(post => post.published && post.category === selectedCategory);

  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return 'Unknown date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Helmet>
        <title>Blog - TechVantage Solutions</title>
        <meta name="description" content="Stay updated with the latest insights on web development, digital marketing, cloud solutions, and technology trends from TechVantage Solutions." />
      </Helmet>

      <div data-testid="blog-page">
        {/* Hero Section */}
        <section className="py-20 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold font-poppins mb-6" data-testid="blog-title">
                Our Blog
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8" data-testid="blog-description">
                Stay updated with the latest insights, trends, and best practices in web development, digital marketing, and technology.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-12 bg-background border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4 justify-center" data-testid="blog-filters">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.value)}
                  data-testid={`filter-${category.value}`}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="blog-loading">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="w-full h-48 bg-muted rounded-t-lg"></div>
                    <CardHeader>
                      <div className="h-6 bg-muted rounded mb-2"></div>
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-20 bg-muted rounded mb-4"></div>
                      <div className="flex justify-between items-center">
                        <div className="h-4 bg-muted rounded w-24"></div>
                        <div className="h-4 bg-muted rounded w-16"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="blog-grid">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow" data-testid={`blog-post-${post.id}`}>
                    {post.imageUrl && (
                      <img 
                        src={post.imageUrl} 
                        alt={post.title} 
                        className="w-full h-48 object-cover" 
                        data-testid={`blog-post-${post.id}-image`}
                      />
                    )}
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" data-testid={`blog-post-${post.id}-category`}>
                          {categories.find(c => c.value === post.category)?.label || post.category}
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground" data-testid={`blog-post-${post.id}-date`}>
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(post.createdAt)}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 line-clamp-2" data-testid={`blog-post-${post.id}-title`}>
                        {post.title}
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4 line-clamp-3" data-testid={`blog-post-${post.id}-excerpt`}>
                        {post.excerpt}
                      </p>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4" data-testid={`blog-post-${post.id}-tags`}>
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <User className="h-4 w-4 mr-1" />
                          TechVantage Team
                        </div>
                        <Button variant="ghost" size="sm" className="p-0 h-auto" data-testid={`blog-post-${post.id}-read-more`}>
                          Read More <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-20" data-testid="blog-empty">
                <div className="mb-6">
                  <div className="bg-muted w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-12 h-12 bg-muted-foreground/20 rounded"></div>
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">No Blog Posts Found</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    {selectedCategory === "all" 
                      ? "We're working on creating valuable content for you. Check back soon for insightful articles and updates!"
                      : `No posts found in the ${categories.find(c => c.value === selectedCategory)?.label} category.`
                    }
                  </p>
                </div>
                {selectedCategory !== "all" && (
                  <Button 
                    onClick={() => setSelectedCategory("all")} 
                    variant="outline"
                    data-testid="button-view-all-posts"
                  >
                    View All Posts
                  </Button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Featured Topics */}
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="topics-title">
                What We Write About
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="topics-description">
                Our blog covers a wide range of topics to help you stay ahead in the digital world
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card data-testid="topic-technical">
                <CardHeader>
                  <h3 className="text-xl font-semibold">Technical Tutorials</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Step-by-step guides on web development, programming languages, frameworks, and best practices.
                  </p>
                </CardContent>
              </Card>

              <Card data-testid="topic-insights">
                <CardHeader>
                  <h3 className="text-xl font-semibold">Industry Insights</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Analysis of industry trends, market insights, and predictions for the future of technology.
                  </p>
                </CardContent>
              </Card>

              <Card data-testid="topic-case-studies">
                <CardHeader>
                  <h3 className="text-xl font-semibold">Case Studies</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Real-world examples of our projects, challenges we solved, and results we achieved for clients.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-20 bg-primary text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="newsletter-title">
              Stay Updated
            </h2>
            <p className="text-xl text-blue-100 mb-8" data-testid="newsletter-description">
              Subscribe to our newsletter to get the latest insights and updates delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-3 rounded-md text-foreground flex-1"
                data-testid="newsletter-email-input"
              />
              <Button 
                className="bg-secondary hover:bg-secondary/90 text-white whitespace-nowrap"
                data-testid="newsletter-subscribe-button"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-6" data-testid="cta-title">
              Need Expert Advice?
            </h2>
            <p className="text-xl text-muted-foreground mb-8" data-testid="cta-description">
              Get personalized solutions for your business challenges with our expert consultation services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" data-testid="button-get-consultation">
                <Link href="/contact">Get Free Consultation</Link>
              </Button>
              <Button asChild variant="outline" size="lg" data-testid="button-view-services">
                <Link href="/#services">View Our Services</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
