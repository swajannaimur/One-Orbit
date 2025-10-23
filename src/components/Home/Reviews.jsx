// components/Reviews.jsx
"use client";
import React, { useState } from 'react';
import { 
  FiStar, 
  FiChevronLeft, 
  FiChevronRight,
  FiPlay,
  FiAward,
  FiTrendingUp,
  FiUsers,
  FiCheckCircle,
  FiSquare
} from 'react-icons/fi';
import { 
  HiOutlineLightningBolt,
  HiOutlineChartBar,
  HiOutlineShieldCheck
} from 'react-icons/hi';

const Reviews = () => {
  const [activeReview, setActiveReview] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');

  const overallStats = {
    rating: 4.9,
    totalReviews: 2847,
    breakdown: [5, 4, 3, 2, 1],
    features: [
      { name: 'Ease of Use', rating: 4.8 },
      { name: 'Customer Support', rating: 4.9 },
      { name: 'Features', rating: 4.7 },
      { name: 'Value for Money', rating: 4.6 }
    ]
  };

  const reviews = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Product Manager',
      company: 'TechCorp',
      avatar: '/avatars/sarah.jpg',
      rating: 5,
      date: '2 days ago',
      title: 'Transformed our remote team collaboration',
      content: 'OneOrbit has completely changed how our distributed team works together. The real-time collaboration features and intuitive interface reduced our meeting time by 60% while improving project visibility. Our team adoption was seamless thanks to the excellent onboarding.',
      likes: 42,
      verified: true,
      featured: true,
      category: 'teams'
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      role: 'CTO',
      company: 'StartupXYZ',
      avatar: '/avatars/marcus.jpg',
      rating: 5,
      date: '1 week ago',
      title: 'Scaled with us from 5 to 50 employees',
      content: 'We started with OneOrbit as a small team and it has gracefully scaled with us. The flexibility and powerful API integrations allowed us to customize workflows perfectly. Customer support is exceptional - they feel like part of our team.',
      likes: 28,
      verified: true,
      featured: true,
      category: 'growth'
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      role: 'Design Lead',
      company: 'CreativeCo',
      avatar: '/avatars/elena.jpg',
      rating: 5,
      date: '3 weeks ago',
      title: 'Design team adoption was instant',
      content: 'As a design lead, I appreciate how OneOrbit understands creative workflows. The visual project boards and seamless file sharing made collaboration with developers effortless. Our project delivery time improved by 45%.',
      likes: 35,
      verified: true,
      featured: false,
      category: 'design'
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Engineering Manager',
      company: 'ScaleUp Inc',
      avatar: '/avatars/david.jpg',
      rating: 4,
      date: '1 month ago',
      title: 'Great balance of power and simplicity',
      content: 'OneOrbit strikes the perfect balance between powerful features and ease of use. The automation features saved our engineering team countless hours. The mobile app could use some improvements, but overall excellent.',
      likes: 19,
      verified: true,
      featured: false,
      category: 'engineering'
    },
    {
      id: 5,
      name: 'Amanda Thompson',
      role: 'Marketing Director',
      company: 'GrowthLabs',
      avatar: '/avatars/amanda.jpg',
      rating: 5,
      date: '2 months ago',
      title: 'Marketing campaign management made easy',
      content: 'Managing complex marketing campaigns across multiple channels used to be chaotic. OneOrbit brought everything together in one platform. The analytics and reporting features are game-changing for our ROI tracking.',
      likes: 31,
      verified: true,
      featured: true,
      category: 'marketing'
    },
    {
      id: 6,
      name: 'James Wilson',
      role: 'Operations Manager',
      company: 'GlobalTech',
      avatar: '/avatars/james.jpg',
      rating: 5,
      date: '2 months ago',
      title: 'Enterprise-level security with startup agility',
      content: 'We evaluated 15+ tools before choosing OneOrbit. The security features met our enterprise requirements while maintaining the agility our teams need. The SOC 2 compliance and granular permissions were deciding factors.',
      likes: 24,
      verified: true,
      featured: false,
      category: 'enterprise'
    }
  ];

  const awards = [
    { name: 'Best Project Management 2024', provider: 'Tech Awards', icon: FiAward },
    { name: "Users' Choice Award", provider: 'G2 Crowd', icon: FiUsers },
    { name: 'Fastest Growing Product', provider: 'Product Hunt', icon: FiTrendingUp }
  ];

  const filters = [
    { id: 'all', label: 'All Reviews', count: reviews.length },
    { id: '5-star', label: '5 Stars', count: reviews.filter(r => r.rating === 5).length },
    { id: 'teams', label: 'Team Collaboration', count: reviews.filter(r => r.category === 'teams').length },
    { id: 'featured', label: 'Featured', count: reviews.filter(r => r.featured).length }
  ];

  const nextReview = () => {
    setActiveReview((prev) => (prev + 1) % filteredReviews.length);
  };

  const prevReview = () => {
    setActiveReview((prev) => (prev - 1 + filteredReviews.length) % filteredReviews.length);
  };

  const filteredReviews = reviews.filter(review => {
    if (activeFilter === 'all') return true;
    if (activeFilter === '5-star') return review.rating === 5;
    if (activeFilter === 'teams') return review.category === 'teams';
    if (activeFilter === 'featured') return review.featured;
    return true;
  });

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-linear-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-6">
            <FiStar className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
              Trusted by 10,000+ Teams
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold bg-linear-to-r from-gray-900 to-amber-900 dark:from-white dark:to-amber-200 bg-clip-text text-transparent mb-6">
            What Teams Are
            <br />
            <span className="bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Saying About Us
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Don't just take our word for it. See how teams across industries are transforming their workflow with OneOrbit.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 mb-16">
          
          {/* Stats Sidebar */}
          <div className="lg:col-span-1 top-0">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 sticky top-8">
              
              {/* Overall Rating */}
              <div className="text-center mb-8">
                <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                  {overallStats.rating}
                </div>
                <div className="flex justify-center mb-2">
                  {renderStars(Math.floor(overallStats.rating))}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {overallStats.totalReviews.toLocaleString()} reviews
                </div>
              </div>

              {/* Rating Breakdown */}
              <div className="space-y-3 mb-8">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-12">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{stars}</span>
                      <FiStar className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-amber-400 h-2 rounded-full"
                        style={{ 
                          width: `${(overallStats.breakdown[5-stars] / overallStats.totalReviews) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Feature Ratings */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Feature Ratings</h3>
                {overallStats.features.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{feature.name}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {feature.rating}
                      </span>
                      <FiStar className="w-4 h-4 text-amber-400 fill-amber-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Reviews Content */}
          <div className="lg:col-span-3">
            
            {/* Awards & Recognition */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {awards.map((award, index) => {
                const Icon = award.icon;
                return (
                  <div
                    key={index}
                    className="bg-linear-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 text-center"
                  >
                    <div className="w-12 h-12 bg-linear-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {award.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {award.provider}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Review Filters */}
            <div className="flex flex-wrap gap-3 mb-8">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 ${
                    activeFilter === filter.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300'
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <span className="font-medium">{filter.label}</span>
                  <span className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Featured Review Carousel */}
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
              <div className="relative h-96">
                {filteredReviews
                  .filter(review => review.featured)
                  .map((review, index) => (
                    <div
                      key={review.id}
                      className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                        index === activeReview
                          ? 'opacity-100 translate-x-0'
                          : index < activeReview
                          ? 'opacity-0 -translate-x-full'
                          : 'opacity-0 translate-x-full'
                      }`}
                    >
                      <div className="p-8 lg:p-12">
                        <div className="flex items-start gap-6">
                          {/* Quote Icon */}
                          <div className="hidden lg:block flex-shrink-0">
                            <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                              <FiSquare className="w-6 h-6 text-white" />
                            </div>
                          </div>

                          {/* Review Content */}
                          <div className="flex-1">
                            {/* Stars */}
                            <div className="flex items-center gap-2 mb-4">
                              {renderStars(review.rating)}
                              {review.featured && (
                                <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-medium rounded-full">
                                  Featured
                                </span>
                              )}
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                              {review.title}
                            </h3>

                            {/* Content */}
                            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                              {review.content}
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                {review.name[0]}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-semibold text-gray-900 dark:text-white">
                                    {review.name}
                                  </h4>
                                  {review.verified && (
                                    <FiCheckCircle className="w-4 h-4 text-green-500" />
                                  )}
                                </div>
                                <p className="text-gray-600 dark:text-gray-400">
                                  {review.role} at {review.company}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevReview}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white dark:bg-gray-800 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg z-10"
              >
                <FiChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>

              <button
                onClick={nextReview}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white dark:bg-gray-800 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg z-10"
              >
                <FiChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
                {filteredReviews
                  .filter(review => review.featured)
                  .map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveReview(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === activeReview
                          ? 'bg-blue-600 scale-125'
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                  ))}
              </div>
            </div>

            {/* All Reviews Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {review.name[0]}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {review.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {review.role}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {review.date}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {review.title}
                  </h5>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                    {review.content}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <button className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-300">
                        <FiCheckCircle className="w-4 h-4" />
                        Helpful ({review.likes})
                      </button>
                    </div>
                    {review.verified && (
                      <div className="flex items-center gap-1 text-green-600 text-sm">
                        <FiCheckCircle className="w-4 h-4" />
                        Verified
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="text-center mt-12">
              <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  Ready to join thousands of satisfied teams?
                </h3>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                  Start your free 14-day trial and experience why teams love OneOrbit. No credit card required.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-2xl hover:scale-105 transition-transform duration-300">
                    Start Free Trial
                  </button>
                  <button className="px-8 py-4 bg-blue-500 text-white font-semibold rounded-2xl hover:scale-105 transition-transform duration-300">
                    Watch Demo Video
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;