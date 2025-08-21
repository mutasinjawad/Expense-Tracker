export async function POST(req) {
    try {
        const { firstName, lastName, email, password } = await req.json();

        if (!firstName || !email || !password) {
            return Response.json({ success: false, message: 'All fields are required' }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return Response.json({ success: false, message: 'Invalid email format' }, { status: 400 });
        }

        const passwordStrength = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&._-]{8,}$/;
        if (!passwordStrength.test(password)) {
            return Response.json({ success: false, message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number' }, { status: 400 });
        }

        const res = await fetch(`${process.env.BACKEND_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ firstName, lastName, email, password })
        });

        const data = await res.json();
        if (res.status === 201) {
            return Response.json({ success: true, message: data.message }, { status: res.status });
        } else {
            return Response.json({ success: false, message: data.message }, { status: res.status });
        }
        // return Response.json({ success: true, message: 'User added successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error occurred while adding user:', error);
        return Response.json({ success: false, message: 'Failed to add user' }, { status: 500 });
    }
}