import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-black/40">Workspace configuration</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em]">
          Settings
        </h1>
      </div>

      <section className="rounded-[30px] bg-white p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef9db] text-[#4e8d17]">
            <Settings size={22} />
          </div>

          <div>
            <h2 className="font-semibold">General settings</h2>
            <p className="mt-1 text-sm text-black/40">
              Configure notifications and workspace preferences.
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <label className="flex items-center justify-between rounded-2xl bg-[#f2f2ef] p-4">
            <span className="text-sm font-medium">Email notifications</span>
            <input type="checkbox" />
          </label>

          <label className="flex items-center justify-between rounded-2xl bg-[#f2f2ef] p-4">
            <span className="text-sm font-medium">Booking reminders</span>
            <input type="checkbox" />
          </label>
        </div>
      </section>
    </div>
  );
}