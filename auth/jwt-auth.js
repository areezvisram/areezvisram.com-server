const njwt = require('njwt');

const clients = [{
    id: '1',
    client_secret: process.env.AREEZVISRAM_CLIENT_SECRET,
    client_id: process.env.AREEZVISRAM_CLIENT_ID
}];

const APP_SECRET = process.env.APP_SECRET

const encodeToken = (tokenData) => {
    return njwt.create(tokenData, APP_SECRET).compact();
};

const decodeToken = (token) => {
    return njwt.verify(token, APP_SECRET).body;
};

const jwtAuthenticationMiddleware = (req, res, next) => {
    const token = req.header('Access-Token');
    if(!token) {
        return next();
    };

    try {
        const decodedToken = decodeToken(token);
        const { clientId } = decodedToken;        

        if(clients.find((client) => client.client_id === clientId)) {            
            req.clientId = clientId;
        }
    } catch(e) {
        return next();
    };

    next();
}

const isAuthenticatedMiddleware = async (req, res, next) => {
    if(req.clientId) {
        return next();
    };

    res.status(401);
    res.json({ error: 'Client not authenticated' });
}

const jwtLogin = async(req, res) => {  
    const { clientId, clientSecret } = req.body;    
    const client = clients.find((client) => client.client_secret === clientSecret && client.client_id === clientId);

    if(!client) {
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