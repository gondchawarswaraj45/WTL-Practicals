import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu, X, Bell, ChevronDown, LogOut, Settings, User,
  Search, ChevronRight, PanelLeftClose, PanelLeftOpen, Sparkles,
  Command, CheckCheck, Trash2, Sliders, ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, Modal } from '@/components/ui';
import { notifications as initialNotifData, currentUser } from '@/data';
import { getActiveUser, logoutUser } from '@/lib/auth';

// ============================================================
// Dashboard Layout – Smooth, Interactive & Modern
// ============================================================

export interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  path: string;
  badge?: number;
}

export interface SidebarSection {
  title?: string;
  items: SidebarItem[];
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarSections: SidebarSection[];
  roleLabel: string;
  roleColor: string;
  userName?: string;
  userRole?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  sidebarSections,
  roleLabel,
  roleColor,
  userName,
  userRole,
}) => {
  const activeSessionUser = getActiveUser();
  const displayName = userName || activeSessionUser.name;
  const displayRole = userRole || activeSessionUser.role;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    return localStorage.getItem('ec_sidebar_collapsed') === 'true';
  });
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifs, setNotifs] = useState(initialNotifData);
  const [notifFilter, setNotifFilter] = useState<'all' | 'unread'>('all');
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const toggleCollapse = () => {
    const nextState = !isCollapsed;
    setIsCollapsed(nextState);
    localStorage.setItem('ec_sidebar_collapsed', String(nextState));
  };

  // Keyboard shortcut Ctrl+K / Cmd+K for command palette search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const unreadCount = notifs.filter((n) => !n.read).length;
  const filteredNotifs = notifs.filter((n) => (notifFilter === 'unread' ? !n.read : true));

  const markAllRead = () => {
    setNotifs(notifs.map((n) => ({ ...n, read: true })));
  };

  const removeNotif = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifs(notifs.filter((n) => n.id !== id));
  };

  // Flatten sidebar items for command search
  const allNavItems = sidebarSections.flatMap((sec) => sec.items);
  const searchResults = searchQuery.trim()
    ? allNavItems.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allNavItems.slice(0, 8);

  // Build breadcrumbs from current path
  const pathParts = location.pathname.split('/').filter(Boolean);
  const breadcrumbs = pathParts.map((part, idx) => ({
    label: part.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    path: '/' + pathParts.slice(0, idx + 1).join('/'),
  }));

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-primary-50/20 overflow-hidden font-sans">
      {/* ── Mobile overlay ─────────────────────────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ────────────────────────────────────────── */}
      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-50 bg-white/95 backdrop-blur-xl border-r border-gray-100 flex flex-col transition-all duration-300 ease-in-out shadow-sm select-none',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          isCollapsed ? 'lg:w-20' : 'lg:w-72',
          'w-72'
        )}
      >
        {/* Logo & Collapse Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-100/80">
          <Link to="/" className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/25 shrink-0 transition-transform hover:scale-105">
              <span className="text-white font-display font-extrabold text-xl">E</span>
            </div>
            {!isCollapsed && (
              <div className="transition-opacity duration-200">
                <span className="font-display font-bold text-lg text-gray-900 tracking-tight">
                  Event<span className="text-primary-500">Crafts</span>
                </span>
                <span
                  className={cn(
                    'block text-[10px] font-bold uppercase tracking-wider',
                    roleColor
                  )}
                >
                  {roleLabel}
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={toggleCollapse}
            className="hidden lg:flex w-8 h-8 items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-500"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Sections */}
        <nav className="flex-1 overflow-y-auto custom-scrollbar px-3 py-4 space-y-6">
          {sidebarSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              {section.title && !isCollapsed && (
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-2">
                  {section.title}
                </p>
              )}
              {section.title && isCollapsed && (
                <div className="w-full border-t border-gray-100 my-2" />
              )}

              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <div key={item.path} className="relative group">
                      <Link
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={cn(
                          'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative',
                          isActive
                            ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-md shadow-primary-500/20 scale-[1.01]'
                            : 'text-gray-600 hover:bg-primary-50/70 hover:text-primary-600 hover:translate-x-0.5',
                          isCollapsed ? 'justify-center px-0' : ''
                        )}
                      >
                        <span className={cn('transition-transform duration-200 group-hover:scale-110', isCollapsed ? 'text-lg' : '')}>
                          {item.icon}
                        </span>

                        {!isCollapsed && (
                          <span className="flex-1 truncate">{item.label}</span>
                        )}

                        {!isCollapsed && item.badge !== undefined && item.badge > 0 && (
                          <span
                            className={cn(
                              'px-2 py-0.5 text-[11px] font-bold rounded-full transition-transform',
                              isActive
                                ? 'bg-white text-primary-600 shadow-sm'
                                : 'bg-red-500 text-white'
                            )}
                          >
                            {item.badge}
                          </span>
                        )}

                        {/* Collapsed dot badge */}
                        {isCollapsed && item.badge !== undefined && item.badge > 0 && (
                          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
                        )}
                      </Link>

                      {/* Tooltip for collapsed mini sidebar */}
                      {isCollapsed && (
                        <div className="hidden lg:block absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900/90 text-white text-xs font-medium rounded-xl shadow-xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50">
                          {item.label}
                          {item.badge !== undefined && item.badge > 0 && (
                            <span className="ml-1.5 px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User Footer */}
        <div className="p-3 border-t border-gray-100/80 bg-gray-50/50">
          <div
            onClick={() => setProfileOpen(!profileOpen)}
            className={cn(
              'flex items-center gap-3 p-2 rounded-xl hover:bg-white transition-all cursor-pointer border border-transparent hover:border-gray-200/60 shadow-none hover:shadow-sm',
              isCollapsed ? 'justify-center' : ''
            )}
          >
            <Avatar name={displayName} size="md" />
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">{displayName}</p>
                <p className="text-xs text-gray-500 capitalize truncate">{displayRole}</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* ── Main Workspace Area ────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100/80 shadow-sm">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
            {/* Left: Mobile Toggle + Breadcrumbs */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-700 transition-colors"
              >
                <Menu size={20} />
              </button>

              {/* Dynamic Breadcrumbs */}
              <nav className="hidden sm:flex items-center gap-1.5 text-sm">
                <Link to="/" className="text-gray-400 hover:text-primary-600 transition-colors font-medium">
                  Home
                </Link>
                {breadcrumbs.map((crumb, i) => (
                  <React.Fragment key={crumb.path}>
                    <ChevronRight size={14} className="text-gray-300" />
                    <Link
                      to={crumb.path}
                      className={cn(
                        'transition-colors',
                        i === breadcrumbs.length - 1
                          ? 'text-gray-900 font-bold'
                          : 'text-gray-400 hover:text-primary-600'
                      )}
                    >
                      {crumb.label}
                    </Link>
                  </React.Fragment>
                ))}
              </nav>
            </div>

            {/* Right Controls: Command Search, Notifications, Profile */}
            <div className="flex items-center gap-2.5">
              {/* Command Palette Launcher Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2.5 px-3.5 py-2 bg-gray-100/80 hover:bg-gray-100 border border-gray-200/60 rounded-xl text-sm text-gray-500 hover:text-gray-900 transition-all duration-200"
              >
                <Search size={16} className="text-gray-400" />
                <span className="hidden md:inline font-medium">Search features & AI...</span>
                <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-semibold text-gray-400 bg-white rounded border border-gray-200 shadow-sm">
                  <Command size={10} /> K
                </kbd>
              </button>

              {/* Notifications Bell */}
              <div className="relative">
                <button
                  onClick={() => {
                    setNotifOpen(!notifOpen);
                    setProfileOpen(false);
                  }}
                  className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-600 transition-all"
                  title="Notifications"
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-extrabold rounded-full flex items-center justify-center animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {notifOpen && (
                  <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 animate-scale-in overflow-hidden z-50">
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-slate-50/50">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-gray-900 text-sm">Notifications</h4>
                        {unreadCount > 0 && (
                          <span className="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs font-bold rounded-full">
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <button
                          onClick={markAllRead}
                          className="flex items-center gap-1 text-primary-600 font-semibold hover:underline"
                        >
                          <CheckCheck size={14} /> Mark read
                        </button>
                      </div>
                    </div>

                    {/* Filter tabs */}
                    <div className="flex border-b border-gray-100 px-4 py-1.5 bg-white text-xs font-medium gap-3">
                      <button
                        onClick={() => setNotifFilter('all')}
                        className={cn('py-1 px-2.5 rounded-lg transition-colors', notifFilter === 'all' ? 'bg-primary-50 text-primary-600 font-bold' : 'text-gray-500 hover:text-gray-900')}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setNotifFilter('unread')}
                        className={cn('py-1 px-2.5 rounded-lg transition-colors', notifFilter === 'unread' ? 'bg-primary-50 text-primary-600 font-bold' : 'text-gray-500 hover:text-gray-900')}
                      >
                        Unread ({unreadCount})
                      </button>
                    </div>

                    <div className="max-h-80 overflow-y-auto custom-scrollbar divide-y divide-gray-50">
                      {filteredNotifs.length === 0 ? (
                        <div className="p-6 text-center text-gray-400 text-xs">
                          No notifications to show.
                        </div>
                      ) : (
                        filteredNotifs.map((notif) => (
                          <div
                            key={notif.id}
                            className={cn(
                              'p-3.5 flex items-start justify-between gap-3 hover:bg-gray-50/80 transition-colors group cursor-pointer',
                              !notif.read && 'bg-primary-50/30'
                            )}
                            onClick={() => {
                              setNotifs(notifs.map(n => n.id === notif.id ? { ...n, read: true } : n));
                            }}
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                                {!notif.read && <span className="w-1.5 h-1.5 rounded-full bg-primary-500 inline-block" />}
                                {notif.title}
                              </p>
                              <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                                {notif.message}
                              </p>
                            </div>
                            <button
                              onClick={(e) => removeNotif(notif.id, e)}
                              className="text-gray-300 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Clear"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Dropdown Trigger */}
              <div className="relative">
                <button
                  onClick={() => {
                    setProfileOpen(!profileOpen);
                    setNotifOpen(false);
                  }}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <Avatar name={displayName} size="sm" />
                  <ChevronDown size={14} className="text-gray-400 hidden sm:block" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 animate-scale-in overflow-hidden z-50">
                    <div className="p-4 border-b border-gray-100 bg-slate-50/50">
                      <p className="font-bold text-gray-900 text-sm">{displayName}</p>
                      <p className="text-xs text-gray-500 capitalize">{displayRole}</p>
                    </div>
                    <div className="p-1.5 space-y-0.5">
                      <button
                        onClick={() => {
                          setProfileOpen(false);
                          navigate(`/${pathParts[0]}/profile`);
                        }}
                        className="w-full flex items-center gap-3 px-3.5 py-2 text-xs font-semibold text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-colors"
                      >
                        <User size={15} />
                        My Profile
                      </button>
                      <button
                        onClick={() => {
                          setProfileOpen(false);
                          setShowSettingsModal(true);
                        }}
                        className="w-full flex items-center gap-3 px-3.5 py-2 text-xs font-semibold text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition-colors"
                      >
                        <Settings size={15} />
                        Settings & Preferences
                      </button>
                      <div className="my-1 border-t border-gray-100" />
                      <button
                        onClick={() => {
                          logoutUser();
                          setProfileOpen(false);
                          navigate('/login');
                        }}
                        className="w-full flex items-center gap-3 px-3.5 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <LogOut size={15} />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Viewport */}
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto animate-fade-in">
            {children}
          </div>
        </main>
      </div>

      {/* ── Command Palette Search Modal ────────────────────── */}
      <Modal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        title="Quick Command & Search"
        size="md"
      >
        <div className="space-y-4">
          <div className="relative">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search features, AI tools, events..."
              className="input-field pl-10 pr-4 py-3"
              autoFocus
            />
          </div>

          <div className="max-h-72 overflow-y-auto custom-scrollbar space-y-1">
            {searchResults.length === 0 ? (
              <p className="p-4 text-center text-xs text-gray-400">No matching features found.</p>
            ) : (
              searchResults.map((item) => (
                <div
                  key={item.path}
                  onClick={() => {
                    setSearchOpen(false);
                    navigate(item.path);
                  }}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-primary-50 text-gray-800 hover:text-primary-700 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="p-2 bg-gray-100 text-gray-600 rounded-lg group-hover:bg-primary-100">
                      {item.icon}
                    </span>
                    <span className="text-sm font-semibold">{item.label}</span>
                  </div>
                  <ExternalLink size={14} className="text-gray-400" />
                </div>
              ))
            )}
          </div>
        </div>
      </Modal>

      {/* ── Settings & Preferences Modal ──────────────────── */}
      <Modal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        title="Account & System Settings"
        size="md"
      >
        <div className="space-y-5">
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Sidebar Preferences</h4>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div>
                <p className="text-sm font-semibold text-gray-900">Compact Mini Sidebar</p>
                <p className="text-xs text-gray-500">Automatically collapse desktop navigation</p>
              </div>
              <input
                type="checkbox"
                checked={isCollapsed}
                onChange={toggleCollapse}
                className="w-4 h-4 text-primary-600 rounded accent-primary-600 cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">AI Assistant Preferences</h4>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div>
                <p className="text-sm font-semibold text-gray-900">AI Recommendations</p>
                <p className="text-xs text-gray-500">Auto-suggest budget & vendor updates</p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-primary-600 rounded accent-primary-600 cursor-pointer"
              />
            </div>
          </div>

          <button
            onClick={() => setShowSettingsModal(false)}
            className="btn-primary w-full text-sm"
          >
            Save Settings
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default DashboardLayout;

