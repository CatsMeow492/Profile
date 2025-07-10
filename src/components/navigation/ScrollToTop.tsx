'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [aiAssistantVisible, setAiAssistantVisible] = useState(false);

  // Show/hide scroll to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 300); // Show after scrolling 300px
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detect when AI Assistant button is visible to adjust positioning
  useEffect(() => {
    const checkAiAssistantVisibility = () => {
      // Look for the AI Assistant button by its distinctive attributes
      const aiAssistantButton = document.querySelector('button[aria-label*="AI Assistant"]');
      setAiAssistantVisible(!!aiAssistantButton);
    };

    // Check immediately
    checkAiAssistantVisibility();

    // Set up a MutationObserver to watch for DOM changes
    const observer = new MutationObserver(checkAiAssistantVisibility);
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['aria-label', 'class']
    });

    // Also check on scroll since the AI assistant might appear/disappear based on scroll position
    const handleScroll = () => {
      checkAiAssistantVisibility();
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed z-50 p-3 rounded-full",
        "bg-primary text-primary-foreground",
        "shadow-lg hover:shadow-xl",
        "transition-all duration-300 transform",
        "hover:scale-110 focus:scale-110",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        "group",
        // Adjust position based on AI assistant visibility to avoid overlap
        aiAssistantVisible 
          ? "bottom-8 right-24" // Move left when AI assistant is visible (96px from right)
          : "bottom-8 right-8",  // Default position (32px from right)
        isVisible 
          ? "translate-y-0 opacity-100 pointer-events-auto" 
          : "translate-y-4 opacity-0 pointer-events-none"
      )}
      aria-label="Scroll to top"
    >
      <svg 
        className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 10l7-7m0 0l7 7m-7-7v18" 
        />
      </svg>
    </button>
  );
}; 