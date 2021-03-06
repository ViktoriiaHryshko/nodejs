import jwt from 'jsonwebtoken';

const CheckToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        res.status(401).send({
            success: false,
            message: 'No token provided!'
        });
    }

    return jwt.verify(token, process.env.JWT_SECRET, err => {
        if (err) {
            res.status(403).json({
                success: false,
                message: 'Failed to authenticate token!'
            });
        } else {
            return next();
        }
    });
};

export { CheckToken };
