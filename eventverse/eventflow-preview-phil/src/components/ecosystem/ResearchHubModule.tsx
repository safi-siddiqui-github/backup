
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Microscope, BookOpen, Users, Award, TrendingUp, Lightbulb } from "lucide-react";

const ResearchHubModule = () => {
  const [researchMetrics] = useState({
    activeProjects: 47,
    publishedPapers: 23,
    patents: 156,
    collaborations: 89
  });

  const [activeResearch] = useState([
    {
      title: "Neural Interfaces for Event Accessibility",
      status: "In Progress",
      progress: 65,
      team: "MIT Collaboration",
      category: "Accessibility"
    },
    {
      title: "Quantum-Enhanced Event Matching",
      status: "Phase 2",
      progress: 40,
      team: "IBM Research",
      category: "AI/ML"
    },
    {
      title: "Sustainable Event Materials",
      status: "Pilot",
      progress: 80,
      team: "Stanford Materials Lab",
      category: "Sustainability"
    },
    {
      title: "Holographic Presence Technology",
      status: "Prototype",
      progress: 55,
      team: "Microsoft HoloLens",
      category: "Mixed Reality"
    }
  ]);

  const [publications] = useState([
    {
      title: "AI-Driven Event Personalization: A Machine Learning Approach",
      journal: "ACM Computing Surveys",
      year: "2024",
      citations: 67,
      impact: "High"
    },
    {
      title: "Blockchain-Based Ticketing Systems: Security and Scalability",
      journal: "IEEE Transactions on Technology",
      year: "2024",
      citations: 45,
      impact: "Medium"
    },
    {
      title: "Carbon Footprint Optimization in Large-Scale Events",
      journal: "Journal of Sustainable Computing",
      year: "2023",
      citations: 89,
      impact: "High"
    }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Research Hub</h1>
          <p className="text-gray-600 mt-2">Innovation research and academic partnerships</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-indigo-600">
          <Lightbulb className="w-4 h-4 mr-2" />
          Submit Research Proposal
        </Button>
      </div>

      {/* Research Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Microscope className="w-6 h-6 text-purple-600" />
              <div>
                <div className="text-xl font-bold">{researchMetrics.activeProjects}</div>
                <div className="text-xs text-gray-600">Active Projects</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <div>
                <div className="text-xl font-bold">{researchMetrics.publishedPapers}</div>
                <div className="text-xs text-gray-600">Published Papers</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-yellow-600" />
              <div>
                <div className="text-xl font-bold">{researchMetrics.patents}</div>
                <div className="text-xs text-gray-600">Patents Filed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-green-600" />
              <div>
                <div className="text-xl font-bold">{researchMetrics.collaborations}</div>
                <div className="text-xs text-gray-600">Collaborations</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Research Projects */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Microscope className="w-5 h-5 text-purple-600" />
            Active Research Projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeResearch.map((project, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{project.title}</h3>
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline">{project.status}</Badge>
                      <Badge variant="secondary">{project.category}</Badge>
                      <span className="text-sm text-gray-600">{project.team}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">Progress: {project.progress}%</span>
                      <Progress value={project.progress} className="w-32 h-2" />
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Publications & Patents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Recent Publications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {publications.map((paper, index) => (
                <div key={index} className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">{paper.title}</h4>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-700">{paper.journal} ({paper.year})</span>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{paper.impact} Impact</Badge>
                      <span className="text-blue-600">{paper.citations} citations</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-600" />
              Innovation Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Patent Applications</span>
                <span className="font-medium">156</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Granted Patents</span>
                <span className="font-medium">89</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Research Budget</span>
                <span className="font-medium">$12.4M</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">University Partners</span>
                <span className="font-medium">23</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Industry Collaborations</span>
                <span className="font-medium">67</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Innovation Awards</span>
                <span className="font-medium">14</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Research Focus Areas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            Research Focus Areas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <Microscope className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <h3 className="text-lg font-medium mb-2">AI & Machine Learning</h3>
              <p className="text-gray-600 mb-4">Advanced algorithms for event optimization</p>
              <Button variant="outline">12 Projects</Button>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-lg font-medium mb-2">Human-Computer Interaction</h3>
              <p className="text-gray-600 mb-4">Intuitive interfaces and accessibility</p>
              <Button variant="outline">8 Projects</Button>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <Lightbulb className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <h3 className="text-lg font-medium mb-2">Sustainability Tech</h3>
              <p className="text-gray-600 mb-4">Environmental impact reduction</p>
              <Button variant="outline">15 Projects</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResearchHubModule;
