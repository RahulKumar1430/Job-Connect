import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";

const fallbackJobs = [
  {
    title: "Frontend Developer",
    company: "TechSoft Inc.",
    location: "Gurugram",
    description: "Build interactive UI using React and Tailwind CSS.",
  },
  {
    title: "Backend Developer",
    company: "CodeSmiths",
    location: "Bangalore",
    description: "Work with Node.js and MongoDB to create APIs.",
  },
  {
    title: "Full Stack Engineer",
    company: "DevHive",
    location: "Delhi NCR",
    description: "End-to-end development using MERN stack.",
  },
  {
    title: "UI/UX Designer",
    company: "DesignEra",
    location: "Mumbai",
    description: "Design modern interfaces using Figma and Adobe XD.",
  },
  {
    title: "Software Intern",
    company: "StartUpX",
    location: "Remote",
    description: "Assist in building MVPs and learning best practices.",
  },
];

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setJobs(fallbackJobs);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      setJobs(fallbackJobs);
    }
  };

  const handleApply = (job) => {
    localStorage.setItem("selectedJob", JSON.stringify(job));
    const isLoggedIn = localStorage.getItem("user");
    navigate(isLoggedIn ? "/apply" : "/login");
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === "" || 
                          job.location.toLowerCase().includes(locationFilter.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  const locations = [...new Set(jobs.map(job => job.location))];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Section with Search */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Dream Job Today</h1>
        <p className="text-lg text-gray-600 mb-8">
          Browse through our latest job openings and take the next step in your career.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by job title, company or keywords..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Locations</option>
            {locations.map((loc, index) => (
              <option key={index} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Job Listings */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Available Job Openings</h2>
        
        {filteredJobs.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job, index) => (
              <Card 
                key={index} 
                className="border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:border-blue-200"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h2 className="text-xl font-semibold">{job.title}</h2>
                      <p className="text-sm font-medium text-gray-900">{job.company}</p>
                    </div>
                    <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {job.location === "Remote" ? "Remote" : "On-site"}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-5 line-clamp-3">{job.description}</p>
                  
                  <Button
                    onClick={() => handleApply(job)}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Briefcase className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search criteria</p>
            <Button 
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setLocationFilter("");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}