"use client";

import Link from "next/link";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MoreHorizontal,
  Plus,
  Star,
  Trash2,
  TrendingUp,
  UserRound,
  WalletCards,
  X,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

type ModalType = "session" | "player" | "payment" | null;

type Session = {
  id: number;
  player: string;
  date: string;
  time: string;
  duration: string;
};

type Player = {
  id: number;
  name: string;
};

type Payment = {
  id: number;
  amount: number;
  description: string;
};

const weeks = [
  "20–26 July",
  "27 July–2 August",
  "3–9 August",
  "10–16 August",
];

const weekDays = [
  { day: "Mon", date: "20" },
  { day: "Tue", date: "21" },
  { day: "Wed", date: "22" },
  { day: "Thu", date: "23" },
  { day: "Fri", date: "24" },
  { day: "Sat", date: "25" },
  { day: "Sun", date: "26" },
];

export default function DashboardPage() {
  const [weekIndex, setWeekIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState("23");
  const [modal, setModal] = useState<ModalType>(null);
  const [toast, setToast] = useState<string | null>(null);

  const [sessions, setSessions] = useState<Session[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  const revenue = payments.reduce(
    (total, payment) => total + payment.amount,
    0,
  );

  function previousWeek() {
    setWeekIndex((current) =>
      current === 0 ? weeks.length - 1 : current - 1,
    );
  }

  function nextWeek() {
    setWeekIndex((current) =>
      current === weeks.length - 1 ? 0 : current + 1,
    );
  }

  function showToast(message: string) {
    setToast(message);

    window.setTimeout(() => {
      setToast(null);
    }, 2800);
  }

  function addSession(session: Omit<Session, "id">) {
    setSessions((current) => [
      ...current,
      {
        ...session,
        id: Date.now(),
      },
    ]);

    setModal(null);
    showToast("Session created");
  }

  function addPlayer(name: string) {
    setPlayers((current) => [
      ...current,
      {
        id: Date.now(),
        name,
      },
    ]);

    setModal(null);
    showToast("Player added");
  }

  function addPayment(amount: number, description: string) {
    setPayments((current) => [
      ...current,
      {
        id: Date.now(),
        amount,
        description,
      },
    ]);

    setModal(null);
    showToast("Payment saved");
  }

  function deleteSession(id: number) {
    setSessions((current) =>
      current.filter((session) => session.id !== id),
    );

    showToast("Session deleted");
  }

  return (
    <div className="w-full space-y-6">
      <section className="flex w-full flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-medium text-black/40">
            Trainer dashboard
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            Welcome back, Jonah
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-black/45">
            Manage your players, sessions and coaching performance from one
            workspace.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="flex items-center rounded-full border border-black/10 bg-white shadow-sm">
            <button
              type="button"
              onClick={previousWeek}
              className="flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-[#f2f2ef]"
            >
              <ChevronLeft size={17} />
            </button>

            <Link
              href="/dashboard/calendar"
              className="flex items-center gap-2 px-3 text-sm font-medium"
            >
              <CalendarDays size={17} />
              {weeks[weekIndex]}
            </Link>

            <button
              type="button"
              onClick={nextWeek}
              className="flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-[#f2f2ef]"
            >
              <ChevronRight size={17} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setModal("session")}
            className="flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5"
          >
            <Plus size={17} />
            New session
          </button>
        </div>
      </section>

      <section className="grid w-full gap-5 xl:grid-cols-[1.1fr_1fr_0.8fr]">
        <OverviewCard
          sessions={sessions.length}
          players={players.length}
          revenue={revenue}
        />

        <WeeklyProgress sessions={sessions.length} />

        <RatingCard />
      </section>

      <section className="grid w-full gap-5 xl:grid-cols-[1.55fr_0.85fr]">
        <UpcomingSessions
          sessions={sessions}
          onAdd={() => setModal("session")}
          onDelete={deleteSession}
        />

        <div className="space-y-5">
          <WeeklyCalendar
            week={weeks[weekIndex]}
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
          />

          <QuickActions
            onSession={() => setModal("session")}
            onPlayer={() => setModal("player")}
            onPayment={() => setModal("payment")}
          />
        </div>
      </section>

      {modal === "session" && (
        <SessionModal
          onClose={() => setModal(null)}
          onSubmit={addSession}
        />
      )}

      {modal === "player" && (
        <PlayerModal
          onClose={() => setModal(null)}
          onSubmit={addPlayer}
        />
      )}

      {modal === "payment" && (
        <PaymentModal
          onClose={() => setModal(null)}
          onSubmit={addPayment}
        />
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 z-[100] rounded-2xl bg-[#171717] px-5 py-4 text-sm font-medium text-white shadow-2xl">
          {toast}
        </div>
      )}
    </div>
  );
}

function OverviewCard({
  sessions,
  players,
  revenue,
}: {
  sessions: number;
  players: number;
  revenue: number;
}) {
  const statistics = [
    {
      title: "Sessions this month",
      value: sessions.toString(),
      change: sessions === 0 ? "0%" : `+${sessions}`,
    },
    {
      title: "Active players",
      value: players.toString(),
      change: players === 0 ? "0" : `+${players}`,
    },
    {
      title: "Monthly revenue",
      value: `€${revenue.toFixed(0)}`,
      change: revenue === 0 ? "0%" : `+€${revenue.toFixed(0)}`,
    },
  ];

  return (
    <article className="min-w-0 rounded-[28px] bg-[#1c1c1c] p-6 text-white shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-white/45">Overall information</p>
          <h2 className="mt-2 text-xl font-semibold">
            Coaching performance
          </h2>
        </div>

        <button
          type="button"
          aria-label="More options"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="mt-8 flex items-end gap-3">
        <p className="text-5xl font-semibold tracking-[-0.05em]">
          {sessions}
        </p>

        <p className="mb-1 max-w-28 text-xs leading-4 text-white/40">
          sessions completed
        </p>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {statistics.map((stat) => (
          <div
            key={stat.title}
            className="rounded-[22px] bg-white p-4 text-black"
          >
            <p className="min-h-8 text-xs leading-4 text-black/40">
              {stat.title}
            </p>

            <p className="mt-4 text-xl font-semibold tracking-tight">
              {stat.value}
            </p>

            <p className="mt-2 text-[11px] font-medium text-black/35">
              {stat.change}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}

function WeeklyProgress({ sessions }: { sessions: number }) {
  const values = [
    Math.min(sessions * 12, 85),
    Math.min(sessions * 8, 65),
    Math.min(sessions * 16, 95),
    Math.min(sessions * 6, 55),
    Math.min(sessions * 10, 75),
    Math.min(sessions * 4, 45),
    Math.min(sessions * 7, 60),
  ];

  return (
    <article className="min-w-0 rounded-[28px] border border-black/[0.06] bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-black/40">Weekly progress</p>
          <h2 className="mt-2 text-xl font-semibold">
            Session activity
          </h2>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef9db] text-[#4e8d17]">
          <TrendingUp size={18} />
        </div>
      </div>

      <div className="mt-8 flex h-40 items-end justify-between gap-3">
        {values.map((height, index) => (
          <div
            key={index}
            className="flex h-full flex-1 items-end rounded-full bg-[#f2f2ef]"
          >
            <div
              className="w-full rounded-full bg-[#c7ff4a] transition-all duration-500"
              style={{
                height: height === 0 ? "3px" : `${height}%`,
              }}
            />
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-7 text-center text-[11px] text-black/35">
        {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
          <span key={`${day}-${index}`}>{day}</span>
        ))}
      </div>
    </article>
  );
}

function RatingCard() {
  return (
    <article className="min-w-0 rounded-[28px] border border-black/[0.06] bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-black/40">Player satisfaction</p>
          <h2 className="mt-2 text-xl font-semibold">
            Average rating
          </h2>
        </div>

        <Star size={20} />
      </div>

      <div className="mt-8 flex items-end gap-2">
        <p className="text-5xl font-semibold tracking-[-0.05em]">0.0</p>
        <p className="mb-1 text-sm text-black/35">/ 5.0</p>
      </div>

      <div className="mt-6 flex gap-1 text-black/15">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={18}
            fill="currentColor"
            strokeWidth={0}
          />
        ))}
      </div>

      <p className="mt-4 text-sm leading-6 text-black/40">
        No verified player reviews yet.
      </p>

      <Link
        href="/dashboard/profile"
        className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#f1f1ee] px-4 py-3 text-sm font-medium transition hover:bg-[#e8e8e4]"
      >
        Open profile
        <ChevronRight size={16} />
      </Link>
    </article>
  );
}

function UpcomingSessions({
  sessions,
  onAdd,
  onDelete,
}: {
  sessions: Session[];
  onAdd: () => void;
  onDelete: (id: number) => void;
}) {
  return (
    <article className="min-w-0 overflow-hidden rounded-[28px] border border-black/[0.06] bg-white shadow-sm">
      <div className="flex items-center justify-between gap-4 px-6 py-5">
        <div>
          <p className="text-sm text-black/40">Schedule</p>
          <h2 className="mt-1 text-xl font-semibold">
            Upcoming sessions
          </h2>
        </div>

        <Link
          href="/dashboard/bookings"
          className="shrink-0 rounded-full bg-[#f2f2ef] px-4 py-2 text-sm font-medium transition hover:bg-[#e8e8e4]"
        >
          View all
        </Link>
      </div>

      {sessions.length === 0 ? (
        <div className="flex min-h-[360px] flex-col items-center justify-center border-t border-black/[0.06] px-6 py-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-[#eef9db] text-[#4e8d17]">
            <CalendarDays size={26} />
          </div>

          <h3 className="mt-5 text-lg font-semibold">
            No sessions scheduled
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-black/40">
            Your confirmed and pending coaching sessions will appear here.
          </p>

          <button
            type="button"
            onClick={onAdd}
            className="mt-6 flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white"
          >
            <Plus size={17} />
            Add first session
          </button>
        </div>
      ) : (
        <div className="space-y-3 border-t border-black/[0.06] p-5">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex flex-col gap-4 rounded-[22px] bg-[#f2f2ef] p-4 sm:flex-row sm:items-center"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white">
                <Clock3 size={20} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-semibold">{session.player}</p>

                <p className="mt-1 text-sm text-black/40">
                  {session.date} · {session.time} · {session.duration}
                </p>
              </div>

              <button
                type="button"
                aria-label="Delete session"
                onClick={() => onDelete(session.id)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black/40 transition hover:text-red-500"
              >
                <Trash2 size={17} />
              </button>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

function WeeklyCalendar({
  week,
  selectedDay,
  onSelectDay,
}: {
  week: string;
  selectedDay: string;
  onSelectDay: (day: string) => void;
}) {
  return (
    <article className="rounded-[28px] bg-[#1c1c1c] p-6 text-white shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-white/40">Weekly calendar</p>
          <h2 className="mt-1 text-xl font-semibold">{week}</h2>
        </div>

        <CalendarDays size={20} className="text-white/60" />
      </div>

      <div className="mt-6 grid grid-cols-7 gap-2">
        {weekDays.map((item) => {
          const active = item.date === selectedDay;

          return (
            <button
              key={`${item.day}-${item.date}`}
              type="button"
              onClick={() => onSelectDay(item.date)}
              className={`rounded-2xl px-1 py-3 text-center transition ${
                active
                  ? "bg-[#c7ff4a] text-black"
                  : "bg-white/[0.06] text-white hover:bg-white/[0.12]"
              }`}
            >
              <p className="text-[10px] opacity-50">{item.day}</p>
              <p className="mt-1 text-sm font-semibold">{item.date}</p>
            </button>
          );
        })}
      </div>

      <div className="mt-6 rounded-[22px] bg-white/[0.07] p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white/40">
            <Clock3 size={18} />
          </div>

          <div>
            <p className="text-xs text-white/40">
              Selected day · {selectedDay}
            </p>
            <p className="mt-1 text-sm font-medium">
              No session selected
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function QuickActions({
  onSession,
  onPlayer,
  onPayment,
}: {
  onSession: () => void;
  onPlayer: () => void;
  onPayment: () => void;
}) {
  const actions = [
    {
      label: "Add session",
      icon: Plus,
      action: onSession,
    },
    {
      label: "Add player",
      icon: UserRound,
      action: onPlayer,
    },
    {
      label: "Manage payments",
      icon: WalletCards,
      action: onPayment,
    },
  ];

  return (
    <article className="rounded-[28px] border border-black/[0.06] bg-white p-6 shadow-sm">
      <p className="text-sm text-black/40">Shortcuts</p>
      <h2 className="mt-1 text-xl font-semibold">Quick actions</h2>

      <div className="mt-5 space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.label}
              type="button"
              onClick={action.action}
              className="flex w-full items-center gap-4 rounded-[20px] bg-[#f2f2ef] p-4 text-left transition hover:-translate-y-0.5 hover:bg-[#ebebe7]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white">
                <Icon size={18} />
              </div>

              <span className="text-sm font-medium">
                {action.label}
              </span>

              <ChevronRight
                size={17}
                className="ml-auto text-black/30"
              />
            </button>
          );
        })}
      </div>
    </article>
  );
}

function ModalShell({
  title,
  description,
  children,
  onClose,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm">
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0"
      />

      <div className="relative z-10 w-full max-w-lg rounded-[30px] bg-white p-6 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-sm text-black/40">Tennisly workspace</p>
            <h2 className="mt-1 text-2xl font-semibold">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-black/40">
              {description}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f2f2ef]"
          >
            <X size={18} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

function SessionModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (session: Omit<Session, "id">) => void;
}) {
  const [player, setPlayer] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("60 minutes");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSubmit({
      player,
      date,
      time,
      duration,
    });
  }

  return (
    <ModalShell
      title="Add session"
      description="Schedule a new coaching session."
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="mt-7 space-y-4">
        <Field label="Player">
          <input
            required
            value={player}
            onChange={(event) => setPlayer(event.target.value)}
            placeholder="Player name"
            className="input-style"
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Date">
            <input
              required
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="input-style"
            />
          </Field>

          <Field label="Time">
            <input
              required
              type="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
              className="input-style"
            />
          </Field>
        </div>

        <Field label="Duration">
          <select
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
            className="input-style"
          >
            <option>30 minutes</option>
            <option>45 minutes</option>
            <option>60 minutes</option>
            <option>90 minutes</option>
            <option>120 minutes</option>
          </select>
        </Field>

        <ModalButtons onClose={onClose} submitLabel="Create session" />
      </form>
    </ModalShell>
  );
}

function PlayerModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (name: string) => void;
}) {
  const [name, setName] = useState("");

  return (
    <ModalShell
      title="Add player"
      description="Create a new player entry."
      onClose={onClose}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(name);
        }}
        className="mt-7 space-y-4"
      >
        <Field label="Full name">
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Player name"
            className="input-style"
          />
        </Field>

        <ModalButtons onClose={onClose} submitLabel="Add player" />
      </form>
    </ModalShell>
  );
}

function PaymentModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (amount: number, description: string) => void;
}) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  return (
    <ModalShell
      title="Add payment"
      description="Create a manual payment entry."
      onClose={onClose}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(Number(amount), description);
        }}
        className="mt-7 space-y-4"
      >
        <Field label="Amount">
          <input
            required
            min="0"
            step="0.01"
            type="number"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="0.00"
            className="input-style"
          />
        </Field>

        <Field label="Description">
          <input
            required
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Private session"
            className="input-style"
          />
        </Field>

        <ModalButtons onClose={onClose} submitLabel="Save payment" />
      </form>
    </ModalShell>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function ModalButtons({
  onClose,
  submitLabel,
}: {
  onClose: () => void;
  submitLabel: string;
}) {
  return (
    <div className="flex justify-end gap-3 pt-3">
      <button
        type="button"
        onClick={onClose}
        className="rounded-full bg-[#f2f2ef] px-5 py-3 text-sm font-medium"
      >
        Cancel
      </button>

      <button
        type="submit"
        className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white"
      >
        {submitLabel}
      </button>
    </div>
  );
}