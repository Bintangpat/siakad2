import React, { useState } from "react";
import { X } from "lucide-react";

interface OverrideModalProps {
  isOpen: boolean;
  nim: string;
  onClose: () => void;
  onSave: (status: string, note: string) => void;
}

export const OverrideModal: React.FC<OverrideModalProps> = ({
  isOpen,
  nim,
  onClose,
  onSave,
}) => {
  const [status, setStatus] = useState("Hadir");
  const [note, setNote] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest max-w-md w-full rounded-xl shadow-2xl overflow-hidden border border-outline-variant animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-outline-variant flex justify-between items-center">
          <h5 className="font-headline-sm text-headline-sm text-primary">
            Override Status
          </h5>
          <button
            className="text-on-surface-variant hover:text-error cursor-pointer"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <p className="font-label-md text-label-md text-on-surface-variant uppercase mb-1">
              Student NIM
            </p>
            <p className="font-body-md text-body-md font-bold">{nim}</p>
          </div>
          <div>
            <p className="font-label-md text-label-md text-on-surface-variant uppercase mb-2">
              New Status
            </p>
            <div className="grid grid-cols-2 gap-2">
              {["Hadir", "Izin", "Sakit", "Alpa"].map((type) => (
                <label
                  key={type}
                  className={`flex items-center gap-2 p-4 border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container-low transition-colors ${
                    status === type
                      ? "border-primary bg-primary-fixed text-primary"
                      : ""
                  }`}
                >
                  <input
                    className="text-primary focus:ring-primary h-4 w-4"
                    name="status"
                    type="radio"
                    value={type}
                    checked={status === type}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  <span className="font-label-lg text-label-lg">{type}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className="font-label-md text-label-md text-on-surface-variant uppercase mb-2">
              Notes / Reference (Optional)
            </p>
            <textarea
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-4 font-body-sm outline-none focus:border-primary h-24 resize-none"
              placeholder="Enter reason for manual override..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>
        <div className="p-6 bg-surface-container-low flex justify-end gap-4">
          <button
            className="px-6 py-3 font-label-lg text-label-lg text-secondary border border-outline rounded-lg hover:bg-surface-container transition-colors cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-8 py-3 font-label-lg text-label-lg text-on-primary bg-primary rounded-lg shadow-md active:scale-95 transition-transform cursor-pointer"
            onClick={() => onSave(status, note)}
          >
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
};
