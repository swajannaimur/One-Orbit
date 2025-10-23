// components/FAQ.jsx
"use client";
import React, { useState } from 'react';
import { 
  FiChevronDown, 
  FiChevronUp, 
  FiSearch,
  FiMessageCircle,
  FiBook,
  FiVideo,
  FiMail
} from 'react-icons/fi';
import { 
  HiOutlineLightningBolt,
  HiOutlineCurrencyDollar,
  HiOutlineShieldCheck,
  HiOutlineUserGroup
} from 'react-icons/hi';

const FaqSection = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openItems, setOpenItems] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    {
      id: 'general',
      name: 'General',
      icon: HiOutlineLightningBolt,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'pricing',
      name: 'Pricing & Plans',
      icon: HiOutlineCurrencyDollar,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'security',
      name: 'Security & Privacy',
      icon: HiOutlineShieldCheck,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'teams',
      name: 'Teams & Collaboration',
      icon: HiOutlineUserGroup,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const faqItems = {
    general: [
      {
        id: 1,
        question: "What is OneOrbit and how does it work?",
        answer: "OneOrbit is a comprehensive project management and team collaboration platform that helps teams plan, track, and deliver projects efficiently. It combines task management, real-time collaboration, time tracking, and reporting in one intuitive interface. Teams can create projects, assign tasks, set deadlines, track progress, and communicate seamlessly all within the platform."
      },
      {
        id: 2,
        question: "How is OneOrbit different from other project management tools?",
        answer: "OneOrbit stands out with its AI-powered automation, intuitive drag-and-drop interface, and seamless integration capabilities. Unlike other tools, we offer built-in time tracking, advanced analytics, and customizable workflows that adapt to your team's specific needs. Our platform is designed for both technical and non-technical teams, making collaboration effortless across departments."
      },
      {
        id: 3,
        question: "Can I import data from other project management tools?",
        answer: "Yes! OneOrbit provides seamless migration from popular tools like Trello, Asana, Jira, and Monday.com. We offer automated import tools, CSV upload options, and dedicated migration support to ensure a smooth transition. Most teams complete their migration in under 30 minutes with zero data loss."
      },
      {
        id: 4,
        question: "Is there a mobile app available?",
        answer: "Absolutely. OneOrbit offers native mobile apps for iOS and Android with full functionality. You can manage tasks, collaborate with your team, track time, and receive real-time notifications on the go. All mobile features sync instantly with the web platform."
      }
    ],
    pricing: [
      {
        id: 1,
        question: "What's included in the free plan?",
        answer: "Our free plan includes: Up to 5 team members, 3 active projects, basic task management, file sharing (up to 100MB per file), real-time chat, and basic reporting. It's perfect for small teams or those wanting to try OneOrbit before upgrading."
      },
      {
        id: 2,
        question: "Can I change or cancel my plan anytime?",
        answer: "Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes to your plan take effect immediately, and we'll prorate any charges. If you cancel, you'll retain access to your paid features until the end of your billing cycle."
      },
      {
        id: 3,
        question: "Do you offer discounts for non-profits or educational institutions?",
        answer: "We offer a 50% discount for registered non-profit organizations and educational institutions. Additionally, we provide free upgraded plans for student groups and classroom use. Contact our sales team with your documentation to get started."
      },
      {
        id: 4,
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans. All payments are processed securely through PCI-compliant systems. Enterprise customers can also request invoice-based billing."
      }
    ],
    security: [
      {
        id: 1,
        question: "How secure is my data with OneOrbit?",
        answer: "We take security seriously. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We're SOC 2 Type II certified, GDPR compliant, and undergo regular security audits. Our infrastructure is hosted on AWS with multiple layers of security and 24/7 monitoring."
      },
      {
        id: 2,
        question: "Where is my data stored?",
        answer: "You can choose between US, EU, or Asia-Pacific data centers during setup. All data remains within your selected region and complies with local data protection regulations. We never share or sell your data to third parties."
      },
      {
        id: 3,
        question: "What compliance certifications do you have?",
        answer: "OneOrbit is SOC 2 Type II certified, GDPR compliant, CCPA ready, and follows ISO 27001 standards. We're also working towards HIPAA compliance for healthcare customers. Regular third-party audits ensure we maintain these standards."
      },
      {
        id: 4,
        question: "Can I export my data if I decide to leave?",
        answer: "Yes, you can export all your data at any time in multiple formats (JSON, CSV, PDF). We provide comprehensive export tools that include projects, tasks, conversations, files, and reports. There are no lock-in periods or hidden fees for data export."
      }
    ],
    teams: [
      {
        id: 1,
        question: "How many team members can I add to my workspace?",
        answer: "The free plan supports up to 5 members. Professional plan supports up to 50 members, Business plan up to 200 members, and Enterprise plan has unlimited members. You can add or remove members at any time, and we offer bulk import tools for larger teams."
      },
      {
        id: 2,
        question: "Can I set different permission levels for team members?",
        answer: "Yes, OneOrbit offers granular permission controls. You can assign roles like Admin, Manager, Member, and Guest with custom permissions for each project. Control who can create tasks, edit projects, access sensitive data, or manage billing."
      },
      {
        id: 3,
        question: "How does real-time collaboration work?",
        answer: "Team members see updates instantly with our real-time sync technology. You can collaborate on tasks with comments, @mentions, file attachments, and live editing. Our activity feed keeps everyone informed, and smart notifications ensure important updates don't get missed."
      },
      {
        id: 4,
        question: "Can we use OneOrbit with external clients or contractors?",
        answer: "Absolutely. You can invite clients and contractors as Guest members with limited access to specific projects. They can view progress, add comments, and upload files without seeing internal team discussions or sensitive company information."
      }
    ]
  };

  const toggleItem = (itemId) => {
    setOpenItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const filteredItems = faqItems[activeCategory].filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const supportOptions = [
    {
      icon: FiMessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      available: "24/7"
    },
    {
      icon: FiBook,
      title: "Documentation",
      description: "Browse our comprehensive guides",
      action: "View Docs",
      available: "Always available"
    },
    {
      icon: FiVideo,
      title: "Video Tutorials",
      description: "Watch step-by-step tutorials",
      action: "Watch Videos",
      available: "50+ tutorials"
    },
    {
      icon: FiMail,
      title: "Email Support",
      description: "Get detailed help via email",
      action: "Send Email",
      available: "Response in 2 hours"
    }
  ];

  return (
    <section className="py-20 bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
            <FiMessageCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Frequently Asked Questions
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold bg-linear-to-r from-gray-900 to-blue-900 dark:from-white dark:to-blue-200 bg-clip-text text-transparent mb-6">
            Get Answers to
            <br />
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Common Questions
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Find quick answers to your questions about OneOrbit. Can't find what you're looking for? Our support team is here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left ${
                        activeCategory === category.id
                          ? 'bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 border border-transparent'
                      }`}
                    >
                      <div className={`w-10 h-10 bg-linear-to-r ${category.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {category.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Support */}
            <div className="bg-linear-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-3">Need More Help?</h3>
              <p className="text-blue-100 text-sm mb-4">
                Our support team is ready to assist you with any questions.
              </p>
              <button className="w-full bg-white text-blue-600 font-semibold py-3 rounded-xl hover:scale-105 transition-transform duration-300">
                Contact Support
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            
            {/* Search Bar */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search questions or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {filteredItems.map((item) => {
                const isOpen = openItems[item.id];
                return (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl"
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                        {item.question}
                      </h3>
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                        {isOpen ? (
                          <FiChevronUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        ) : (
                          <FiChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </button>
                    
                    <div className={`transition-all duration-300 overflow-hidden ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="p-6 pt-0 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {item.answer}
                        </p>
                        
                        {/* Follow-up Actions */}
                        <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-600">
                          <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                            Was this helpful?
                          </button>
                          <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium">
                            Share this answer
                          </button>
                          <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium">
                            Need more details?
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Support Options Grid */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Other Ways to Get Help
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {supportOptions.map((option, index) => {
                  const Icon = option.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {option.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        {option.description}
                      </p>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                        {option.available}
                      </div>
                      <button className="w-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-300">
                        {option.action}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;