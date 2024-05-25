import session from 'express-session';
import { rootRouter } from "./src/routes/root.route";
import { postRouter } from "./src/routes/post.route";
import { route404Middleware } from './src/middlewares/route404.middleware';
import helmet from 'helmet';
import express from 'express';
import { configDotenv } from 'dotenv';
import { db } from './src/services/db.service';
import { authRouter } from './src/routes/auth.route';

configDotenv();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/static'));

app.use(helmet());

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use('/posts', postRouter);
app.use('/auth', authRouter);

app.use('/', rootRouter);

app.use('*', route404Middleware);

db.init().then(() => {
    app.listen(PORT, () => console.log('Listening on port', PORT));
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
