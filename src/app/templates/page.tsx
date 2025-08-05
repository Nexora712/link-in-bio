"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, Filter, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { themeConfigs } from "@/lib/themes/theme-mappings";
import { useAuth } from '@/hooks/use-auth';

// Helper functions to generate missing properties
const getCategoryFromId = (id: string): string => {
  const categories: Record<string, string> = {
    'anime': 'Creative',
    'krishna': 'Spiritual',
    'minimal': 'Minimal',
    'modern': 'Professional',
    'nature': 'Creative',
    'sunset': 'Creative',
    'dark': 'Minimal',
    'ocean-breeze': 'Creative',
    'sunset-glow': 'Creative',
    'forest-hike': 'Creative',
  };
  return categories[id] || 'Minimal';
};

const getTagsFromId = (id: string): string[] => {
  const tags: Record<string, string[]> = {
    'anime': ['vibrant', 'creative', 'colorful'],
    'krishna': ['spiritual', 'peaceful', 'warm'],
    'minimal': ['clean', 'modern', 'simple'],
    'modern': ['professional', 'clean', 'business'],
    'nature': ['organic', 'fresh', 'natural'],
    'sunset': ['warm', 'vibrant', 'colorful'],
    'dark': ['sleek', 'modern', 'dark'],
    'ocean-breeze': ['fresh', 'cool', 'calm'],
    'sunset-glow': ['warm', 'inviting', 'colorful'],
    'forest-hike': ['earthy', 'natural', 'organic'],
  };
  return tags[id] || ['modern', 'clean'];
};

const getCreatedAtFromId = (id: string): Date => {
  const dates: Record<string, string> = {
    'anime': '2024-01-15',
    'krishna': '2024-01-20',
    'minimal': '2024-01-10',
    'modern': '2024-01-12',
    'nature': '2024-01-18',
    'sunset': '2024-01-25',
    'dark': '2024-01-08',
    'ocean-breeze': '2024-02-01',
    'sunset-glow': '2024-02-05',
    'forest-hike': '2024-02-10',
  };
  return new Date(dates[id] || '2024-01-01');
};

const getPopularityFromId = (id: string): number => {
  const popularity: Record<string, number> = {
    'anime': 85,
    'krishna': 75,
    'minimal': 95,
    'modern': 90,
    'nature': 80,
    'sunset': 88,
    'dark': 92,
    'ocean-breeze': 78,
    'sunset-glow': 82,
    'forest-hike': 76,
  };
  return popularity[id] || 50;
};

const templates = Object.values(themeConfigs).map((theme) => ({
  ...theme,
  category: getCategoryFromId(theme.id),
  tags: getTagsFromId(theme.id),
  createdAt: getCreatedAtFromId(theme.id),
  popularity: getPopularityFromId(theme.id),
}));

const categories = ["All", "Minimal", "Dark", "Bold", "Personal", "Professional", "Creative"];

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const { user } = useAuth();
  const router = useRouter();

  const filteredTemplates = useMemo(() => {
    let filtered = templates;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(template => template.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(query) ||
        template.description.toLowerCase().includes(query) ||
        template.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sort templates
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (b.createdAt || 0) - (a.createdAt || 0);
        case "oldest":
          return (a.createdAt || 0) - (b.createdAt || 0);
        case "name":
          return a.name.localeCompare(b.name);
        default: // popular
          return (b.popularity || 0) - (a.popularity || 0);
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  const useTemplate = useCallback((themeId: string) => {
    try {
      localStorage.setItem('selected-theme', themeId);
    } catch {}
    
    if (user) {
      router.push(`/dashboard/builder?theme=${encodeURIComponent(themeId)}`);
    } else {
      router.push(`/builder?theme=${encodeURIComponent(themeId)}`);
    }
  }, [router, user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
            Choose Your Template
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select from our collection of professionally designed templates to create your perfect LinkBio page
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search templates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex gap-2 flex-wrap">
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border rounded-md bg-background"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name">Alphabetical</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Templates Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden">
                    <div className={`absolute inset-0 ${template.styles.background}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-lg font-semibold">{template.name}</h3>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {template.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {template.category}
                      </span>
                      <Button
                        size="sm"
                        onClick={() => useTemplate(template.id)}
                        className="gap-2"
                      >
                        Use Template
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {filteredTemplates.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground text-lg">
              No templates found matching your criteria.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
