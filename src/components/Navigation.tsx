import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/lib/translations';
import { Menu, X, Wrench, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export const Navigation = () => {
  const { user, logout } = useAuth();
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const NavItem = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <Link
      to={to}
      className={cn(
        'text-sm font-medium transition-all duration-200 px-3 py-2 rounded-md hover:bg-accent/50',
        isActive(to)
          ? 'text-primary font-semibold bg-accent/50'
          : 'text-muted-foreground hover:text-foreground'
      )}
      onClick={() => setMobileMenuOpen(false)}
    >
      {children}
    </Link>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70 border-b border-border/50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-2 hover-scale cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Wrench className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              QuickFix
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <NavItem to="/">{t('nav.home')}</NavItem>
            <NavItem to="/services">{t('nav.services')}</NavItem>
            <NavItem to="/ai-diagnostic">AI Diagnostic</NavItem>
            <NavItem to="/forum">{t('nav.forum')}</NavItem>
            <NavItem to="/about">About Us</NavItem>
            <NavItem to="/become-technician">Become a Technician</NavItem>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>

            {user ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (user.role === 'admin') navigate('/admin/dashboard');
                    else if (user.role === 'technician') navigate('/technician-dashboard');
                    else navigate('/dashboard');
                  }}
                  className="hidden lg:flex hover-scale"
                >
                  <User className="h-4 w-4 mr-2" />
                  {user.role === 'admin' ? 'Admin Dashboard' : user.role === 'technician' ? 'Technician Dashboard' : 'Dashboard'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="hidden md:flex"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={() => navigate('/auth')}
                className="hover-scale"
              >
                <User className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Login</span>
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-2 animate-fade-in border-t">
            <div className="flex flex-col space-y-1">
              <Link
                to="/"
                className={cn(
                  'block py-2.5 px-4 text-base rounded-md hover:bg-accent transition-colors',
                  isActive('/') ? 'text-primary font-semibold bg-accent/50' : 'text-muted-foreground'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.home')}
              </Link>
              <Link
                to="/services"
                className={cn(
                  'block py-2.5 px-4 text-base rounded-md hover:bg-accent transition-colors',
                  isActive('/services') ? 'text-primary font-semibold bg-accent/50' : 'text-muted-foreground'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.services')}
              </Link>
              <Link
                to="/ai-diagnostic"
                className={cn(
                  'block py-2.5 px-4 text-base rounded-md hover:bg-accent transition-colors',
                  isActive('/ai-diagnostic') ? 'text-primary font-semibold bg-accent/50' : 'text-muted-foreground'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                AI Diagnostic
              </Link>
              <Link
                to="/forum"
                className={cn(
                  'block py-2.5 px-4 text-base rounded-md hover:bg-accent transition-colors',
                  isActive('/forum') ? 'text-primary font-semibold bg-accent/50' : 'text-muted-foreground'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.forum')}
              </Link>
              <Link
                to="/about"
                className={cn(
                  'block py-2.5 px-4 text-base rounded-md hover:bg-accent transition-colors',
                  isActive('/about') ? 'text-primary font-semibold bg-accent/50' : 'text-muted-foreground'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/become-technician"
                className={cn(
                  'block py-2.5 px-4 text-base rounded-md hover:bg-accent transition-colors',
                  isActive('/become-technician') ? 'text-primary font-semibold bg-accent/50' : 'text-muted-foreground'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                Become a Technician
              </Link>

              <div className="pt-4 border-t border-border space-y-2">
                <div className="px-4">
                  <LanguageSwitcher />
                </div>

                {user ? (
                  <>
                    <Link
                      to={user.role === 'admin' ? '/admin/dashboard' : user.role === 'technician' ? '/technician-dashboard' : '/dashboard'}
                      className="block py-2.5 px-4 text-base rounded-md hover:bg-accent transition-colors text-muted-foreground"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="h-4 w-4 inline mr-2" />
                      {user.role === 'admin' ? 'Admin Dashboard' : user.role === 'technician' ? 'Technician Dashboard' : 'Dashboard'}
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full justify-start px-4"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <Link
                    to="/auth"
                    className="block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button variant="default" size="sm" className="w-full">
                      <User className="h-4 w-4 mr-2" />
                      Login / Sign Up
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
