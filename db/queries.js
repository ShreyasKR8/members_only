const pool = require("./pool");

exports.createUser = async ({ firstName, lastName, userName,
    email, password }) => {
    pool.query(
        `INSERT INTO users(first_name, last_name, username, 
            email, password_hash)
            VALUES($1, $2, $3, $4, $5)`,
        [firstName, lastName, userName, email, password]
    )
};

exports.getUserByEmail = async (email) => {
    const { rows } = await pool.query(
        `SELECT *
        FROM users
        WHERE email = $1`,
        [email]
    )

    return rows[0];
};