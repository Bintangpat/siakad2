import React from "react";
import { Landmark, Wallet, CreditCard } from "lucide-react";

export const FinancialCharts: React.FC = () => {
  const faculties = [
    { name: "Engineering", height: "90%" },
    { name: "Medicine", height: "75%" },
    { name: "Business", height: "85%" },
    { name: "Art & Design", height: "60%" },
    { name: "Computing", height: "95%" },
  ];

  return (
    <div className="grid grid-cols-12 gap-[24px]">
      {/* Bar Chart Visualization */}
      <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant p-lg rounded-xl">
        <div className="flex justify-between items-center mb-xl">
          <h4 className="font-headline-sm text-headline-sm">
            Payment Status by Faculty
          </h4>
          <div className="flex gap-md items-center">
            <div className="flex items-center gap-xs">
              <span className="w-3 h-3 bg-primary rounded-full"></span>
              <span className="font-label-sm text-label-sm">Paid</span>
            </div>
            <div className="flex items-center gap-xs">
              <span className="w-3 h-3 bg-outline-variant rounded-full"></span>
              <span className="font-label-sm text-label-sm">Unpaid</span>
            </div>
          </div>
        </div>

        <div className="h-[300px] w-full flex items-end justify-between px-md">
          {faculties.map((fac) => (
            <div
              key={fac.name}
              className="flex flex-col items-center gap-sm flex-1"
            >
              <div className="w-12 bg-surface-container-high rounded-t-sm relative h-[250px]">
                <div
                  className="absolute bottom-0 w-full bg-primary rounded-t-sm transition-all duration-1000"
                  style={{ height: fac.height }}
                ></div>
              </div>
              <span className="font-label-sm text-label-sm text-center">
                {fac.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Methods Distribution */}
      <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest border border-outline-variant p-lg rounded-xl flex flex-col">
        <h4 className="font-headline-sm text-headline-sm mb-lg">
          Payment Methods
        </h4>
        <div className="space-y-md flex-1 flex flex-col justify-center">
          {/* Method 1 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 rounded bg-secondary-container flex items-center justify-center text-primary">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-label-lg text-label-lg">Virtual Account</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    BCA, Mandiri, BNI
                  </p>
                </div>
              </div>
              <p className="font-label-lg text-label-lg">65%</p>
            </div>
            <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full" style={{ width: "65%" }}></div>
            </div>
          </div>

          {/* Method 2 */}
          <div className="mt-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 rounded bg-secondary-container flex items-center justify-center text-primary">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-label-lg text-label-lg">E-Wallet</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    GoPay, OVO, Dana
                  </p>
                </div>
              </div>
              <p className="font-label-lg text-label-lg">28%</p>
            </div>
            <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
              <div
                className="bg-secondary h-full"
                style={{ width: "28%" }}
              ></div>
            </div>
          </div>

          {/* Method 3 */}
          <div className="mt-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 rounded bg-secondary-container flex items-center justify-center text-primary">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-label-lg text-label-lg">Bank Transfer</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    Manual Verification
                  </p>
                </div>
              </div>
              <p className="font-label-lg text-label-lg">7%</p>
            </div>
            <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
              <div className="bg-tertiary h-full" style={{ width: "7%" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
