function auth(req, res, next) {
    const token = req.header('x-auth-token');
    console.log('Token:', token); // Log the token
    console.log(req.user)
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log('Decoded:', decoded); // Log the decoded object
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
}