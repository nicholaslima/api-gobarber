

const jwt = {
    expiresIn: '1d',
    secret: process.env.APP_SECRET || 'default',
}

export default jwt;