import { CalendarDays, Plus } from "lucide-react";

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <section className="flex items-end justify-between">
        <div>
          <p className="text-sm text-black/40">Schedule management</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em]">
            Calendar
          </h1>
        </div>

        <button className="flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white">
          <Plus size={17} />
          Add availability
        </button>
      </section>

      <section className="flex min-h-[600px] flex-col items-center justify-center rounded-[30px] border border-black/[0.06] bg-white p-10 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-[26px] bg-[#eef9db] text-[#4e8d17]">
          <CalendarDays size={30} />
        </div>

        <h2 className="mt-6 text-xl font-semibold">
          No availability created
        </h2>

        <p className="mt-2 max-w-md text-sm leading-6 text-black/40">
          Your weekly availability and booked sessions will appear here.
        </p>
      </section>
    </div>
  );
}