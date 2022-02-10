// Imports
const njwt = require('njwt');

// Valid clients that can make requests to server
const clients = [{
    id: '1',
    client_secret: process.env.AREEZVISRAM_CLIENT_SECRET,
    client_id: process.env.AREEZVISRAM_CLIENT_ID
}];

const APP_SECRET = process.env.APP_SECRET

// Creates an encoded JWT with passed object and app secret
const encodeToken = (tokenData) => {
    return njwt.create(tokenData, APP_SECRET).compact();
};

// Decodes a passed token and verifies the body
const decodeToken = (token) => {
    return njwt.verify(token, APP_SECRET).body;
};

// Middleware to check JWT authentication header
// Get token from header, decode it and verify it
const jwtAuthenticationMiddleware = (req, res, next) => {
    const token = req.header('Access-Token');
    if (!token) {
        return next();
    };

    try {
        const decodedToken = decodeToken(token);
        const { clientId } = decodedToken;

        if (clients.find((client) => client.client_id === clientId)) {
            req.clientId = clientId;
        }
    } catch (e) {
        return next();
    };

    next();
}

// Middleware to make sure client is authenticated
// Ensure request has clientId (jwtAuthenticationMiddleware adds one if the JWT is valid)
const isAuthenticatedMiddleware = async (req, res, next) => {
    if (req.clientId) {
        return next();
    };

    res.status(401);
    res.json({ error: 'Client not authenticated' });
}

// /jwt-login endpoint
// Verifies client is valid using client secret and id, then generates and returns JWT 
const jwtLogin = async (req, res) => {
    const { clientId, clientSecret } = req.body;
    const client = clients.find((client) => client.client_secret === clientSecret && client.client_id === clientId);

    if (!client) {
        res.status(401);
        return res.json({ error: 'Invalid client id and secret' });
    }

    const jwtToken = encodeToken({ clientId: client.client_id, clientSecret: client.client_secret });
    return res.json({ jwtToken });
}

module.exports = {
    encodeToken,
    decodeToken,
    jwtAuthenticationMiddleware,
    isAuthenticatedMiddleware,
    jwtLogin
}