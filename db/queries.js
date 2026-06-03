const pool = require("./pool");

exports.postUser = async () => {

}

exports.findUserByEmail = async (email) => {
    const { rows } = await pool.query(
        `SELECT username
        FROM users
        WHERE email = $1`,
        [email]
    )

    return rows[0];
};