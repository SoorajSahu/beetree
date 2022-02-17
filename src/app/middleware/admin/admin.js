const _ = require('lodash');
/**
 * Check If Admin is login or not
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

const CheckUserIsAdmin = (req, res, next) => {
    const { session } = req;
    if (session.isLogin) {               
        req.user = session.auth;
        next();        
    } else {
        res.status(401).redirect('/admin');
    }
}
/**
 * AdminLogout MiddelWare for adminDashboard 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * 
 */
const AdminLogout = (req, res) => {        
    
    if (req.session.isLogin) {            
        req.session.isLogin = false;
        _.unset(req.session, 'auth');       
        res.redirect('/admin/');           
    } else {
        res.status(401).redirect('/admin/');
    }
   
}
module.exports ={ CheckUserIsAdmin ,AdminLogout }