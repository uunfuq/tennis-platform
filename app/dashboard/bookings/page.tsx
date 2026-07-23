import { Clock3, Plus } from "lucide-react";

export default function BookingsPage() {
  return (
    <div className="space-y-6">
      <section className="flex items-end justify-between">
        <div>
          <p className="text-sm text-black/40">Session administration</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em]">
            Bookings
          </h1>
        </div>

        <button className="flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white">
          <Plus size={17} />
          Create booking
        </button>
      </section>

      <section className="flex min-h-[600px] flex-col items-center justify-center rounded-[30px] bg-white p-10 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-[26px] bg-[#eef9db] text-[#4e8d17]">
          <Clock3 size={30} />
        </div>

        <h2 className="mt-6 text-xl font-semibold">No bookings yet</h2>

        <p className="mt-2 text-sm text-black/40">
          New booking requests will appear here.
        </p>
      </section>
    </div>
  );
}