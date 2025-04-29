import breeds from "~/demoData/new_breeds.json";
import connection from "express";


export default defineEventHandler(async (event)=>
{
    const sql = usePostgres()
    const query = getQuery(event)
    console.log('query', query)
    //const id = getRouterParam(event, 'name')
    let res
    try {
        res = await sql`SELECT * FROM breeds`
    } catch (e)
    {
        /*await sql`CREATE TABLE breeds(id INT, name VARCHAR(255))`

        let responseJson = JSON.stringify(breeds);

        console.log('responseJson', responseJson)
        const a = await sql`
             INSERT INTO breeds (name, id)
             SELECT breeds.name, breeds.id 
             FROM JSON_TABLE(
                 ${responseJson}, '$[*]' COLUMNS ( name VARCHAR(255)  PATH '$.name', id INT PATH '$.id')
             ) AS breeds;`
        console.log('a responseJson', a)
        res = await sql`SELECT * FROM breeds`*/
    }

    if(!res) {


    }

        /*throw createError({
            statusCode: 404,
            statusMessage: 'Питомник не найден',
        })*/
    // Ensure the database connection is closed after the request is processed
    event.waitUntil(sql.end())
    return res

})