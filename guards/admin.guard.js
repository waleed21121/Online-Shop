exports.isUserAdmin = (req, res, next) => {
    if(req.session.isAdmin) next();
    else console.log('error');
}