const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const {en} = require("faker/lib/locales");
const sqlite3 = require('sqlite3').verbose();
const port = 3001

const app = express()
const db = new sqlite3.Database('./db');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/users', (req, res)=>{
    const page = Number.parseInt(req.query.page) || 1;
    const count = Number.parseInt(req.query.count) || 10;
    const sort = req.query.sort || 'id';
    const order = req.query.order || 'asc';
    let search = ''
    if(req.query.search){
        search = `where name like '%${req.query.search}%' or email like  '%${req.query.search}%' or salary like  '%${req.query.search}%'`;
    }
    const sql = `select * from users ${search} order by ${sort} ${order} limit ? offset ?`
    console.log(sql);
    db.all(sql, [ count, (page-1)*count], (error, users)=>{
        if(error){
            return res.status(404).send(error)
        }
        db.get('select count(id) as count from users', (error, row)=>{
            if(error){
                return res.status(404).send(error)
            }
            const data = {
                page,
                sort,
                order,
                count: row.count,
                users,
            }
            return res.json(data)
        })
    })
})

app.get('/users/:id', (req, res)=>{
    const id = Number.parseInt(req.params.id);
    if(id){
        db.get('select * from users where id=?', id, (error, user)=>{
            if(error){
                return res.status(404).send(error)
            }
            return res.json(user)
        })
    } else {
        return res.status(404).send('User not found')
    }
})

app.post('/users', (req, res)=>{
    const user = req.body;
    user.id = 5
    console.log(user);
    return res.json(user);
    // db.run('insert into users (name, photo, salary, role, email, password) values (?, ?, ?, ?, ?, ?)',[
    //     user.name,
    //     user.photo,
    //     user.salary,
    //     user.role,
    //     user.email,
    //     user.password
    // ], function (error){
    //     if(error){
    //         return res.status(404).send(error)
    //     }
    //     user.id = this.lastID;
    //     return res.json(user);
    // })
})

app.delete('/users/:id', (req, res)=> {
    const id = Number.parseInt(req.params.id);
    if(id) {
        db.run('delete  from users where id=?', id, (error)=>{
            if(error){
                return res.status(404).send(error)
            }
            return res.status(200).send('User successful deleted')
        })
    }else {
        return res.status(404).send('User not found')
    }
})


app.patch('/users/:id', (req, res)=>{
    const id = Number.parseInt(req.params.id);
    const user = req.body;

    if(id && user) {
        db.run('UPDATE users SET name = ?, photo = ?, salary = ?, role = ?, email = ?, password = ? WHERE id = ?',[
            user.name,
            user.photo,
            user.salary,
            user.role,
            user.email,
            user.password,
            user.id
        ], function (error){
            if(error){
                return res.status(404).send(error)
            }
            return res.json(user);
        })
    }else {
        return res.status(404).send('User not found')
    }

})

app.get('/plan/:id', async (req, res)=>{
    const currentDate = new Date();
    const id = req.params.id;
    let {start, end} = req.query;
    start = start || new Date(currentDate.getFullYear(),currentDate.getMonth(),2).toISOString();
    end = end || new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 1).toISOString();
    db.all("select * from works where date(?) <= date AND date(?) >= date  AND user_id = ? ;", [start, end, id],
        function (error, data){
        if(error){
            return res.status(404).send(error)
        }
        return res.json(data); });

})

app.use('/login', (req, res) => {
    res.send({
        token: 'test123'
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})