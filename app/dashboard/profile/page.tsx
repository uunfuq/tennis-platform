import { UserRound } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-black/40">Public coach information</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em]">
          Trainer profile
        </h1>
      </div>

      <section className="rounded-[30px] bg-white p-6 sm:p-8">
        <div className="flex items-center gap-5 border-b border-black/[0.06] pb-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-[26px] bg-[#1c1c1c] text-white">
            <UserRound size={30} />
          </div>

          <div>
            <h2 className="text-xl font-semibold">Create your profile</h2>
            <p className="mt-2 text-sm text-black/40">
              Add your name, experience, licenses and locations.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <input
            placeholder="First name"
            className="h-12 rounded-2xl border border-black/10 bg-[#f7f7f5] px-4 outline-none"
          />

          <input
            placeholder="Last name"
            className="h-12 rounded-2xl border border-black/10 bg-[#f7f7f5] px-4 outline-none"
          />

          <input
            placeholder="Price per hour"
            className="h-12 rounded-2xl border border-black/10 bg-[#f7f7f5] px-4 outline-none"
          />

          <input
            placeholder="Training location"
            className="h-12 rounded-2xl border border-black/10 bg-[#f7f7f5] px-4 outline-none"
          />
        </div>

        <button className="mt-6 rounded-full bg-black px-5 py-3 text-sm font-medium text-white">
          Save profile
        </button>
      </section>
    </div>
  );
}