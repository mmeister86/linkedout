"use client";

import { Search, Bell, MessageSquare, Home, Users, Briefcase, ChevronDown, User, Moon, Sun, Menu, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const t = useTranslations('header');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border backdrop-blur-md bg-opacity-90">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-13">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-primary text-2xl font-bold">{t('logo')}</h1>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="lg:hidden p-2 rounded-full hover:bg-secondary transition-colors"
            aria-label={t('aria.toggleMobileMenu')}
          >
            {showMobileMenu ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder={t('search.placeholder')}
                className="linkedin-input w-full pl-10 pr-4 py-2 text-sm"
              />
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="hidden lg:flex items-center space-x-6">
            <div className="flex flex-col items-center cursor-pointer group">
              <Home className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-xs mt-1 text-muted-foreground group-hover:text-primary transition-colors">{t('nav.home')}</span>
            </div>
            <div className="flex flex-col items-center cursor-pointer group">
              <Users className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-xs mt-1 text-muted-foreground group-hover:text-primary transition-colors">{t('nav.network')}</span>
            </div>
            <div className="flex flex-col items-center cursor-pointer group">
              <Briefcase className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-xs mt-1 text-muted-foreground group-hover:text-primary transition-colors">{t('nav.jobs')}</span>
            </div>
            <div className="flex flex-col items-center cursor-pointer group">
              <MessageSquare className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-xs mt-1 text-muted-foreground group-hover:text-primary transition-colors">{t('nav.messaging')}</span>
            </div>
            <div className="flex flex-col items-center cursor-pointer group relative">
              <Bell className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-xs mt-1 text-muted-foreground group-hover:text-primary transition-colors">{t('nav.notifications')}</span>
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </div>
          </nav>

          {/* Mobile Navigation Menu */}
          {showMobileMenu && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-card border-b border-border shadow-lg z-40">
              <nav className="flex flex-col p-4 space-y-4">
                <div className="flex items-center space-x-3 cursor-pointer">
                  <Home className="h-6 w-6 text-muted-foreground" />
                  <span className="text-sm">{t('nav.home')}</span>
                </div>
                <div className="flex items-center space-x-3 cursor-pointer">
                  <Users className="h-6 w-6 text-muted-foreground" />
                  <span className="text-sm">{t('nav.network')}</span>
                </div>
                <div className="flex items-center space-x-3 cursor-pointer">
                  <Briefcase className="h-6 w-6 text-muted-foreground" />
                  <span className="text-sm">{t('nav.jobs')}</span>
                </div>
                <div className="flex items-center space-x-3 cursor-pointer">
                  <MessageSquare className="h-6 w-6 text-muted-foreground" />
                  <span className="text-sm">{t('nav.messaging')}</span>
                </div>
                <div className="flex items-center space-x-3 cursor-pointer relative">
                  <Bell className="h-6 w-6 text-muted-foreground" />
                  <span className="text-sm">{t('nav.notifications')}</span>
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </div>
              </nav>
            </div>
          )}

          {/* User Menu */}
          <div className="relative ml-4">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-1 rounded hover:bg-secondary transition-colors"
            >
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <User className="h-5 w-5 text-primary-foreground" />
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-card rounded-lg shadow-lg border border-border py-2 z-50">
                <div className="px-4 py-3 border-b border-border">
                  <p className="font-semibold">{t('userMenu.userName')}</p>
                  <p className="text-sm text-muted-foreground">{t('userMenu.userTitle')}</p>
                </div>
                <div className="py-1">
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-secondary transition-colors">
                    {t('userMenu.viewProfile')}
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-secondary transition-colors">
                    {t('userMenu.settings')}
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm hover:bg-secondary transition-colors">
                    {t('userMenu.helpCenter')}
                  </a>
                  <div className="border-t border-border mt-1 pt-1">
                    <a href="#" className="block px-4 py-2 text-sm hover:bg-secondary transition-colors">
                      {t('userMenu.signOut')}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="ml-4 p-2 rounded-full hover:bg-secondary transition-colors"
            aria-label={t('aria.toggleTheme')}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {/* Premium Badge */}
          <div className="ml-4 hidden md:block">
            <span className="badge-premium flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {t('premium')}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
