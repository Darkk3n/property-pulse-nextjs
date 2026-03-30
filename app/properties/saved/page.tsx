import PropertyCard from '@/components/PropertyCard';
import connectDb from '@/config/database';
import { IProperty, Property } from '@/models/Property';
import { User } from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';

const SavedPropertiesPage = async () => {
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId)
        throw new Error('User ID is required');
    const { userId } = sessionUser;
    await connectDb();
    const { bookmarks } = await User.findById(userId).populate('bookmarks');

    return (<section className='px-4 py-6'>
        <div className="container lg:container m-auto px-4 py-6">
            <h1 className="text-2xl mb-4">Saved Properties</h1>
            {bookmarks.length === 0 ? <p>No saved Properties</p> :
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {bookmarks.map((p: IProperty) => (
                        <PropertyCard key={p._id} property={p} />
                    ))}
                </div>
            }
        </div>
    </section>);
}

export default SavedPropertiesPage;