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

export async function PATCH(req) {
    const token = await getToken(req);
    if (!token) {
        return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    console.log("Updating user data:", body);
    try {
        const res = await fetch(`${process.env.BACKEND_URL}/user`, {
            method: 'PATCH',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        const data = await res.json();
        if (data.status === 200) {
            return Response.json({ success: true, data }, { status: 200 });
        } else {
            return Response.json({ success: false, message: data.message }, { status: 400 });
        }
    } catch (error) {
        console.error("Error updating user data:", error);
        return Response.json({ message: "Internal Server Error" }, { status: 500 });
    }
}