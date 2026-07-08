import { isValidObjectId } from 'mongoose';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FaBed, FaBath, FaRulerCombined, FaMoneyBill, FaMapMarker } from 'react-icons/fa';
import connectDB from '../../../config/database';
import Property from '../../../models/Property';
import PropertyImageCarousel from '../../../components/PropertyImageCarousel';

const PropertyPage = async ({ params }) => {
    await connectDB();

    if (!isValidObjectId(params.id)) {
        notFound();
    }

    const propertyDoc = await Property.findById(params.id).lean();
    if (!propertyDoc) {
        notFound();
    }
    const property = JSON.parse(JSON.stringify(propertyDoc));

    const getRates = () => {
        const { rates } = property;
        if (rates.monthly) {
            return `$${rates.monthly.toLocaleString()}/mo`;
        }
        else if (rates.weekly) {
            return `$${rates.weekly.toLocaleString()}/wk`;
        }
        else if (rates.nightly) {
            return `$${rates.nightly.toLocaleString()}/night`;
        }
    }

    return (
        <section className="px-4 py-6">
            <div className="container-xl lg:container m-auto px-4 py-6">
                <Link
                    href="/properties"
                    className="text-blue-500 hover:text-blue-600 flex items-center"
                >
                    &larr; Back to Properties
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] w-full gap-6 mt-6">
                    <PropertyImageCarousel images={property.images} alt={property.name} />

                    <div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                            <div className="text-gray-600 mb-4">{property.type}</div>
                            <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
                            <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                                <FaMapMarker className="text-orange-700 mt-1 mr-2" />
                                <p className="text-orange-700">
                                    {property.location.street}, {property.location.city}{' '}
                                    {property.location.state} {property.location.zipcode}
                                </p>
                            </div>

                            <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2 rounded-lg w-fit">
                                {getRates()}
                            </h3>

                            <div className="flex justify-center gap-4 text-gray-500 mb-4 text-xl space-x-9">
                                <p>
                                    <FaBed className="inline mr-2" /> {property.beds}{' '}
                                    <span className="hidden sm:inline">Beds</span>
                                </p>
                                <p>
                                    <FaBath className="inline mr-2" /> {property.baths}{' '}
                                    <span className="hidden sm:inline">Baths</span>
                                </p>
                                <p>
                                    <FaRulerCombined className="inline mr-2" />
                                    {property.square_feet}{' '}
                                    <span className="hidden sm:inline">sqft</span>
                                </p>
                            </div>

                            <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
                                {property.rates.nightly && (
                                    <p>
                                        <FaMoneyBill className="inline mr-2" /> Nightly
                                    </p>
                                )}
                                {property.rates.weekly && (
                                    <p>
                                        <FaMoneyBill className="inline mr-2" /> Weekly
                                    </p>
                                )}
                                {property.rates.monthly && (
                                    <p>
                                        <FaMoneyBill className="inline mr-2" /> Monthly
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                            <h3 className="text-lg font-bold mb-6">Description</h3>
                            <p className="mb-4">{property.description}</p>
                        </div>

                        {property.amenities && property.amenities.length > 0 && (
                            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                                <h3 className="text-lg font-bold mb-6">Amenities</h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc list-inside">
                                    {property.amenities.map((amenity, index) => (
                                        <li key={index}>{amenity}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                            <h3 className="text-lg font-bold mb-6">Contact Seller</h3>
                            <p className="mb-2">{property.seller_info.name}</p>
                            <p className="mb-2">{property.seller_info.email}</p>
                            <p className="mb-2">{property.seller_info.phone}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PropertyPage
