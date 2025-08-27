'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  MousePointerClick, 
  TrendingUp, 
  Download,
  RefreshCw,
  Eye,
  Activity
} from 'lucide-react';

// Simple KPI Component
const KPICard = ({ title, value, change, icon: Icon }: any) => (
  <Card className="border-[#E5E5E5] dark:border-[#222222] bg-white dark:bg-black rounded-xl">
    <CardContent className="p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-[#444444] dark:text-[#CCCCCC]" style={{ fontFamily: 'Inter, sans-serif' }}>
            {title}
          </p>
          <p className="text-3xl font-bold text-black dark:text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          <div className="flex items-center space-x-1">
            <TrendingUp className="w-3 h-3 text-green-600" />
            <span className="text-xs font-medium text-green-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              {change}%
            </span>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#F8F8F8] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#222222] flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#444444] dark:text-[#CCCCCC]" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function AnalyticsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Mock data
  const kpiData = [
    { title: 'Total Views', value: 45287, change: 12.5, icon: Eye },
    { title: 'Unique Visitors', value: 32156, change: 8.3, icon: Users },
    { title: 'Clicks', value: 8945, change: -2.1, icon: MousePointerClick },
    { title: 'CTR', value: '19.8%', change: -4.2, icon: TrendingUp },
    { title: 'Conversions', value: 1203, change: 15.7, icon: Activity },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleExport = () => {
    // Implement export functionality here
  };

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-12 bg-[#F8F8F8] dark:bg-[#111111] rounded"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-32 bg-[#F8F8F8] dark:bg-[#111111] rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <h1 
              className="text-4xl md:text-5xl font-bold text-black dark:text-white tracking-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Analytics
            </h1>
            <p 
              className="text-lg text-[#444444] dark:text-[#CCCCCC] mt-2"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Understand growth, conversions, and what resonates.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={refreshing}
              className="border-[#E5E5E5] dark:border-[#222222] text-[#444444] dark:text-[#CCCCCC] hover:text-black dark:hover:text-white"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            
            <Button
              variant="outline"
              onClick={handleExport}
              className="border-[#E5E5E5] dark:border-[#222222] text-[#444444] dark:text-[#CCCCCC] hover:text-black dark:hover:text-white"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Insight Banner */}
        <Card className="border-[#E5E5E5] dark:border-[#222222] bg-gradient-to-r from-[#F8F8F8] to-white dark:from-[#111111] dark:to-black rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-black dark:bg-white flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white dark:text-black" />
            </div>
            <div>
              <p className="text-black dark:text-white font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
                Traffic up +12% this week
              </p>
              <p className="text-[#444444] dark:text-[#CCCCCC]" style={{ fontFamily: 'Inter, sans-serif' }}>
                Driven mostly by mobile traffic (+8%)
              </p>
            </div>
          </div>
        </Card>
      </motion.header>

      {/* KPI Row */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
      >
        {kpiData.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          >
            <KPICard {...kpi} />
          </motion.div>
        ))}
      </motion.section>

      {/* Main Charts Placeholder */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2">
          <Card className="border-[#E5E5E5] dark:border-[#222222] bg-white dark:bg-black rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-black dark:text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                Engagement Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-[#F8F8F8] dark:bg-[#111111] rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-[#444444] dark:text-[#CCCCCC] mx-auto mb-4" />
                  <p className="text-[#444444] dark:text-[#CCCCCC]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Chart visualization coming soon
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="border-[#E5E5E5] dark:border-[#222222] bg-white dark:bg-black rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-black dark:text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                Conversion Funnel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-black dark:text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Page Views
                  </span>
                  <span className="text-sm font-bold text-black dark:text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                    45,287
                  </span>
                </div>
                <div className="w-full bg-[#F8F8F8] dark:bg-[#111111] rounded-full h-3">
                  <div className="bg-black dark:bg-white h-3 rounded-full w-full" />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-black dark:text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Link Clicks
                  </span>
                  <div className="text-right">
                    <span className="text-sm font-bold text-black dark:text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                      8,945
                    </span>
                    <p className="text-xs text-[#444444] dark:text-[#CCCCCC]" style={{ fontFamily: 'Inter, sans-serif' }}>
                      -80.2% drop-off
                    </p>
                  </div>
                </div>
                <div className="w-full bg-[#F8F8F8] dark:bg-[#111111] rounded-full h-3">
                  <div className="bg-black dark:bg-white h-3 rounded-full" style={{ width: '19.8%' }} />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-black dark:text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Conversions
                  </span>
                  <div className="text-right">
                    <span className="text-sm font-bold text-black dark:text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                      1,203
                    </span>
                    <p className="text-xs text-[#444444] dark:text-[#CCCCCC]" style={{ fontFamily: 'Inter, sans-serif' }}>
                      -86.6% drop-off
                    </p>
                  </div>
                </div>
                <div className="w-full bg-[#F8F8F8] dark:bg-[#111111] rounded-full h-3">
                  <div className="bg-black dark:bg-white h-3 rounded-full" style={{ width: '13.4%' }} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-[#E5E5E5] dark:border-[#222222]">
        <p className="text-sm text-[#444444] dark:text-[#CCCCCC]" style={{ fontFamily: 'Inter, sans-serif' }}>
          Need help interpreting your data? Check out our{' '}
          <a href="/docs/analytics" className="text-black dark:text-white hover:underline font-medium">
            analytics documentation
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
