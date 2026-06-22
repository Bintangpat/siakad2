# Struktur Proyek (Vite + React + TS + shadcn/ui)

## Asumsi dasar (jangan dibuat ulang)

File/folder berikut **dianggap sudah ada** di proyek user — JANGAN generate isinya, cukup asumsikan tersedia dan langsung di-import:

```
project-root/
├── components.json              # config shadcn (style, alias, dsb) — SUDAH ADA
├── tailwind.config.ts           # SUDAH ADA, sudah include preset shadcn
├── vite.config.ts               # SUDAH ADA, sudah ada alias "@" -> "src"
├── tsconfig.json                # SUDAH ADA, path alias "@/*": ["./src/*"]
└── src/
    ├── components/
    │   └── ui/                  # SEMUA primitive shadcn SUDAH ADA di sini:
    │                             #   button.tsx, breadcrumb.tsx, sidebar.tsx,
    │                             #   dropdown-menu.tsx, dialog.tsx, dst.
    │                             # -> JANGAN PERNAH menulis ulang isi file-file ini.
    ├── lib/
    │   └── utils.ts              # SUDAH ADA, isinya fungsi cn()
    ├── main.tsx                  # SUDAH ADA (entry point, render <App />)
    └── index.css                 # SUDAH ADA (sudah include @tailwind base/components/utilities)
```

## Yang DIBUAT oleh skill ini

Hasil konversi HTML diletakkan di:

```
src/
├── components/
│   └── <feature-or-section>/        # komponen hasil pemecahan HTML
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       ├── Breadcrumbs.tsx
│       ├── ProductCard.tsx
│       └── ...
├── App.tsx                          # merakit ulang seluruh komponen di atas
```

Aturan penamaan:
- Nama file komponen: **PascalCase**, mis. `UserMenu.tsx`, bukan `user-menu.tsx`.
- Satu file = satu default export komponen dengan nama yang sama dengan file (`export default function Header() {}` di `Header.tsx`).
- Sub-bagian kecil yang hanya dipakai oleh satu komponen induk dan tidak reusable boleh didefinisikan sebagai fungsi/komponen lokal di file yang sama (named export internal), tidak perlu dipecah jadi file sendiri.
- Kalau project punya banyak halaman (routing), komponen yang representasi satu halaman utuh diletakkan di `src/pages/<NamaHalaman>.tsx`, sedangkan potongan UI yang dipakai lintas halaman tetap di `src/components/`.

## Path alias

Selalu import lintas folder pakai alias `@/`, jangan relative path panjang:
```tsx
// BENAR
import { Button } from "@/components/ui/button"
import Header from "@/components/layout/Header"

// HINDARI
import { Button } from "../../../components/ui/button"
```

## Styling

- Tetap pakai Tailwind utility classes seperti di HTML asli.
- Untuk class yang sifatnya kondisional, gunakan `cn()` dari `@/lib/utils`.
- Jangan tambahkan file CSS module/SCSS baru — semua styling lewat Tailwind class & className komponen shadcn.
