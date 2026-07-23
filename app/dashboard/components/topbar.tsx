"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  Search,
  Settings,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/calendar": "Calendar",
  "/dashboard/bookings": "Bookings",
  "/dashboard/players": "Players",
  "/dashboard/messages": "Messages",
  "/dashboard/profile": "Trainer profile",
  "/dashboard/settings": "Settings",
};

export default function Topbar() {
  const pathname = usePathname();

  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const title = pageTitles[pathname] ?? "Dashboard";

  function closeMenus() {
    setSearchOpen(false);
    setNotificationsOpen(false);
    setProfileOpen(false);
  }

  function toggleSearch() {
    setSearchOpen((current) => !current);
    setNotificationsOpen(false);
    setProfileOpen(false);
  }

  function toggleNotifications() {
    setNotificationsOpen((current) => !current);
    setSearchOpen(false);
    setProfileOpen(false);
  }

  function toggleProfile() {
    setProfileOpen((current) => !current);
    setSearchOpen(false);
    setNotificationsOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-[#f5f5f3]/90 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="relative flex min-h-10 items-center justify-between">
        {/* Breadcrumb */}
        <div className="hidden items-center gap-2 text-sm text-black/40 sm:flex">
          <Link
            href="/dashboard"
            className="transition hover:text-black"
          >
            Workspace
          </Link>

          <ChevronRight size={15} />

          <span className="font-medium text-black">
            {title}
          </span>
        </div>

        {/* Mobile title */}
        <p className="text-sm font-medium text-black sm:hidden">
          {title}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Open search"
            onClick={toggleSearch}
            className={`flex h-10 w-10 items-center justify-center rounded-full shadow-sm transition ${
              searchOpen
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-[#eeeeeb]"
            }`}
          >
            <Search size={18} />
          </button>

          <button
            type="button"
            aria-label="Open notifications"
            onClick={toggleNotifications}
            className={`relative flex h-10 w-10 items-center justify-center rounded-full shadow-sm transition ${
              notificationsOpen
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-[#eeeeeb]"
            }`}
          >
            <Bell size={18} />
          </button>

          <button
            type="button"
            aria-label="Open profile menu"
            onClick={toggleProfile}
            className="ml-1 flex items-center gap-3 rounded-full bg-white p-1.5 pr-3 shadow-sm transition hover:bg-[#eeeeeb] sm:pr-4"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1d1d1d] text-xs font-semibold text-white">
              JS
            </div>

            <span className="hidden text-sm font-medium sm:inline">
              Jonah
            </span>

            <ChevronDown
              size={14}
              className={`hidden transition-transform sm:block ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Search dropdown */}
        {searchOpen && (
          <div className="absolute right-0 top-14 z-50 w-full max-w-md rounded-[22px] border border-black/[0.08] bg-white p-3 shadow-xl">
            <div className="flex items-center gap-3 rounded-2xl bg-[#f2f2ef] px-4">
              <Search
                size={18}
                className="shrink-0 text-black/35"
              />

              <input
                autoFocus
                type="search"
                placeholder="Search players, sessions or messages..."
                className="h-12 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-black/30"
              />

              <button
                type="button"
                aria-label="Close search"
                onClick={() => setSearchOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-black/40 hover:bg-black/5 hover:text-black"
              >
                <X size={16} />
              </button>
            </div>

            <div className="px-2 pb-2 pt-4 text-center">
              <p className="text-sm font-medium">Search your workspace</p>

              <p className="mt-1 text-xs text-black/40">
                Search functionality will use your database later.
              </p>
            </div>
          </div>
        )}

        {/* Notifications dropdown */}
        {notificationsOpen && (
          <div className="absolute right-12 top-14 z-50 w-[320px] rounded-[22px] border border-black/[0.08] bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Notifications</p>

                <p className="mt-1 text-xs text-black/40">
                  Recent workspace activity
                </p>
              </div>

              <button
                type="button"
                aria-label="Close notifications"
                onClick={() => setNotificationsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f2f2ef] text-black/50 hover:text-black"
              >
                <X size={15} />
              </button>
            </div>

            <div className="mt-5 rounded-2xl bg-[#f2f2ef] px-5 py-8 text-center">
              <Bell
                size={22}
                className="mx-auto text-black/25"
              />

              <p className="mt-3 text-sm font-medium">
                No notifications
              </p>

              <p className="mt-1 text-xs leading-5 text-black/40">
                Booking requests, messages and updates will appear here.
              </p>
            </div>
          </div>
        )}

        {/* Profile dropdown */}
        {profileOpen && (
          <div className="absolute right-0 top-14 z-50 w-60 rounded-[22px] border border-black/[0.08] bg-white p-2 shadow-xl">
            <div className="border-b border-black/[0.06] px-3 py-3">
              <p className="text-sm font-semibold">Jonah</p>

              <p className="mt-1 text-xs text-black/40">
                Tennis Coach
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/dashboard/profile"
                onClick={closeMenus}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition hover:bg-[#f2f2ef]"
              >
                <UserRound size={17} />
                Trainer profile
              </Link>

              <Link
                href="/dashboard/settings"
                onClick={closeMenus}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition hover:bg-[#f2f2ef]"
              >
                <Settings size={17} />
                Settings
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}