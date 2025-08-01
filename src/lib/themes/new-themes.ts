import { ThemeConfig } from './theme-mappings';

export const newThemes: Record<string, ThemeConfig> = {
  // T6 Geometric Constellation
  'geometric-constellation': {
    id: 'geometric-constellation',
    name: 'Geometric Constellation',
    description: 'Cosmic stars and geometric shapes with orbital accents.',
    styles: {
      background: 'bg-gradient-to-tr from-black via-purple-950 to-black',
      container: 'bg-transparent',
      text: { primary: 'text-white', secondary: 'text-purple-300' },
      button: { primary: 'bg-purple-600/30', hover: 'hover:scale-105 transition-all duration-300' },
      avatar: { border: 'border-purple-500', background: 'bg-purple-800/30' },
    },
    exportStyles: {
      css: `
.constellation-template {
  min-height: 100vh;
  background: radial-gradient(circle at 20% 50%, #120458 0%, #000000 50%, #1a0033 100%);
  font-family: 'Space Grotesk', sans-serif;
  position: relative;
  overflow: hidden;
  color: #ffffff;
}
/* Animated background stars */
.stars-container { position: absolute; width: 100%; height: 100%; top: 0; left: 0; }
.star { position: absolute; width: 2px; height: 2px; background: #ffffff; border-radius: 50%; animation: twinkle 3s infinite; }
.star-1 { top: 20%; left: 15%; animation-delay: 0s; }
.star-2 { top: 40%; left: 80%; animation-delay: 1s; }
.star-3 { top: 70%; left: 25%; animation-delay: 2s; }
.star-4 { top: 15%; left: 70%; animation-delay: 0.5s; }
.star-5 { top: 85%; left: 60%; animation-delay: 1.5s; }
.star-6 { top: 50%; left: 10%; animation-delay: 2.5s; }
@keyframes twinkle { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.5); } }
/* Floating geometric shapes */
.geometric-bg { position: absolute; width: 100%; height: 100%; top: 0; left: 0; pointer-events: none; }
.floating-shape { position: absolute; opacity: 0.1; animation: float-geometric 20s ease-in-out infinite; }
.triangle { width: 0; height: 0; border-left: 30px solid transparent; border-right: 30px solid transparent; border-bottom: 52px solid #4c1d95; top: 10%; right: 10%; animation-delay: 0s; }
.hexagon { width: 60px; height: 34px; background: #7c3aed; position: relative; top: 60%; left: 5%; animation-delay: 5s; }
.hexagon::before, .hexagon::after { content: ""; position: absolute; width: 0; border-left: 30px solid transparent; border-right: 30px solid transparent; }
.hexagon::before { bottom: 100%; border-bottom: 17px solid #7c3aed; }
.hexagon::after { top: 100%; border-top: 17px solid #7c3aed; }
.circle { width: 40px; height: 40px; border-radius: 50%; background: #ec4899; top: 30%; right: 20%; animation-delay: 10s; }
.diamond { width: 40px; height: 40px; background: #06b6d4; transform: rotate(45deg); bottom: 20%; right: 15%; animation-delay: 15s; }
@keyframes float-geometric { 0%, 100% { transform: translateY(0px) rotate(0deg); } 25% { transform: translateY(-20px) rotate(90deg); } 50% { transform: translateY(0px) rotate(180deg); } 75% { transform: translateY(-10px) rotate(270deg); } }
.content-container { position: relative; z-index: 10; max-width: 500px; margin: 0 auto; padding: 3rem 2rem; }
/* Profile section with orbital design */
.profile-section { text-align: center; margin-bottom: 4rem; }
.avatar-constellation { position: relative; display: inline-block; margin-bottom: 2rem; }
.main-avatar { width: 140px; height: 140px; border-radius: 50%; object-fit: cover; border: 4px solid #7c3aed; box-shadow: 0 0 30px rgba(124, 58, 237, 0.5); position: relative; z-index: 2; }
.orbit-ring { position: absolute; top: 50%; left: 50%; width: 200px; height: 200px; border: 1px solid rgba(124, 58, 237, 0.3); border-radius: 50%; transform: translate(-50%, -50%); animation: orbit-rotation 10s linear infinite; }
.orbit-dot { position: absolute; width: 8px; height: 8px; background: #7c3aed; border-radius: 50%; box-shadow: 0 0 10px #7c3aed; }
.dot-1 { top: -4px; left: 50%; transform: translateX(-50%); }
.dot-2 { bottom: -4px; left: 50%; transform: translateX(-50%); }
.dot-3 { top: 50%; right: -4px; transform: translateY(-50%); }
@keyframes orbit-rotation { 0% { transform: translate(-50%, -50%) rotate(0deg); } 100% { transform: translate(-50%, -50%) rotate(360deg); } }
.cosmic-name { font-size: 2.5rem; font-weight: 800; background: linear-gradient(45deg, #7c3aed, #ec4899, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin: 0 0 1rem 0; text-transform: uppercase; letter-spacing: 2px; }
.cosmic-bio { color: #a855f7; font-size: 1.1rem; margin: 0; max-width: 300px; margin: 0 auto; line-height: 1.6; }
/* Constellation links */
.links-constellation { margin-bottom: 3rem; }
.constellation-link { position: relative; display: flex; align-items: center; padding: 1.5rem 2rem; margin-bottom: 1.5rem; background: rgba(124, 58, 237, 0.1); backdrop-filter: blur(10px); border: 1px solid rgba(124, 58, 237, 0.3); border-radius: 20px; cursor: pointer; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); overflow: hidden; }
.constellation-link::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.2), transparent); transition: left 0.6s ease; }
.constellation-link:hover::before { left: 100%; }
.constellation-link:hover { transform: translateY(-8px); background: rgba(124, 58, 237, 0.2); border-color: #7c3aed; box-shadow: 0 20px 40px rgba(124, 58, 237, 0.3); }
.link-geometry { position: relative; margin-right: 1.5rem; }
.geometric-icon { font-size: 1.8rem; color: #7c3aed; z-index: 2; position: relative; }
.link-lines { position: absolute; top: 50%; left: 50%; width: 40px; height: 40px; border: 2px solid rgba(124, 58, 237, 0.3); transform: translate(-50%, -50%) rotate(45deg); transition: all 0.3s ease; }
.constellation-link:hover .link-lines { transform: translate(-50%, -50%) rotate(225deg) scale(1.2); border-color: #7c3aed; }
.link-title { flex: 1; font-size: 1.1rem; font-weight: 600; color: #ffffff; text-transform: uppercase; letter-spacing: 1px; }
.particle-trail { position: absolute; right: 20px; top: 50%; transform: translateY(-50%); }
.particle { position: absolute; width: 4px; height: 4px; background: #7c3aed; border-radius: 50%; opacity: 0; animation: particle-float 2s ease-in-out infinite; }
.p1 { animation-delay: 0s; } .p2 { animation-delay: 0.3s; left: 10px; } .p3 { animation-delay: 0.6s; left: 20px; }
@keyframes particle-float { 0%, 100% { opacity: 0; transform: translateY(0px); } 50% { opacity: 1; transform: translateY(-10px); } }
.constellation-link:hover .particle { animation-duration: 1s; }
/* Social planets */
.social-galaxy { display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap; }
.planet-social { position: relative; display: flex; align-items: center; justify-content: center; width: 70px; height: 70px; text-decoration: none; transition: all 0.4s ease; }
.planet-core { position: relative; z-index: 2; width: 50px; height: 50px; background: linear-gradient(135deg, #7c3aed, #ec4899); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #ffffff; font-size: 1.5rem; box-shadow: 0 0 20px rgba(124, 58, 237, 0.5); }
.planet-ring { position: absolute; top: 50%; left: 50%; width: 70px; height: 70px; border: 2px solid rgba(124, 58, 237, 0.3); border-radius: 50%; transform: translate(-50%, -50%); transition: all 0.3s ease; }
.planet-social:hover .planet-ring { width: 90px; height: 90px; border-color: #7c3aed; animation: planet-ring-pulse 1s ease-in-out; }
.planet-social:hover .planet-core { transform: scale(1.1); box-shadow: 0 0 30px rgba(124, 58, 237, 0.8); }
@keyframes planet-ring-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `,
      mobileCss: '',
      background: '',
      text: { primary: '', secondary: '' },
      button: { primary: '' },
    },
  },

  // T7 Paper Craft Origami
  'paper-craft-origami': {
    id: 'paper-craft-origami',
    name: 'Paper Craft Origami',
    description: 'Playful paper folds and stamps with animated origami.',
    styles: {
      background: 'bg-gradient-to-br from-gray-50 to-slate-200',
      container: 'bg-white shadow',
      text: { primary: 'text-slate-800', secondary: 'text-slate-600' },
      button: { primary: 'bg-red-600 text-white', hover: 'hover:scale-105 transition-all duration-300' },
      avatar: { border: 'border-slate-200', background: 'bg-white' },
    },
    exportStyles: {
      css: `
@import url('https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap');
.origami-template { min-height: 100vh; background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 50%, #e2e8f0 100%); font-family: 'Kalam', cursive; position: relative; overflow-x: hidden; }
/* Animated origami background elements */
.paper-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1; }
.origami-crane { position: absolute; width: 0; height: 0; border-style: solid; animation: float-paper 15s ease-in-out infinite; }
.crane-1 { top: 10%; right: 15%; border-left: 20px solid transparent; border-right: 20px solid transparent; border-bottom: 35px solid #e53e3e; opacity: 0.7; animation-delay: 0s; }
.crane-1::after { content: ''; position: absolute; top: 35px; left: -15px; width: 0; height: 0; border-left: 15px solid transparent; border-right: 15px solid transparent; border-top: 25px solid #e53e3e; }
.crane-2 { bottom: 20%; left: 10%; border-left: 15px solid transparent; border-right: 15px solid transparent; border-bottom: 30px solid #3182ce; opacity: 0.6; animation-delay: 5s; }
.origami-butterfly { position: absolute; top: 40%; right: 8%; width: 30px; height: 20px; background: #38a169; border-radius: 50% 50% 0 0; opacity: 0.5; animation: flutter 8s ease-in-out infinite; }
.origami-butterfly::before { content: ''; position: absolute; top: 0; right: 0; width: 30px; height: 20px; background: #38a169; border-radius: 50% 50% 0 0; transform: scaleX(-1); }
@keyframes flutter { 0%, 100% { transform: translateY(0px) rotate(0deg); } 25% { transform: translateY(-15px) rotate(5deg); } 50% { transform: translateY(-5px) rotate(-3deg); } 75% { transform: translateY(-20px) rotate(7deg); } }
.paper-plane { position: absolute; bottom: 30%; right: 20%; width: 0; height: 0; border-top: 10px solid transparent; border-bottom: 10px solid transparent; border-left: 25px solid #ed8936; opacity: 0.6; animation: fly-plane 12s linear infinite; }
@keyframes fly-plane { 0% { transform: translateX(0px) translateY(0px); } 25% { transform: translateX(-50px) translateY(-10px); } 50% { transform: translateX(-30px) translateY(5px); } 75% { transform: translateX(-80px) translateY(-5px); } 100% { transform: translateX(0px) translateY(0px); } }
@keyframes float-paper { 0%, 100% { transform: translateY(0px) rotate(0deg); } 33% { transform: translateY(-10px) rotate(2deg); } 66% { transform: translateY(5px) rotate(-1deg); } }
/* Fold lines decoration */
.fold-lines { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 2; }
.fold-line { position: absolute; background: repeating-linear-gradient(90deg, transparent, transparent 5px, #cbd5e0 5px, #cbd5e0 8px); height: 1px; opacity: 0.3; }
.line-1 { top: 30%; left: 0; right: 0; transform: rotate(2deg); }
.line-2 { top: 60%; left: 0; right: 0; transform: rotate(-1deg); }
.line-3 { top: 80%; left: 0; right: 0; transform: rotate(1deg); }
.main-container { position: relative; z-index: 10; max-width: 480px; margin: 0 auto; padding: 3rem 2rem; }
/* Profile section with paper fold effect */
.profile-origami { text-align: center; margin-bottom: 3rem; }
.avatar-fold { margin-bottom: 2rem; display: inline-block; }
.paper-frame { position: relative; width: 150px; height: 150px; background: #ffffff; padding: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8); transform: rotate(-2deg); transition: all 0.3s ease; }
.paper-frame:hover { transform: rotate(0deg) scale(1.05); box-shadow: 0 8px 25px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.9); }
.profile-image { width: 100%; height: 100%; object-fit: cover; border-radius: 3px; }
.corner-fold { position: absolute; width: 15px; height: 15px; background: #e2e8f0; border: 1px solid #cbd5e0; }
.corner-fold.tl { top: 0; left: 0; clip-path: polygon(0 0, 100% 0, 0 100%); }
.corner-fold.tr { top: 0; right: 0; clip-path: polygon(100% 0, 100% 100%, 0 0); }
.corner-fold.bl { bottom: 0; left: 0; clip-path: polygon(0 0, 100% 100%, 0 100%); }
.corner-fold.br { bottom: 0; right: 0; clip-path: polygon(100% 0, 100% 100%, 0 100%); }
.paper-title { font-size: 2.2rem; font-weight: 700; color: #2d3748; margin: 0 0 1rem 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.1); transform: rotate(-1deg); }
.paper-subtitle { color: #4a5568; font-size: 1.1rem; margin: 0; max-width: 320px; margin: 0 auto; line-height: 1.6; transform: rotate(0.5deg); }
/* Accordion-style links with paper fold effect */
.links-accordion { margin-bottom: 3rem; }
.paper-link { position: relative; margin-bottom: 1.5rem; cursor: pointer; transform: rotate(0deg); transition: all 0.4s cubic-bezier(0.4,0,0.2,1); }
.paper-link:nth-child(even) { transform: rotate(0.5deg); }
.paper-link:nth-child(odd) { transform: rotate(-0.3deg); }
.paper-link:hover { transform: rotate(0deg) translateY(-5px); }
.link-fold { background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.06); transition: all 0.3s ease; position: relative; }
.paper-link:hover .link-fold { box-shadow: 0 10px 25px rgba(0,0,0,0.15), 0 5px 10px rgba(0,0,0,0.05); }
.fold-tab { background: linear-gradient(135deg, #e53e3e, #c53030); padding: 1rem; display: flex; align-items: center; justify-content: center; width: 60px; float: left; height: 100%; position: absolute; left: 0; top: 0; clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%); }
.link-icon { color: #ffffff; font-size: 1.5rem; }
.link-content { display: flex; align-items: center; padding: 1.5rem 1.5rem 1.5rem 5rem; position: relative; }
.link-text { flex: 1; font-size: 1.1rem; font-weight: 600; color: #2d3748; }
.paper-arrow { position: relative; width: 20px; height: 20px; }
.arrow-fold-1, .arrow-fold-2 { position: absolute; width: 0; height: 0; border-style: solid; transition: all 0.3s ease; }
.arrow-fold-1 { border-left: 8px solid #4a5568; border-top: 8px solid transparent; border-bottom: 8px solid transparent; right: 0; }
.arrow-fold-2 { border-left: 6px solid #4a5568; border-top: 6px solid transparent; border-bottom: 6px solid transparent; right: 8px; opacity: 0.7; }
.paper-link:hover .arrow-fold-1 { transform: translateX(3px); }
.paper-link:hover .arrow-fold-2 { transform: translateX(6px); opacity: 1; }
.shadow-depth { position: absolute; bottom: -3px; left: 3px; right: -3px; height: 3px; background: rgba(0,0,0,0.1); border-radius: 8px; filter: blur(2px); z-index: -1; }
/* Social envelope section */
.social-envelope { background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.06); transform: rotate(-0.5deg); position: relative; }
.social-envelope::before { content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 50px solid transparent; border-right: 50px solid transparent; border-top: 30px solid #e53e3e; z-index: 2; }
.envelope-header { background: #e53e3e; padding: 1rem; text-align: center; position: relative; }
.stamp { display: inline-block; background: #ffffff; color: #e53e3e; padding: 0.5rem 1rem; font-weight: 700; font-size: 0.9rem; border: 2px dashed #e53e3e; transform: rotate(-2deg); }
.social-links { padding: 2rem; display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }
.social-stamp { display: block; width: 60px; height: 60px; background: #f7fafc; border: 2px dashed #cbd5e0; text-decoration: none; transition: all 0.3s ease; position: relative; transform: rotate(-1deg); }
.social-stamp:nth-child(even) { transform: rotate(1deg); }
.social-stamp:hover { transform: rotate(0deg) scale(1.1); border-color: #e53e3e; background: #ffffff; }
.stamp-content { display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; font-size: 1.5rem; color: #4a5568; }
.social-stamp:hover .stamp-content { color: #e53e3e; }
.stamp-perforation { position: absolute; top: -1px; left: -1px; right: -1px; bottom: -1px; background: repeating-linear-gradient(0deg, transparent 0px, transparent 3px, #cbd5e0 3px, #cbd5e0 4px), repeating-linear-gradient(90deg, transparent 0px, transparent 3px, #cbd5e0 3px, #cbd5e0 4px); pointer-events: none; }
      `,
      mobileCss: '',
      background: '',
      text: { primary: '', secondary: '' },
      button: { primary: '' },
    },
  },

  // T8 Liquid Morphing Blobs
  'liquid-morphing-blobs': {
    id: 'liquid-morphing-blobs',
    name: 'Liquid Morphing Blobs',
    description: 'Animated morphing blobs with fluid ripple effects.',
    styles: {
      background: 'bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-400',
      container: 'bg-transparent',
      text: { primary: 'text-white', secondary: 'text-white/90' },
      button: { primary: 'bg-white/20', hover: 'hover:scale-105 transition-all duration-300' },
      avatar: { border: 'border-white/40', background: 'bg-white/20' },
    },
    exportStyles: {
      css: `
.liquid-template { min-height: 100vh; background: radial-gradient(circle at 30% 20%, #667eea 0%, #764ba2 50%, #f093fb 100%); font-family: 'Inter', sans-serif; position: relative; overflow: hidden; color: #ffffff; }
/* Animated liquid blobs */
.blob-container { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1; }
.liquid-blob { position: absolute; border-radius: 50%; background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(2px); animation: blob-morph 20s ease-in-out infinite; }
.blob-1 { width: 300px; height: 300px; top: -150px; left: -100px; animation-delay: 0s; }
.blob-2 { width: 200px; height: 200px; top: 30%; right: -80px; animation-delay: 5s; }
.blob-3 { width: 250px; height: 250px; bottom: -100px; left: 20%; animation-delay: 10s; }
.blob-4 { width: 180px; height: 180px; top: 60%; left: -50px; animation-delay: 15s; }
@keyframes blob-morph { 0%,100%{ border-radius:50% 50% 50% 50%; transform: rotate(0deg) scale(1);} 25%{ border-radius:60% 40% 60% 40%; transform: rotate(90deg) scale(1.1);} 50%{ border-radius:40% 60% 40% 60%; transform: rotate(180deg) scale(0.9);} 75%{ border-radius:70% 30% 70% 30%; transform: rotate(270deg) scale(1.05);} }
.content-wrapper { position: relative; z-index: 10; max-width: 500px; margin: 0 auto; padding: 3rem 2rem; }
/* Fluid profile section */
.fluid-profile { text-align: center; margin-bottom: 4rem; }
.avatar-liquid { position: relative; display: inline-block; margin-bottom: 2rem; }
.liquid-frame { position: relative; width: 150px; height: 150px; border-radius: 50%; background: rgba(255,255,255,0.2); padding: 8px; backdrop-filter: blur(10px); animation: liquid-pulse 4s ease-in-out infinite; }
@keyframes liquid-pulse { 0%,100%{ border-radius:50%; transform: scale(1);} 25%{ border-radius:60% 40% 60% 40%; transform: scale(1.02);} 50%{ border-radius:40% 60% 40% 60%; transform: scale(0.98);} 75%{ border-radius:70% 30% 70% 30%; transform: scale(1.01);} }
.avatar-image { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }
.liquid-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, transparent 100%); border-radius: 50%; pointer-events: none; }
.ripple-effect { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
.ripple { position: absolute; border: 2px solid rgba(255, 255, 255, 0.6); border-radius: 50%; animation: ripple-expand 3s ease-out infinite; }
.r1 { animation-delay: 0s; } .r2 { animation-delay: 1s; } .r3 { animation-delay: 2s; }
@keyframes ripple-expand { 0% { width: 0; height: 0; opacity: 1; margin: 0; } 100% { width: 200px; height: 200px; opacity: 0; margin: -100px; } }
.fluid-name { font-size: 2.8rem; font-weight: 800; margin: 0 0 1rem 0; background: linear-gradient(45deg, #ffffff, #f093fb, #667eea); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; text-shadow: 0 0 30px rgba(255,255,255,0.5); }
.fluid-bio { font-size: 1.2rem; color: rgba(255, 255, 255, 0.9); margin: 0; max-width: 350px; margin: 0 auto; line-height: 1.6; }
/* Morphing links */
.morphing-links { margin-bottom: 3rem; }
.liquid-link { position: relative; margin-bottom: 1.5rem; cursor: pointer; transition: all 0.4s cubic-bezier(0.4,0,0.2,1); }
.link-blob { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(10px); border-radius: 25px; transition: all 0.6s cubic-bezier(0.4,0,0.2,1); z-index: 1; }
.liquid-link:hover .link-blob { border-radius: 50% 25% 50% 25%; background: rgba(255,255,255,0.25); transform: scale(1.02); }
.link-content { position: relative; z-index: 2; display: flex; align-items: center; padding: 1.8rem 2rem; }
.link-icon-wrapper { position: relative; margin-right: 1.5rem; }
.link-icon { font-size: 1.8rem; color: #ffffff; position: relative; z-index: 2; }
.icon-glow { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 40px; height: 40px; background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%); border-radius: 50%; animation: glow-pulse 2s ease-in-out infinite; }
@keyframes glow-pulse { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; } 50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; } }
.link-title { flex: 1; font-size: 1.2rem; font-weight: 600; color: #ffffff; }
.morph-indicator { display: flex; gap: 4px; align-items: center; }
.morph-dot { width: 8px; height: 8px; background: rgba(255, 255, 255, 0.6); border-radius: 50%; animation: morph-dot-dance 1.5s ease-in-out infinite; }
.morph-dot:nth-child(1) { animation-delay: 0s; } .morph-dot:nth-child(2) { animation-delay: 0.3s; } .morph-dot:nth-child(3) { animation-delay: 0.6s; }
@keyframes morph-dot-dance { 0%, 100% { transform: scale(1); opacity: 0.6; } 50% { transform: scale(1.3); opacity: 1; } }
.liquid-link:hover .morph-dot { animation-duration: 0.8s; }
.hover-blob { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 0; height: 0; background: rgba(255, 255, 255, 0.1); border-radius: 50%; transition: all 0.6s cubic-bezier(0.4,0,0.2,1); z-index: 0; }
.liquid-link:hover .hover-blob { width: 100%; height: 100%; border-radius: 40% 60% 40% 60%; }
/* Social drops */
.social-drops { text-align: center; }
.drops-container { display: flex; justify-content: center; gap: 1.5rem; flex-wrap: wrap; }
.social-drop { position: relative; text-decoration: none; transition: all 0.4s cubic-bezier(0.4,0,0.2,1); }
.drop-surface { position: relative; width: 70px; height: 70px; background: rgba(255,255,255,0.2); backdrop-filter: blur(10px); border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.4s ease; animation: drop-float 4s ease-in-out infinite; }
@keyframes drop-float { 0%, 100% { transform: translateY(0px); border-radius: 50%; } 25% { transform: translateY(-8px); border-radius: 60% 40% 60% 40%; } 50% { transform: translateY(-3px); border-radius: 40% 60% 40% 60%; } 75% { transform: translateY(-12px); border-radius: 70% 30% 70% 30%; } }
.social-drop:hover .drop-surface { background: rgba(255,255,255,0.3); transform: scale(1.1); border-radius: 30% 70% 30% 70%; }
.drop-icon { font-size: 1.8rem; color: #ffffff; position: relative; z-index: 2; }
.surface-tension { position: absolute; top: -2px; left: -2px; right: -2px; bottom: -2px; border: 2px solid rgba(255,255,255,0.3); border-radius: 50%; animation: tension-ripple 3s ease-in-out infinite; }
@keyframes tension-ripple { 0%, 100% { transform: scale(1); opacity: 0.7; } 50% { transform: scale(1.05); opacity: 1; } }
.social-drop:hover .surface-tension { animation-duration: 1s; border-color: rgba(255,255,255,0.6); }
      `,
      mobileCss: '',
      background: '',
      text: { primary: '', secondary: '' },
      button: { primary: '' },
    },
  },

  // T9 3D Isometric World
  'isometric-world': {
    id: 'isometric-world',
    name: '3D Isometric World',
    description: 'Floating islands and buildings in a 3D isometric scene.',
    styles: {
      background: 'bg-gradient-to-b from-sky-300 via-teal-200 to-green-300',
      container: 'bg-transparent',
      text: { primary: 'text-slate-800', secondary: 'text-slate-600' },
      button: { primary: 'bg-sky-600/30', hover: 'hover:scale-105 transition-all duration-300' },
      avatar: { border: 'border-sky-400', background: 'bg-white/30' },
    },
    exportStyles: {
      css: `
.isometric-template { min-height: 100vh; background: linear-gradient(180deg, #87ceeb 0%, #98d8e8 30%, #b8e6b8 70%, #90ee90 100%); font-family: 'Inter', sans-serif; position: relative; overflow: hidden; perspective: 1000px; }
/* 3D World Background */
.world-container { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1; }
.floating-island { position: absolute; transform-style: preserve-3d; animation: island-float 8s ease-in-out infinite; }
.island-1 { top: 10%; left: 15%; animation-delay: 0s; }
.island-2 { top: 30%; right: 10%; animation-delay: 2s; }
.island-3 { bottom: 20%; left: 20%; animation-delay: 4s; }
@keyframes island-float { 0%, 100% { transform: translateY(0px) rotateX(60deg) rotateY(-10deg); } 50% { transform: translateY(-15px) rotateX(60deg) rotateY(-10deg); } }
.island-base { width: 80px; height: 40px; background: #8b4513; transform: rotateX(60deg); border-radius: 40px; position: relative; }
.island-base::before { content: ''; position: absolute; top: -10px; left: 5px; right: 5px; height: 8px; background: #228b22; border-radius: 35px; }
.island-decoration { position: absolute; top: -20px; left: 50%; transform: translateX(-50%); }
.tree { width: 8px; height: 15px; background: #8b4513; border-radius: 4px; }
.tree::before { content: ''; position: absolute; top: -8px; left: 50%; transform: translateX(-50%); width: 16px; height: 16px; background: #228b22; border-radius: 50%; }
.crystal { width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-bottom: 20px solid #87ceeb; position: relative; }
.crystal::after { content: ''; position: absolute; top: 20px; left: -6px; width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 10px solid #4682b4; }
.building { width: 12px; height: 18px; background: linear-gradient(45deg, #ddd 50%, #bbb 50%); position: relative; }
.building::before { content: ''; position: absolute; top: -3px; left: 1px; right: 1px; height: 3px; background: #999; }
/* Floating clouds */
.cloud { position: absolute; background: rgba(255, 255, 255, 0.8); border-radius: 25px; opacity: 0.7; animation: cloud-drift 25s linear infinite; }
.cloud::before, .cloud::after { content: ''; position: absolute; background: rgba(255, 255, 255, 0.8); border-radius: 50%; }
.cloud-1 { width: 50px; height: 20px; top: 15%; left: -60px; animation-delay: 0s; }
.cloud-1::before { width: 20px; height: 20px; top: -10px; left: 10px; }
.cloud-1::after { width: 30px; height: 30px; top: -15px; right: 5px; }
.cloud-2 { width: 70px; height: 25px; top: 40%; left: -80px; animation-delay: 8s; }
.cloud-2::before { width: 25px; height: 25px; top: -12px; left: 15px; }
.cloud-2::after { width: 35px; height: 35px; top: -18px; right: 8px; }
.cloud-3 { width: 40px; height: 18px; top: 70%; left: -50px; animation-delay: 16s; }
.cloud-3::before { width: 18px; height: 18px; top: -9px; left: 8px; }
.cloud-3::after { width: 25px; height: 25px; top: -12px; right: 3px; }
@keyframes cloud-drift { 0% { transform: translateX(0); } 100% { transform: translateX(calc(100vw + 100px)); } }
/* Main platform */
.main-platform { position: relative; z-index: 10; max-width: 600px; margin: 0 auto; padding: 4rem 2rem; transform-style: preserve-3d; }
/* Character profile with 3D cube avatar */
.character-profile { text-align: center; margin-bottom: 4rem; }
.avatar-cube { position: relative; width: 120px; height: 120px; margin: 0 auto 2rem; transform-style: preserve-3d; animation: cube-rotate 12s linear infinite; }
@keyframes cube-rotate { 0% { transform: rotateX(15deg) rotateY(0deg); } 100% { transform: rotateX(15deg) rotateY(360deg); } }
.cube-face { position: absolute; width: 120px; height: 120px; }
.cube-face.front { transform: translateZ(60px); }
.cube-face.back { transform: rotateY(180deg) translateZ(60px); background: linear-gradient(135deg, #667eea, #764ba2); }
.cube-face.right { transform: rotateY(90deg) translateZ(60px); background: linear-gradient(135deg, #764ba2, #f093fb); }
.cube-face.left { transform: rotateY(-90deg) translateZ(60px); background: linear-gradient(135deg, #f093fb, #f5576c); }
.cube-face.top { transform: rotateX(90deg) translateZ(60px); background: linear-gradient(135deg, #f5576c, #4facfe); }
.cube-face.bottom { transform: rotateX(-90deg) translateZ(60px); background: linear-gradient(135deg, #4facfe, #00f2fe); }
.avatar-img { width: 100%; height: 100%; object-fit: cover; border-radius: 8px; }
.iso-name { font-size: 2.5rem; font-weight: 800; color: #2d3748; margin: 0 0 1rem 0; text-transform: uppercase; letter-spacing: 2px; text-shadow: 2px 2px 4px rgba(0,0,0,0.1); transform: perspective(300px) rotateX(15deg); }
.iso-bio { font-size: 1.2rem; color: #4a5568; margin: 0; max-width: 400px; margin: 0 auto; line-height: 1.6; transform: perspective(300px) rotateX(10deg); }
/* 3D Building links */
.link-buildings { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 2rem; margin-bottom: 4rem; perspective: 1000px; }
.building-link { position: relative; cursor: pointer; transform-style: preserve-3d; transition: all 0.4s cubic-bezier(0.4,0,0.2,1); }
.building-link:hover { transform: translateY(-10px) rotateY(5deg); }
.building-structure { position: relative; transform-style: preserve-3d; width: 120px; height: 100px; margin: 0 auto; }
.building-top { position: absolute; width: 120px; height: 30px; background: linear-gradient(135deg, #667eea, #764ba2); transform: rotateX(90deg) translateZ(15px); display: flex; align-items: center; justify-content: center; border-radius: 4px; }
.building-icon { font-size: 1.5rem; color: #ffffff; text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
.building-front { position: absolute; width: 120px; height: 70px; background: linear-gradient(180deg, #f8f9fa, #e9ecef); transform: translateZ(15px); display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.9rem; color: #2d3748; text-align: center; padding: 0.5rem; border-radius: 0 0 4px 4px; box-shadow: inset 0 -2px 4px rgba(0,0,0,0.1); }
.building-side { position: absolute; width: 30px; height: 70px; background: linear-gradient(90deg, #dee2e6, #ced4da); transform: rotateY(90deg) translateZ(105px); border-radius: 0 4px 4px 0; }
.building-shadow { position: absolute; width: 120px; height: 30px; background: rgba(0, 0, 0, 0.2); transform: rotateX(90deg) translateZ(-35px); border-radius: 50%; filter: blur(8px); }
.building-glow { position: absolute; top: -5px; left: -5px; right: -5px; bottom: -5px; background: linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3)); opacity: 0; transition: opacity 0.3s ease; border-radius: 8px; z-index: -1; filter: blur(10px); }
.building-link:hover .building-glow { opacity: 1; }
/* Social monuments */
.social-monuments { text-align: center; }
.monuments-grid { display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap; }
.monument { text-decoration: none; transform-style: preserve-3d; transition: all 0.3s ease; }
.monument:hover { transform: translateY(-5px) rotateY(10deg); }
.monument-structure { position: relative; transform-style: preserve-3d; width: 60px; height: 80px; }
.monument-top { position: absolute; width: 60px; height: 60px; background: linear-gradient(135deg, #f093fb, #f5576c); transform: translateZ(10px); display: flex; align-items: center; justify-content: center; font-size: 1.8rem; color: #ffffff; border-radius: 50%; box-shadow: 0 4px 8px rgba(0,0,0,0.2); }
.monument-pillar { position: absolute; width: 20px; height: 40px; background: linear-gradient(90deg, #e9ecef, #ced4da); left: 50%; top: 60px; transform: translateX(-50%); border-radius: 0 0 4px 4px; }
.monument-base { position: absolute; width: 40px; height: 8px; background: #adb5bd; left: 50%; bottom: 0; transform: translateX(-50%); border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.2); }
      `,
      mobileCss: '',
      background: '',
      text: { primary: '', secondary: '' },
      button: { primary: '' },
    },
  },

  'glassmorphism-professional': {
    id: 'glassmorphism-professional',
    name: 'Glassmorphism Professional',
    description: 'A modern, professional theme with a glassmorphism effect.',
    styles: {
      background: 'bg-gradient-to-br from-purple-600 to-indigo-600',
      container: 'bg-white/10 backdrop-blur-md border border-white/20',
      text: {
        primary: 'text-white',
        secondary: 'text-white/80',
      },
      button: {
        primary: 'bg-white/20 hover:bg-white/30 text-white',
        hover: 'hover:scale-105 transition-all duration-300',
      },
      avatar: {
        border: 'border-white/30',
        background: 'bg-white/20',
      },
    },
    exportStyles: {
      css: `
.glassmorphism-template {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  font-family: 'Inter', sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.avatar-container {
  position: relative;
  display: inline-block;
  margin-bottom: 1.5rem;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.3);
  object-fit: cover;
}

.status-indicator {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  background: #4ade80;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.8);
}

.name {
  color: white;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.bio {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  margin: 0;
  max-width: 300px;
  margin: 0 auto;
}

.links-container {
  max-width: 400px;
  margin: 0 auto 3rem auto;
}

.link-card {
  display: flex;
  align-items: center;
  padding: 1.25rem 1.5rem;
  margin-bottom: 1rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.link-card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
}

.link-card .icon {
  font-size: 1.5rem;
  margin-right: 1rem;
  opacity: 0.9;
}

.link-card .title {
  flex: 1;
  font-weight: 600;
  font-size: 1rem;
}

.link-card .arrow {
  font-size: 1.2rem;
  opacity: 0.7;
  transition: transform 0.3s ease;
}

.link-card:hover .arrow {
  transform: translateX(4px);
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  transition: all 0.3s ease;
}

.social-icon:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}
      `,
      mobileCss: '',
      background: '',
      text: {
        primary: '',
        secondary: '',
      },
      button: {
        primary: '',
      },
    },
  },
  'neon-cyberpunk': {
    id: 'neon-cyberpunk',
    name: 'Neon Cyberpunk',
    description: 'A futuristic theme with a neon, cyberpunk aesthetic.',
    styles: {
      background: 'bg-gray-900',
      container: 'bg-black/50 border border-cyan-400/50',
      text: {
        primary: 'text-cyan-400',
        secondary: 'text-gray-300',
      },
      button: {
        primary: 'bg-cyan-400/20 hover:bg-cyan-400/30 text-cyan-400',
        hover: 'hover:scale-105 transition-all duration-300',
      },
      avatar: {
        border: 'border-cyan-400',
        background: 'bg-black/50',
      },
    },
    exportStyles: {
      css: `
.cyberpunk-template {
  min-height: 100vh;
  background: #0a0a0f;
  color: #ffffff;
  font-family: 'Orbitron', monospace;
  position: relative;
  overflow-x: hidden;
}

.grid-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
  animation: gridMove 20s linear infinite;
}

@keyframes gridMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

.container {
  position: relative;
  z-index: 10;
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
}

.header-section {
  text-align: center;
  margin-bottom: 3rem;
}

.avatar-glow {
  position: relative;
  display: inline-block;
  margin-bottom: 2rem;
}

.profile-img {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border: 2px solid #00ffff;
  box-shadow: 
    0 0 20px #00ffff,
    0 0 40px #00ffff,
    inset 0 0 20px rgba(0, 255, 255, 0.1);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 20px #00ffff, 0 0 40px #00ffff; }
  50% { box-shadow: 0 0 30px #00ffff, 0 0 60px #00ffff; }
}

.cyber-title {
  font-size: 2.5rem;
  font-weight: 900;
  margin: 0;
  background: linear-gradient(45deg, #00ffff, #ff0080);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
}

.cyber-subtitle {
  color: #cccccc;
  font-size: 1rem;
  margin: 1rem 0 0 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.links-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 3rem;
}

.cyber-link {
  position: relative;
  display: block;
  padding: 1.5rem;
  background: rgba(0, 255, 255, 0.05);
  border: 1px solid #00ffff;
  text-decoration: none;
  color: #ffffff;
  transition: all 0.3s ease;
  clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 100%, 20px 100%);
}

.cyber-link:hover {
  background: rgba(0, 255, 255, 0.1);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
  transform: translateX(10px);
}

.link-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.link-icon {
  font-size: 1.5rem;
  color: #00ffff;
}

.link-text {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.neon-border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid transparent;
  background: linear-gradient(90deg, #00ffff, #ff0080) border-box;
  mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cyber-link:hover .neon-border {
  opacity: 1;
}

.footer-social {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.social-cyber {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: transparent;
  border: 2px solid #00ffff;
  color: #00ffff;
  text-decoration: none;
  font-size: 1.5rem;
  clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
  transition: all 0.3s ease;
}

.social-cyber:hover {
  background: #00ffff;
  color: #0a0a0f;
  box-shadow: 0 0 20px #00ffff;
}
      `,
      mobileCss: '',
      background: '',
      text: {
        primary: '',
        secondary: '',
      },
      button: {
        primary: '',
      },
    },
  },
  'minimalist-luxury': {
    id: 'minimalist-luxury',
    name: 'Minimalist Luxury',
    description: 'A clean, elegant theme with a minimalist and luxurious feel.',
    styles: {
      background: 'bg-gray-100',
      container: 'bg-white shadow-lg',
      text: {
        primary: 'text-gray-800',
        secondary: 'text-gray-600',
      },
      button: {
        primary: 'bg-gray-800 hover:bg-gray-900 text-white',
        hover: 'hover:scale-105 transition-all duration-300',
      },
      avatar: {
        border: 'border-gray-200',
        background: 'bg-white',
      },
    },
    exportStyles: {
      css: `
.luxury-template {
  min-height: 100vh;
  background: linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%);
  font-family: 'Playfair Display', serif;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.content-wrapper {
  max-width: 420px;
  width: 100%;
  background: #ffffff;
  border-radius: 0;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  padding: 4rem 3rem;
  position: relative;
}

.content-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #d4af37, #f4e4bc);
}

.profile-header {
  text-align: center;
  margin-bottom: 4rem;
}

.avatar-wrapper {
  margin-bottom: 2rem;
  position: relative;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #f8f8f8;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.profile-name {
  font-size: 2.25rem;
  font-weight: 400;
  color: #2c2c2c;
  margin: 0 0 1rem 0;
  letter-spacing: -0.5px;
}

.profile-tagline {
  color: #666666;
  font-size: 1.1rem;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  line-height: 1.6;
  margin: 0;
  font-style: italic;
}

.links-section {
  margin-bottom: 3rem;
}

.luxury-link {
  display: block;
  text-decoration: none;
  margin-bottom: 1.5rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.luxury-link:last-child {
  margin-bottom: 0;
}

.link-wrapper {
  padding: 1.75rem 2rem;
  border: 1px solid #e8e8e8;
  position: relative;
  background: #ffffff;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.luxury-link:hover .link-wrapper {
  border-color: #d4af37;
  box-shadow: 0 8px 32px rgba(212, 175, 55, 0.15);
  transform: translateY(-2px);
}

.link-label {
  font-size: 1.1rem;
  color: #2c2c2c;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.link-decoration {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background: linear-gradient(90deg, #d4af37, #f4e4bc);
  width: 0;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.luxury-link:hover .link-decoration {
  width: 100%;
}

.social-section {
  text-align: center;
}

.social-divider {
  width: 80px;
  height: 1px;
  background: #e8e8e8;
  margin: 0 auto 2rem auto;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: #f8f8f8;
  color: #666666;
  text-decoration: none;
  font-size: 1.25rem;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: #d4af37;
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(212, 175, 55, 0.3);
}
      `,
      mobileCss: '',
      background: '',
      text: {
        primary: '',
        secondary: '',
      },
      button: {
        primary: '',
      },
    },
  },
  'retro-gaming': {
    id: 'retro-gaming',
    name: 'Retro Gaming',
    description: 'A fun, retro theme inspired by classic video games.',
    styles: {
      background: 'bg-gray-800',
      container: 'bg-black/80 border-4 border-green-400',
      text: {
        primary: 'text-green-400',
        secondary: 'text-yellow-400',
      },
      button: {
        primary: 'bg-green-400/20 hover:bg-green-400/30 text-green-400',
        hover: 'hover:scale-105 transition-all duration-300',
      },
      avatar: {
        border: 'border-green-400',
        background: 'bg-black/80',
      },
    },
    exportStyles: {
      css: `
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.retro-gaming-template {
  min-height: 100vh;
  background: linear-gradient(45deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  font-family: 'Press Start 2P', monospace;
  color: #00ff41;
  position: relative;
  padding: 2rem 1rem;
}

.scanlines {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 2px,
    rgba(0, 255, 65, 0.03) 2px,
    rgba(0, 255, 65, 0.03) 4px
  );
  pointer-events: none;
  z-index: 1;
}

.container {
  max-width: 480px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.game-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  border: 3px solid #00ff41;
  background: rgba(0, 0, 0, 0.6);
  position: relative;
}

.game-header::before {
  content: '● PLAYER SELECT ●';
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #1a1a2e;
  padding: 0 1rem;
  font-size: 8px;
  color: #00ff41;
}

.pixel-avatar {
  position: relative;
  display: inline-block;
  margin-bottom: 1.5rem;
}

.avatar-img {
  width: 100px;
  height: 100px;
  border-radius: 0;
  object-fit: cover;
  filter: contrast(1.2) saturate(0.8);
  image-rendering: pixelated;
}

.pixel-border {
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  border: 3px solid #00ff41;
  background: transparent;
}

.player-name {
  font-size: 1.2rem;
  color: #ff6b35;
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  animation: blink 2s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0.7; }
}

.level-text {
  font-size: 8px;
  color: #00ff41;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.game-menu {
  background: rgba(0, 0, 0, 0.8);
  border: 3px solid #00ff41;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  background: rgba(0, 255, 65, 0.1);
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  font-size: 10px;
}

.menu-item:last-child {
  margin-bottom: 0;
}

.menu-item:hover {
  background: rgba(0, 255, 65, 0.2);
  border-color: #00ff41;
  transform: translateX(8px);
}

.menu-icon {
  width: 20px;
  margin-right: 1rem;
  color: #ff6b35;
}

.menu-text {
  flex: 1;
  color: #00ff41;
}

.menu-arrow {
  color: #ff6b35;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.power-ups {
  text-align: center;
  background: rgba(0, 0, 0, 0.6);
  border: 3px solid #ff6b35;
  padding: 1.5rem;
  position: relative;
}

.power-up-label {
  font-size: 8px;
  color: #ff6b35;
  margin-bottom: 1rem;
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #1a1a2e;
  padding: 0 1rem;
}

.power-up-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.power-up {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 107, 53, 0.2);
  border: 2px solid #ff6b35;
  color: #ff6b35;
  text-decoration: none;
  font-size: 12px;
  transition: all 0.3s ease;
}

.power-up:hover {
  background: #ff6b35;
  color: #1a1a2e;
  box-shadow: 0 0 15px #ff6b35;
}

/* Interactive JavaScript for menu items */
.menu-item:active {
  transform: translateX(8px) scale(0.98);
}
      `,
      mobileCss: '',
      background: '',
      text: {
        primary: '',
        secondary: '',
      },
      button: {
        primary: '',
      },
    },
  },
  'creative-portfolio': {
    id: 'creative-portfolio',
    name: 'Creative Portfolio',
    description: 'A vibrant, creative theme perfect for showcasing a portfolio.',
    styles: {
      background: 'bg-gradient-to-br from-pink-300 to-purple-300',
      container: 'bg-white/80 backdrop-blur-md shadow-lg',
      text: {
        primary: 'text-gray-800',
        secondary: 'text-gray-600',
      },
      button: {
        primary: 'bg-purple-600 hover:bg-purple-700 text-white',
        hover: 'hover:scale-105 transition-all duration-300',
      },
      avatar: {
        border: 'border-white',
        background: 'bg-white/80',
      },
    },
    exportStyles: {
      css: `
.portfolio-template {
  min-height: 100vh;
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow-x: hidden;
}

.bg-shapes {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(1px);
}

.shape-1 {
  width: 300px;
  height: 300px;
  top: -150px;
  right: -150px;
  animation: float 20s ease-in-out infinite;
}

.shape-2 {
  width: 200px;
  height: 200px;
  bottom: -100px;
  left: -100px;
  animation: float 25s ease-in-out infinite reverse;
}

.shape-3 {
  width: 150px;
  height: 150px;
  top: 50%;
  left: -75px;
  animation: float 30s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

.portfolio-container {
  position: relative;
  z-index: 10;
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

.hero-section {
  text-align: center;
  margin-bottom: 4rem;
}

.profile-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 3rem 2rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.avatar-frame {
  position: relative;
  display: inline-block;
  margin-bottom: 2rem;
}

.profile-pic {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 6px solid #ffffff;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.frame-decoration {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, #ff9a9e, #fad0c4, #ffd1ff, #ff9a9e);
  z-index: -1;
  animation: rotate 10s linear infinite;
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.creative-name {
  font-size: 2.5rem;
  font-weight: 800;
  color: #2d3748;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.creative-role {
  font-size: 1.3rem;
  color: #4a5568;
  margin: 0 0 1.5rem 0;
  font-weight: 500;
}

.availability {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #e6fffa;
  color: #234e52;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #38a169;
  border-radius: 50%;
  animation: pulse-dot 2s infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 4rem;
}

.project-card {
  position: relative;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.15);
}

.project-card:hover::before {
  opacity: 1;
}

.card-content {
  position: relative;
  z-index: 2;
}

.project-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #667eea;
}

.project-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(102, 126, 234, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.4s ease;
  border-radius: 20px;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.view-text {
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
}

.contact-section {
  text-align: center;
}

.section-title {
  font-size: 2rem;
  font-weight: 800;
  color: #2d3748;
  margin-bottom: 2rem;
}

.social-grid {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.social-card {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.social-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

.social-icon {
  font-size: 1.8rem;
  color: #667eea;
}
      `,
      mobileCss: '',
      background: '',
      text: {
        primary: '',
        secondary: '',
      },
      button: {
        primary: '',
      },
    },
  },
};