import { auth } from "@/auth";
import { BG_CODE, TEXT_CODE } from "../constants";

export async function DebugSection() {
    const session = await auth()
    const user = session?.user;

    return (
        <div>
            <h3 className="text-lg mb-2">Raw Session Object</h3>
            <pre className={`p-2 rounded ${BG_CODE} ${TEXT_CODE} overflow-x-auto`}>
                {JSON.stringify(session, null, 2)}
            </pre>
        </div>
    );
}