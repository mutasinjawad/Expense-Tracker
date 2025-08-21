import { serialize } from "cookie";

export async function POST(req) {
    const { email, password } = await req.json();

    if (!email || !password) {
        return Response.json({ success: false, message: 'Email and password are required' }, { status: 400 });
    }

    const res = await fetch(`${process.env.BACKEND_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });
    
    const data = await res.json();
    if (res.status === 200) {
        const token = data.token;
        const cookie = serialize("token", token, { secure: process.env.NODE_ENV === "production", path: "/", maxAge: 15 * 60, httpOnly: true });
        return Response.json({ success: true, message: "Sign In successful" }, { status: res.status, headers: { "Set-Cookie": cookie } });
    } else {
        return Response.json({ success: false, message: data.message }, { status: res.status });
    }
}