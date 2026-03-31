import Pagination from '@/components/Pagination';
import PropertyCard from '@/components/PropertyCard';
import connectDb from '@/config/database';
import { IProperty, Property } from '@/models/Property';
import { HydratedDocument } from 'mongoose';

interface SearchParams {
    location?: string;
    propertyType?: string;
    page?: string;
    pageSize?: string;
}

interface PageProps {
    params: { id: string };
    searchParams: SearchParams;
}

const PropertiesPage = async ({ searchParams: { page = "1", pageSize = "2" } }: PageProps) => {
    await connectDb();
    const skip = (parseInt(page) - 1) * parseInt(pageSize);
    const total = await Property.countDocuments({});
    const propertiesData: HydratedDocument<IProperty>[] | null = await Property
        .find({})
        .skip(skip)
        .limit(parseInt(pageSize));
    const showPagination = total > parseInt(pageSize);
    return (
        <section className='px-4 py-6'>
            <div className='container-xl lg:container m-auto px-4 py-6'>
                {propertiesData.length === 0 ? (<p>No Properties found</p>) : (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {propertiesData.map((p) => (
                            <PropertyCard key={p._id} property={p} />
                        ))}
                    </div>
                )}
                {showPagination && <Pagination page={parseInt(page)} pageSize={parseInt(pageSize)} totalItems={total} />}
            </div>
        </section>
    );
}

export default PropertiesPage;