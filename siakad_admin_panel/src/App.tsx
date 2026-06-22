import { Routes, Route } from "react-router-dom";

import ShellPage from "@/pages/ShellPage";
import DashboardPage from "@/pages/DashboardPage";
import LoginPage from "@/pages/auth/LoginPage";
import NotFoundPage from "@/pages/auth/NotFoundPage";
import SchedulePage from "@/pages/SchedulePage";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Routes>
          <Route
            path="/"
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
          <Route path="/login" element={<LoginPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
