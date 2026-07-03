const pool = require("./pool");

exports.createUser = async ({ firstName, lastName, userName,
    email, password, isAdmin }) => {
    pool.query(
        `INSERT INTO users(first_name, last_name, username, 
            email, password_hash, is_admin)
            VALUES($1, $2, $3, $4, $5, $6)`,
        [firstName, lastName, userName, email, password, isAdmin]
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


exports.getAllPosts = async () => {
    const { rows } = await pool.query(`
        SELECT m.id, m.title, m.content, m.created_at, u.username 
        FROM users u INNER JOIN messages m 
        ON u.id = m.user_id
        ORDER BY m.created_at DESC;`
    );

    return rows;
};

// getPostById()
// updatePost()
// deletePost()