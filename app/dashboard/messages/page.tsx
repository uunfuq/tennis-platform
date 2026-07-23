import { MessageSquare } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-black/40">Communication</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em]">
          Messages
        </h1>
      </div>

      <section className="flex min-h-[600px] flex-col items-center justify-center rounded-[30px] bg-white p-10 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-[26px] bg-[#eef9db] text-[#4e8d17]">
          <MessageSquare size={30} />
        </div>

        <h2 className="mt-6 text-xl font-semibold">No conversations</h2>

        <p className="mt-2 text-sm text-black/40">
          Messages between you and your players will appear here.
        </p>
      </section>
    </div>
  );
}