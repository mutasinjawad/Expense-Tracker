export async function GET() {
    const res = await fetch(`${process.env.BACKEND_URL}/expenses`);
    const data = await res.json();
    return Response.json(data);
}

export async function POST(req) {
    try {
        const body = await req.json();

        if (!body.title || !body.amount || !body.category || !body.date) {
            return Response.json({ success: false, message: 'All fields are required' }, { status: 400 });
        }
        if (body.title.length < 3) {
            return Response.json({ success: false, message: 'Title must be at least 3 characters long' }, { status: 400 });
        }
        if (Number(body.amount) <= 0) {
            return Response.json({ success: false, message: 'Amount must be a positive number' }, { status: 400 });
        }

        const res = await fetch(`${process.env.BACKEND_URL}/expenses`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const data = await res.json();
        return Response.json({ success: true, data }, { status: res.status });

    } catch (error) {
        console.error('Error occurred while adding expense:', error);
        return Response.json({ success: false, message: 'Failed to add expense' }, { status: 500 });
    }
}

export async function PATCH(req) {
    try {
        const body = await req.json();

        if (!body.title || !body.amount || !body.category || !body.date) {
            return Response.json({ success: false, message: 'All fields are required' }, { status: 400 });
        }
        if (body.title.length < 3) {
            return Response.json({ success: false, message: 'Title must be at least 3 characters long' }, { status: 400 });
        }
        if (Number(body.amount) <= 0) {
            return Response.json({ success: false, message: 'Amount must be a positive number' }, { status: 400 });
        }
        
        console.log(body);
        const res = await fetch(`${process.env.BACKEND_URL}/expenses/${body._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const data = await res.json();

        if (res.status === 200) {
            return Response.json({ success: true, data }, { status: res.status });
        } else {
            return Response.json({ success: false, message: data.error }, { status: res.status });
        }

    } catch (error) {
        console.error('Error occurred while editing expense:', error);
        return Response.json({ success: false, message: 'Failed to edit expense' }, { status: 500 });
    }
}

export async function DELETE(req) {
    const body = await req.json();
    try {
        const res = await fetch(`${process.env.BACKEND_URL}/expenses`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const expenses = await res.json();
        const expenseIds = expenses.map(expense => expense._id);
        const missingIds = body.ids.filter(id => !expenseIds.includes(id));

        if (missingIds.length > 0) {
            return Response.json({ success: false, message: `These IDs do not exist: ${missingIds.join(', ')}` }, { status: 400 });
        }
        
        try {
            body.ids.forEach(async (id) => {
                await fetch(`${process.env.BACKEND_URL}/expenses/${id}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                });
            });
            return Response.json({ success: true, message: 'Expenses deleted successfully' }, { status: 200 });
        } catch (error) {
            console.error(error);
            return Response.json({ success: false, message: 'Server error' }, { status: 500 });
        }
    } catch (error) {
        console.error(error);
        return Response.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}