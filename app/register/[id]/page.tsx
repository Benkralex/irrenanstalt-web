import type { Metadata } from "next";
import { BG_COLOR_SURFACE, TEXT_COLOR_ON_SURFACE } from "@/app/ui/constants";
import RegisterForm from "@/app/ui/register-form";

export const metadata: Metadata = {
  title: "Registrieren",
};

export default async function Register(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  return (
    <main className={`
      min-h-screen px-4 py-8
      flex flex-col justify-center items-center gap-4
      ${BG_COLOR_SURFACE} ${TEXT_COLOR_ON_SURFACE}
    `}>
      <h1 className="text-3xl font-bold mb-8">Registrieren</h1>
      <p>Registrieren mit ID: {id}</p>
      <RegisterForm idParam={id}/>
    </main>
  );
}