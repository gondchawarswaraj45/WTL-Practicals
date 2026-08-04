import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, Users, Store, UserCheck, Layers, CalendarCheck,
  CreditCard, AlertCircle, Brain, BarChart3, LineChart, Settings,
  TrendingUp, DollarSign, CheckCircle2, Clock, BadgeCheck, Star,
  ArrowUpRight, Eye, Shield, Search, Filter, Plus, Edit, Trash2, XCircle, Check,
} from 'lucide-react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { StatCard, Badge, GlassCard, Avatar, ProgressBar, StarRating, SearchInput, Modal } from '@/components/ui';
import { vendors as initialVendors, eventPlanners as initialPlanners, events, complaints as initialComplaints, bookings } from '@/data';
import { formatCurrency, formatDate, cn } from '@/lib/utils';

// ── Admin Sidebar Config (STRICTLY ADMIN FEATURES) ───────────
export const adminSidebarSections = [
  { title: 'Overview', items: [
    { label: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/admin' },
  ]},
  { title: 'User & Role Management', items: [
    { label: 'Manage Customers', icon: <Users size={18} />, path: '/admin/customers' },
    { label: 'Manage Event Planners', icon: <UserCheck size={18} />, path: '/admin/planners' },
    { label: 'Approve & Verify Vendors', icon: <Store size={18} />, path: '/admin/vendors' },
  ]},
  { title: 'Platform & Operations', items: [
    { label: 'Manage Service Categories', icon: <Layers size={18} />, path: '/admin/categories' },
    { label: 'Booking Management', icon: <CalendarCheck size={18} />, path: '/admin/bookings' },
    { label: 'Payment Monitoring', icon: <CreditCard size={18} />, path: '/admin/payments' },
    { label: 'Complaint & Disputes', icon: <AlertCircle size={18} />, path: '/admin/complaints', badge: 2 },
  ]},
  { title: 'System Intelligence', items: [
    { label: 'Reports & Analytics', icon: <BarChart3 size={18} />, path: '/admin/reports' },
    { label: 'AI Monitoring', icon: <Brain size={18} />, path: '/admin/ai-monitoring' },
  ]},
];

const SB = { sidebarSections: adminSidebarSections, roleLabel: 'Admin' as const, roleColor: 'text-red-500', userName: 'Super Admin', userRole: 'admin' as const };

// ============================================================
// Admin Dashboard Home
// ============================================================
export const AdminDashboard: React.FC = () => (
  <DashboardLayout {...SB}>
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-bold text-gray-900">Admin Control Center</h1>
        <p className="text-gray-500 mt-1">Supervise customers, planners, vendors, categories, payments & AI metrics.</p>
      </div>
      <Badge variant="danger"><Shield size={12} className="mr-1" />System Admin</Badge>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard label="Total Customers" value="15,234" icon={<Users size={22} className="text-primary-500" />} iconBg="bg-primary-100" />
      <StatCard label="Verified Vendors" value={initialVendors.filter((v) => v.verified).length} icon={<Store size={22} className="text-emerald-500" />} iconBg="bg-emerald-100" />
      <StatCard label="Event Planners" value={initialPlanners.length} icon={<UserCheck size={22} className="text-violet-500" />} iconBg="bg-violet-100" />
      <StatCard label="Platform Revenue" value={formatCurrency(52500000)} icon={<DollarSign size={22} className="text-amber-500" />} iconBg="bg-amber-100" />
    </div>

    <div className="grid lg:grid-cols-2 gap-6">
      <GlassCard className="p-5">
        <h3 className="font-bold text-gray-900 mb-4">Quick Admin Operations</h3>
        <div className="grid grid-cols-2 gap-3">
          <Link to="/admin/vendors" className="p-3 bg-emerald-50 text-emerald-700 font-semibold rounded-xl text-xs text-center border border-emerald-200">Approve Vendors</Link>
          <Link to="/admin/categories" className="p-3 bg-purple-50 text-purple-700 font-semibold rounded-xl text-xs text-center border border-purple-200">Service Categories</Link>
          <Link to="/admin/complaints" className="p-3 bg-red-50 text-red-700 font-semibold rounded-xl text-xs text-center border border-red-200">Dispute Resolution</Link>
          <Link to="/admin/ai-monitoring" className="p-3 bg-blue-50 text-blue-700 font-semibold rounded-xl text-xs text-center border border-blue-200">AI Monitoring</Link>
        </div>
      </GlassCard>

      <GlassCard className="p-5">
        <h3 className="font-bold text-gray-900 mb-4">Open Support & Disputes</h3>
        <div className="space-y-3">
          {initialComplaints.map((c) => (
            <div key={c.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <div><p className="text-xs font-semibold text-gray-900">{c.subject}</p><p className="text-[10px] text-gray-500">{c.userName} · {c.category}</p></div>
              <Badge variant={c.priority === 'high' ? 'danger' : 'warning'}>{c.priority}</Badge>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  </DashboardLayout>
);

// ============================================================
// Manage Customers & Manage Event Planners
// ============================================================
export const AdminCustomersPage: React.FC = () => {
  const [customersList] = useState([
    { id: '1', name: 'Aditya Sharma', email: 'aditya@email.com', events: 6, spent: 575000, status: 'Active' },
    { id: '2', name: 'Meera Patel', email: 'meera@email.com', events: 3, spent: 320000, status: 'Active' },
    { id: '3', name: 'Arjun Reddy', email: 'arjun@email.com', events: 2, spent: 180000, status: 'Active' },
  ]);

  return (
    <DashboardLayout {...SB}>
      <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">Manage Customers</h1>
      <GlassCard className="overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Customer</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Email</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Events</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Spent</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {customersList.map((c) => (
              <tr key={c.id}>
                <td className="px-5 py-3.5 text-sm font-medium text-gray-900">{c.name}</td>
                <td className="px-5 py-3.5 text-sm text-gray-500">{c.email}</td>
                <td className="px-5 py-3.5 text-sm text-gray-900 font-bold">{c.events}</td>
                <td className="px-5 py-3.5 text-sm text-gray-900 font-bold">{formatCurrency(c.spent)}</td>
                <td className="px-5 py-3.5"><button onClick={() => alert(`Viewing customer ${c.name}`)} className="text-xs text-primary-600 font-semibold hover:underline">Manage</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </DashboardLayout>
  );
};

export const AdminPlannersPage: React.FC = () => (
  <DashboardLayout {...SB}>
    <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">Manage Event Planners</h1>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {initialPlanners.map((p) => (
        <GlassCard key={p.id} className="p-5">
          <Avatar name={p.name} size="lg" className="mb-2" />
          <h3 className="font-bold text-gray-900">{p.name}</h3>
          <p className="text-xs text-gray-500">{p.eventsPlanned} Events Planned · {p.successRate}% Success</p>
          <button onClick={() => alert(`Managing planner ${p.name}`)} className="btn-secondary w-full mt-4 text-xs">Manage Planner Account</button>
        </GlassCard>
      ))}
    </div>
  </DashboardLayout>
);

// ============================================================
// Approve & Verify Vendors
// ============================================================
export const AdminVendorsPage: React.FC = () => {
  const [vendorList, setVendorList] = useState(initialVendors);

  const toggleVerify = (id: string) => {
    setVendorList(vendorList.map((v) => (v.id === id ? { ...v, verified: !v.verified } : v)));
  };

  return (
    <DashboardLayout {...SB}>
      <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">Approve & Verify Vendors</h1>
      <GlassCard className="overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Vendor Name</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Category</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Verification Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {vendorList.map((v) => (
              <tr key={v.id}>
                <td className="px-5 py-3.5 text-sm font-medium text-gray-900">{v.name}</td>
                <td className="px-5 py-3.5 text-sm text-gray-500">{v.category}</td>
                <td className="px-5 py-3.5"><Badge variant={v.verified ? 'success' : 'warning'}>{v.verified ? 'Verified' : 'Pending Verification'}</Badge></td>
                <td className="px-5 py-3.5">
                  <button onClick={() => toggleVerify(v.id)} className={cn('text-xs px-3 py-1.5 rounded-lg font-semibold transition-all', v.verified ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200')}>
                    {v.verified ? 'Revoke Verification' : 'Approve & Verify'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </DashboardLayout>
  );
};

// ============================================================
// Manage Service Categories
// ============================================================
export const AdminCategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState(['Venue', 'Catering', 'Photography', 'Decoration', 'DJ & Sound', 'Lighting', 'Transportation', 'Florist', 'Cake & Bakery']);
  const [showModal, setShowModal] = useState(false);
  const [newCat, setNewCat] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCat) return;
    setCategories([...categories, newCat]);
    setNewCat('');
    setShowModal(false);
  };

  return (
    <DashboardLayout {...SB}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-display text-2xl font-bold text-gray-900">Manage Service Categories</h1>
        <button onClick={() => setShowModal(true)} className="btn-primary text-sm"><Plus size={16} />Add Category</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <GlassCard key={cat} className="p-4 flex justify-between items-center">
            <span className="font-semibold text-gray-900 text-sm">{cat}</span>
            <button onClick={() => setCategories(categories.filter((c) => c !== cat))} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
          </GlassCard>
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Service Category" size="md">
        <form onSubmit={handleAdd} className="space-y-4">
          <div><label className="text-xs font-semibold block mb-1">Category Name</label><input value={newCat} onChange={(e) => setNewCat(e.target.value)} className="input-field" placeholder="e.g. Fireworks & Pyrotechnics" required /></div>
          <button type="submit" className="btn-primary w-full">Save Category</button>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

// ============================================================
// Booking Management & Payment Monitoring & Dispute Resolution & Reports & AI Monitoring
// ============================================================
export const AdminBookingsPage: React.FC = () => (
  <DashboardLayout {...SB}>
    <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">Booking Management</h1>
    <GlassCard className="overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Booking ID</th>
            <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Service</th>
            <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Amount</th>
            <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {bookings.map((b) => (
            <tr key={b.id}>
              <td className="px-5 py-3.5 text-sm font-medium text-gray-900">#{b.id}</td>
              <td className="px-5 py-3.5 text-sm text-gray-500">{b.service}</td>
              <td className="px-5 py-3.5 text-sm font-bold text-gray-900">{formatCurrency(b.amount)}</td>
              <td className="px-5 py-3.5"><Badge variant={b.status === 'confirmed' ? 'success' : 'warning'}>{b.status}</Badge></td>
            </tr>
          ))}
        </tbody>
      </table>
    </GlassCard>
  </DashboardLayout>
);

export const AdminPaymentsPage: React.FC = () => (
  <DashboardLayout {...SB}>
    <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">Payment Monitoring</h1>
    <GlassCard className="p-6">
      <h3 className="font-bold text-gray-900 mb-2">Total Platform Escrow: ₹5,25,00,000</h3>
      <p className="text-sm text-gray-500">All transactions are monitored and held securely in escrow.</p>
    </GlassCard>
  </DashboardLayout>
);

export const AdminComplaintsPage: React.FC = () => {
  const [complaints, setComplaints] = useState(initialComplaints);

  const resolveDispute = (id: string) => {
    setComplaints(complaints.map((c) => (c.id === id ? { ...c, status: 'resolved' } : c)));
  };

  return (
    <DashboardLayout {...SB}>
      <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">Complaint & Dispute Resolution</h1>
      <div className="space-y-4">
        {complaints.map((c) => (
          <GlassCard key={c.id} className="p-5 flex justify-between items-center">
            <div>
              <h4 className="font-bold text-gray-900">{c.subject}</h4>
              <p className="text-xs text-gray-500">By: {c.userName} · Priority: {c.priority}</p>
            </div>
            <div className="flex gap-2 items-center">
              <Badge variant={c.status === 'resolved' ? 'success' : 'warning'}>{c.status}</Badge>
              {c.status !== 'resolved' && (
                <button onClick={() => resolveDispute(c.id)} className="btn-primary text-xs !py-1.5 !px-3">Resolve Dispute</button>
              )}
            </div>
          </GlassCard>
        ))}
      </div>
    </DashboardLayout>
  );
};

export const AdminReportsPage: React.FC = () => (
  <DashboardLayout {...SB}>
    <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">Reports & Analytics</h1>
    <GlassCard className="p-6">
      <h3 className="font-bold text-gray-900 mb-2">Platform Growth & Revenue Insights</h3>
      <ProgressBar value={85} color="bg-emerald-500" />
    </GlassCard>
  </DashboardLayout>
);

export const AdminAIMonitoringPage: React.FC = () => (
  <DashboardLayout {...SB}>
    <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">AI Monitoring</h1>
    <div className="grid sm:grid-cols-3 gap-4">
      <StatCard label="Total AI Queries" value="45,678" icon={<Brain size={20} className="text-violet-500" />} iconBg="bg-violet-100" />
      <StatCard label="Avg Response Time" value="1.2s" icon={<Clock size={20} className="text-blue-500" />} iconBg="bg-blue-100" />
      <StatCard label="Accuracy Rate" value="96.8%" icon={<CheckCircle2 size={20} className="text-emerald-500" />} iconBg="bg-emerald-100" />
    </div>
  </DashboardLayout>
);
