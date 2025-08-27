"use client";

import { useState, useEffect, useMemo, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Smartphone, Monitor } from "lucide-react";
import type { FormData, LinkItem, SocialLink } from "@/components/form/link-form";
import type { ThemeConfig } from '@/lib/themes/theme-mappings';
import { useAuth } from "@/contexts/auth-context";
import { trackLinkClick } from "@/lib/performance-utils";

interface LinkPreviewProps {
  formData: FormData;
  links: LinkItem[];
  socialLinks: SocialLink[];
  selectedTheme?: string;
  isMobilePreview?: boolean;
}

function LinkPreviewInner({
  formData,
  links,
  socialLinks,
  selectedTheme = "minimal",
  isMobilePreview = false
}: LinkPreviewProps) {
  const [theme, setTheme] = useState<ThemeConfig | null>(null);
  
  // Resolve theme config on client after on-demand import (use async helper if available)
  useEffect(() => {
    let mounted = true;
    (async () => {
      const mod = await import('@/lib/themes/theme-mappings');
      const getAsync = (mod as any).getThemeConfigAsync;
      if (typeof getAsync === 'function') {
        const cfg = await getAsync(selectedTheme);
        if (mounted) setTheme(cfg);
      } else {
        const cfg = mod.getThemeConfig(selectedTheme);
        if (mounted) setTheme(cfg);
      }
    })();
    return () => { mounted = false; };
  }, [selectedTheme]);

  // Fix: Use useMemo for profileImageUrl (remove the useState declaration)
  const profileImageUrl = useMemo(() => {
    if (formData?.profileImage instanceof File) {
      return URL.createObjectURL(formData.profileImage);
    }
    return formData?.profileImage || null;
  }, [formData?.profileImage]);

  const activeSocial = useMemo(() => socialLinks?.filter(l => l?.isActive) || [], [socialLinks]);
  
  const safeLinks = useMemo(
    () => links?.map((l, i) => ({ ...l, key: l?.id ?? `k-${i}` })) || [],
    [links]
  );

  const { user } = useAuth();

  if (!theme) {
    return (
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold">Live Preview</CardTitle>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              {isMobilePreview ? (
                <><Smartphone className="w-4 h-4" /><span>Mobile</span></>
              ) : (
                <><Monitor className="w-4 h-4" /><span>Desktop</span></>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center text-gray-500 text-sm">
            Loading preview...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Live Preview</CardTitle>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            {isMobilePreview ? (
              <><Smartphone className="w-4 h-4" /><span>Mobile</span></>
            ) : (
              <><Monitor className="w-4 h-4" /><span>Desktop</span></>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className={`mx-auto ${isMobilePreview ? 'max-w-[320px]' : 'max-w-sm'}`}>
          <div className={`
            ${theme.styles.background}
            rounded-3xl p-6 shadow-lg h-[580px] transition-all duration-500
            ${isMobilePreview ? 'w-[320px] h-[580px] overflow-hidden' : ''}
          `}>
            <div className={`
              ${theme.styles.container}
              rounded-2xl p-6 h-full
              ${isMobilePreview ? 'p-4' : ''}
            `}>
              {/* Profile Section */}
              <div className="flex flex-col items-center text-center mb-8">
                <Avatar className={`
                  ${isMobilePreview ? 'w-16 h-16' : 'w-20 h-20'} mb-4 border-2
                  ${theme.styles.avatar.border} ${theme.styles.avatar.background}
                `}>
                  <AvatarImage src={profileImageUrl || ''} />
                  <AvatarFallback className={`
                    ${theme.styles.avatar.background} ${theme.styles.text.primary}
                    ${isMobilePreview ? 'text-lg' : 'text-xl'}
                  `}>
                    {formData?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <h2 className={`${isMobilePreview ? 'text-lg' : 'text-xl'} mb-2 ${theme.styles.text.primary}`}>
                  {formData?.name || "Your Name"}
                </h2>
                <p className={`text-sm mb-6 leading-relaxed ${theme.styles.text.secondary} ${isMobilePreview ? 'text-xs' : ''}`}>
                  {formData?.bio || "Short bio goes here"}
                </p>
              </div>

              {/* Links Section */}
              <div className="space-y-3">
                {safeLinks.map((link, index) => (
                  <Button
                    key={link.key}
                    className={`
                      w-full ${isMobilePreview ? 'h-10 text-sm' : 'h-12'} rounded-full
                      ${theme.styles.button.primary}
                      ${theme.styles.button.hover}
                    `}
                    asChild
                    onClick={() => {
                      if (user) {
                        trackLinkClick(user.uid);
                      }
                    }}
                  >
                    <a href={link.url || '#'} target="_blank" rel="noopener noreferrer">
                      <span className="font-medium">
                        {link.title || `Link ${index + 1}`}
                      </span>
                    </a>
                  </Button>
                ))}
              </div>

              {/* Social Links Section */}
              {activeSocial.length > 0 && (
                <div className="flex justify-center items-center space-x-4 mt-8">
                  {activeSocial.map(link => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${theme.styles.text.secondary} hover:opacity-75 transition-opacity`}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export const LinkPreview = memo(LinkPreviewInner);
