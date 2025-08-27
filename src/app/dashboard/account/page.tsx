'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Upload, 
  User, 
  Mail, 
  AtSign, 
  FileText, 
  Camera, 
  Save, 
  Shield,
  Bell,
  Palette,
  Trash2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { trackProfileView } from '@/lib/performance-utils';

export default function AccountPage() {
  const { user, userProfile, updateUserProfile } = useAuth();
  
  const [formData, setFormData] = useState({
    displayName: userProfile?.displayName || "",
    email: userProfile?.email || "",
    username: userProfile?.username || "",
    bio: userProfile?.bio || "",
    profilePicture: userProfile?.photoURL || "",
  });
  
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (userProfile) {
      setFormData({
        displayName: userProfile.displayName || "",
        email: userProfile.email || "",
        username: userProfile.username || "",
        bio: userProfile.bio || "",
        profilePicture: userProfile.photoURL || "",
      });
    }
  }, [userProfile]);

  useEffect(() => {
    if (user) {
      trackProfileView(user.uid);
    }
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveChanges = async () => {
    setSaving(true);
    try {
      await updateUserProfile({
        displayName: formData.displayName,
        username: formData.username,
        bio: formData.bio,
        profilePicture: formData.profilePicture,
      } as any);
      
      setTimeout(() => setSaving(false), 1000);
    } catch (error: any) {
      console.error("Error updating profile:", error);
      setSaving(false);
    }
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setFormData(prev => ({
          ...prev,
          profilePicture: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'account', label: 'Account', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col space-y-2"
      >
        <h1 
          className="text-4xl md:text-5xl font-bold text-black dark:text-white tracking-tight"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Account Settings
        </h1>
        <p 
          className="text-lg text-[#444444] dark:text-[#CCCCCC]"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Manage your account information and preferences.
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex space-x-1 bg-[#F8F8F8] dark:bg-[#111111] rounded-xl p-1"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-white dark:bg-black text-black dark:text-white shadow-sm'
                  : 'text-[#444444] dark:text-[#CCCCCC] hover:text-black dark:hover:text-white'
              }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </motion.div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Profile Picture Card */}
          <Card className="border-[#E5E5E5] dark:border-[#222222] bg-white dark:bg-black rounded-xl">
            <CardHeader className="pb-4">
              <CardTitle 
                className="text-lg font-bold text-black dark:text-white"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Profile Picture
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
              <div className="relative group">
                <Avatar className="w-32 h-32 border-4 border-[#E5E5E5] dark:border-[#222222]">
                  <AvatarImage src={formData.profilePicture} alt="Profile" />
                  <AvatarFallback className="text-2xl font-bold bg-[#F8F8F8] dark:bg-[#111111] text-black dark:text-white">
                    {formData.displayName?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <div className="w-full">
                <input
                  id="profilePicture"
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="hidden"
                />
                <label
                  htmlFor="profilePicture"
                  className="w-full inline-flex items-center justify-center px-4 py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl hover:bg-[#444444] dark:hover:bg-[#CCCCCC] transition-colors cursor-pointer font-medium"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Change Picture
                </label>
              </div>

              <div className="text-center">
                <p className="text-sm text-[#444444] dark:text-[#CCCCCC]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Recommended: Square image, at least 400x400px
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Profile Information Card */}
          <div className="lg:col-span-2">
            <Card className="border-[#E5E5E5] dark:border-[#222222] bg-white dark:bg-black rounded-xl">
              <CardHeader className="pb-6">
                <CardTitle 
                  className="text-lg font-bold text-black dark:text-white"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label 
                      htmlFor="displayName" 
                      className="text-sm font-medium text-black dark:text-white flex items-center space-x-2"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      <User className="w-4 h-4" />
                      <span>Display Name</span>
                    </Label>
                    <Input
                      id="displayName"
                      type="text"
                      value={formData.displayName}
                      onChange={(e) => handleInputChange("displayName", e.target.value)}
                      className="border-[#E5E5E5] dark:border-[#222222] bg-white dark:bg-black rounded-lg"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label 
                      htmlFor="username" 
                      className="text-sm font-medium text-black dark:text-white flex items-center space-x-2"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      <AtSign className="w-4 h-4" />
                      <span>Username</span>
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      value={formData.username}
                      onChange={(e) => handleInputChange("username", e.target.value)}
                      className="border-[#E5E5E5] dark:border-[#222222] bg-white dark:bg-black rounded-lg"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label 
                    htmlFor="email" 
                    className="text-sm font-medium text-black dark:text-white flex items-center space-x-2"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email Address</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    disabled
                    className="border-[#E5E5E5] dark:border-[#222222] bg-[#F8F8F8] dark:bg-[#111111] rounded-lg opacity-60"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                  <p className="text-xs text-[#444444] dark:text-[#CCCCCC]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Email cannot be changed. Contact support if needed.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label 
                    htmlFor="bio" 
                    className="text-sm font-medium text-black dark:text-white flex items-center space-x-2"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <FileText className="w-4 h-4" />
                    <span>Bio</span>
                  </Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    placeholder="Tell people a bit about yourself..."
                    className="border-[#E5E5E5] dark:border-[#222222] bg-white dark:bg-black rounded-lg min-h-[100px] resize-none"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    maxLength={160}
                  />
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-[#444444] dark:text-[#CCCCCC]" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Brief description for your profile
                    </p>
                    <span className="text-xs text-[#444444] dark:text-[#CCCCCC]" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {formData.bio.length}/160
                    </span>
                  </div>
                </div>

                {/* Custom Separator */}
                <div className="border-t border-[#E5E5E5] dark:border-[#222222] my-6"></div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleSaveChanges}
                    disabled={saving}
                    className="bg-black dark:bg-white text-white dark:text-black hover:bg-[#444444] dark:hover:bg-[#CCCCCC] px-8 py-3 rounded-xl shadow-sm font-medium"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {saving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}

      {/* Account Tab */}
      {activeTab === 'account' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <Card className="border-[#E5E5E5] dark:border-[#222222] bg-white dark:bg-black rounded-xl">
            <CardHeader>
              <CardTitle 
                className="text-lg font-bold text-black dark:text-white"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Account Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-[#F8F8F8] dark:bg-[#111111] rounded-xl">
                <div>
                  <h3 className="font-medium text-black dark:text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Password
                  </h3>
                  <p className="text-sm text-[#444444] dark:text-[#CCCCCC]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Last updated 3 months ago
                  </p>
                </div>
                <Button 
                  variant="outline"
                  className="border-[#E5E5E5] dark:border-[#222222] text-[#444444] dark:text-[#CCCCCC] hover:text-black dark:hover:text-white"
                >
                  Change Password
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#F8F8F8] dark:bg-[#111111] rounded-xl">
                <div>
                  <h3 className="font-medium text-black dark:text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Two-Factor Authentication
                  </h3>
                  <p className="text-sm text-[#444444] dark:text-[#CCCCCC]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Add an extra layer of security
                  </p>
                </div>
                <Button 
                  variant="outline"
                  className="border-[#E5E5E5] dark:border-[#222222] text-[#444444] dark:text-[#CCCCCC] hover:text-black dark:hover:text-white"
                >
                  Enable 2FA
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20 rounded-xl">
            <CardHeader>
              <CardTitle 
                className="text-lg font-bold text-red-600 dark:text-red-400"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white dark:bg-black rounded-xl">
                <div>
                  <h3 className="font-medium text-black dark:text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Delete Account
                  </h3>
                  <p className="text-sm text-[#444444] dark:text-[#CCCCCC]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Permanently delete your account and all data
                  </p>
                </div>
                <Button 
                  variant="outline"
                  className="border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Placeholder for other tabs */}
      {(activeTab === 'notifications' || activeTab === 'appearance') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="border-[#E5E5E5] dark:border-[#222222] bg-white dark:bg-black rounded-xl">
            <CardContent className="p-12 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-[#F8F8F8] dark:bg-[#111111] rounded-full flex items-center justify-center mx-auto">
                  {activeTab === 'notifications' ? (
                    <Bell className="w-8 h-8 text-[#444444] dark:text-[#CCCCCC]" />
                  ) : (
                    <Palette className="w-8 h-8 text-[#444444] dark:text-[#CCCCCC]" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-black dark:text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {activeTab === 'notifications' ? 'Notifications' : 'Appearance'} Settings
                </h3>
                <p className="text-[#444444] dark:text-[#CCCCCC]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Coming soon! We're working on {activeTab === 'notifications' ? 'notification' : 'appearance'} preferences.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
