"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Instagram, 
  Facebook, 
  Youtube, 
  Linkedin, 
  Github, 
  Globe,
  X,
  MessageCircle,
  Heart,
  Share2,
  Share
} from "lucide-react";

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  isActive: boolean;
  icon: React.ReactNode;
}

interface SocialLinksProps {
  onLinksChange?: (links: SocialLink[]) => void;
}

const socialPlatforms = [
  { name: "Instagram", icon: <Instagram className="w-4 h-4" />, placeholder: "https://instagram.com/username" },
  { name: "Twitter", icon: <X className="w-4 h-4" />, placeholder: "https://twitter.com/username" },
  { name: "Facebook", icon: <Facebook className="w-4 h-4" />, placeholder: "https://facebook.com/username" },
  { name: "YouTube", icon: <Youtube className="w-4 h-4" />, placeholder: "https://youtube.com/@username" },
  { name: "LinkedIn", icon: <Linkedin className="w-4 h-4" />, placeholder: "https://linkedin.com/in/username" },
  { name: "GitHub", icon: <Github className="w-4 h-4" />, placeholder: "https://github.com/username" },
  { name: "TikTok", icon: <MessageCircle className="w-4 h-4" />, placeholder: "https://tiktok.com/@username" },
  { name: "Snapchat", icon: <Heart className="w-4 h-4" />, placeholder: "https://snapchat.com/add/username" },
  { name: "Pinterest", icon: <Share2 className="w-4 h-4" />, placeholder: "https://pinterest.com/username" },
  { name: "Website", icon: <Globe className="w-4 h-4" />, placeholder: "https://yourwebsite.com" },
];

export function SocialLinks({ onLinksChange }: SocialLinksProps) {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(
    socialPlatforms.map((platform, index) => ({
      id: `social-${index}`,
      platform: platform.name,
      url: "",
      isActive: false,
      icon: platform.icon,
    }))
  );

  const updateSocialLink = (id: string, field: 'url' | 'isActive', value: string | boolean) => {
    const updatedLinks = socialLinks.map(link =>
      link.id === id ? { ...link, [field]: value } : link
    );
    setSocialLinks(updatedLinks);
    onLinksChange?.(updatedLinks.filter(link => link.isActive && link.url.trim()));
  };

  const getPlaceholder = (platform: string) => {
    const platformData = socialPlatforms.find(p => p.name === platform);
    return platformData?.placeholder || "Enter URL";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Share className="w-5 h-5 text-blue-600" />
          <CardTitle className="text-lg font-semibold">Social Media Links</CardTitle>
        </div>
        <p className="text-sm text-gray-600">
          Add your social media profiles and website
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {socialLinks.map((link) => (
            <div key={link.id} className="space-y-3 p-4 border rounded-lg bg-gray-50/50">
              {/* Platform Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {/* Platform Icon */}
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white border shadow-sm">
                    {link.icon}
                  </div>
                  
                  {/* Platform Name */}
                  <Label className="text-sm font-medium">{link.platform}</Label>
                </div>
                
                {/* Toggle Switch */}
                <Switch
                  checked={link.isActive}
                  onCheckedChange={(checked: boolean) => updateSocialLink(link.id, 'isActive', checked)}
                />
              </div>
              
              {/* URL Input */}
              {link.isActive && (
                <div className="space-y-2">
                  <Input
                    placeholder={getPlaceholder(link.platform)}
                    value={link.url}
                    onChange={(e) => updateSocialLink(link.id, 'url', e.target.value)}
                    className="w-full"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-xs text-gray-500 mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="font-medium text-blue-900 mb-1">💡 Tip:</p>
          <p>Toggle the switches to add your social media profiles. Only active links with URLs will be displayed on your bio page.</p>
        </div>
      </CardContent>
    </Card>
  );
}
