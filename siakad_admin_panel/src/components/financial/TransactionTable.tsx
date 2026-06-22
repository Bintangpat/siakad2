import React, { useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  RefreshCw,
  CreditCard,
  Wallet,
  Landmark,
  Loader2,
} from "lucide-react";

interface Transaction {
  id: string;
  name: string;
  nim: string;
  amount: string;
  method: "Virtual Account" | "E-Wallet" | "Bank Transfer";
  status: "SUCCESS" | "PENDING" | "FAILED";
}

interface TransactionTableProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      name: "Aditya Dharmawan",
      nim: "10293485",
      amount: "Rp 8.500.000",
      method: "Virtual Account",
      status: "SUCCESS",
    },
    {
      id: "2",
      name: "Siti Aminah",
      nim: "10293488",
      amount: "Rp 5.250.000",
      method: "E-Wallet",
      status: "PENDING",
    },
    {
      id: "3",
      name: "Budi Santoso",
      nim: "10293512",
      amount: "Rp 12.000.000",
      method: "Bank Transfer",
      status: "FAILED",
    },
    {
      id: "4",
      name: "Dewi Lestari",
      nim: "10293600",
      amount: "Rp 8.500.000",
      method: "Virtual Account",
      status: "SUCCESS",
    },
  ]);

  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleApprove = (id: string) => {
    setProcessingId(id);
    setTimeout(() => {
      setTransactions((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "SUCCESS" } : item,
        ),
      );
      setProcessingId(null);
    }, 1500);
  };

  const filteredTransactions = transactions.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nim.includes(searchTerm),
  );

  const renderMethodIcon = (method: string) => {
    switch (method) {
      case "Virtual Account":
        return <CreditCard className="w-[18px] h-[18px]" />;
      case "E-Wallet":
        return <Wallet className="w-[18px] h-[18px]" />;
      default:
        return <Landmark className="w-[18px] h-[18px]" />;
    }
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return (
          <span className="px-sm py-1 bg-green-100 text-green-800 text-label-sm font-bold rounded">
            SUCCESS
          </span>
        );
      case "PENDING":
        return (
          <span className="px-sm py-1 bg-yellow-100 text-yellow-800 text-label-sm font-bold rounded">
            PENDING
          </span>
        );
      default:
        return (
          <span className="px-sm py-1 bg-red-100 text-red-800 text-label-sm font-bold rounded">
            FAILED
          </span>
        );
    }
  };

  return (
    <div className="col-span-12 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
      <div className="p-lg border-b border-outline-variant flex justify-between items-center">
        <h4 className="font-headline-sm text-headline-sm">
          Recent Transactions
        </h4>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-[20px] h-[20px]" />
          <input
            className="pl-10 pr-md py-sm bg-surface-container-low border border-outline-variant rounded-lg text-body-sm w-64 focus:ring-1 focus:ring-primary focus:outline-none"
            placeholder="Search by NIM or Name..."
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low">
            <tr>
              <th className="px-lg py-md font-label-md text-label-md text-on-surface-variant uppercase">
                Student Name
              </th>
              <th className="px-lg py-md font-label-md text-label-md text-on-surface-variant uppercase">
                NIM
              </th>
              <th className="px-lg py-md font-label-md text-label-md text-on-surface-variant uppercase text-right">
                Amount
              </th>
              <th className="px-lg py-md font-label-md text-label-md text-on-surface-variant uppercase">
                Method
              </th>
              <th className="px-lg py-md font-label-md text-label-md text-on-surface-variant uppercase">
                Status
              </th>
              <th className="px-lg py-md font-label-md text-label-md text-on-surface-variant uppercase text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {filteredTransactions.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-tertiary-fixed-dim/20 transition-colors group"
              >
                <td className="px-lg py-md font-body-md text-body-md">
                  {item.name}
                </td>
                <td className="px-lg py-md font-body-md text-body-md text-on-surface-variant">
                  {item.nim}
                </td>
                <td className="px-lg py-md font-body-md text-body-md text-right font-bold">
                  {item.amount}
                </td>
                <td className="px-lg py-md">
                  <div className="flex items-center gap-xs font-body-sm text-body-sm">
                    {renderMethodIcon(item.method)} {item.method}
                  </div>
                </td>
                <td className="px-lg py-md">
                  {renderStatusBadge(item.status)}
                </td>
                <td className="px-lg py-md text-center">
                  {item.status === "PENDING" ? (
                    <button
                      onClick={() => handleApprove(item.id)}
                      disabled={processingId === item.id}
                      className="bg-primary text-on-primary px-md py-1 rounded text-label-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-1 mx-auto cursor-pointer disabled:opacity-50"
                    >
                      {processingId === item.id ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin" />{" "}
                          Processing
                        </>
                      ) : (
                        "Approve"
                      )}
                    </button>
                  ) : item.status === "FAILED" ? (
                    <button className="text-on-surface-variant hover:text-primary transition-colors inline-flex items-center justify-center cursor-pointer">
                      <RefreshCw className="w-5 h-5" />
                    </button>
                  ) : (
                    <button className="text-on-surface-variant hover:text-primary transition-colors inline-flex items-center justify-center cursor-pointer">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-lg bg-surface-container-low border-t border-outline-variant flex items-center justify-between">
        <p className="font-label-sm text-label-sm text-on-surface-variant">
          Showing 1-{filteredTransactions.length} of 12,450 transactions
        </p>
        <div className="flex gap-xs">
          <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant hover:bg-white inline-flex items-center justify-center cursor-pointer">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-on-primary font-label-md">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant hover:bg-white font-label-md">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant hover:bg-white font-label-md">
            3
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant hover:bg-white inline-flex items-center justify-center cursor-pointer">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
