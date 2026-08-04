import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
  MapPin, UtensilsCrossed, Palette, Camera, Music, Lightbulb, Truck,
} from 'lucide-react';

// ── Pages ────────────────────────────────────────────────────
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';

// Customer
import CustomerDashboard from '@/pages/customer/CustomerDashboard';
import CreateEventPage from '@/pages/customer/CreateEventPage';
import {
  MyEventsPage, BrowseVendorsPage, HirePlannerPage, VendorCategoryPage,
  GuestManagementPage, ChatPage, PaymentsPage, NotificationsPage,
  ReviewsPage, ProfilePage, AIVenuePage, AIThemePage, AIBudgetPage,
  AIAssistantPage, InvitationsPage, RSVPPage, AIVendorsPage,
  AICateringPage, AITimelinePage, AIProgressPage, AISpeechPage,
  AISeatingPage, AIContingencyPage,
} from '@/pages/customer/CustomerPages';

// Vendor
import {
  VendorDashboard, VendorCalendarPage, VendorProfilePage,
  VendorServicesPage, VendorPackagesPage, VendorBookingRequestsPage,
  VendorOrdersPage, VendorPaymentsPage, VendorReviewsPage, VendorChatPage,
} from '@/pages/vendor/VendorPages';

// Planner
import {
  PlannerDashboard, PlannerAssignedEventsPage, PlannerApprovePlansPage,
  PlannerVendorsPage, PlannerSchedulePage, PlannerTasksPage,
  PlannerProgressPage, PlannerUpdateStatusPage, PlannerChatPage,
  PlannerReportsPage, PlannerProfilePage,
} from '@/pages/planner/PlannerPages';

// Admin
import {
  AdminDashboard, AdminCustomersPage, AdminPlannersPage, AdminVendorsPage,
  AdminCategoriesPage, AdminBookingsPage, AdminPaymentsPage, AdminComplaintsPage,
  AdminReportsPage, AdminAIMonitoringPage,
} from '@/pages/admin/AdminPages';

// ============================================================
// App Component with Router
// ============================================================
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public ─────────────────────────────────────── */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* ── Customer Dashboard & Features ──────────────── */}
        <Route path="/customer" element={<CustomerDashboard />} />
        <Route path="/customer/create-event" element={<CreateEventPage />} />
        <Route path="/customer/events" element={<MyEventsPage />} />
        <Route path="/customer/vendors" element={<BrowseVendorsPage />} />
        <Route path="/customer/hire-planner" element={<HirePlannerPage />} />
        <Route path="/customer/venues" element={<VendorCategoryPage category="Venue" icon={<MapPin size={20} />} />} />
        <Route path="/customer/catering" element={<VendorCategoryPage category="Catering" icon={<UtensilsCrossed size={20} />} />} />
        <Route path="/customer/decoration" element={<VendorCategoryPage category="Decoration" icon={<Palette size={20} />} />} />
        <Route path="/customer/photography" element={<VendorCategoryPage category="Photography" icon={<Camera size={20} />} />} />
        <Route path="/customer/dj-sound" element={<VendorCategoryPage category="DJ & Sound" icon={<Music size={20} />} />} />
        <Route path="/customer/lighting" element={<VendorCategoryPage category="Lighting" icon={<Lightbulb size={20} />} />} />
        <Route path="/customer/transportation" element={<VendorCategoryPage category="Transportation" icon={<Truck size={20} />} />} />
        
        {/* Customer AI Features */}
        <Route path="/customer/ai-speech" element={<AISpeechPage />} />
        <Route path="/customer/ai-seating" element={<AISeatingPage />} />
        <Route path="/customer/ai-contingency" element={<AIContingencyPage />} />
        <Route path="/customer/ai-venue" element={<AIVenuePage />} />
        <Route path="/customer/ai-theme" element={<AIThemePage />} />
        <Route path="/customer/ai-decor" element={<AIThemePage />} />
        <Route path="/customer/ai-vendors" element={<AIVendorsPage />} />
        <Route path="/customer/ai-catering" element={<AICateringPage />} />
        <Route path="/customer/ai-timeline" element={<AITimelinePage />} />
        <Route path="/customer/ai-budget" element={<AIBudgetPage />} />
        <Route path="/customer/ai-assistant" element={<AIAssistantPage />} />
        <Route path="/customer/ai-progress" element={<AIProgressPage />} />

        {/* Customer Management & Account */}
        <Route path="/customer/guests" element={<GuestManagementPage />} />
        <Route path="/customer/invitations" element={<InvitationsPage />} />
        <Route path="/customer/rsvp" element={<RSVPPage />} />
        <Route path="/customer/chat" element={<ChatPage />} />
        <Route path="/customer/payments" element={<PaymentsPage />} />
        <Route path="/customer/notifications" element={<NotificationsPage />} />
        <Route path="/customer/reviews" element={<ReviewsPage />} />
        <Route path="/customer/profile" element={<ProfilePage />} />

        {/* ── Vendor Dashboard & Features ───────────────── */}
        <Route path="/vendor" element={<VendorDashboard />} />
        <Route path="/vendor/profile" element={<VendorProfilePage />} />
        <Route path="/vendor/services" element={<VendorServicesPage />} />
        <Route path="/vendor/packages" element={<VendorPackagesPage />} />
        <Route path="/vendor/booking-requests" element={<VendorBookingRequestsPage />} />
        <Route path="/vendor/calendar" element={<VendorCalendarPage />} />
        <Route path="/vendor/orders" element={<VendorOrdersPage />} />
        <Route path="/vendor/payments" element={<VendorPaymentsPage />} />
        <Route path="/vendor/reviews" element={<VendorReviewsPage />} />
        <Route path="/vendor/chat" element={<VendorChatPage />} />

        {/* ── Event Planner Dashboard & Features ────────── */}
        <Route path="/planner" element={<PlannerDashboard />} />
        <Route path="/planner/assigned-events" element={<PlannerAssignedEventsPage />} />
        <Route path="/planner/approve-plans" element={<PlannerApprovePlansPage />} />
        <Route path="/planner/vendors" element={<PlannerVendorsPage />} />
        <Route path="/planner/schedule" element={<PlannerSchedulePage />} />
        <Route path="/planner/tasks" element={<PlannerTasksPage />} />
        <Route path="/planner/progress" element={<PlannerProgressPage />} />
        <Route path="/planner/update-status" element={<PlannerUpdateStatusPage />} />
        <Route path="/planner/chat" element={<PlannerChatPage />} />
        <Route path="/planner/reports" element={<PlannerReportsPage />} />
        <Route path="/planner/profile" element={<PlannerProfilePage />} />

        {/* ── Admin Dashboard & Features ────────────────── */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/customers" element={<AdminCustomersPage />} />
        <Route path="/admin/planners" element={<AdminPlannersPage />} />
        <Route path="/admin/vendors" element={<AdminVendorsPage />} />
        <Route path="/admin/categories" element={<AdminCategoriesPage />} />
        <Route path="/admin/bookings" element={<AdminBookingsPage />} />
        <Route path="/admin/payments" element={<AdminPaymentsPage />} />
        <Route path="/admin/reports" element={<AdminReportsPage />} />
        <Route path="/admin/complaints" element={<AdminComplaintsPage />} />
        <Route path="/admin/ai-monitoring" element={<AdminAIMonitoringPage />} />

        {/* ── Fallback ───────────────────────────────────── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
