
const Pool = require('pg').Pool

const pool = new Pool({
  user: 'swage',
  host: 'localhost',
  database: 'linksAPI',
  password: 'password',
  port: 5432,
})

const getLinks = (req, res) => {
    pool.query('SELECT * FROM favlinks ORDER BY id ASC', (error, result) =>{
        if(error){
            throw error
        }
        res.status(200).json(result.rows)
    })
}

const createLink = (req, res) => {

    const name = req.body.name
    const URL = req.body.URL

    pool.query('INSERT INTO favlinks (name, url) VALUES ($1, $2)',
    [name, URL],
    (error, result) => {
        if(error){
            throw error
        }
        res.status(200).json('Link created') 
    })
}

const updateLink = (re1, res) => {

    const id = req.params.id;
    const name = req.body.name
    const URL = req.body.URL

    pool.query('UPDATE favlinks SET name = $1, url = $2 WHERE id = $3',
    [name, URL, id],
    (error, result) => {
        if(error){
            throw error;
        }
        res.status(200).json('Link updated') 
    } )

}

const deleteLink = (re1, res) => {

    const id = req.params.id;
    const name = req.body.name
    const URL = req.body.URL

    pool.query('DELETE FROM favlinks WHERE name = $1',
    [id],
    (error, result) => {
        if(error){
            throw error;
        }
        res.status(200).json('Link deleted') 
    } )

}

module.exports = {
    getLinks,
    createLink,
    updateLink,
    deleteLink,
}