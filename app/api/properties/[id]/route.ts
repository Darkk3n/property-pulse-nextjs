import connectDb from '@/config/database'
import { Property } from '@/models/Property';

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        await connectDb();
        const property = await Property.findById(params.id);
        if (!property)
            return new Response('Property not found', { status: 404 });
        return new Response(property, { status: 200 })
    } catch (error) {
        return new Response('Someting went wrong', { status: 500 })
    }
}

