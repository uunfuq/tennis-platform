import { Plus, UsersRound } from "lucide-react";

export default function PlayersPage() {
  return (
    <div className="space-y-6">
      <section className="flex items-end justify-between">
        <div>
          <p className="text-sm text-black/40">Player management</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em]">
            Players
          </h1>
        </div>

        <button className="flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white">
          <Plus size={17} />
          Add player
        </button>
      </section>

      <section className="flex min-h-[600px] flex-col items-center justify-center rounded-[30px] bg-white p-10 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-[26px] bg-[#eef9db] text-[#4e8d17]">
          <UsersRound size={30} />
        </div>

        <h2 className="mt-6 text-xl font-semibold">No players yet</h2>

        <p className="mt-2 text-sm text-black/40">
          Your active coaching clients will appear here.
        </p>
      </section>
    </div>
  );
}