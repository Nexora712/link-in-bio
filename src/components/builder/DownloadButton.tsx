'use client'

import { useState } from "react"
import { Download, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import JSZip from "jszip"
import { saveAs } from "file-saver"
import { LinkFormData } from "@/types/link"

interface DownloadButtonProps {
  formData: LinkFormData
}

const DownloadButton = ({ formData }: DownloadButtonProps) => {
  const [isDownloading, setIsDownloading] = useState(false)

  // Generate README.md content
  const generateReadme = () => {
    return `# ${formData.displayName || 'Your'} Bio Website

This is your personal bio website created with LinkNest.

## 🚀 How to Run

### Option 1: Simple HTML (Recommended for beginners)
1. Extract the ZIP file to a folder
2. Open \`index.html\` in your web browser
3. Your website is ready!

### Option 2: Local Development Server
1. Install [Node.js](https://nodejs.org/) if you haven't already
2. Install a simple server globally: \`npm install -g http-server\`
3. Navigate to the extracted folder in terminal/command prompt
4. Run: \`http-server\`
5. Open your browser and go to \`http://localhost:8080\`

### Option 3: Using Python (if Python is installed)
1. Navigate to the extracted folder in terminal/command prompt
2. Run: \`python -m http.server 8000\` (Python 3) or \`python -m SimpleHTTPServer 8000\` (Python 2)
3. Open your browser and go to \`http://localhost:8000\`

## 📝 Customization

- Edit \`index.html\` to modify content
- Edit \`styles.css\` to change styling
- Edit \`script.js\` to add interactive features
- Replace \`profile.jpg\` with your own profile picture

## 🌐 Deployment

You can deploy this website to any static hosting service:
- **GitHub Pages**: Free hosting for GitHub repositories
- **Netlify**: Drag and drop deployment
- **Vercel**: Simple deployment with Git integration
- **Firebase Hosting**: Google's hosting solution

## 📞 Support

Created with ❤️ using LinkNest - https://linknest.com

---
*Generated on ${new Date().toLocaleDateString()}*
`
  }

  // Generate HTML content
  const generateIndexHtml = () => {
    const socialLinks = Object.entries(formData.socialLinks)
      .filter(([_, url]) => url)
      .map(([platform, url]) => {
        const icons = {
          instagram: '📷',
          twitter: '🐦',
          linkedin: '💼',
          youtube: '🎥',
          tiktok: '🎵'
        }
        return `
          <a href="${url}" target="_blank" rel="noopener noreferrer" class="social-link">
            <span class="social-icon">${icons[platform as keyof typeof icons] || '🔗'}</span>
            <span class="social-name">${platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
          </a>
        `
      }).join('')

    const customLinks = formData.customLinks
      .map(link => `
        <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="custom-link">
          <div class="link-content">
            <h3 class="link-title">${link.title}</h3>
            ${link.description ? `<p class="link-description">${link.description}</p>` : ''}
          </div>
          <span class="link-arrow">→</span>
        </a>
      `).join('')

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${formData.displayName || 'Bio Page'}</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container">
        <div class="profile-section">
            <div class="profile-image">
                ${formData.profileImage ? 
                  `<img src="profile.jpg" alt="Profile Picture" id="profileImg">` : 
                  `<div class="profile-placeholder">
                     <span>📸</span>
                     <p>Add Photo</p>
                   </div>`
                }
            </div>
            
            <h1 class="name">${formData.displayName || 'Your Name'}</h1>
            
            <p class="bio">${formData.bio || 'Your bio will appear here. Add a compelling description about yourself to engage your visitors and tell them what makes you unique.'}</p>
        </div>
        
        ${socialLinks ? `
        <div class="social-section">
            <h2>Connect with me</h2>
            <div class="social-links">
                ${socialLinks}
            </div>
        </div>
        ` : ''}
        
        ${customLinks ? `
        <div class="links-section">
            <h2>My Links</h2>
            <div class="custom-links">
                ${customLinks}
            </div>
        </div>
        ` : ''}
        
        <footer class="footer">
            <p>Created with <a href="https://linknest.com" target="_blank">LinkNest</a></p>
        </footer>
    </div>
    
    <script src="script.js"></script>
</body>
</html>`
  }

  // Generate CSS content
  const generateStylesCss = () => {
    return `/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #ffffff;
    min-height: 100vh;
}

.container {
    max-width: 480px;
    margin: 0 auto;
    padding: 40px 20px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* Profile Section */
.profile-section {
    text-align: center;
    margin-bottom: 40px;
}

.profile-image {
    width: 120px;
    height: 120px;
    margin: 0 auto 24px;
    border-radius: 20px;
    overflow: hidden;
    background: #f8f8f8;
    border: 2px solid #e5e5e5;
}

.profile-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.profile-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #666;
}

.profile-placeholder span {
    font-size: 32px;
    margin-bottom: 8px;
}

.profile-placeholder p {
    font-size: 12px;
    font-weight: 500;
}

.name {
    font-family: 'Playfair Display', serif;
    font-size: 2.5rem;
    font-weight: 700;
    color: #000;
    margin-bottom: 16px;
    letter-spacing: -0.02em;
}

.bio {
    font-size: 16px;
    color: #666;
    line-height: 1.6;
    max-width: 400px;
    margin: 0 auto;
}

/* Social Section */
.social-section {
    width: 100%;
    margin-bottom: 40px;
}

.social-section h2 {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 20px;
    color: #000;
}

.social-links {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
}

.social-link {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    background: #f8f8f8;
    border: 1px solid #e5e5e5;
    border-radius: 12px;
    text-decoration: none;
    color: #333;
    transition: all 0.2s ease;
    font-size: 14px;
    font-weight: 500;
}

.social-link:hover {
    background: #000;
    color: #fff;
    border-color: #000;
    transform: translateY(-2px);
}

.social-icon {
    font-size: 16px;
}

/* Links Section */
.links-section {
    width: 100%;
    margin-bottom: 40px;
}

.links-section h2 {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 20px;
    color: #000;
}

.custom-links {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
}

.custom-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    background: #f8f8f8;
    border: 1px solid #e5e5e5;
    border-radius: 16px;
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.custom-link:hover {
    background: #000;
    color: #fff;
    border-color: #000;
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.link-content {
    flex: 1;
}

.link-title {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 4px;
    color: inherit;
}

.link-description {
    font-size: 14px;
    color: #666;
    margin: 0;
}

.custom-link:hover .link-description {
    color: #ccc;
}

.link-arrow {
    font-size: 20px;
    opacity: 0.5;
    transition: all 0.3s ease;
}

.custom-link:hover .link-arrow {
    opacity: 1;
    transform: translateX(4px);
}

/* Footer */
.footer {
    margin-top: auto;
    text-align: center;
    padding-top: 40px;
    opacity: 0.6;
}

.footer p {
    font-size: 12px;
    color: #666;
}

.footer a {
    color: #000;
    text-decoration: none;
    font-weight: 500;
}

.footer a:hover {
    text-decoration: underline;
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
    body {
        background-color: #000;
        color: #fff;
    }
    
    .profile-image {
        background: #111;
        border-color: #222;
    }
    
    .profile-placeholder {
        color: #ccc;
    }
    
    .name {
        color: #fff;
    }
    
    .bio {
        color: #ccc;
    }
    
    .social-section h2,
    .links-section h2 {
        color: #fff;
    }
    
    .social-link {
        background: #111;
        border-color: #222;
        color: #fff;
    }
    
    .social-link:hover {
        background: #fff;
        color: #000;
        border-color: #fff;
    }
    
    .custom-link {
        background: #111;
        border-color: #222;
    }
    
    .custom-link:hover {
        background: #fff;
        color: #000;
        border-color: #fff;
    }
    
    .link-description {
        color: #ccc;
    }
    
    .custom-link:hover .link-description {
        color: #666;
    }
    
    .footer a {
        color: #fff;
    }
}

/* Responsive Design */
@media (max-width: 480px) {
    .container {
        padding: 32px 16px;
    }
    
    .name {
        font-size: 2rem;
    }
    
    .bio {
        font-size: 15px;
    }
    
    .social-links {
        gap: 8px;
    }
    
    .social-link {
        padding: 10px 12px;
        font-size: 13px;
    }
    
    .custom-link {
        padding: 16px;
    }
    
    .link-title {
        font-size: 16px;
    }
    
    .link-description {
        font-size: 13px;
    }
}

/* Animation */
.container > * {
    animation: fadeInUp 0.6s ease-out forwards;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}`
  }

  // Generate JavaScript content
  const generateScriptJs = () => {
    return `// Bio Website JavaScript
console.log('Welcome to your bio website!');

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add click tracking for links (you can replace this with your analytics)
document.querySelectorAll('.custom-link, .social-link').forEach(link => {
    link.addEventListener('click', function() {
        console.log('Link clicked:', this.href);
        // Add your analytics tracking code here
        // gtag('event', 'click', { event_category: 'outbound', event_label: this.href });
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Easter egg: Console message
console.log(\`
🎉 This website was created with LinkNest!
Visit https://linknest.com to create your own bio page.

Built with ❤️ for \${document.querySelector('.name')?.textContent || 'you'}
\`);`
  }

  // Generate package.json for optional local development
  const generatePackageJson = () => {
    return JSON.stringify({
      "name": `${formData.displayName?.toLowerCase().replace(/\s+/g, '-') || 'my'}-bio-website`,
      "version": "1.0.0",
      "description": `Personal bio website for ${formData.displayName || 'User'}`,
      "main": "index.html",
      "scripts": {
        "start": "http-server . -p 8080",
        "dev": "http-server . -p 8080 -o"
      },
      "devDependencies": {
        "http-server": "^14.1.1"
      },
      "keywords": ["bio", "personal", "website", "linknest"],
      "author": formData.displayName || "User",
      "license": "MIT"
    }, null, 2)
  }

  const handleDownload = async () => {
    setIsDownloading(true)
    
    try {
      const zip = new JSZip()
      
      // Add main files
      zip.file("README.md", generateReadme())
      zip.file("index.html", generateIndexHtml())
      zip.file("styles.css", generateStylesCss())
      zip.file("script.js", generateScriptJs())
      zip.file("package.json", generatePackageJson())
      
      // Add profile image if available
      if (formData.profileImage) {
        if (typeof formData.profileImage === 'string') {
          // If it's a URL, fetch it
          try {
            const response = await fetch(formData.profileImage)
            const blob = await response.blob()
            zip.file("profile.jpg", blob)
          } catch (error) {
            console.warn('Could not download profile image:', error)
          }
        } else {
          // If it's a File object
          zip.file("profile.jpg", formData.profileImage)
        }
      }
      
      // Generate and download the ZIP
      const content = await zip.generateAsync({ type: "blob" })
      const filename = `${formData.displayName?.toLowerCase().replace(/\s+/g, '-') || 'my'}-bio-website.zip`
      saveAs(content, filename)
      
    } catch (error) {
      console.error('Error generating download:', error)
      alert('Sorry, there was an error generating your download. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <motion.button
      onClick={handleDownload}
      disabled={isDownloading}
      className="flex items-center gap-3 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      style={{ fontFamily: 'Inter, sans-serif' }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {isDownloading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Preparing Download...
        </>
      ) : (
        <>
          <Download className="w-5 h-5" />
          Download Website
        </>
      )}
    </motion.button>
  )
}

export default DownloadButton
