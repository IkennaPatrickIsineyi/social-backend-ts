import session from 'express-session';
import { rootRouter } from "./src/routes/root.route";
import { postRouter } from "./src/routes/post.route";
import { route404Middleware } from './src/middlewares/route404.middleware';
import helmet from 'helmet';
import express from 'express';
import connectMongo from 'connect-mongo';
import { configDotenv } from 'dotenv';
import { db } from './src/services/db.service';
import { authRouter } from './src/routes/auth.route';

configDotenv();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/static'));

app.use(helmet());

app.use(session({
    name: 'social_app',
    secret: 'jksdjsdsd_sk38934dskd894334_dkksjd_dkjsdk343',
    store: connectMongo.create({
        mongoUrl: process.env.MONGO_URI,
        ttl: 1 * 24 * 60 * 60,
        dbName: (process.env.NODE_ENV === 'production')
            ? process.env.DB_NAME
            : process.env.DB_NAME_DEV
    }),
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 86400000,
    }
}));

app.use('/posts', postRouter);
app.use('/auth', authRouter);

app.use('/', rootRouter);

app.use('*', route404Middleware);

const startServer = (port: number) => {
    app.listen(port, () => console.log('Listening on port', port)).on('error', (err) => {
        if (err.message.includes('EADDRINUSE')) {
            console.log(`Port ${port} is in use, trying another port...`);
            setTimeout(() => {
                startServer(port + 1); // Try the next port
            }, 1000);
        } else {
            console.error('Server error:', err);
        }
    });;
}

db.init().then(() => {
    startServer(Number(PORT));
}).catch((err) => {
    console.error(err);
    process.exit(1);
});

const gracefulShutdown = () => {
    db.teardown()
        .catch(() => { })
        .then(() => {
            console.log('disconnected from database');
            process.exit()
        });
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown); // Sent by nodemon
