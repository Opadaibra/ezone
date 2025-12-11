import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme: string = 'light';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.loadInitialTheme());
      } else {
        this.loadInitialTheme();
      }
    }
  }

  private loadInitialTheme() {
    if (!isPlatformBrowser(this.platformId) || typeof localStorage === 'undefined') {
      return;
    }

    const savedTheme = localStorage.getItem('ezone-theme');
    
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      this.currentTheme = savedTheme;
    } else {
      this.currentTheme = 'light';
      
      if (window.matchMedia) {
        try {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          this.currentTheme = prefersDark ? 'dark' : 'light';
        } catch (e) {
          console.log('Theme detection error, using default light theme');
        }
      }
    }
    
    this.applyTheme(this.currentTheme);
  }

  toggleTheme() {
    if (!isPlatformBrowser(this.platformId) || typeof localStorage === 'undefined') {
      return;
    }
    
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.currentTheme);
    localStorage.setItem('ezone-theme', this.currentTheme);
  }

  isDarkTheme(): boolean {
    return this.currentTheme === 'dark';
  }

  private applyTheme(theme: string) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    const body = document.body;
    
    ['light', 'dark', 'light-theme', 'dark-theme'].forEach(cls => {
      body.classList.remove(cls);
    });
    
    body.classList.add(theme);
    body.classList.add(`${theme}-theme`);
    
    this.updateCSSVariables(theme);
  }

  private updateCSSVariables(theme: string) {
    const root = document.documentElement;
    
    const lightVariables = {
      '--bg-color': '#f8fafc',
      '--primary-color': '#1F4F77',
      '--secondary-color': '#7EA00E',
      '--accent-color': '#1F4F77',
      '--text-color': '#2d3748',
      '--card-bg': '#ffffff',
      '--new-card-bg': '#ffffff',
      '--border-color': '#e2e8f0',
      '--primary-color-shadow': '#1f4f7740',
      '--card-bg-transparent': 'rgba(255, 255, 255, 0.92)',
      '--accent-gradient': 'linear-gradient(135deg, #1F4F77 0%, #7EA00E 100%)',
      '--accent-gradient-img': 'linear-gradient(135deg, #1F4F77 0%, #7EA00E 100%)',
      '--glass-bg': 'rgba(255, 255, 255, 0.1)',
      '--glass-border': 'rgba(255, 255, 255, 0.5)'
    };
    
    const darkVariables = {
      '--bg-color': '#1a202c',
      '--primary-color': '#4299e1',
      '--secondary-color': '#7EA00E',
      '--accent-color': '#4299e1',
      '--text-color': '#e2e8f0',
      '--card-bg': '#2d3748',
      '--new-card-bg': '#2d3748',
      '--border-color': '#4a5568',
      '--primary-color-shadow': 'rgba(66, 153, 225, 0.4)',
      '--card-bg-transparent': 'rgba(45, 55, 72, 0.85)',
      '--glass-bg': 'rgba(45, 55, 72, 0.3)',
      '--glass-border': 'rgba(255, 255, 255, 0.1)',
      '--accent-gradient': 'linear-gradient(135deg, #1F4F77 0%, #7EA00E 100%)',
      '--accent-gradient-img': 'linear-gradient(135deg, #1F4F77 0%, #7EA00E 100%)'
    };
    
    const variables = theme === 'light' ? lightVariables : darkVariables;
    
    Object.entries(variables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }

  getCurrentTheme(): string {
    return this.currentTheme;
  }
}