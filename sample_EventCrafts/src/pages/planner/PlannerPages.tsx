import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, CalendarDays, ClipboardList, Users, ListTodo, BarChart3,
  MessageCircle, Bell, User, Calendar, Clock, CheckCircle2, AlertTriangle,
  TrendingUp, Store, Plus, ChevronRight, Briefcase, Target, BadgeCheck,
  Check, X, FileText, Download, Send, RefreshCw, Layers, Sparkles,
} from 'lucide-react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { StatCard, Badge, GlassCard, Avatar, ProgressBar, StarRating, Modal } from '@/components/ui';
import { events as initialEvents, tasks as initialTasks, vendors } from '@/data';
import { formatCurrency, formatDate, cn } from '@/lib/utils';
import type { Task } from '@/types';

// ── Event Planner Sidebar Config (STRICTLY PLANNER FEATURES) ──
export const plannerSidebarSections = [
  { title: 'Overview', items: [
    { label: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/planner' },
    { label: 'View Assigned Events', icon: <CalendarDays size={18} />, path: '/planner/assigned-events' },
    { label: 'Approve Event Plans', icon: <CheckCircle2 size={18} />, path: '/planner/approve-plans' },
  ]},
  { title: 'Coordination', items: [
    { label: 'Coordinate Vendors', icon: <Store size={18} />, path: '/planner/vendors' },
    { label: 'Manage Event Schedule', icon: <Calendar size={18} />, path: '/planner/schedule' },
    { label: 'Assign Tasks', icon: <ListTodo size={18} />, path: '/planner/tasks' },
  ]},
  { title: 'Progress & Status', items: [
    { label: 'Track Event Progress', icon: <BarChart3 size={18} />, path: '/planner/progress' },
    { label: 'Update Event Status', icon: <RefreshCw size={18} />, path: '/planner/update-status' },
  ]},
  { title: 'Communication & Output', items: [
    { label: 'ChatBox', icon: <MessageCircle size={18} />, path: '/planner/chat', badge: 3 },
    { label: 'Generate Reports', icon: <FileText size={18} />, path: '/planner/reports' },
    { label: 'Profile', icon: <User size={18} />, path: '/planner/profile' },
  ]},
];

const SB = { sidebarSections: plannerSidebarSections, roleLabel: 'Event Planner' as const, roleColor: 'text-violet-500', userName: 'Ananya Sharma', userRole: 'planner' as const };

// ============================================================
// Planner Dashboard Home
// ============================================================
export const PlannerDashboard: React.FC = () => {
  const [eventsList] = useState(initialEvents);

  return (
    <DashboardLayout {...SB}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-gray-900">Event Planner Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage assigned events, approve plans, coordinate vendors, and generate reports.</p>
        </div>
        <Badge variant="gold"><BadgeCheck size={12} className="mr-1" />Certified Planner</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Assigned Events" value={eventsList.length} icon={<CalendarDays size={22} className="text-violet-500" />} iconBg="bg-violet-100" />
        <StatCard label="Plans Pending Approval" value={2} icon={<CheckCircle2 size={22} className="text-amber-500" />} iconBg="bg-amber-100" />
        <StatCard label="Tasks Assigned" value={initialTasks.length} icon={<ListTodo size={22} className="text-blue-500" />} iconBg="bg-blue-100" />
        <StatCard label="Vendors Coordinated" value={6} icon={<Store size={22} className="text-emerald-500" />} iconBg="bg-emerald-100" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Assigned Events Quick Action */}
          <GlassCard className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Assigned Events</h3>
              <Link to="/planner/assigned-events" className="text-sm text-violet-600 font-semibold hover:underline">View All</Link>
            </div>
            <div className="space-y-3">
              {eventsList.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600"><CalendarDays size={18} /></div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{event.title}</p>
                      <p className="text-xs text-gray-500">{formatDate(event.date)} · {event.guestCount} guests · {formatCurrency(event.budget)}</p>
                    </div>
                  </div>
                  <Badge variant={event.status === 'confirmed' ? 'success' : 'info'}>{event.status}</Badge>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Quick Actions */}
          <GlassCard className="p-5">
            <h3 className="font-bold text-gray-900 mb-4">Planner Actions</h3>
            <div className="grid grid-cols-3 gap-3">
              <Link to="/planner/approve-plans" className="p-3 bg-amber-50 text-amber-700 font-semibold rounded-xl text-xs text-center border border-amber-200 hover:bg-amber-100">Approve Event Plans</Link>
              <Link to="/planner/tasks" className="p-3 bg-blue-50 text-blue-700 font-semibold rounded-xl text-xs text-center border border-blue-200 hover:bg-blue-100">Assign Tasks</Link>
              <Link to="/planner/reports" className="p-3 bg-purple-50 text-purple-700 font-semibold rounded-xl text-xs text-center border border-purple-200 hover:bg-purple-100">Generate Reports</Link>
            </div>
          </GlassCard>
        </div>

        <div className="space-y-6">
          <GlassCard className="p-5">
            <h3 className="font-bold text-gray-900 mb-4">Coordinate Vendors</h3>
            <div className="space-y-3">
              {vendors.slice(0, 3).map((v) => (
                <div key={v.id} className="flex justify-between items-center p-2 rounded-lg bg-gray-50">
                  <div><p className="text-xs font-semibold text-gray-900">{v.name}</p><p className="text-[10px] text-gray-500">{v.category}</p></div>
                  <button onClick={() => alert(`Coordinated with ${v.name}`)} className="text-xs text-violet-600 font-semibold hover:underline">Contact</button>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

// ============================================================
// View Assigned Events
// ============================================================
export const PlannerAssignedEventsPage: React.FC = () => (
  <DashboardLayout {...SB}>
    <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">Assigned Events</h1>
    <div className="space-y-4">
      {initialEvents.map((event) => (
        <GlassCard key={event.id} className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-gray-900 text-lg">{event.title}</h3>
            <Badge variant="primary">{event.type}</Badge>
          </div>
          <p className="text-sm text-gray-500">{formatDate(event.date)} at {event.time} · {event.location}</p>
          <div className="mt-4"><ProgressBar value={event.progress || 60} color="bg-violet-500" /></div>
        </GlassCard>
      ))}
    </div>
  </DashboardLayout>
);

// ============================================================
// Approve Event Plans
// ============================================================
export const PlannerApprovePlansPage: React.FC = () => {
  const [plans, setPlans] = useState([
    { id: 'p1', title: 'Sharma Wedding Stage Decor Layout', client: 'Aditya Sharma', status: 'Pending Approval' },
    { id: 'p2', title: 'TechVista Dinner Menu Concept', client: 'Sanjay Mittal', status: 'Pending Approval' },
    { id: 'p3', title: 'Birthday Superhero Theme Schedule', client: 'Isha Verma', status: 'Approved' },
  ]);

  const handleApprove = (id: string) => {
    setPlans(plans.map((p) => (p.id === id ? { ...p, status: 'Approved' } : p)));
  };

  return (
    <DashboardLayout {...SB}>
      <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">Approve Event Plans</h1>
      <div className="space-y-4">
        {plans.map((plan) => (
          <GlassCard key={plan.id} className="p-5 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-gray-900">{plan.title}</h3>
              <p className="text-xs text-gray-500">Client: {plan.client}</p>
            </div>
            <div className="flex gap-2 items-center">
              <Badge variant={plan.status === 'Approved' ? 'success' : 'warning'}>{plan.status}</Badge>
              {plan.status !== 'Approved' && (
                <button onClick={() => handleApprove(plan.id)} className="btn-primary text-xs !py-1.5 !px-3">Approve Plan</button>
              )}
            </div>
          </GlassCard>
        ))}
      </div>
    </DashboardLayout>
  );
};

// ============================================================
// Coordinate Vendors & Manage Event Schedule
// ============================================================
export const PlannerVendorsPage: React.FC = () => (
  <DashboardLayout {...SB}>
    <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">Coordinate Vendors</h1>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {vendors.map((vendor) => (
        <GlassCard key={vendor.id} className="p-5">
          <h3 className="font-bold text-gray-900">{vendor.name}</h3>
          <p className="text-xs text-gray-500 mb-3">{vendor.category} · {vendor.location}</p>
          <button onClick={() => alert(`Sent coordination message to ${vendor.name}`)} className="btn-secondary w-full text-xs">Assign to Event</button>
        </GlassCard>
      ))}
    </div>
  </DashboardLayout>
);

export const PlannerSchedulePage: React.FC = () => (
  <DashboardLayout {...SB}>
    <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">Manage Event Schedule</h1>
    <GlassCard className="p-6">
      <h3 className="font-bold text-gray-900 mb-4">Event Schedule Calendar</h3>
      <p className="text-sm text-gray-600">Drag & drop timelines, allocate hours, and schedule vendor timings.</p>
    </GlassCard>
  </DashboardLayout>
);

// ============================================================
// Assign Tasks & Track Progress & Update Status
// ============================================================
export const PlannerTasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [showModal, setShowModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle) return;
    const t: Task = {
      id: `t${tasks.length + 1}`,
      title: taskTitle,
      description: 'Planner assigned task',
      assignedTo: 'Vendor Team',
      dueDate: '2026-08-30',
      priority: 'high',
      status: 'todo',
      eventId: 'e1',
    };
    setTasks([...tasks, t]);
    setTaskTitle('');
    setShowModal(false);
  };

  return (
    <DashboardLayout {...SB}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-display text-2xl font-bold text-gray-900">Assign Tasks</h1>
        <button onClick={() => setShowModal(true)} className="btn-primary text-sm"><Plus size={16} />Assign New Task</button>
      </div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <GlassCard key={task.id} className="p-4 flex justify-between items-center">
            <div>
              <h4 className="font-semibold text-gray-900">{task.title}</h4>
              <p className="text-xs text-gray-500">Assigned To: {task.assignedTo}</p>
            </div>
            <Badge variant={task.priority === 'high' ? 'danger' : 'info'}>{task.priority}</Badge>
          </GlassCard>
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Assign New Task" size="md">
        <form onSubmit={handleAddTask} className="space-y-4">
          <div><label className="text-xs font-semibold block mb-1">Task Title</label><input type="text" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} className="input-field" placeholder="Task name..." required /></div>
          <button type="submit" className="btn-primary w-full">Assign Task</button>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export const PlannerProgressPage: React.FC = () => (
  <DashboardLayout {...SB}>
    <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">Track Event Progress</h1>
    <GlassCard className="p-6">
      <h3 className="font-bold text-gray-900 mb-2">Overall Completion Rate</h3>
      <ProgressBar value={75} color="bg-violet-500" />
    </GlassCard>
  </DashboardLayout>
);

export const PlannerUpdateStatusPage: React.FC = () => {
  const [eventStatus, setEventStatus] = useState('confirmed');

  return (
    <DashboardLayout {...SB}>
      <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">Update Event Status</h1>
      <GlassCard className="p-6 max-w-md">
        <label className="text-xs font-semibold text-gray-700 block mb-2">Select Status for Event</label>
        <select value={eventStatus} onChange={(e) => setEventStatus(e.target.value)} className="input-field mb-4">
          <option value="planning">Planning Phase</option>
          <option value="confirmed">Confirmed</option>
          <option value="in-progress">In Execution</option>
          <option value="completed">Completed</option>
        </select>
        <button onClick={() => alert(`Status updated to ${eventStatus}`)} className="btn-primary w-full">Update Status</button>
      </GlassCard>
    </DashboardLayout>
  );
};

// ============================================================
// ChatBox & Generate Reports & Profile
// ============================================================
export const PlannerChatPage: React.FC = () => {
  const [messages, setMessages] = useState(['Hello! I am your assigned Event Planner.', 'Could you confirm the catering menu preferences?']);
  const [text, setText] = useState('');

  return (
    <DashboardLayout {...SB}>
      <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">ChatBox</h1>
      <GlassCard className="h-[450px] flex flex-col justify-between p-4">
        <div className="space-y-3 p-2 overflow-y-auto">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
              <div className={`px-4 py-2 rounded-2xl text-sm ${i % 2 === 0 ? 'bg-gray-100 text-gray-800' : 'bg-violet-600 text-white'}`}>{m}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 pt-3 border-t">
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message..." className="input-field" />
          <button onClick={() => { if (text) setMessages([...messages, text]); setText(''); }} className="btn-primary !px-5"><Send size={16} /></button>
        </div>
      </GlassCard>
    </DashboardLayout>
  );
};

export const PlannerReportsPage: React.FC = () => (
  <DashboardLayout {...SB}>
    <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">Generate Reports</h1>
    <p className="text-gray-500 mb-6">Download comprehensive event execution and budget reports.</p>

    <div className="grid sm:grid-cols-2 gap-4">
      {['Event Budget & Cost Report', 'Vendor Execution Summary', 'Client Satisfaction Feedback'].map((rName) => (
        <GlassCard key={rName} className="p-5 flex justify-between items-center">
          <div><h4 className="font-bold text-gray-900">{rName}</h4><p className="text-xs text-gray-400">PDF Report · 1.2 MB</p></div>
          <button onClick={() => alert(`Generating and downloading ${rName}...`)} className="btn-primary text-xs !py-2"><Download size={14} />Download</button>
        </GlassCard>
      ))}
    </div>
  </DashboardLayout>
);

export const PlannerProfilePage: React.FC = () => (
  <DashboardLayout {...SB}>
    <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">Planner Profile</h1>
    <GlassCard className="p-6 max-w-md">
      <Avatar name="Ananya Sharma" size="xl" className="mx-auto mb-4" />
      <h3 className="font-bold text-center text-lg text-gray-900">Ananya Sharma</h3>
      <p className="text-xs text-center text-gray-500 mb-4">Senior Event Planner</p>
      <button onClick={() => alert('Profile updated!')} className="btn-primary w-full">Save Changes</button>
    </GlassCard>
  </DashboardLayout>
);
