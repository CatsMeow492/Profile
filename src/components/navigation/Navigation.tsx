'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

const navigationItems: NavigationItem[] = [
  { id: 'hero', label: 'Home', href: '#hero' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'research', label: 'Research', href: '#research' },
  { id: 'certifications', label: 'Certifications', href: '#certifications' },
  { id: 'projects', label: 'Projects', href: '#projects' },
];

export const Navigation = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll events for active section highlighting and nav background
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for navigation height
      setIsScrolled(window.scrollY > 20);

      // Find active section
      const sections = navigationItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          const sectionTop = rect.top + window.scrollY;
          
          if (scrollPosition >= sectionTop - 200) {
            setActiveSection(section.id);
            // Update URL hash without scrolling
            if (window.history && window.location.hash !== `#${section.id}`) {
              window.history.replaceState(null, '', `#${section.id}`);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle smooth scrolling to sections
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const navHeight = 64; // Navigation height
      const targetPosition = targetElement.offsetTop - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && !(event.target as Element).closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav 
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          isScrolled 
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm" 
            : "bg-background/80 backdrop-blur-sm border-b border-border/50"
        )}
      >
        <div className="container mx-auto">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <a 
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="font-bold text-xl text-foreground hover:text-primary transition-colors"
            >
              Taylor Mohney
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1">
              {navigationItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    "hover:bg-accent hover:text-accent-foreground",
                    activeSection === item.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors mobile-menu-container"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span 
                  className={cn(
                    "w-5 h-0.5 bg-current transition-all duration-300",
                    isMobileMenuOpen ? "rotate-45 translate-y-0.5" : ""
                  )}
                />
                <span 
                  className={cn(
                    "w-5 h-0.5 bg-current transition-all duration-300 mt-1",
                    isMobileMenuOpen ? "opacity-0" : ""
                  )}
                />
                <span 
                  className={cn(
                    "w-5 h-0.5 bg-current transition-all duration-300 mt-1",
                    isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                  )}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 mobile-menu-container",
            isMobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="bg-background border-t border-border">
            <div className="container mx-auto py-4">
              <div className="flex flex-col space-y-1">
                {navigationItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={cn(
                      "px-4 py-3 rounded-lg text-base font-medium transition-all duration-200",
                      "hover:bg-accent hover:text-accent-foreground",
                      activeSection === item.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}; 