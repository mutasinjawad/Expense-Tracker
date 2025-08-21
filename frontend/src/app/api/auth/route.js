import { parse } from "cookie";

export async function GET(req) {
    const cookies = req.headers.get("cookie");
    if (!cookies) {
        return Response.json({ message: "Unauthorized" }, { status: 401 });
    };

    const parsed = parse(cookies);
    const token = parsed.token;
    if (!token) {
        return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const isLoggedIn = await fetch(`${process.env.BACKEND_URL}/auth`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await isLoggedIn.json();
        console.log("User authentication status:", data);
        if (isLoggedIn.ok) {
            return Response.json(data, { status: 200 });
        } else {
            return Response.json({ message: "Unauthorized" }, { status: 401 });
        }
    } catch (err) {
        console.error("JWT verification failed:", err.message);
        return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
}
