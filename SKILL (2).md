---
name: html-to-shadcn-tsx
description: Mengubah HTML statis/biasa menjadi proyek Vite + React + TypeScript (TSX) yang dipecah menjadi komponen-komponen terpisah menggunakan shadcn/ui. Gunakan skill ini setiap kali user menempelkan kode HTML mentah dan minta diubah ke React/TSX, minta "pecah jadi komponen", menyebut Vite, shadcn, atau elemen UI seperti sidebar, breadcrumb, navbar, dropdown, toggle, modal/dialog, tabs, card, dsb. SELALU anggap seluruh komponen shadcn/ui (di src/components/ui/*) SUDAH terinstall — jangan pernah menulis ulang source code primitive shadcn, cukup import dan pakai (compose) saja.
---

# HTML to Vite + shadcn/ui (TSX)

Skill ini mengubah HTML statis (atau JSX/HTML hasil export desain) menjadi struktur proyek React + TypeScript berbasis Vite, dengan setiap bagian UI dipecah menjadi komponen `.tsx` terpisah, dan setiap elemen interaktif (button, dropdown, sidebar, breadcrumb, toggle, dst) diganti dengan komponen shadcn/ui yang sesuai.

## Prinsip Utama (wajib dipatuhi)

1. **shadcn/ui dianggap sudah terinstall.** Folder `src/components/ui/` (button.tsx, dropdown-menu.tsx, sidebar.tsx, dst) dan `src/lib/utils.ts` (fungsi `cn()`) dianggap sudah ada di proyek. Output yang dibuat **hanya melakukan `import`** dari folder tersebut — JANGAN PERNAH menuliskan ulang source code internal primitive shadcn (tidak perlu generate isi button.tsx, dialog.tsx, dll).
2. **Jangan reinvent the wheel.** Kalau ada elemen HTML yang punya padanan shadcn (lihat `references/component-mapping.md`), selalu pakai komponen shadcn tersebut, bukan tag HTML polos (`<button>`, `<select>`, dst) dan bukan juga membuat komponen custom dari nol.
3. **Pecah per tanggung jawab (componentization).** Satu file = satu unit UI yang punya identitas jelas (Sidebar, Header, Breadcrumbs, ProductCard, dst). Lihat aturan di bagian "Aturan Pemecahan Komponen".
4. **Hanya ubah struktur & teknologi, jangan ubah maksud desain.** Tata letak, teks, dan struktur visual asli HTML harus tetap dipertahankan — yang berubah adalah implementasinya (HTML+CSS biasa → TSX + shadcn + Tailwind).
5. **TypeScript yang valid.** Semua file harus valid `.tsx`, props diberi tipe eksplisit (interface/type), tidak ada `any` kecuali benar-benar tidak terhindarkan.

## Alur Kerja

### 1. Analisis HTML sumber
Baca HTML yang diberikan user, lalu identifikasi:
- Area-area struktural utama: header/navbar, sidebar, breadcrumb, main content, footer, modal/dialog tersembunyi, dsb.
- Elemen interaktif: tombol, dropdown, toggle/switch, tabs, accordion, form input, dsb.
- Bagian yang berulang (list item, card grid, table row) → ini kandidat kuat untuk jadi komponen sendiri dengan props.

### 2. Pemetaan ke shadcn/ui
Untuk setiap elemen interaktif/struktural, cocokkan dengan tabel di `references/component-mapping.md` (baca file ini sebelum menulis kode — jangan menebak nama export atau path import).

Aturan penamaan import: semua dari alias `@/components/ui/<nama-file-kebab-case>`, contoh:
```tsx
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { cn } from "@/lib/utils"
```

Jika sebuah elemen HTML TIDAK punya padanan shadcn (misalnya teks paragraf biasa, gambar, heading polos), biarkan sebagai elemen HTML biasa dengan className Tailwind — tidak semua tag harus dipaksa jadi komponen shadcn.

### 3. Rancang struktur folder & komponen
Ikuti konvensi di `references/project-structure.md`. Tentukan:
- Komponen apa saja yang akan dibuat (mis. `Sidebar.tsx`, `Header.tsx`, `Breadcrumbs.tsx`, `ProductCard.tsx`).
- Komponen mana yang reusable (terima props) vs yang khusus satu halaman.
- Bagaimana komponen-komponen ini dirakit kembali di `App.tsx` (atau di file page jika ada multi-halaman).

### 4. Tulis kode TSX
Untuk setiap komponen:
- Import React hanya jika dibutuhkan (Vite + React 17+ JSX runtime baru tidak wajib `import React from "react"`, kecuali project lama).
- Import primitive shadcn yang relevan dari `@/components/ui/...`.
- Import icon dari `lucide-react` jika HTML asli pakai ikon (shadcn secara default pakai lucide-react).
- Definisikan `interface <Nama>Props` jika komponen menerima props.
- Pindahkan class Tailwind dari HTML asli, sesuaikan jika sudah digantikan oleh styling bawaan komponen shadcn (jangan duplikasi styling yang sudah built-in, misalnya jangan tambah `rounded-md border` manual di atas `<Button variant="outline">` yang sudah punya style itu).

### 5. Rakit ulang di App.tsx
Import seluruh komponen hasil pemecahan dan susun sesuai struktur asli. Untuk layout dengan sidebar, bungkus dengan `SidebarProvider` (lihat mapping reference).

### 6. Review checklist sebelum selesai
- [ ] Tidak ada tag `<button>`, `<select>`, `<input type="checkbox">` dsb mentah yang seharusnya jadi komponen shadcn (kecuali memang tidak ada padanannya).
- [ ] Tidak ada kode source internal shadcn yang ditulis ulang (semua `components/ui/*` hanya diimport, tidak dibuat isinya).
- [ ] Tidak ada import dari path yang tidak ada di `references/component-mapping.md` (jangan mengarang nama komponen/export shadcn).
- [ ] Setiap file komponen punya satu tanggung jawab jelas dan diekspor sebagai default export (kecuali named export memang lebih cocok, mis. banyak sub-komponen kecil).
- [ ] Semua props bertipe, tidak ada `any` yang tidak perlu.
- [ ] Hasil akhir mempertahankan struktur visual & teks dari HTML asli.

## Aturan Pemecahan Komponen

Jadikan komponen terpisah untuk:
- **Bagian struktural berulang di banyak halaman**: Sidebar, Header/Navbar, Footer, Breadcrumbs.
- **Pola yang berulang dalam satu halaman**: item dalam list/grid (mis. `ProductCard`, `UserRow`, `NavItem`) — buat satu komponen yang menerima data via props, lalu di-`.map()`.
- **Blok UI mandiri dengan state sendiri**: dropdown menu user profile, modal/dialog, form pencarian.

JANGAN memecah sampai terlalu granular (misalnya jangan membuat komponen terpisah hanya untuk satu `<span>` teks). Aturan praktis: kalau sebuah blok tidak punya identitas/struktur berulang dan tidak butuh props sendiri, biarkan inline di komponen induknya.

## Referensi

Baca file berikut sesuai kebutuhan saat mengerjakan task:
- `references/component-mapping.md` — tabel pemetaan elemen/pola HTML → komponen shadcn/ui beserta named export dan path import yang BENAR. **Wajib dibaca sebelum menulis import shadcn apa pun**, supaya tidak salah nama export atau path.
- `references/project-structure.md` — konvensi struktur folder Vite, path alias `@/`, dan asumsi file apa saja yang sudah ada di proyek (jangan dibuat ulang).
- `references/example-conversion.md` — contoh lengkap before/after: potongan HTML diubah menjadi beberapa file TSX, untuk dipakai sebagai pola/gaya output.

## Format Output ke User

- Tampilkan struktur folder hasil pemecahan (tree singkat) di awal jawaban supaya user paham pembagian komponennya.
- Buat file-file `.tsx` sungguhan (gunakan tool pembuatan file), bukan hanya menempel kode di chat, kecuali user secara eksplisit hanya minta cuplikan kode singkat.
- Singkat saja narasinya — fokus ke kode. Jelaskan keputusan pemetaan komponen hanya jika ada hal yang ambigu/perlu dikonfirmasi user.
