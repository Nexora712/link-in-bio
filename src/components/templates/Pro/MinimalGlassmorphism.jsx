import React from 'react';

const MinimalGlassmorphism = ({ profile, links, socialLinks }) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-500 to-blue-500 animate-gradient-xy"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-300 via-transparent to-orange-300 opacity-50 animate-pulse"></div>
      
      {/* Blur Overlay */}
      <div className="absolute inset-0 backdrop-blur-3xl bg-white/10"></div>
      
      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 py-12 max-w-md">
        {/* Profile Section */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            <div className="w-24 h-24 mx-auto rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl overflow-hidden hover:scale-105 transition-transform duration-300">
              <img 
                src={profile.image} 
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-75 blur animate-pulse"></div>
          </div>
          
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl">
            <h1 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
              {profile.name}
            </h1>
            <p className="text-white/80 leading-relaxed">
              {profile.bio}
            </p>
          </div>
        </div>

        {/* Links Section */}
        <div className="space-y-4 mb-8">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className="group block w-full p-4 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-xl hover:bg-white/20 hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <span className="text-white font-medium group-hover:text-white/90">
                  {link.title}
                </span>
                <svg className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Social Links */}
        {socialLinks && socialLinks.length > 0 && (
          <div className="flex justify-center space-x-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                className="w-12 h-12 rounded-full backdrop-blur-md bg-white/10 border border-white/20 shadow-xl flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300"
              >
                <span className="text-white text-lg">{social.icon}</span>
              </a>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes gradient-xy {
          0%, 100% { transform: translate(0%, 0%) rotate(0deg); }
          25% { transform: translate(100%, 0%) rotate(90deg); }
          50% { transform: translate(100%, 100%) rotate(180deg); }
          75% { transform: translate(0%, 100%) rotate(270deg); }
        }
        .animate-gradient-xy {
          animation: gradient-xy 15s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default MinimalGlassmorphism;