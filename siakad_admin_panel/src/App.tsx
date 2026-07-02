import { Routes, Route } from "react-router-dom";

import ShellPage from "@/pages/ShellPage";
import DashboardPage from "@/pages/DashboardPage";
import LoginPage from "@/pages/auth/LoginPage";
import NotFoundPage from "@/pages/auth/NotFoundPage";
import SchedulePage from "@/pages/SchedulePage";
import FinancialPage from "@/pages/FinancialPage";
import KrsMonitoringPage from "@/pages/KrsMonitoringPage";
import AttendancePage from "@/pages/AttendancePage";
import KrsSetupPage from "@/pages/KrsSetupPage";
import UserManagementPage from "@/pages/UserManagementPage";
import AddUserPage from "@/pages/AddUserPage";
import LandingPage from "@/pages/LandingPage";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/dashboard"
            element={
              <ShellPage>
                <DashboardPage />
              </ShellPage>
            }
          />
          <Route
            path="/schedule"
            element={
              <ShellPage>
                <SchedulePage />
              </ShellPage>
            }
          />
          <Route
            path="/financial"
            element={
              <ShellPage>
                <FinancialPage />
              </ShellPage>
            }
          />
          <Route
            path="/krs"
            element={
              <ShellPage>
                <KrsMonitoringPage />
              </ShellPage>
            }
          />
          <Route
            path="/krs/krs-setup"
            element={
              <ShellPage>
                <KrsSetupPage />
              </ShellPage>
            }
          />
          <Route
            path="/attendance"
            element={
              <ShellPage>
                <AttendancePage />
              </ShellPage>
            }
          />
          <Route
            path="/users"
            element={
              <ShellPage>
                <UserManagementPage />
              </ShellPage>
            }
          />
          <Route
            path="/users/add"
            element={
              <ShellPage>
                <AddUserPage />
              </ShellPage>
            }
          />
          <Route path="/auth/login" element={<LoginPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
