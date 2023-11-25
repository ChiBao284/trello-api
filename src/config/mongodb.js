import { MongoClient, ServerApiVersion } from 'mongodb';
import { env } from './environment';

// Khởi tạo 1 đối tượng trelloDatabaseInstance ban đầu là null (vì chúng ta chưa connect)
let trelloDatabaseInstance = null;

// Khởi tạo đối tưởng mongodbClientInstance để connect tới MongoDB
const mongodbClientInstance = new MongoClient(env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

// Kết nối Database
export const CONNECT_DB = async () => {
    // Gọi kết nói tới MongoDB Atlas với URI đã khai báo

    await mongodbClientInstance.connect();

    trelloDatabaseInstance = mongodbClientInstance.db(
        process.env.DATABASE_NAME,
    );
};

export const CLOSE_DB = async () => {
    // Đóng kết nối tới MongoDB
    await mongodbClientInstance.close();
};

export const GET_DB = () => {
    if (!trelloDatabaseInstance) {
        throw new Error('Must connect to Database first!');
    }
    return trelloDatabaseInstance;
};
