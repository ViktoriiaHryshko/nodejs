const whiteList = ['http://localhost:3000'];

const CorsOptions = (req, callback) => {
    callback(null, { origin: whiteList.indexOf(req.header('Origin')) !== -1 });
};

export { CorsOptions };
