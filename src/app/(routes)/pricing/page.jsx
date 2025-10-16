'use client'

import { useState } from 'react';
import {
  FiCheck,
  FiStar,
  FiUsers,
  FiDatabase,
  FiHeadphones,
  FiAward,
  FiTrendingUp,
  FiShield,
  FiGlobe,
} from 'react-icons/fi';

import { FaCrown } from "react-icons/fa";

import {
  HiOutlineLightBulb,
  HiOutlineChartBar,
  HiOutlineCog,
  HiOutlineServer,
} from 'react-icons/hi2';

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState('monthly')

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small teams getting started",
      price: { monthly: "$0", annual: "$0" },
      period: "/month",
      button: "Get started free",
      popular: false,
      icon: FiStar,
      color: "from-gray-500 to-gray-700",
      features: [
        { text: "Up to 5 team members", icon: FiUsers },
        { text: "Basic task management", icon: HiOutlineCog },
        { text: "5GB storage", icon: FiDatabase },
        { text: "Standard support", icon: FiHeadphones },
        { text: "Basic analytics", icon: HiOutlineChartBar },
      ],
      cta: "Start with Starter",
    },
    {
      name: "Team",
      description: "Everything growing teams need to collaborate",
      price: { monthly: "$19", annual: "$15" },
      period: "/month",
      button: "Start free trial",
      popular: true,
      icon: FiUsers,
      color: "from-blue-500 to-purple-600",
      features: [
        { text: "Up to 50 team members", icon: FiUsers },
        { text: "Advanced task management", icon: HiOutlineLightBulb },
        { text: "1TB storage", icon: FiDatabase },
        { text: "Priority support", icon: FiHeadphones },
        { text: "Advanced analytics", icon: HiOutlineChartBar },
        { text: "Custom workflows", icon: HiOutlineCog },
        { text: "API access", icon: HiOutlineServer },
        { text: "SSO integration", icon: FiShield },
      ],
      cta: "Try Team free for 14 days",
    },
    {
      name: "Enterprise",
      description: "Advanced features for large organizations",
      price: { monthly: "$49", annual: "$39" },
      period: "/month",
      button: "Contact sales",
      popular: false,
      icon: FaCrown,
      color: "from-amber-500 to-orange-500",
      features: [
        { text: "Unlimited team members", icon: FiUsers },
        { text: "Enterprise-grade security", icon: FiShield },
        { text: "Unlimited storage", icon: FiDatabase },
        { text: "24/7 dedicated support", icon: FiHeadphones },
        { text: "Custom analytics", icon: HiOutlineChartBar },
        { text: "Advanced automation", icon: HiOutlineLightBulb },
        { text: "SLA guarantee", icon: FiAward },
        { text: "Custom onboarding", icon: FiTrendingUp },
        { text: "Multi-region deployment", icon: FiGlobe },
      ],
      cta: "Schedule a demo",
    },
  ];

  const comparisonFeatures = [
    {
      category: "Team & Collaboration",
      features: [
        { name: "Team members", free: "Up to 5", team: "Up to 50", enterprise: "Unlimited" },
        { name: "Guest collaborators", free: "3", team: "Unlimited", enterprise: "Unlimited" },
        { name: "Workspaces", free: "1", team: "5", enterprise: "Unlimited" },
      ],
    },
    {
      category: "Features",
      features: [
        { name: "Task management", free: "Basic", team: "Advanced", enterprise: "Enterprise" },
        { name: "Automation", free: "10/month", team: "Unlimited", enterprise: "Unlimited" },
        { name: "API access", free: "No", team: "Yes", enterprise: "Yes" },
        { name: "Custom fields", free: "No", team: "Yes", enterprise: "Yes" },
      ],
    },
    {
      category: "Storage & Security",
      features: [
        { name: "Storage", free: "5GB", team: "1TB", enterprise: "Unlimited" },
        { name: "File size limit", free: "100MB", team: "2GB", enterprise: "10GB" },
        { name: "SSO", free: "No", team: "Yes", enterprise: "Yes" },
        { name: "SLA", free: "No", team: "99.9%", enterprise: "99.99%" },
      ],
    },
    {
      category: "Support",
      features: [
        { name: "Support", free: "Standard", team: "Priority", enterprise: "24/7 Dedicated" },
        { name: "Response time", free: "48 hours", team: "4 hours", enterprise: "1 hour" },
        { name: "Onboarding", free: "Self-serve", team: "Guided", enterprise: "Custom" },
      ],
    },
  ];

  const savings = { team: "21%", enterprise: "20%" };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-800 mb-6">
            <FiTrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Trusted by 10,000+ teams
            </span>
          </div>

          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-blue-900 dark:from-white dark:to-blue-200 bg-clip-text text-transparent">
              Simple, transparent
            </span>
            <br />
            <span className="gradient-text">
              pricing
            </span>
          </h1>

          <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
            Start free. Upgrade as you grow. No hidden fees. Cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-lg font-medium ${billingCycle === 'monthly'
              ? 'text-gray-900 dark:text-white'
              : 'text-gray-500 dark:text-gray-400'}`}>
              Monthly
            </span>
            <button
              onClick={() =>
                setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')
              }
              className="relative w-14 h-7 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors duration-300"
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${billingCycle === 'annual'
                  ? 'translate-x-8'
                  : 'translate-x-1'}`}
              />
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-lg font-medium ${billingCycle === 'annual'
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-500 dark:text-gray-400'}`}>
                Annual
              </span>
              {billingCycle === 'annual' && (
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full">
                  Save up to {savings.enterprise}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const currentPrice = plan.price[billingCycle];
            return (
              <div
                key={index}
                className={`relative group ${plan.popular ? 'lg:scale-105 lg:-translate-y-4' : ''} transition-all duration-500`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
                      <FiStar className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className={`relative bg-white dark:bg-gray-800 rounded-3xl shadow-lg border transition-all duration-500 flex flex-col ${plan.popular
                  ? 'border-blue-500 dark:border-blue-400'
                  : 'border-gray-200 dark:border-gray-700'} overflow-hidden`}>
                  <div className={`h-2 bg-gradient-to-r ${plan.color}`} />
                  <div className="p-8 flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${plan.color} rounded-xl flex items-center justify-center`}>
                        {Icon && <Icon className="w-6 h-6 text-white" />}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{plan.description}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                          {currentPrice}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400 font-medium">{plan.period}</span>
                      </div>
                      {billingCycle === 'annual' && plan.name !== "Starter" && (
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                            Save {savings[plan.name.toLowerCase()]}
                          </span>
                          <span className="text-gray-400 dark:text-gray-500 text-sm line-through">
                            {plan.price.monthly}{plan.period}
                          </span>
                        </div>
                      )}
                    </div>

                    <button className={`w-full py-4 font-semibold rounded-2xl transition-all duration-300 mb-8 ${plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl hover:scale-105'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
                      {plan.cta}
                    </button>

                    <div className="space-y-4">
                      {plan.features.map((feature, featureIndex) => {
                        const FeatureIcon = feature.icon;
                        return (
                          <div key={featureIndex} className="flex items-center gap-3 group">
                            <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                              <FiCheck className="w-4 h-4 text-green-600 dark:text-green-400" />
                            </div>
                            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                              {FeatureIcon && <FeatureIcon className="w-4 h-4 text-gray-400" />}
                              <span className="text-sm font-medium">{feature.text}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Compare all <span className='gradient-text'>Features</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              See how our plans stack up against each other
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            {comparisonFeatures.map((section, idx) => (
              <div key={idx} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4">
                  <h3 className="text-lg font-semibold gradient-text dark:text-white">
                    {section.category}
                  </h3>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {section.features.map((f, i) => (
                    <div key={i} className="grid grid-cols-4 gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{f.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 text-center">{f.free}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 text-center">{f.team}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 text-center">{f.enterprise}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
