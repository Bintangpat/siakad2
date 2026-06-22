import { Card } from "@/components/ui/card";

export default function PerformanceInsights() {
  return (
    <Card className="bg-primary-container p-xl rounded-xl text-on-primary-container relative overflow-hidden border-none shadow-none">
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-lg items-center">
        <div>
          <h4 className="font-headline-md text-headline-md mb-sm">
            Academic Performance Insights
          </h4>
          <p className="font-body-md text-body-md opacity-80 mb-lg max-w-md">
            Predictive analysis shows a 12% projected increase in student
            retention if current mentorship programs continue their growth
            trajectory.
          </p>
          <div className="flex gap-md">
            <div className="bg-white/10 backdrop-blur-md p-md rounded-lg border border-white/20">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                Retention Rate
              </p>
              <p className="text-headline-sm font-bold">92.4%</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-md rounded-lg border border-white/20">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                GPA Average
              </p>
              <p className="text-headline-sm font-bold">3.62</p>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <div
            className="w-full h-48 bg-cover bg-center rounded-xl border border-white/20 shadow-2xl"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAJsYNYoUFurE8Lq5b9qmN9utZqXsD2WZ8TxA-Uy5iVR96cRBb4qZUtt2gn6-DMPei80M19MFcSgFmC7lEQRZ62j-B_7S7xDTnlk3dCaTZYAHp7qnAY8puJ6mU8A7xNjbQfdkgWvmN_rnnH-88UZZ49BAZkYjGpTEqOLGTZzFXiyNrLqpYQi5bNkqd0CKfDmLoosmHYTLS6yi-ZnRHSEwI8aGiwlkZOo3sL-1GCfc7zmSUjrwZLKNbqSFLcE9bysBV-YtBy0kEjAgo')",
            }}
          />
        </div>
      </div>
      {/* Atmospheric Background Accents */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-fixed-dim/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary-fixed/10 rounded-full blur-3xl"></div>
    </Card>
  );
}
