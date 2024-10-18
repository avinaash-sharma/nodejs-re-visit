const adminAuth = (req, res, next) => {
    // res.send('Avinash Sharma')
    console.log('do something!')
    const adminToken = "ADMINABC";
    const validRequest = adminToken === 'ADMINABC';
    if (validRequest) {
        next();
    } else {
        res.status(401).send('Not Admin :> not authorized')

    }
}

const userAuth = (req, res, next) => {
    // res.send('Avinash Sharma')
    console.log('do something!')
    const userToken = "USERABC";
    const validRequest = userToken === 'UERABC';
    if (validRequest) {
        next();
    } else {
        res.status(401).send('Not a registered user :> not authorized')

    }
}

module.exports = { adminAuth, userAuth };