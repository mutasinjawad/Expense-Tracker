export async function GET() {
    const res = await fetch(`${process.env.BACKEND_URL}/expenses`);
    const data = await res.json();
    return Response.json(data);
}