import { serialize } from "cookie";

export async function POST() {
    const cookie = serialize("token", "", { secure: process.env.NODE_ENV === "production", path: "/", maxAge: 0, httpOnly: true });
    return Response.json({ success: true, message: "Logged out successfully" }, { status: 200, headers: { "Set-Cookie": cookie } });
}