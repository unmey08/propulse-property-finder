const { MongoClient, ObjectId } = require('mongodb');
const properties = require('../properties.json');

const seed = async () => {
    const client = new MongoClient(process.env.MONGO_DB_URI);

    try {
        await client.connect();
        const db = client.db();

        const users = db.collection('users');
        const propertiesCollection = db.collection('properties');

        const now = new Date();
        const demoUser = await users.findOneAndUpdate(
            { email: 'demo-seller@propertypulse.test' },
            {
                $set: { username: 'PropertyPulse Demo Seller', image: '/images/profile-default.jpg', updatedAt: now },
                $setOnInsert: { email: 'demo-seller@propertypulse.test', bookmarks: [], createdAt: now }
            },
            { upsert: true, returnDocument: 'after' }
        );

        await propertiesCollection.deleteMany({});

        const docs = properties.map(({ owner, createdAt, updatedAt, ...rest }) => ({
            ...rest,
            owner: demoUser._id,
            createdAt: now,
            updatedAt: now
        }));

        const { insertedCount } = await propertiesCollection.insertMany(docs);

        console.log(`Seeded ${insertedCount} properties, owned by ${demoUser.email}`);
        await client.close();
        process.exit(0);
    } catch (error) {
        console.error(error);
        await client.close();
        process.exit(1);
    }
};

seed();
