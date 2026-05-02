import { auth } from "@/auth"
import type { Metadata } from "next";
import { BG_COLOR_SURFACE, Greeting, GREETING_TEXTS, TEXT_COLOR_ON_SURFACE } from "../ui/constants";
import { DebugSection } from "../ui/admin/debug";

export const metadata: Metadata = {
  title: "Startseite",
};

export default async function Home() {
  const session = await auth()
  const username = session?.user?.username
  const tags = session?.user?.tags?.split(",") || []

  const greeting = getRandomGreeting(username, tags);

  return (
    <main className={`
      min-h-screen px-4 py-8
      flex flex-col justify-start items-center gap-4
      ${BG_COLOR_SURFACE} ${TEXT_COLOR_ON_SURFACE}
    `}>
      <h1 className="text-3xl font-bold mb-8">Startseite</h1>
      <div className={`text-center whitespace-pre-line ${greeting.className ?? "text-base"}`}>
        {greeting.string}
        <h2 className="text-xl font-semibold mb-4">Debug Section</h2>
        <DebugSection />
      </div>
    </main>
  );
}

function getRandomGreeting(username: string | undefined, tags: string[] | undefined): Greeting {
  if (GREETING_TEXTS.length === 0 || tags === undefined || tags === null || tags.length === 0) {
    return {
      string: "Willkommen!",
      allowedTags: [],
      probability: 100,
    };
  }

  let totalProbability = 0;
  const eligibleGreetings: Greeting[] = [];

  for (let i = 0; i < GREETING_TEXTS.length; i++) {
    const greeting = GREETING_TEXTS[i];
    
    const isAllowed = 
      greeting.allowedTags.length === 0 || 
      (greeting.allowedTags.some(tag => tags.includes(tag)));

    if (isAllowed) {
      eligibleGreetings.push(greeting);
      totalProbability += greeting.probability;
    }
  }

  if (eligibleGreetings.length === 0 || totalProbability === 0) {
    return {
      string: "Willkommen!",
      allowedTags: [],
      probability: 100,
    };
  }

  const randomValue = Math.random() * totalProbability;
  let cumulative = 0;

  for (let i = 0; i < eligibleGreetings.length; i++) {
    cumulative += eligibleGreetings[i].probability;
    if (randomValue < cumulative) {
      return {
        ...eligibleGreetings[i],
        string: eligibleGreetings[i].string.replace("%USERNAME%", username || "Gast"),
      };
    }
  }

  return {
    string: "Willkommen!",
    allowedTags: [],
    probability: 100,
  };
}