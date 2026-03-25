import connectDb from '@/config/database'
import { Property } from '@/models/Property';

export const GET = async () => {
    try {
        await connectDb();
        const properties = await Property.find({});
        return new Response(JSON.stringify(properties), { status: 200 })
    } catch (error) {
        return new Response('Someting went wrong', { status: 500 })
    }
}

