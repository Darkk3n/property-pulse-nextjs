import PropertyCard from '@/components/PropertyCard';
import connectDb from '@/config/database';
import { Property } from '@/models/Property';

const PropertiesPage = async () => {
    await connectDb();
    const propertiesData = await Property.find({}).lean()

    return (<section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
            {propertiesData.length === 0 ? (<p>No Properties found</p>) : (
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {propertiesData.map((p) => (
                        <PropertyCard key={p._id} property={p} />
                    ))}
                </div>
            )}
        </div>
    </section>);
}

export default PropertiesPage;