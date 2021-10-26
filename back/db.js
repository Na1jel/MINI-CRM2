const sqlite3 = require('sqlite3').verbose();
const faker = require('faker');
const count = 10
const db = new sqlite3.Database('./db');

db.serialize(function () {
    db.run('drop table if exists users;');
    db.run('create table users (id integer constraint users_pk primary key autoincrement, name text, photo text, salary int, role integer, email text, password text);')
    for (let i = 1; i <= count; i++) {
        db.run(
            'INSERT INTO users (name, photo, salary, role, email, password) VALUES (?, ?, ?, ?, ?, ?)',
            [
                faker.name.findName(),
                'https://via.placeholder.com/150',
                faker.datatype.number({min: 5, max: 80}),
                faker.random.arrayElement([1, 2, 3]),
                faker.internet.email(),
                faker.internet.password()
            ])
    }
    db.run('drop table if exists works;');
    db.run('create table works(date text not null, user_id int not null references users on update cascade on delete cascade, hours int not null, PRIMARY KEY (date, user_id));');

    db.parallelize(function () {
        const year = 2021;
        for (let month = 1; month <= 12; month++) {
            const days = new Date(year, month, 0).getDate();

            for (let day = 1; day <= days; day++) {
                const date = new Date(year, month - 1, day + 1);
                if ([0, 6].includes(date.getDay())) {
                    continue;
                }
                for (let userId = 1; userId <= count; userId++) {
                    db.run("INSERT INTO works (date, user_id, hours) VALUES (?, ?, ?)", [date.toISOString(), userId, faker.datatype.number({
                        min: 1,
                        max: 8
                    }),])
                }
            }
        }
    });

})