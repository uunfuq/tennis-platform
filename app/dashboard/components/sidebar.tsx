"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  Clock3,
  LayoutDashboard,
  MessageSquare,
  Search,
  Settings,
  Star,
  UserRound,
  UsersRound,
} from "lucide-react";

const navigation = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Calendar",
    href: "/dashboard/calendar",
    icon: CalendarDays,
  },
  {
    label: "Bookings",
    href: "/dashboard/bookings",
    icon: Clock3,
  },
  {
    label: "Players",
    href: "/dashboard/players",
    icon: UsersRound,
  },
  {
    label: "Messages",
    href: "/dashboard/messages",
    icon: MessageSquare,
  },
];

const accountNavigation = [
  {
    label: "Trainer profile",
    href: "/dashboard/profile",
    icon: UserRound,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/dashboard") {
      return pathname === href;
    }

    return pathname.startsWith(href);
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden h-screen w-[270px] flex-col overflow-y-auto bg-[#151515] p-5 text-white lg:flex">
      <Link
        href="/dashboard"
        className="flex items-center gap-3 border-b border-white/10 pb-6"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#c7ff4a] font-black text-black">
          T
        </div>

        <div>
          <p className="font-semibold tracking-tight">Tennisly</p>
          <p className="text-xs text-white/40">Coach workspace</p>
        </div>
      </Link>

      <button
        type="button"
        className="mt-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-white/40"
      >
        <Search size={18} />
        <span className="text-sm">Search...</span>
      </button>

      <nav className="mt-7 space-y-2">
        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/30">
          Workspace
        </p>

        {navigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                active
                  ? "bg-[#303030] text-white shadow-inner shadow-white/5"
                  : "text-white/50 hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              <Icon size={18} strokeWidth={1.8} />
              <span>{item.label}</span>

              {active && (
                <span className="ml-auto h-2 w-2 rounded-full bg-[#c7ff4a]" />
              )}
            </Link>
          );
        })}
      </nav>

      <nav className="mt-7 border-t border-white/10 pt-6">
        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/30">
          Account
        </p>

        {accountNavigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                active
                  ? "bg-[#303030] text-white"
                  : "text-white/50 hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-7">
        <div className="rounded-[26px] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#c7ff4a] text-black">
            <Star size={20} fill="currentColor" />
          </div>

          <h3 className="mt-5 font-semibold">Complete your profile</h3>

          <p className="mt-2 text-sm leading-6 text-white/45">
            Add licenses, experience and training locations.
          </p>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-0 rounded-full bg-[#c7ff4a]" />
          </div>

          <div className="mt-2 flex justify-between text-xs text-white/40">
            <span>Profile progress</span>
            <span>0%</span>
          </div>

          <Link
            href="/dashboard/profile"
            className="mt-5 block w-full rounded-2xl bg-white px-4 py-3 text-center text-sm font-semibold text-black transition hover:bg-[#c7ff4a]"
          >
            Complete profile
          </Link>
        </div>
      </div>
    </aside>
  );
}