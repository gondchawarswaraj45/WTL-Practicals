import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, CalendarPlus, CalendarDays, Store, UserCheck, MapPin,
  UtensilsCrossed, Palette, Camera, Music, Lightbulb, Truck, Brain,
  Sparkles, Calculator, Users, Mail as MailIcon, BarChart3, MessageCircle,
  CreditCard, Bell, Star, User, Settings, Wand2, Bot, Eye,
} from 'lucide-react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { StatCard, Badge, GlassCard, ProgressBar, Avatar, StarRating } from '@/components/ui';
import {
  events, vendors, notifications, transactions, tasks, chatConversations, currentUser,
} from '@/data';
import { formatCurrency, formatDate, formatRelativeTime, getStatusColor } from '@/lib/utils';

import { customerSidebarSections } from '@/pages/customer/CustomerPages';

// ============================================================
// Customer Dashboard Home
// ============================================================
const CustomerDashboard: React.FC = () => {
  const [planningMode] = useState<'self' | 'planner'>('self');

  const upcomingEvents = events.filter((e) => e.status !== 'completed' && e.status !== 'cancelled');
  const totalSpent = transactions
    .filter((t) => t.status === 'completed' && t.type === 'payment')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <DashboardLayout sidebarSections={customerSidebarSections} roleLabel="Customer" roleColor="text-primary-500">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-gray-900">
            Welcome back, {currentUser.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-500 mt-1">Here's what's happening with your events.</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Planning Mode Indicator */}
          <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-200 rounded-xl">
            <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
            <span className="text-sm font-medium text-primary-700">
              {planningMode === 'self' ? 'Self Planning Mode' : 'Event Planner Mode'}
            </span>
          </div>
          <Link to="/customer/create-event" className="btn-primary text-sm">
            <CalendarPlus size={16} />
            New Event
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Events Created"
          value={events.length}
          change="+2 this month"
          changeType="up"
          icon={<CalendarDays size={22} className="text-primary-500" />}
          iconBg="bg-primary-100"
        />
        <StatCard
          label="Upcoming Events"
          value={upcomingEvents.length}
          icon={<CalendarPlus size={22} className="text-blue-500" />}
          iconBg="bg-blue-100"
        />
        <StatCard
          label="Total Spent"
          value={formatCurrency(totalSpent)}
          change="+12% vs last month"
          changeType="up"
          icon={<CreditCard size={22} className="text-emerald-500" />}
          iconBg="bg-emerald-100"
        />
        <StatCard
          label="Vendors Hired"
          value={8}
          change="+3 new"
          changeType="up"
          icon={<Store size={22} className="text-accent-600" />}
          iconBg="bg-accent-100"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* ── Upcoming Events ─────────────────────────────── */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Upcoming Events</h2>
            <Link to="/customer/events" className="text-sm text-primary-500 font-medium hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            {upcomingEvents.slice(0, 3).map((event) => (
              <GlassCard key={event.id} hover className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
                      <CalendarDays size={22} className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{event.title}</h3>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {formatDate(event.date)} · {event.time} · {event.location}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-gray-400">
                          <Users size={12} className="inline mr-1" />{event.guestCount} guests
                        </span>
                        <span className="text-xs text-gray-400">
                          {formatCurrency(event.budget)} budget
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant={
                      event.status === 'confirmed' ? 'success' :
                      event.status === 'in-progress' ? 'warning' : 'info'
                    }>
                      {event.status.replace('-', ' ')}
                    </Badge>
                    {event.progress !== undefined && (
                      <div className="w-32">
                        <ProgressBar value={event.progress} size="sm" />
                      </div>
                    )}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* ── Right Column ────────────────────────────────── */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <GlassCard className="p-5">
            <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Create Event', icon: <CalendarPlus size={18} />, path: '/customer/create-event', color: 'bg-primary-500' },
                { label: 'Browse Vendors', icon: <Store size={18} />, path: '/customer/vendors', color: 'bg-blue-500' },
                { label: 'AI Assistant', icon: <Bot size={18} />, path: '/customer/ai-assistant', color: 'bg-purple-500' },
                { label: 'Guest List', icon: <Users size={18} />, path: '/customer/guests', color: 'bg-emerald-500' },
              ].map((action) => (
                <Link
                  key={action.label}
                  to={action.path}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
                >
                  <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center text-white transition-transform group-hover:scale-110`}>
                    {action.icon}
                  </div>
                  <span className="text-xs font-medium text-gray-700 text-center">{action.label}</span>
                </Link>
              ))}
            </div>
          </GlassCard>

          {/* Recent Notifications */}
          <GlassCard className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Notifications</h3>
              <Link to="/customer/notifications" className="text-xs text-primary-500 font-medium hover:underline">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {notifications.slice(0, 4).map((notif) => (
                <div key={notif.id} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                    notif.type === 'success' ? 'bg-emerald-500' :
                    notif.type === 'warning' ? 'bg-amber-500' :
                    notif.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{notif.title}</p>
                    <p className="text-xs text-gray-500">{formatRelativeTime(notif.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* AI Suggestion Card */}
          <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Brain size={20} className="text-accent-300" />
              <h3 className="font-bold">AI Insight</h3>
            </div>
            <p className="text-sm text-primary-100 mb-4">
              Your wedding budget is 15% above average for similar events. Our AI suggests optimizing catering to save ₹1.5L.
            </p>
            <Link to="/customer/ai-budget" className="inline-flex items-center gap-1 text-sm font-semibold text-accent-300 hover:text-accent-200">
              View Budget Analysis →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Recent Activity & Tasks ───────────────────────── */}
      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        {/* Recent Activity */}
        <GlassCard className="p-5">
          <h3 className="font-bold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'Booking confirmed', detail: 'Royal Grand Palace — Venue', time: '2 hours ago', type: 'success' },
              { action: 'Quote received', detail: 'Dreamscape Decorators — ₹3,00,000', time: '4 hours ago', type: 'info' },
              { action: 'Payment made', detail: 'PixelPerfect Studios — ₹1,50,000', time: '1 day ago', type: 'success' },
              { action: 'Event updated', detail: 'Sharma-Gupta Royal Wedding timeline modified', time: '2 days ago', type: 'info' },
              { action: 'Review submitted', detail: 'SweetTooth Bakery — 5 stars', time: '3 days ago', type: 'success' },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  activity.type === 'success' ? 'bg-emerald-100' : 'bg-blue-100'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.detail}</p>
                </div>
                <span className="text-xs text-gray-400 shrink-0">{activity.time}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Tasks */}
        <GlassCard className="p-5">
          <h3 className="font-bold text-gray-900 mb-4">Pending Tasks</h3>
          <div className="space-y-3">
            {tasks.filter((t) => t.status !== 'completed').slice(0, 5).map((task) => (
              <div key={task.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  checked={task.status === 'completed'}
                  readOnly
                  className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{task.title}</p>
                  <p className="text-xs text-gray-500">Due: {formatDate(task.dueDate)} · {task.assignedTo}</p>
                </div>
                <Badge variant={
                  task.priority === 'high' ? 'danger' :
                  task.priority === 'medium' ? 'warning' : 'info'
                }>
                  {task.priority}
                </Badge>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboard;
