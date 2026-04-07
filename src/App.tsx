import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/layout/AppLayout";
import Index from "./pages/Index";
import CustomerOpportunity from "./pages/CustomerOpportunity";
import CustomerDetail from "./pages/CustomerDetail";
import CustomerCreate from "./pages/CustomerCreate";
import OpportunityDetail from "./pages/OpportunityDetail";
import SurveyManagement from "./pages/SurveyManagement";
import SurveyDetail from "./pages/SurveyDetail";
import ContractManagement from "./pages/ContractManagement";
import ContractDetail from "./pages/ContractDetail";
import VisitDailyReport from "./pages/VisitDailyReport";
import PerformanceGoals from "./pages/PerformanceGoals";
import KpiResults from "./pages/KpiResults";
import AuditManagement from "./pages/AuditManagement";
import OperationsDashboard from "./pages/OperationsDashboard";
import MonitoringDashboard from "./pages/MonitoringDashboard";
import ReportsDashboard from "./pages/ReportsDashboard";
import CourseConfig from "./pages/CourseConfig";
import TrainingLearning from "./pages/TrainingLearning";
import AnnouncementManagement from "./pages/AnnouncementManagement";
import OrganizationManagement from "./pages/OrganizationManagement";
import RoleManagement from "./pages/RoleManagement";
import DictionaryManagement from "./pages/DictionaryManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/customers" element={<CustomerOpportunity />} />
            <Route path="/customers/:id" element={<CustomerDetail />} />
            <Route path="/opportunities/:id" element={<OpportunityDetail />} />
            <Route path="/surveys" element={<SurveyManagement />} />
            <Route path="/surveys/:id" element={<SurveyDetail />} />
            <Route path="/contracts" element={<ContractManagement />} />
            <Route path="/contracts/:id" element={<ContractDetail />} />
            <Route path="/visits" element={<VisitDailyReport />} />
            <Route path="/assessment/goals" element={<PerformanceGoals />} />
            <Route path="/assessment/results" element={<KpiResults />} />
            <Route path="/assessment/audit" element={<AuditManagement />} />
            <Route path="/analytics/operations" element={<OperationsDashboard />} />
            <Route path="/analytics/monitoring" element={<MonitoringDashboard />} />
            <Route path="/analytics/reports" element={<ReportsDashboard />} />
            <Route path="/training/courses" element={<CourseConfig />} />
            <Route path="/training/learning" element={<TrainingLearning />} />
            <Route path="/announcements" element={<AnnouncementManagement />} />
            <Route path="/system/organization" element={<OrganizationManagement />} />
            <Route path="/system/roles" element={<RoleManagement />} />
            <Route path="/system/dictionary" element={<DictionaryManagement />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
