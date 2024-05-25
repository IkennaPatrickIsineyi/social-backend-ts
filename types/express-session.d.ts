import session from 'express-session';

declare module 'express-session' {
    interface SessionData {
        // Add any properties you store in the session here
        user?: {
            username?: string,
            userId?: string,
            isLoggedIn?: boolean,
            fullname?: string
        };
    }
}

declare module 'express-serve-static-core' {
    interface Request {
        session: session.Session & Partial<session.SessionData>;
    }
}