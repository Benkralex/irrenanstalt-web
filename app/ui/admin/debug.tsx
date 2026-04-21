import { auth } from "@/auth";
import { BG_CODE, TEXT_CODE } from "../constants";

export async function DebugSection() {
    const session = await auth()
    const user = session?.user;

    return (
        <div>
            <h3 className="text-lg mb-2">User Session Information</h3>
            <p>
                Username: {JSON.stringify(user?.username)} <br />
                Email: {JSON.stringify(user?.email)} <br />
                Tags: {JSON.stringify(user?.tags)} <br />
            </p>
            <h3 className="text-lg mt-4 mb-2">Raw Session Object</h3>
            <pre className={`p-2 rounded ${BG_CODE} ${TEXT_CODE} overflow-x-auto`}>
                {JSON.stringify(session, null, 2)}
            </pre>
        </div>
    );
}