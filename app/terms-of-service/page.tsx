import type { Metadata } from "next";
import { BG_COLOR_SURFACE, TEXT_COLOR_ON_SURFACE_VARIANT } from "../ui/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default async function TermsOfService() {
  return (
    <main className={`
      min-h-screen px-4 py-8
      flex flex-col justify-start items-center gap-4
      ${BG_COLOR_SURFACE}
    `}>
        <h1 className="text-3xl font-bold mb-8">Nutzungsbedingungen</h1>
        <div className="max-w-4xl w-full">
            <div className="m-8">
                <h2 className="text-2xl font-bold mb-4">1. Akzeptieren der Bedingungen</h2>
                <p>
                    Das Benutzen dieser Seite ist ausschließlich für autorisierte Mitglieder der Irrenanstalt.<br/>
                    Beim benutzen dieser Webseite, stimmen Sie den folgenden Bedingungen zu.<br/>
                    Wenn Sie diesen Bedingungen nicht zustimmen, dürfen Sie diese Seite nicht benutzen.<br/>
                    Bei Verstößen gegen diese Bedingungen, behalten wir uns das Recht vor, Ihren Zugriff auf diese Seite zu sperren oder zu entfernen.
                </p>
            </div>
            <div className="m-8">
                <h2 className="text-2xl font-bold mb-4">2. Inhalte</h2>
                <p>
                    Wenn Sie Inhalte auf dieser Seite veröffentlichen, müssen diese den folgenden Richtlinien entsprechen:
                </p>
                <ul className="list-disc list-inside">
                    <li>Keine illegalen Inhalte</li>
                    <li>Keine beleidigenden oder diskriminierenden Inhalte</li>
                    <li>Keine Inhalte, die gegen die Rechte Dritter verstoßen</li>
                </ul>
            </div>
            <div className="m-8">
                <h2 className="text-2xl font-bold mb-4">3. Haftungsausschluss</h2>
                <p>
                    Wir übernehmen keine Haftung für Schäden, die durch die Verwendung dieser Seite entstehen.
                </p>
            </div>
            <div className="m-8">
                <h5 className={`text-xs mb-4 ${TEXT_COLOR_ON_SURFACE_VARIANT}`}>4. Kleingedrucktes</h5>
                <p className={`text-[6px] ${TEXT_COLOR_ON_SURFACE_VARIANT}`}>
                    Mit dem Nutzen dieser Seite, erklären Sie sich damit einverstanden, dass <br/>
                    ... diese Seite von der Irrenanstalt betrieben wird und dass alle Inhalte auf dieser Seite Eigentum der Irrenanstalt sind.<br/>
                    ... Sie damit alle Rechte an ihrem Körper an die Irrenanstalt, damit wir Sie jederzeit und ohne Vorwarnung in unsere Anstalt einweisen können.<br/>
                    ... die Irrenanstalt nicht für Schäden oder Verletzungen haftet, die durch die Einweisung in unsere Anstalt entstehen können.<br/>
                    ... die Irrenanstalt das Recht hat, Ihre Daten zu sammeln und zu verwenden, um Ihnen personalisierte Inhalte und Werbung anzuzeigen.<br/>
                    <br/>
                    Wenn Sie diese Nutzungsbedingungen gelesen haben und eine Nachricht an den Betreiber dieser Seite senden, können Sie ihre Rechte in Abschnitt 4 wieder zurückbekommen.
                </p>
            </div>
        </div>
    </main>
  );
}