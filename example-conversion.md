# Contoh Konversi (Before / After)

## Input: HTML biasa

```html
<header class="flex items-center justify-between border-b px-6 py-3">
  <div class="font-bold text-lg">Acme Inc</div>
  <nav class="flex items-center gap-4">
    <ol class="flex items-center gap-2 text-sm text-gray-500">
      <li><a href="/">Home</a></li>
      <li>/</li>
      <li><a href="/projects">Projects</a></li>
      <li>/</li>
      <li class="text-gray-900">Settings</li>
    </ol>
  </nav>
  <div class="relative">
    <button class="flex items-center gap-2 rounded-md border px-3 py-1.5">
      <img src="/avatar.png" class="h-6 w-6 rounded-full" />
      Budi
      <span>▾</span>
    </button>
    <!-- dropdown muncul saat tombol diklik: Profile, Settings, Logout -->
  </div>
</header>
```

## Output: dipecah menjadi 3 komponen + 1 file rakitan

### `src/components/layout/Breadcrumbs.tsx`
```tsx
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface BreadcrumbsProps {
  items: { label: string; href?: string }[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <span key={item.label} className="flex items-center gap-2">
            <BreadcrumbItem>
              {item.href ? (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < items.length - 1 && <BreadcrumbSeparator />}
          </span>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
```

### `src/components/layout/UserMenu.tsx`
```tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ChevronDown } from "lucide-react"

interface UserMenuProps {
  name: string
  avatarUrl?: string
}

export default function UserMenu({ name, avatarUrl }: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          {name}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

### `src/components/layout/Header.tsx`
```tsx
import Breadcrumbs from "@/components/layout/Breadcrumbs"
import UserMenu from "@/components/layout/UserMenu"

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b px-6 py-3">
      <div className="text-lg font-bold">Acme Inc</div>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: "Settings" },
        ]}
      />
      <UserMenu name="Budi" avatarUrl="/avatar.png" />
    </header>
  )
}
```

### `src/App.tsx`
```tsx
import Header from "@/components/layout/Header"

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
    </div>
  )
}
```

## Poin penting dari contoh di atas

1. `<button>` dropdown profil → `Button` (di dalam `DropdownMenuTrigger asChild`), bukan `<button>` mentah.
2. `▾` ikon teks diganti `ChevronDown` dari `lucide-react`, bukan karakter unicode/SVG manual.
3. `<img class="rounded-full">` avatar → `Avatar`/`AvatarImage`/`AvatarFallback`, bukan `<img>` polos.
4. Breadcrumb `<ol>` manual → komponen `Breadcrumb*` dari shadcn, dengan data di-pass via props (`items`) supaya `Breadcrumbs` reusable di halaman lain.
5. Setiap komponen punya satu tanggung jawab (`Breadcrumbs` hanya urusan breadcrumb, `UserMenu` hanya urusan menu user), dirakit ulang di `Header`, lalu `Header` dipasang di `App`.
6. Tidak ada satu pun source code internal `button.tsx`/`dropdown-menu.tsx`/`avatar.tsx`/`breadcrumb.tsx` yang ditulis ulang — semuanya hanya di-import dari `@/components/ui/...`.
