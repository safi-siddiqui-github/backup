
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Settings, BarChart3, Filter } from "lucide-react";
import { moduleRegistry, getModulesByCategory, ModuleDefinition } from "@/config/moduleRegistry";

const Modules = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const modulesByCategory = getModulesByCategory();
  const categories = ["all", ...Object.keys(modulesByCategory)];

  const filteredModules = moduleRegistry.filter(module => {
    const matchesSearch = module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || module.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/10 text-green-700 dark:text-green-300 border-green-500/20';
      case 'beta': return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 border-yellow-500/20';
      case 'coming-soon': return 'bg-muted text-muted-foreground border-border';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Event Management Modules</h1>
        <p className="text-muted-foreground text-lg">
          Access and manage all your event modules from one central location
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-primary">{moduleRegistry.length}</div>
              <div className="text-sm text-muted-foreground">Total Modules</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-primary">
                {moduleRegistry.filter(m => m.status === 'active').length}
              </div>
              <div className="text-sm text-muted-foreground">Active Modules</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-primary">
                {Object.keys(modulesByCategory).length}
              </div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-primary">
                {moduleRegistry.filter(m => m.status === 'beta').length}
              </div>
              <div className="text-sm text-muted-foreground">Beta Features</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search modules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-border bg-background text-foreground rounded-md px-3 py-2 text-sm min-w-[150px]"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map((module) => (
          <Card key={module.id} className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${module.color} text-white`}>
                    <module.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{module.name}</CardTitle>
                    <Badge className={getStatusColor(module.status)} variant="secondary">
                      {module.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <CardDescription className="text-sm mt-2">
                {module.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-4">
                {/* Features */}
                <div>
                  <div className="text-xs font-medium text-muted-foreground mb-2">KEY FEATURES</div>
                  <div className="flex flex-wrap gap-1">
                    {module.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {module.features.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{module.features.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button asChild className="flex-1">
                    <Link to={module.route}>
                      Open Module
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredModules.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-2">No modules found</div>
          <p className="text-muted-foreground">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
};

export default Modules;
