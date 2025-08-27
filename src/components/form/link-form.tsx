"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X, Upload, User, FileText, Link as LinkIcon } from "lucide-react";
import { ThemeSelector } from "@/components/theme/theme-selector";
import { SocialLinks } from "@/components/form/social-links";
import { trackLinkClick } from "@/lib/performance-utils";
import { useAuth } from "@/contexts/auth-context";

export interface LinkItem {
  id: string
  title: string
  url: string
  description?: string
  icon?: string
  isActive?: boolean
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  isActive: boolean;
  icon: React.ReactNode;
}

export interface FormData {
  name: string;
  bio: string;
  profileImage: File | null;
  avatar: string;
}

interface LinkBuilderFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  links: LinkItem[];
  setLinks: React.Dispatch<React.SetStateAction<LinkItem[]>>;
  socialLinks: SocialLink[];
  setSocialLinks: React.Dispatch<React.SetStateAction<SocialLink[]>>;
  onThemeChange?: (theme: string) => void;
}

export function LinkBuilderForm({ 
  formData, 
  setFormData, 
  links, 
  setLinks, 
  socialLinks, 
  setSocialLinks, 
  onThemeChange 
}: LinkBuilderFormProps) {
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);
  const [bioPrompt, setBioPrompt] = useState('');
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);
  const { user } = useAuth();

  const addLink = () => {
    const newLink: LinkItem = {
      id: Date.now().toString(),
      title: "",
      url: "",
    };
    setLinks([...links, newLink]);
  };

  const removeLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const updateLink = (id: string, field: 'title' | 'url', value: string) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    ));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, profileImage: file });
    }
  };

  const handleSocialLinksChange = (updatedLinks: SocialLink[]) => {
    setSocialLinks(updatedLinks);
  };

  const handleGenerateBio = async () => {
    if (!bioPrompt.trim()) return;
    setIsGeneratingBio(true);

    const response = await fetch('/api/generate-bio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: bioPrompt }),
    });

    const { bio } = await response.json();
    setFormData({ ...formData, bio });
    setIsGeneratingBio(false);
    setIsBioModalOpen(false);
  };

  return (
    <>
      <div className="space-y-6">
      {/* Profile Information Card */}
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-lg font-semibold">Profile Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Display Name
            </Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full"
            />
          </div>

          {/* Bio Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="bio" className="text-sm font-medium">
                Bio
              </Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsBioModalOpen(true)}
              >
                Generate with AI
              </Button>
            </div>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full resize-none"
              rows={3}
            />
          </div>

          {/* Profile Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="profile-image" className="text-sm font-medium">
              Profile Image
            </Label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Input
                id="profile-image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('profile-image')?.click()}
                className="flex items-center gap-2 w-full sm:w-auto"
              >
                <Upload className="w-4 h-4" />
                Upload Image
              </Button>
              {formData.profileImage && (
                <span className="text-sm text-gray-600 truncate max-w-full sm:max-w-32">
                  {formData.profileImage.name}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Links Section */}
      <SocialLinks onLinksChange={handleSocialLinksChange} />

      {/* Custom Links Section */}
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <LinkIcon className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-lg font-semibold">Custom Links</CardTitle>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                addLink();
                if (user) {
                  trackLinkClick(user.uid);
                }
              }}
              className="flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Link</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {links.map((link, index) => (
              <div key={link.id} className="space-y-3 p-4 border rounded-lg bg-gray-50/50 dark:bg-gray-800/50 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Link {index + 1}
                  </span>
                  {links.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLink(link.id)}
                      className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="space-y-2">
                  <Input
                    placeholder="Link title (e.g., My Portfolio)"
                    value={link.title}
                    onChange={(e) => updateLink(link.id, 'title', e.target.value)}
                    className="w-full"
                  />
                  <Input
                    placeholder="https://example.com"
                    value={link.url}
                    onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Theme Selector */}
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-lg font-semibold">Choose Template</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ThemeSelector onThemeChange={onThemeChange} />
        </CardContent>
      </Card>


    </div>
    <BioModal
      isOpen={isBioModalOpen}
      onClose={() => setIsBioModalOpen(false)}
      onGenerate={handleGenerateBio}
      prompt={bioPrompt}
      setPrompt={setBioPrompt}
      isGeneratingBio={isGeneratingBio}
    />
    </>
  );
}

interface BioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: () => void;
  prompt: string;
  setPrompt: (prompt: string) => void;
  isGeneratingBio: boolean;
}

function BioModal({ isOpen, onClose, onGenerate, prompt, setPrompt, isGeneratingBio }: BioModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Generate Bio with AI</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Tell us a little about yourself, and our AI will craft a bio for you.
        </p>
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., I'm a software engineer who loves to travel and play guitar."
          className="w-full resize-none mb-4"
          rows={4}
        />
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onGenerate} disabled={isGeneratingBio}>
            {isGeneratingBio ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                Generating...
              </>
            ) : (
              'Generate'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
