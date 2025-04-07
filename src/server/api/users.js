import breeds from "~/demoData/new_breeds.json";
import connection from "express";


export default defineEventHandler(async (event)=>
{
    const sql = usePostgres()
    const query = getQuery(event)
    console.log('query', query)
    //const id = getRouterParam(event, 'name')
    let res

    if(query?.id) {
        let users = await sql`SELECT * FROM users WHERE id = ${query.id}`
        console.log('user', users)
        if(users.length) {
            res = users[0]
        } else {
            throw createError({
                statusCode: 404,
                statusMessage: 'Питомник не найден',
            })
        }


        //let re = `INSERT INTO breeds SET column= ${responseJson}`
        //console.log('re15', re);
/*
        let responseJson = JSON.stringify(breeds);


        //await sql`CREATE TABLE breeds(id INT, name VARCHAR(255))`

        //await sql`CREATE TABLE t1(json_col JSON)`
        //await sql`INSERT INTO t1 VALUES (${responseJson})`

        ///await sql`SELECT breeds.* FROM t1,
        console.log('responseJson', responseJson)
        const a = await sql`
             INSERT INTO breeds (name, id)
             SELECT breeds.name, breeds.id 
             FROM JSON_TABLE(
                 ${responseJson}, '$[*]' COLUMNS ( name VARCHAR(255)  PATH '$.name', id INT PATH '$.id')
             ) AS breeds;`
        console.log('a responseJson', a)



      // console.log('data inserted', query1);
*/
    } else {
        res = await sql`SELECT * FROM users`
    }
    // Ensure the database connection is closed after the request is processed
    event.waitUntil(sql.end())
    return res

})