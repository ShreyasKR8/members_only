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

exports.getUserById = async (userId) => {
    const { rows } = await pool.query(
        `SELECT * FROM users 
        WHERE id = $1`,
        [userId]
    );
    // console.log(rows[0]);

    return rows[0];
}

exports.getUserByEmail = async (email) => {
    const { rows } = await pool.query(
        `SELECT *
        FROM users
        WHERE email = $1`,
        [email]
    )

    return rows[0];
};

exports.getUserByUsername = async (username) => {
    const { rows } = await pool.query(
        `SELECT * FROM users 
        WHERE username = $1`,
        [username]
    );
    // console.log(rows[0]);

    return rows[0];
}

exports.makeMember = async (userId) => {
    await pool.query(`
        UPDATE users
        SET is_member = TRUE
        WHERE id = $1`,
        [userId]
    );
}

exports.createPost = async (title, content, userId) => {
    await pool.query(`
        INSERT INTO messages(title, content, user_id)
        VALUES($1, $2, $3)`,
        [title, content, userId]
    );
};

// getPosts()
// getPostById()
// updatePost()
// deletePost()