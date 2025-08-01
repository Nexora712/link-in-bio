import { getThemeConfig } from "./themes/theme-mappings";
import { FormData, LinkItem, SocialLink } from "@/components/form/link-form";

interface GenerateHtmlContentOptions {
  formData: FormData;
  links: LinkItem[];
  socialLinks: SocialLink[];
  selectedTheme: string;
}

const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
});

export async function generateHtmlContent({
  formData,
  links,
  socialLinks,
  selectedTheme,
}: GenerateHtmlContentOptions): Promise<string> {
  const theme = getThemeConfig(selectedTheme);

  const platformToIconClass: { [key: string]: string } = {
    Instagram: "fab fa-instagram",
    Twitter: "fab fa-twitter",
    Facebook: "fab fa-facebook",
    YouTube: "fab fa-youtube",
    LinkedIn: "fab fa-linkedin",
    GitHub: "fab fa-github",
    TikTok: "fab fa-tiktok",
    Snapchat: "fab fa-snapchat",
    Pinterest: "fab fa-pinterest",
    Website: "fas fa-globe",
  };

  const linksHtml = links
    .map(
      (link) =>
        `<a href="${link.url}" class="link" target="_blank" rel="noopener noreferrer">${link.title}</a>`
    )
    .join("");

  const socialIconsHtml = socialLinks
    .filter((link) => link.isActive)
    .map((link) => {
      const iconClass =
        platformToIconClass[link.platform] || "fas fa-link";
      return `<a href="${link.url}" class="social-icon" target="_blank" rel="noopener noreferrer"><i class="${iconClass}"></i></a>`;
    })
    .join("");

  const fetchAsDataURI = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) return url;
      const blob = await response.blob();
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error(`Failed to fetch and encode ${url}:`, error);
      return url;
    }
  };

  let fontAwesomeCss = "";
  try {
    const response = await fetch(
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
    );
    if (response.ok) {
      let cssText = await response.text();
      const fontUrlRegex = /url\(([^)]+)\)/g;
      const fontUrls = cssText.match(fontUrlRegex) || [];
      
      for (const fontUrl of fontUrls) {
        const url = fontUrl.replace(/url\(["']?|["']?\)/g, "");
        const absoluteUrl = new URL(url, response.url).href;
        const dataUri = await fetchAsDataURI(absoluteUrl);
        cssText = cssText.replace(url, dataUri);
      }
      fontAwesomeCss = cssText;
    }
  } catch (error) {
    console.error("Failed to process Font Awesome CSS:", error);
  }

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${formData.name || "My Links"}</title>
        <meta name="description" content="${
          formData.bio || "Check out my links!"
        }">
        <meta property="og:title" content="${formData.name || "My Links"}" />
        <meta property="og:description" content="${
          formData.bio || "Check out my links!"
        }" />
        <style>
          ${theme.exportStyles.css}
        </style>
        <style>
          ${fontAwesomeCss}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="profile-header">
                ${
                  formData.profileImage
                    ? `<img src="${await toBase64(
                        formData.profileImage
                      )}" alt="Profile" class="profile-image">`
                    : ""
                }
                <h1>${formData.name}</h1>
                <p>${formData.bio}</p>
            </div>
            <div class="links">
                ${linksHtml}
            </div>
            <div class="social-links">
                ${socialIconsHtml}
            </div>
        </div>
    </body>
    </html>
  `;

  return html;
}
