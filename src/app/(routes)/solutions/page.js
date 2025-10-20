"use client";

import React, { useState } from "react";
import { 
  FiCode, 
  FiBook, 
  FiTrendingUp, 
  FiUsers, 
  FiCheck,
  FiArrowRight,
  FiSearch,
  FiFilter,
  FiStar,
  FiAward,
  FiImage
} from 'react-icons/fi';
import { 
  HiOutlineLightningBolt,
  HiOutlineAcademicCap,
  HiOutlineColorSwatch,
  HiOutlineChartBar,
  HiOutlineDesktopComputer
} from 'react-icons/hi';

const solutionsData = [
  {
    category: "IT & Software Development",
    description: "For IT and software development teams, One Orbit offers robust tools for project tracking, task management, and code collaboration. Integrate with your favorite development tools, manage sprints, and keep your team aligned on project goals.",
    icon: HiOutlineDesktopComputer,
    color: "from-blue-500 to-cyan-500",
    items: [
      {
        title: "Agile Project Management",
        description: "Manage sprints, track progress, and adapt to changing requirements with ease.",
        image: "/solutionImages/solution_1.png",
        features: ["Sprint Planning", "Burndown Charts", "Backlog Management", "Velocity Tracking"]
      },
      {
        title: "Code Collaboration",
        description: "Collaborate on code, review changes, and ensure code quality with integrated tools.",
        image: "/solutionImages/solution_2.png",
        features: ["Code Review", "Version Control", "CI/CD Integration", "Quality Gates"]
      },
      {
        title: "Bug Tracking",
        description: "Identify, track, and resolve bugs efficiently to maintain software quality and reliability.",
        image: "/solutionImages/solution_3.png",
        features: ["Issue Tracking", "Priority Management", "Resolution Workflow", "Quality Metrics"]
      },
    ],
  },
  {
    category: "Education & Research",
    description: "In education and research, One Orbit facilitates collaboration on research projects, course management, and student engagement. Share resources, track progress, and communicate effectively with students and colleagues.",
    icon: HiOutlineAcademicCap,
    color: "from-green-500 to-emerald-500",
    items: [
      {
        title: "Research Project Management",
        description: "Organize research projects, manage tasks, and track milestones effectively across teams.",
        image: "/solutionImages/solution_4.png",
        features: ["Grant Management", "Publication Tracking", "Team Collaboration", "Milestone Planning"]
      },
      {
        title: "Course Management",
        description: "Create and manage courses, share materials, and track student progress with intuitive tools.",
        image: "/solutionImages/solution_5.png",
        features: ["Curriculum Planning", "Grade Management", "Resource Sharing", "Progress Analytics"]
      },
      {
        title: "Student Collaboration",
        description: "Facilitate student collaboration, discussions, and group projects in a unified platform.",
        image: "/solutionImages/solution_6.png",
        features: ["Group Projects", "Discussion Forums", "Peer Review", "Knowledge Sharing"]
      },
    ],
  },
  {
    category: "Marketing & Creative Teams",
    description: "For marketing and creative teams, One Orbit provides tools for campaign planning, content management, and creative reviews. Streamline your workflows, manage assets, and ensure your team stays on brand.",
    icon: HiOutlineColorSwatch,
    color: "from-purple-500 to-pink-500",
    items: [
      {
        title: "Campaign Planning",
        description: "Plan and execute marketing campaigns, track budgets, and measure performance metrics.",
        image: "/solutionImages/solution_7.png",
        features: ["Campaign Calendar", "Budget Tracking", "ROI Analysis", "Multi-channel Coordination"]
      },
      {
        title: "Content Management",
        description: "Manage content assets, collaborate on drafts, and ensure brand consistency across all channels.",
        image: "/solutionImages/solution_8.png",
        features: ["Asset Library", "Content Calendar", "Brand Guidelines", "Approval Workflows"]
      },
      {
        title: "Creative Reviews",
        description: "Review and approve creative work, provide feedback, and manage revisions efficiently.",
        image: "/solutionImages/solution_9.png",
        features: ["Visual Feedback", "Version Control", "Client Approvals", "Creative Briefs"]
      },
    ],
  },
];

const Solutions = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [imageErrors, setImageErrors] = useState({});

  const categories = [
    { id: "all", name: "All Solutions", icon: FiStar, count: solutionsData.reduce((acc, curr) => acc + curr.items.length, 0) },
    { id: "IT & Software Development", name: "IT & Software", icon: HiOutlineDesktopComputer, count: solutionsData[0].items.length },
    { id: "Education & Research", name: "Education", icon: HiOutlineAcademicCap, count: solutionsData[1].items.length },
    { id: "Marketing & Creative Teams", name: "Marketing", icon: HiOutlineColorSwatch, count: solutionsData[2].items.length },
  ];

  const handleImageError = (itemId) => {
    setImageErrors(prev => ({ ...prev, [itemId]: true }));
  };

  const filteredSolutions = solutionsData.filter(section => 
    activeCategory === "all" || section.category === activeCategory
  ).map(section => ({
    ...section,
    items: section.items.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })).filter(section => section.items.length > 0);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-800 mb-6">
            <FiAward className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Industry Solutions
            </span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-blue-900 dark:from-white dark:to-blue-200 bg-clip-text text-transparent">
              Solutions for Every
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Team & Industry
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            One Orbit adapts to your industry unique needs with specialized tools and workflows 
            that enhance collaboration and drive productivity across your organization.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Search Bar */}
            <div className="lg:col-span-3">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search solutions by feature, industry, or capability..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white shadow-sm"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="relative">
              <FiFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 appearance-none text-gray-900 dark:text-white"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent shadow-lg'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{category.name}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  activeCategory === category.id
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {category.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Solutions Content */}
        <div className="space-y-20">
          {filteredSolutions.map((section, sectionIndex) => {
            const Icon = section.icon;
            return (
              <section key={sectionIndex} className="scroll-mt-20">
                {/* Section Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-14 h-14 bg-gradient-to-r ${section.color} rounded-2xl flex items-center justify-center`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                      {section.category}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mt-2 max-w-3xl">
                      {section.description}
                    </p>
                  </div>
                </div>

                {/* Solutions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {section.items.map((item, itemIndex) => {
                    const itemId = `${sectionIndex}-${itemIndex}`;
                    const hasImageError = imageErrors[itemId];
                    
                    return (
                      <div
                        key={itemId}
                        className="group bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:scale-105 overflow-hidden"
                      >
                        {/* Image Container with actual image tag */}
                        <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 overflow-hidden">
                          {!hasImageError && item.image ? (
                            <>
                              {/* Actual Image */}
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                onError={() => handleImageError(itemId)}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </>
                          ) : (
                            /* Fallback when image fails to load */
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                  <HiOutlineLightningBolt className="w-8 h-8 text-gray-400" />
                                </div>
                                <div className="flex items-center gap-2 text-gray-500">
                                  <FiImage className="w-4 h-4" />
                                  <span className="text-sm font-medium">Image Preview</span>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {/* Hover Action Button */}
                          <div className="absolute top-4 right-4">
                            <div className="w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                              <FiArrowRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </div>
                          </div>
                          
                          {/* Preview Label */}
                          <div className="absolute bottom-4 left-4">
                            <div className="flex items-center gap-2 text-white/90">
                              <FiImage className="w-4 h-4" />
                              <span className="text-sm font-medium">Preview</span>
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                            {item.title}
                          </h3>
                          
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                            {item.description}
                          </p>

                          {/* Features List */}
                          <div className="space-y-2">
                            {item.features.map((feature, featureIdx) => (
                              <div key={featureIdx} className="flex items-center gap-3">
                                <div className="w-5 h-5 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                  <FiCheck className="w-3 h-3 text-green-600 dark:text-green-400" />
                                </div>
                                <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* CTA Button */}
                          <button className="w-full mt-6 py-3 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                            Learn More
                            <FiArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* No Results State */}
        {filteredSolutions.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <FiSearch className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No solutions found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {searchTerm 
                  ? "Try adjusting your search criteria or browse all categories."
                  : "No solutions available for the selected category."
                }
              </p>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Ready to Transform Your Workflow?
              </h2>
              <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
                Join thousands of teams already using One Orbit to streamline their operations and enhance collaboration.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-2xl hover:scale-105 transition-transform duration-300 shadow-lg">
                  Start Free Trial
                </button>
                <button className="px-8 py-4 bg-blue-500 text-white font-semibold rounded-2xl hover:scale-105 transition-transform duration-300 border border-blue-400">
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solutions;