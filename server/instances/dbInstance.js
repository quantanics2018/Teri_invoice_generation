const Pool = require('pg').Pool;
const userdb = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'terion_billing',
    password: 'quantanics123', //quantanics123
    port: 5432,
});
module.exports = {userdb};