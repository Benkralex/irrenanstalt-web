import { BG_COLOR_SURFACE, TEXT_COLOR_ON_SURFACE } from "@/app/ui/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
};

export default function Home() {
  return (
    <main className={`
      min-h-screen px-4 py-8
      flex flex-col justify-start items-center gap-4
      ${BG_COLOR_SURFACE} ${TEXT_COLOR_ON_SURFACE}
    `}>
      <h1 className="text-3xl font-bold mb-8">Events</h1>
    </main>
  );
}