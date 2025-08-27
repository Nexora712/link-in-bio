"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, User, Link, Globe, Twitter, Instagram, Linkedin, Github, WifiOff } from 'lucide-react';
import { useNetworkStatus } from '@/lib/network-utils';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const steps = [
  { id: 1, title: 'Welcome', description: 'Get started with your LinkNest profile' },
  { id: 2, title: 'Profile Setup', description: 'Tell us about yourself' },
  { id: 3, title: 'Social Links', description: 'Connect your social media' },
  { id: 4, title: 'Complete', description: 'Your profile is ready!' },
];

import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function OnboardingPage() {
  const { user, userProfile, completeOnboarding, updateUserProfile } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
    username: "",
    bio: '',
    website: '',
    profilePicture: user?.photoURL || '',
    socialLinks: {
      twitter: '',
      instagram: '',
      linkedin: '',
      github: '',
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isOnline } = useNetworkStatus();
  const router = useRouter();
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);

  // Redirect if onboarding is already completed
  useEffect(() => {
    if (userProfile?.onboardingCompleted) {
      router.push('/builder');
    }
  }, [userProfile, router]);

  // Reset error when online status changes
  useEffect(() => {
    if (isOnline) {
      setError(null);
    } else {
      setError('You are currently offline. Please check your internet connection.');
    }
  }, [isOnline]);

  // Show loading state while checking onboarding status
  if (userProfile === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    if (!isOnline) {
      setError('You are currently offline. Please check your internet connection.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    try {
      await completeOnboarding(formData);
    } catch (error: any) {
      console.error('Error completing onboarding:', error);
      // Handle specific error messages
      if (error.message?.includes('offline') || error.message?.includes('network')) {
        setError('You appear to be offline. Please check your internet connection and try again.');
      } else {
        setError('An error occurred while completing your onboarding. Please try again.');
      }
      setIsLoading(false); // Reset loading state on error
    }
  };

  const handleInputChange = async (field: string, value: string) => {
    if (field === "username") {
      // Check if username is unique
      const usernameRef = doc(db, "usernames", value);
      const usernameDoc = await getDoc(usernameRef);

      if (usernameDoc.exists()) {
        setError("Username is already taken. Please choose another one.");
        setUsernameAvailable(false);
      } else {
        setError(null);
        setUsernameAvailable(true);
      }
    }

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSocialChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }));
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

  // Update form data when user data becomes available
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      displayName: user?.displayName || prev.displayName,
      email: user?.email || prev.email,
      profilePicture: user?.photoURL || prev.profilePicture,
    }));
  }, [user]);

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Welcome to LinkBio
              </CardTitle>
              <CardDescription className="text-lg">
                {steps[currentStep - 1].description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isOnline && (
                <div className="flex items-center p-3 bg-yellow-100 dark:bg-yellow-900 rounded-md text-yellow-800 dark:text-yellow-200 mb-4">
                  <WifiOff className="h-4 w-4 mr-2" />
                  <span>You are currently offline. Some features may not work properly.</span>
                </div>
              )}
              
              {error && (
                <div className="text-red-500 text-sm font-medium mb-4 p-3 bg-red-100 dark:bg-red-900/20 rounded-md">
                  {error}
                </div>
              )}
              
              <div className="mb-8">
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between mt-2">
                  {steps.map((step, index) => (
                    <div
                      key={step.id}
                      className={`text-xs ${
                        index + 1 <= currentStep ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    >
                      {step.title}
                    </div>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="text-center space-y-4">
                      <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                        <Link className="w-12 h-12 text-primary" />
                      </div>
                      <h3 className="text-2xl font-semibold">Welcome to LinkNest!</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        Let's get your profile set up in just a few steps. This will only take a couple of minutes.
                      </p>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-center mb-6">
                        <Avatar className="w-24 h-24">
                          <AvatarImage src={user?.photoURL || undefined} />
                          <AvatarFallback className="text-2xl">
                            {user?.displayName?.[0]?.toUpperCase() || <User />}
                          </AvatarFallback>
                        </Avatar>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="displayName">Display Name</Label>
                        <Input
                          id="displayName"
                          value={formData.displayName}
                          onChange={(e) => handleInputChange('displayName', e.target.value)}
                          placeholder="John Doe"
                          required
                          disabled={!isOnline}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          disabled
                          className="bg-muted cursor-not-allowed"
                          placeholder="john.doe@example.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Profile Picture</Label>
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={formData.profilePicture || user?.photoURL || ''} />
                            <AvatarFallback>
                              {formData.displayName?.charAt(0) || user?.displayName?.charAt(0) || 'U'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={handleProfilePictureChange}
                              className="hidden"
                              id="profile-picture"
                              disabled={!isOnline}
                            />
                            <Label
                              htmlFor="profile-picture"
                              className={`cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 ${!isOnline ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                              <Upload className="w-4 h-4 mr-2" />
                              Upload Picture
                            </Label>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          value={formData.username}
                          onChange={(e) => handleInputChange('username', e.target.value)}
                          placeholder="johndoe"
                          required
                          disabled={!isOnline}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={formData.bio}
                          onChange={(e) => handleInputChange('bio', e.target.value)}
                          placeholder="Tell us a bit about yourself..."
                          rows={3}
                          disabled={!isOnline}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          type="url"
                          value={formData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          placeholder="https://johndoe.com"
                          disabled={!isOnline}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold">Connect Your Social Media</h3>
                      <p className="text-muted-foreground">Add your social media profiles to your LinkNest</p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Twitter className="w-4 h-4" />
                          Twitter
                        </Label>
                        <Input
                          value={formData.socialLinks.twitter}
                          onChange={(e) => handleSocialChange('twitter', e.target.value)}
                          placeholder="https://twitter.com/username"
                          disabled={!isOnline}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Instagram className="w-4 h-4" />
                          Instagram
                        </Label>
                        <Input
                          value={formData.socialLinks.instagram}
                          onChange={(e) => handleSocialChange('instagram', e.target.value)}
                          placeholder="https://instagram.com/username"
                          disabled={!isOnline}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Linkedin className="w-4 h-4" />
                          LinkedIn
                        </Label>
                        <Input
                          value={formData.socialLinks.linkedin}
                          onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                          placeholder="https://linkedin.com/in/username"
                          disabled={!isOnline}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Github className="w-4 h-4" />
                          GitHub
                        </Label>
                        <Input
                          value={formData.socialLinks.github}
                          onChange={(e) => handleSocialChange('github', e.target.value)}
                          placeholder="https://github.com/username"
                          disabled={!isOnline}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="text-center space-y-4">
                      <div className="w-24 h-24 mx-auto bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-2xl font-semibold">You're All Set!</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        Your LinkNest profile has been created successfully. You can now start adding links and customizing your page.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1 || !isOnline}
                >
                  Previous
                </Button>
                
                {currentStep < steps.length ? (
                  <Button onClick={handleNext} disabled={((currentStep === 2 && (!formData.displayName || !formData.username)) || !isOnline) && currentStep !== 1}>
                    Next
                  </Button>
                ) : (
                  <Button onClick={handleComplete} disabled={isLoading || !isOnline || (currentStep === 2 && (!formData.displayName || !formData.username))}>
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <LoadingSpinner size="sm" className="mr-2" />
                        Completing...
                      </div>
                    ) : 'Complete Setup'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}