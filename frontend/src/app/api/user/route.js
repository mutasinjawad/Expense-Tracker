import { parse } from "cookie";

async function getToken(req) {
    const cookies = req.headers.get('cookie');
    const parsed = parse(cookies);
    return parsed.token;
}

export async function GET(req) {
    const token = await getToken(req);
    if (!token) {
        return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const res = await fetch(`${process.env.BACKEND_URL}/user`, {
            headers: {
                "Authorization": `Bearer ${token}`
            },
            cache: 'no-store'
        });
        const data = await res.json();
        if (data.status === 200) {
            return Response.json({ success: true, data }, { status: 200 });
        } else {
            return Response.json({ success: false, message: data.message }, { status: 400 });
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
}