import mongoose from "mongoose";

const init = async () => {
    if (mongoose.connection.readyState === 1) {
        console.log('connected to database')
    }
    else {
        console.log('connecting to database')
        const dbName = (process.env.NODE_ENV === 'production')
            ? process.env.DB_NAME
            : process.env.DEV_DB_NAME;

        const URI = process.env.MONGO_URI || '';

        const connected = await mongoose.connect(URI, { dbName })
        connected && console.log('connected to database')
    }
}

const teardown = async () => {
    await mongoose.disconnect()
}

const db = { init, teardown }

export { db }