# Pemetaan HTML → shadcn/ui

Tabel ini adalah sumber kebenaran untuk nama export dan path import setiap komponen shadcn/ui. Semua path diasumsikan diakses lewat alias `@/components/ui/...` (lihat `project-structure.md`). **Jangan mengarang nama komponen/export di luar daftar ini.** Jika sebuah kebutuhan tidak ada di tabel ini, gunakan elemen HTML biasa + Tailwind, jangan menebak nama komponen shadcn yang tidak pasti ada.

Setiap komponen shadcn TIDAK butuh dependency tambahan di luar yang sudah lazim (`lucide-react` untuk ikon, `class-variance-authority` untuk variants — keduanya dianggap sudah ada di project).

## Navigasi & Struktur Halaman

### Sidebar
Pola HTML: `<nav>`/`<aside>` di sisi kiri/kanan berisi menu navigasi, sering dengan grup menu dan submenu.
```tsx
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarTrigger,
  SidebarInset,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
```
Catatan: seluruh layout halaman yang punya sidebar harus dibungkus `<SidebarProvider>`, lalu `<Sidebar>` + `<SidebarInset>` (area konten) sebagai children-nya. `SidebarTrigger` adalah tombol hamburger untuk toggle sidebar di mobile.

### Breadcrumb
Pola HTML: `<nav aria-label="breadcrumb">` berisi `<ol>/<ul>` dengan link bertingkat dan separator (`/`, `>`, dst).
```tsx
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb"
```
`BreadcrumbPage` dipakai untuk item terakhir (halaman aktif, tidak bisa diklik). `BreadcrumbLink` untuk item yang bisa diklik.

### Navigation Menu (navbar dengan dropdown mega-menu)
```tsx
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
```

### Menubar (menu bar bergaya aplikasi desktop)
```tsx
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
} from "@/components/ui/menubar"
```

### Pagination
```tsx
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination"
```

### Tabs
```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
```

## Aksi & Form

### Button
Pola HTML: `<button>`, `<a>` yang berfungsi seperti tombol.
```tsx
import { Button } from "@/components/ui/button"
```
Props: `variant`: `"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"`. `size`: `"default" | "sm" | "lg" | "icon"`. Gunakan `asChild` jika ingin Button membungkus `<a>`/Link router, contoh: `<Button asChild><a href="/x">...</a></Button>`.

### Toggle & Toggle Group
Pola HTML: tombol on/off tunggal (mis. tombol bold/italic), atau grup tombol pilihan tunggal/banyak (mis. filter pilihan tampilan grid/list).
```tsx
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
```

### Switch
Pola HTML: `<input type="checkbox">` bergaya saklar on/off (settings toggle).
```tsx
import { Switch } from "@/components/ui/switch"
```

### Checkbox
Pola HTML: `<input type="checkbox">` biasa (centang).
```tsx
import { Checkbox } from "@/components/ui/checkbox"
```

### Radio Group
Pola HTML: `<input type="radio">` berkelompok.
```tsx
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
```

### Input, Label, Textarea
```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
```

### Select (dropdown native `<select>`)
```tsx
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from "@/components/ui/select"
```

### Dropdown Menu (menu kontekstual dari tombol/avatar, BUKAN form select)
Pola HTML: tombol "⋮" / avatar yang saat diklik memunculkan daftar aksi (Edit, Hapus, Logout, dst).
```tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
```

### Form (react-hook-form wrapper, hanya jika HTML aslinya form kompleks dengan validasi)
```tsx
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form"
```
Catatan: kalau HTML asli cuma form sederhana tanpa indikasi validasi, cukup pakai `Input`/`Label`/`Button` langsung tanpa wrapper `Form`.

### Slider
```tsx
import { Slider } from "@/components/ui/slider"
```

### Input OTP
```tsx
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp"
```

### Command (search palette / combobox)
```tsx
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
```

## Overlay & Feedback

### Dialog (modal standar)
```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
```

### Alert Dialog (modal konfirmasi destruktif, mis. "Hapus item?")
```tsx
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"
```

### Sheet (panel geser dari tepi layar, sering dipakai untuk sidebar mobile/filter)
```tsx
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet"
```

### Drawer (mirip Sheet tapi gaya bottom-sheet, umum di mobile)
```tsx
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer"
```

### Popover
```tsx
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
```

### Tooltip
```tsx
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
```
Catatan: bungkus root App dengan satu `<TooltipProvider>` jika ada lebih dari satu tooltip di halaman.

### Hover Card
```tsx
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"
```

### Context Menu (klik kanan)
```tsx
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/components/ui/context-menu"
```

### Toast / Notifikasi
```tsx
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
```
Catatan: render `<Toaster />` sekali saja di root `App.tsx`, lalu panggil `toast("pesan")` di mana pun butuh notifikasi.

### Alert (banner info/warning statis, BUKAN popup)
```tsx
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
```

### Progress
```tsx
import { Progress } from "@/components/ui/progress"
```

### Skeleton (loading placeholder)
```tsx
import { Skeleton } from "@/components/ui/skeleton"
```

## Konten & Tampilan Data

### Card
Pola HTML: `<div>` dengan border/shadow berisi judul, deskripsi, konten, dan area aksi (pola yang sangat umum di landing page/dashboard).
```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
```

### Table
```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table"
```

### Accordion
```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
```

### Collapsible (sama seperti accordion tapi single panel)
```tsx
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
```

### Avatar
```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
```

### Badge
Pola HTML: label kecil status/kategori (mis. "Baru", "Aktif", angka notifikasi).
```tsx
import { Badge } from "@/components/ui/badge"
```

### Separator
Pola HTML: `<hr>` atau garis pemisah div.
```tsx
import { Separator } from "@/components/ui/separator"
```

### Scroll Area
Pola HTML: container dengan `overflow: auto/scroll` custom scrollbar.
```tsx
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
```

### Aspect Ratio
Pola HTML: wrapper gambar/video dengan rasio tetap (mis. 16:9).
```tsx
import { AspectRatio } from "@/components/ui/aspect-ratio"
```

### Carousel
```tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
```

## Ikon

Semua ikon (panah, hamburger, close "x", chevron, dsb) gunakan `lucide-react`, bukan SVG inline manual dan bukan icon library lain:
```tsx
import { ChevronDown, Menu, X, ChevronRight } from "lucide-react"
```

## Utility wajib

```tsx
import { cn } from "@/lib/utils"
```
Pakai `cn()` untuk menggabungkan className kondisional, jangan template string manual untuk class yang punya kondisi (mis. `className={cn("base-class", isActive && "active-class")}`).
