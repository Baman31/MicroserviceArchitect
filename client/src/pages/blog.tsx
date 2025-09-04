import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Calendar, User, ArrowRight, Search, Clock, Eye, BookOpen, TrendingUp, Sparkles, Filter } from "lucide-react";
import { BlogPost } from "@shared/schema";
import { Link } from "wouter";
import { motion } from "framer-motion";
import OptimizedImage from "@/components/ui/optimized-image";

const categories = [
  { value: "all", label: "All Posts", icon: BookOpen, count: 0 },
  { value: "technical", label: "Technical", icon: BookOpen, count: 0 },
  { value: "industry-insights", label: "Industry Insights", icon: TrendingUp, count: 0 },
  { value: "case-studies", label: "Case Studies", icon: Sparkles, count: 0 }
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: blogPosts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog-posts'],
  });

  // Update category counts
  const categoriesWithCounts = categories.map(cat => ({
    ...cat,
    count: cat.value === "all" 
      ? blogPosts.filter(post => post.published).length
      : blogPosts.filter(post => post.published && post.category === cat.value).length
  }));

  const filteredPosts = blogPosts
    .filter(post => post.published)
    .filter(post => selectedCategory === "all" || post.category === selectedCategory)
    .filter(post => 
      searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

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
        <section className="relative py-24 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1),transparent_70%)]"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <BookOpen className="h-4 w-4" />
                <span className="text-sm font-medium">Knowledge Hub</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold font-poppins mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent" data-testid="blog-title">
                Insights & Articles
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12" data-testid="blog-description">
                Discover the latest trends, expert insights, and practical guides to help you stay ahead in the digital landscape.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles, topics, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg bg-white/95 backdrop-blur-sm border-0 rounded-xl shadow-lg"
                  data-testid="blog-search-input"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filter & View Controls */}
        <section className="py-8 bg-muted/30 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Category Filters */}
              <div className="flex items-center gap-4" data-testid="blog-filters">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Filter className="h-4 w-4" />
                  <span>Filter by:</span>
                </div>
                <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-auto">
                  <TabsList className="bg-background">
                    {categoriesWithCounts.map((category) => {
                      const IconComponent = category.icon;
                      return (
                        <TabsTrigger
                          key={category.value}
                          value={category.value}
                          className="flex items-center gap-2"
                          data-testid={`filter-${category.value}`}
                        >
                          <IconComponent className="h-4 w-4" />
                          <span>{category.label}</span>
                          {category.count > 0 && (
                            <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                              {category.count}
                            </Badge>
                          )}
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>
                </Tabs>
              </div>
              
              {/* Results Info */}
              <div className="text-sm text-muted-foreground">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="blog-loading">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse overflow-hidden">
                    <div className="w-full h-56 bg-gradient-to-br from-muted to-muted/80"></div>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="h-6 w-16 bg-muted rounded-full"></div>
                        <div className="h-4 w-20 bg-muted rounded"></div>
                      </div>
                      <div className="h-7 bg-muted rounded mb-2"></div>
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <div className="h-4 bg-muted rounded"></div>
                        <div className="h-4 bg-muted rounded w-5/6"></div>
                        <div className="h-4 bg-muted rounded w-4/6"></div>
                      </div>
                      <div className="flex gap-2 mb-4">
                        <div className="h-6 w-12 bg-muted rounded-full"></div>
                        <div className="h-6 w-16 bg-muted rounded-full"></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="h-4 bg-muted rounded w-24"></div>
                        <div className="h-8 w-20 bg-muted rounded"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredPosts.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" 
                data-testid="blog-grid"
              >
                {filteredPosts.map((post, index) => {
                  const categoryData = categoriesWithCounts.find(c => c.value === post.category);
                  const CategoryIcon = categoryData?.icon || BookOpen;
                  
                  return (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-card to-card/95 hover:-translate-y-1" data-testid={`blog-post-${post.id}`}>
                        <div className="relative overflow-hidden">
                          {post.imageUrl ? (
                            <OptimizedImage
                              src={post.imageUrl} 
                              alt={post.title} 
                              className="w-full h-56 group-hover:scale-105 transition-transform duration-300" 
                              width={400}
                              height={224}
                              lazy={true}
                            />
                          ) : (
                            <div className="w-full h-56 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                              <CategoryIcon className="h-16 w-16 text-primary/30" />
                            </div>
                          )}
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-background/90 text-foreground border-0 shadow-md" data-testid={`blog-post-${post.id}-category`}>
                              <CategoryIcon className="h-3 w-3 mr-1" />
                              {categoryData?.label || post.category}
                            </Badge>
                          </div>
                        </div>
                        
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3" data-testid={`blog-post-${post.id}-meta`}>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(post.createdAt)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>5 min read</span>
                            </div>
                          </div>
                          <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2 leading-tight" data-testid={`blog-post-${post.id}-title`}>
                            {post.title}
                          </CardTitle>
                        </CardHeader>
                        
                        <CardContent className="pt-0">
                          <CardDescription className="mb-4 line-clamp-3 text-base leading-relaxed" data-testid={`blog-post-${post.id}-excerpt`}>
                            {post.excerpt}
                          </CardDescription>
                          
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6" data-testid={`blog-post-${post.id}-tags`}>
                              {post.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                                  {tag}
                                </Badge>
                              ))}
                              {post.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{post.tags.length - 3} more
                                </Badge>
                              )}
                            </div>
                          )}
                          
                          <Separator className="mb-4" />
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                                <User className="h-4 w-4 text-white" />
                              </div>
                              <span className="font-medium">TechVantage Team</span>
                            </div>
                            <Button variant="ghost" size="sm" className="group/btn hover:bg-primary hover:text-primary-foreground transition-all" data-testid={`blog-post-${post.id}-read-more`}>
                              Read Article
                              <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-20" 
                data-testid="blog-empty"
              >
                <div className="mb-8">
                  <div className="bg-gradient-to-br from-muted to-muted/80 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Search className="w-16 h-16 text-muted-foreground/50" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">
                    {searchQuery ? "No Results Found" : "No Articles Available"}
                  </h3>
                  <p className="text-muted-foreground max-w-lg mx-auto text-lg leading-relaxed">
                    {searchQuery 
                      ? `No articles match your search for "${searchQuery}". Try different keywords or browse our categories.`
                      : selectedCategory === "all" 
                        ? "We're working on creating valuable content for you. Check back soon for insightful articles and updates!"
                        : `No articles found in the ${categoriesWithCounts.find(c => c.value === selectedCategory)?.label} category yet.`
                    }
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {(selectedCategory !== "all" || searchQuery) && (
                    <Button 
                      onClick={() => {
                        setSelectedCategory("all");
                        setSearchQuery("");
                      }} 
                      variant="default"
                      size="lg"
                      data-testid="button-view-all-posts"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      View All Articles
                    </Button>
                  )}
                  <Button asChild variant="outline" size="lg" data-testid="button-browse-services">
                    <Link href="/#services">
                      <Eye className="h-4 w-4 mr-2" />
                      Browse Our Services
                    </Link>
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Featured Topics */}
        <section className="py-24 bg-gradient-to-br from-muted/50 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 mb-6">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">Content Categories</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold font-poppins mb-6" data-testid="topics-title">
                What We Write About
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="topics-description">
                Explore our comprehensive content library covering everything from technical tutorials to strategic insights
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Technical Tutorials",
                  description: "Step-by-step guides on web development, programming languages, frameworks, and industry best practices.",
                  icon: BookOpen,
                  gradient: "from-blue-500 to-cyan-500",
                  testId: "topic-technical"
                },
                {
                  title: "Industry Insights",
                  description: "Analysis of technology trends, market insights, and predictions for the future of digital innovation.",
                  icon: TrendingUp,
                  gradient: "from-purple-500 to-pink-500",
                  testId: "topic-insights"
                },
                {
                  title: "Case Studies",
                  description: "Real-world examples of our projects, challenges we solved, and measurable results achieved for clients.",
                  icon: Sparkles,
                  gradient: "from-green-500 to-teal-500",
                  testId: "topic-case-studies"
                }
              ].map((topic, index) => {
                const IconComponent = topic.icon;
                return (
                  <motion.div
                    key={topic.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1 bg-gradient-to-br from-card to-card/95" data-testid={topic.testId}>
                      <CardHeader className="pb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${topic.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {topic.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base leading-relaxed">
                          {topic.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="relative py-24 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-[radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.1),transparent_70%)]"></div>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <BookOpen className="h-4 w-4" />
              <span className="text-sm font-medium">Stay Informed</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold font-poppins mb-6" data-testid="newsletter-title">
              Never Miss an Update
            </h2>
            <p className="text-xl text-blue-100 mb-12 leading-relaxed" data-testid="newsletter-description">
              Get the latest insights, tutorials, and industry news delivered straight to your inbox. Join our community of tech enthusiasts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <Input
                type="email" 
                placeholder="Enter your email address" 
                className="px-6 py-4 text-lg bg-white/95 backdrop-blur-sm border-0 rounded-xl shadow-lg flex-1"
                data-testid="newsletter-email-input"
              />
              <Button 
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
                data-testid="newsletter-subscribe-button"
              >
                Subscribe Now
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
            <p className="text-sm text-blue-100/80 mt-4">
              Join 500+ subscribers • No spam, unsubscribe anytime
            </p>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-background to-muted/30">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-card via-card/95 to-card/90 p-8 lg:p-12">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 mb-6">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">Expert Consultation</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold font-poppins mb-6" data-testid="cta-title">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed" data-testid="cta-description">
                  Get personalized solutions, strategic insights, and expert guidance tailored to your unique business challenges and goals.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <Button asChild size="lg" className="px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all" data-testid="button-get-consultation">
                    <Link href="/contact">
                      <User className="h-5 w-5 mr-2" />
                      Get Free Consultation
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold border-2 hover:bg-primary hover:text-primary-foreground transition-all" data-testid="button-view-services">
                    <Link href="/#services">
                      <Eye className="h-5 w-5 mr-2" />
                      Explore Our Services
                    </Link>
                  </Button>
                </div>
                <div className="mt-8 pt-8 border-t border-muted">
                  <p className="text-sm text-muted-foreground">
                    ✓ Free 30-minute consultation ✓ Custom solutions ✓ Expert team ✓ Proven results
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </section>
      </div>
    </>
  );
}