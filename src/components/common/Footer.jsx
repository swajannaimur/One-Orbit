// components/Footer.jsx
"use client";
import React from 'react';
import Link from 'next/link';
import { 
  FiTwitter, 
  FiLinkedin, 
  FiGithub,
  FiYoutube,
  FiFacebook,
  FiInstagram,
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowUp
} from 'react-icons/fi';
import { 
  HiOutlineLightningBolt,
  HiOutlineGlobe,
  HiOutlineNewspaper
} from 'react-icons/hi';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const productLinks = [
    { name: 'Features', href: '/features' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'Integrations', href: '/integrations' },
    { name: 'API Docs', href: '/api' },
    { name: 'Mobile App', href: '/mobile' },
    { name: 'Roadmap', href: '/roadmap' }
  ];

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press Kit', href: '/press' },
    { name: 'Customer Stories', href: '/customers' },
    { name: 'Partners', href: '/partners' },
    { name: 'Contact', href: '/contact' }
  ];

  const resourcesLinks = [
    { name: 'Documentation', href: '/docs' },
    { name: 'Help Center', href: '/help' },
    { name: 'Community', href: '/community' },
    { name: 'Webinars', href: '/webinars' },
    { name: 'Templates', href: '/templates' },
    { name: 'Blog', href: '/blog' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Security', href: '/security' },
    { name: 'Compliance', href: '/compliance' },
    { name: 'DPA', href: '/dpa' },
    { name: 'Cookie Policy', href: '/cookies' }
  ];

  const socialLinks = [
    { name: 'Twitter', icon: FiTwitter, href: 'https://twitter.com/oneorbit' },
    { name: 'LinkedIn', icon: FiLinkedin, href: 'https://linkedin.com/company/oneorbit' },
    { name: 'GitHub', icon: FiGithub, href: 'https://github.com/oneorbit' },
    { name: 'YouTube', icon: FiYoutube, href: 'https://youtube.com/oneorbit' },
    { name: 'Facebook', icon: FiFacebook, href: 'https://facebook.com/oneorbit' },
    { name: 'Instagram', icon: FiInstagram, href: 'https://instagram.com/oneorbit' }
  ];

  const awards = [
    { name: 'G2 High Performer 2024', category: 'Project Management' },
    { name: "Capterra's Top 20", category: 'Team Collaboration' },
    { name: 'Product Hunt #1', category: 'Product of the Day' }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        
        {/* Top Section - Newsletter & Social */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          
          {/* Newsletter */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <HiOutlineLightningBolt className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Stay in the orbit</h3>
                <p className="text-gray-400">Get product updates and team collaboration tips</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 text-white"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
                Subscribe
              </button>
            </div>
            
            <p className="text-sm text-gray-500">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>

          {/* Social & Contact */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <HiOutlineGlobe className="w-6 h-6 text-blue-400" />
              <h3 className="text-2xl font-bold">Connect with us</h3>
            </div>
            
            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  </a>
                );
              })}
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300">
                <FiMail className="w-5 h-5" />
                <span>hello@oneorbit.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300">
                <FiPhone className="w-5 h-5" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300">
                <FiMapPin className="w-5 h-5" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section - Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          
          {/* Product */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-white">Product</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-3">
              {resourcesLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Awards & Recognition */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-white">Awards</h4>
            <div className="space-y-4">
              {awards.map((award, index) => (
                <div key={index} className="bg-gray-800/50 rounded-xl p-3 border border-gray-700">
                  <div className="font-medium text-white text-sm">{award.name}</div>
                  <div className="text-gray-400 text-xs">{award.category}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            
            {/* Brand & Copyright */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <HiOutlineLightningBolt className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                  OneOrbit
                </span>
              </Link>
              
              <div className="h-6 w-px bg-gray-700"></div>
              
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <HiOutlineNewspaper className="w-4 h-4" />
                <span>© 2024 OneOrbit. All rights reserved.</span>
              </div>
            </div>

            {/* Additional Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
              
              <div className="flex items-center gap-4">
                <Link href="/status" className="hover:text-white transition-colors duration-300">
                  Status
                </Link>
                <Link href="/sitemap" className="hover:text-white transition-colors duration-300">
                  Sitemap
                </Link>
              </div>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 hover:scale-105 group"
              aria-label="Back to top"
            >
              <span className="text-sm text-gray-400 group-hover:text-white">Back to top</span>
              <FiArrowUp className="w-4 h-4 text-gray-400 group-hover:text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Security Badges */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-green-400 text-xs font-bold">SSL</span>
                </div>
                <span>256-bit Encryption</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-blue-400 text-xs font-bold">SOC2</span>
                </div>
                <span>Type II Certified</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-purple-400 text-xs font-bold">GDPR</span>
                </div>
                <span>Compliant</span>
              </div>
            </div>

            {/* Language & Region */}
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <HiOutlineGlobe className="w-4 h-4" />
                <select className="bg-transparent border-none focus:outline-none text-gray-400">
                  <option>English</option>
                  <option>Español</option>
                  <option>Français</option>
                  <option>Deutsch</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <span>🇺🇸</span>
                <select className="bg-transparent border-none focus:outline-none text-gray-400">
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                  <option>Australia</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;