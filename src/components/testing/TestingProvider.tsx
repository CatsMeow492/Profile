'use client';

import { useEffect } from 'react';
import { initializePerformanceMonitoring } from '@/utils/performanceMonitor';

// Define test utilities interface
interface TestUtils {
  scrollToSection: (sectionId: string) => void;
  testNavigation: () => void;
  checkResponsive: () => void;
}

// Extend window type
declare global {
  interface Window {
    testUtils?: TestUtils;
  }
}

export const TestingProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Initialize performance monitoring in development
    if (process.env.NODE_ENV === 'development') {
      initializePerformanceMonitoring();
      
      // Add global testing utilities to window for manual testing
      if (typeof window !== 'undefined') {
        window.testUtils = {
          scrollToSection: (sectionId: string) => {
            const element = document.getElementById(sectionId);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          },
          testNavigation: () => {
            const sections = ['hero', 'experience', 'research', 'certifications', 'projects'];
            sections.forEach((sectionId, index) => {
              setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                  console.log(`Scrolled to ${sectionId}`);
                }
              }, index * 2000);
            });
          },
          checkResponsive: () => {
            const breakpoints = [
              { name: 'Mobile', width: 375 },
              { name: 'Tablet', width: 768 },
              { name: 'Desktop', width: 1024 },
              { name: 'Wide', width: 1920 },
            ];
            
            console.group('📱 Responsive Testing');
            console.log('Use browser dev tools to test these breakpoints:');
            breakpoints.forEach(bp => {
              console.log(`${bp.name}: ${bp.width}px`);
            });
            console.groupEnd();
          }
        };
        
        console.log('🧪 Testing utilities available at window.testUtils');
        console.log('Available methods:');
        console.log('- testUtils.scrollToSection(sectionId)');
        console.log('- testUtils.testNavigation() - Auto-scroll through all sections');
        console.log('- testUtils.checkResponsive() - Show responsive breakpoints');
      }
    }
  }, []);

  return <>{children}</>;
}; 