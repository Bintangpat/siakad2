import React from "react";

export const TypographySection: React.FC = () => {
  return (
    <div className="max-w-xl space-y-4">
      <h1 className="font-sans font-semibold text-3xl text-primary md:text-5xl lg:text-6xl tracking-tight">
        404 - Halaman Tidak Ditemukan
      </h1>
      <p className="font-sans text-lg text-on-surface-variant px-6">
        Sepertinya tautan yang Anda tuju sudah tidak ada atau telah dipindahkan
        ke alamat lain dalam sistem akademik.
      </p>
    </div>
  );
};
