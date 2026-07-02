import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { PhotoAndRolePanel } from "@/components/add-user/PhotoAndRolePanel";
import { UserDataForm } from "@/components/add-user/UserDataForm";
import { Footer } from "@/components/add-user/Footer";

export const AddUserPage: React.FC = () => {
  const [role, setRole] = useState("");

  return (
    <div className="bg-background text-fore min-h-screen flex flex-col font-sans">
      {/* Top Application Bar Nav */}
      <Header />

      {/* Main Content Canvas Grid */}
      <main className="flex-grow pt-32 pb-8 px-4 md:px-10 max-w-7xl mx-auto w-full">
        <div className="mb-8 text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-primary mb-1">
            Add New User
          </h1>
          <p className="text-base text-on-surface-variant">
            Register a new student, lecturer, or administrator into the academic
            system.
          </p>
        </div>

        {/* Core Submission Form Component wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <PhotoAndRolePanel role={role} setRole={setRole} />
          <UserDataForm role={role} setRole={setRole} />
        </div>
      </main>

      {/* Global Fluid Sticky Footer */}
      <Footer />
    </div>
  );
};

export default AddUserPage;
