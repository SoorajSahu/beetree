const shortId = require('shortid');
/**
 * 
 * @param {Number} num 
 * @returns Hashed String
 */
const genrateUniqueHash = (name) => `${(name).toString().split(" ")[0].toLowerCase() }@${   (shortId.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@')).toString().slice(-8)}`;
const getCurrentDataTime = () => (new Date()).toISOString().slice(0, 19).replace('T', ' ');

module.exports = {
    getCurrentDataTime,
    genrateUniqueHash,
}