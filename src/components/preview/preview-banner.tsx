'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

/**
 * Preview Banner Component
 * 
 * Displays a banner at the top of the page when preview mode is enabled.
 * Allows users to exit preview mode.
 */
export default function PreviewBanner() {
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    // Check if preview mode is enabled
    // Next.js uses __prerender_bypass cookie for draft mode
    const isPreviewMode = document.cookie.includes('__prerender_bypass');
    setIsPreview(isPreviewMode);
  }, []);

  if (!isPreview) {
    return null;
  }

  const handleExitPreview = async () => {
    try {
      await fetch('/api/exit-preview');
      window.location.href = '/';
    } catch (error) {
      console.error('Error exiting preview mode:', error);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-black px-4 py-2 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold">👁️ Preview Mode</span>
          <span className="text-sm opacity-80">
            You are viewing draft content
          </span>
        </div>
        <button
          onClick={handleExitPreview}
          className="px-4 py-1 bg-black text-white rounded hover:bg-gray-800 transition-colors text-sm font-medium"
        >
          Exit Preview
        </button>
      </div>
    </div>
  );
}

