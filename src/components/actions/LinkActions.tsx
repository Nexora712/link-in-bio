"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Copy, 
  Download, 
  CreditCard, 
  CheckCircle, 
  AlertCircle,
  ExternalLink,
  Code,
  FileDown,
  Globe
} from "lucide-react";
import { saveAs } from "file-saver";
import Link from "next/link";

import { generateHtmlContent } from "@/lib/html-generator";
import { FormData, LinkItem, SocialLink } from "@/components/form/link-form";

interface LinkActionsProps {
  formData: FormData;
  links: LinkItem[];
  socialLinks: SocialLink[];
  selectedTheme: string;
  onCopySuccess?: () => void;
  onCopyError?: (error: string) => void;
}

export function LinkActions({
  formData,
  links,
  socialLinks,
  selectedTheme,
  onCopySuccess,
  onCopyError,
}: LinkActionsProps) {
  const [isCopying, setIsCopying] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  const handleGenerateHtml = async () => {
    return await generateHtmlContent({
      formData,
      links,
      socialLinks,
      selectedTheme,
    });
  };

  const copyToClipboard = async () => {
    setIsCopying(true);
    setCopyStatus("idle");

    try {
      const html = await handleGenerateHtml();
      await navigator.clipboard.writeText(html);
      setCopyStatus("success");
      onCopySuccess?.();

      // Reset status after 2 seconds
      setTimeout(() => setCopyStatus("idle"), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
      setCopyStatus("error");
      onCopyError?.(error instanceof Error ? error.message : "Failed to copy");
    } finally {
      setIsCopying(false);
    }
  };

  const downloadAsZip = async () => {
    setIsDownloading(true);

    try {
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();
      const html = await handleGenerateHtml();

      // Add HTML file
      zip.file("index.html", html);

      // Add README file
      const readmeContent = `
# Your Bio Links

This is your personalized link-in-bio page.

## Files included:
- index.html - Your main page
- styles.css - Custom styling

## How to use:
1. Upload these files to any web hosting service
2. Customize the styles.css file to match your brand
3. Share your hosted URL

## Hosting options:
- GitHub Pages (free)
- Netlify (free)
- Vercel (free)
- Any web hosting service

## Customization:
- Edit the HTML content in index.html
- Modify colors and styles in styles.css
- Add your own images and branding

Enjoy your new bio links page!
      `;
      
      zip.file("README.md", readmeContent);
      
      // Generate and download the ZIP
      const blob = await zip.generateAsync({ type: "blob" });
      saveAs(blob, "your-bio-links.zip");
    } catch (error) {
      console.error('Failed to download:', error);
      alert('Failed to download ZIP file. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };



  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Export Your Bio Page</CardTitle>
        <p className="text-sm text-gray-600">
          Choose how you want to use your bio page
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Copy HTML Button */}
        <div className="space-y-2">
          <Button
            onClick={copyToClipboard}
            disabled={isCopying}
            className="w-full h-12"
            variant="outline"
          >
            {isCopying ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                Copying...
              </>
            ) : copyStatus === 'success' ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                Copied!
              </>
            ) : copyStatus === 'error' ? (
              <>
                <AlertCircle className="w-4 h-4 mr-2 text-red-500" />
                Copy Failed
              </>
            ) : (
              <>
                <Code className="w-4 h-4 mr-2" />
                Copy HTML Code
              </>
            )}
          </Button>
          <p className="text-xs text-gray-500">
            Copy the HTML code to paste into any web editor
          </p>
        </div>

        {/* Download ZIP Button */}
        <div className="space-y-2">
          <Button
            onClick={downloadAsZip}
            disabled={isDownloading}
            className="w-full h-12"
            variant="outline"
          >
            {isDownloading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                Creating ZIP...
              </>
            ) : (
              <>
                <FileDown className="w-4 h-4 mr-2" />
                Download ZIP Package
              </>
            )}
          </Button>
          <p className="text-xs text-gray-500">
            Download as a ZIP file with HTML, CSS, and README
          </p>
        </div>

        {/* PayPal Checkout Button */}
        {/* Get Hosted Version Button */}
        <div className="space-y-2">
            <Link href="/pricing" className="w-full">
              <Button
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
              >
                  <Globe className="w-4 h-4 mr-2" />
                  Get Hosted Version
              </Button>
            </Link>
          <p className="text-xs text-gray-500">
            Get a hosted version with custom domain (Premium)
          </p>
        </div>

        {/* Info Section */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
          <h4 className="font-medium text-blue-900 mb-2 flex items-center">
            <ExternalLink className="w-4 h-4 mr-2" />
            How to use your bio page:
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• <strong>Copy HTML:</strong> Paste into any web editor or CMS</li>
            <li>• <strong>Download ZIP:</strong> Upload to any web hosting service</li>
            <li>• <strong>Hosted Version:</strong> Get a custom domain and professional hosting</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
