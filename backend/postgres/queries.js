const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'shop',
    password: 'Password',
    port: 5432,
})

const getBudget = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if(error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const setBudget = (request, response) => {
    const { budget } = request.body
    pool.query(`INSERT INTO users (budget) VALUES ($1) RETURNING *`, [budget], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Budget added to user with ID: ${results.rows[0].id}`)
    })
}

const getCategory = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if(error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const setCategory = (request, response) => {
    const id = parseInt(request.params.id)
    const { budget, likes } = request.body
    pool.query(
      'UPDATE users SET budget = $1, likes = $2 WHERE id = $3',
      [ budget, likes, id ],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Like added to user with ID: ${id}`)
      }
    )
}

module.exports = {
    getBudget,
    setBudget,
    getCategory,
    setCategory
}
