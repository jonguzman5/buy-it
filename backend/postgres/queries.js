const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'shop',
    password: 'Password',
    port: 5432,
})
/************** GETTERS *************/
const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if(error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
/************** SETTERS *************/
const setUsers = (request, response) => {
    const { budget } = request.body
    pool.query(`INSERT INTO users (budget) VALUES ($1) RETURNING *`, [budget], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Budget added to user with ID: ${results.rows[0].id}`)
    })
}

const updateUsers = (request, response) => {
    const id = parseInt(request.params.id)
    const { budget, likes, purchaseHistory } = request.body
    pool.query(
        'UPDATE users SET budget = $1, likes = $2, purchaseHistory = $3 WHERE id = $4',
        [ budget, likes, purchaseHistory, id ],
        (error, results) => {
            if (error) {
            throw error
            }
            response.status(200).send(`Purchase added to user with ID: ${id}`)
        }
    )
}
module.exports = {
    getUsers,
    setUsers,
    updateUsers,
}
