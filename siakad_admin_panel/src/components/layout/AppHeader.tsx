import { Search, Bell, HelpCircle, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export default function AppHeader() {
  return (
    <header className="w-full h-16 sticky top-0 z-40 bg-surface border-b border-outline-variant">
      <div className="flex ju stify-between items-center px-lg h-full max-w-container-max mx-auto">
        {/* Search Bar Wrapper */}
        <div className="flex items-center gap-md bg-surface-container-low px-md py-xs rounded-full border border-outline-variant w-96 group focus-within:border-primary focus-within:shadow-sm transition-all">
          <Search className="h-4 w-4 text-on-surface-variant" />
          <Input
            className="bg-transparent border-none focus-visible:ring-0 h-auto p-0 font-body-sm text-body-sm placeholder:text-on-surface-variant/60"
            placeholder="Search administrative records..."
            type="text"
          />
        </div>

        {/* Action Buttons & Profile */}
        <div className="flex items-center gap-md">
          <Button
            variant="ghost"
            size="icon"
            className="text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors"
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors"
          >
            <Settings className="h-5 w-5" />
          </Button>

          <div className="h-8 w-px bg-outline-variant mx-xs"></div>

          <div className="flex items-center gap-sm cursor-pointer hover:bg-surface-container-low p-xs pr-sm rounded-full transition-colors">
            <Avatar className="w-8 h-8 border border-primary">
              <AvatarImage
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqPkEuMyAyN4t96gpm7hHuPoqBv0c84UAZNRUgF6NZpkhPI3irJXdG28u5Obn6sVSpX5TMExAgJfjSx4ZE4R8kuXO2OGvxPG57uHYi9PHu1tZ4dLoGuNLxDn2BQ-ZvMzkHfKDU8H09GZVEeQo2mOeSmB3yDAC29BWdiD_6fbZJFW9OBrlVlpAVLRqV01kag3atCGdVDc0GheBnWnmXW_-rzcW_Dzdcirm5DSVPb_Ya9xoPEoYFgIw5w0vtY8N2fzFzcEpK-mFIuTY"
                alt="Admin Portrait"
                className="object-cover"
              />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <span className="font-label-lg text-label-lg text-primary">
              Admin
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
