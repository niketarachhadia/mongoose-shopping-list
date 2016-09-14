exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                            'mongodb://test:test@ds033046.mlab.com:33046/shopping-list-mlab' :
                            'mongodb://localhost/shopping-list-dev');
exports.PORT = process.env.PORT || 8089;
