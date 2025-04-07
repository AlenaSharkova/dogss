

export default defineEventHandler(async (event)=>
{
    const sql = usePostgres()
    console.log('scriptdb sql', sql);


    const products = await sql`SELECT * FROM products`

    // Ensure the database connection is closed after the request is processed
    event.waitUntil(sql.end())



    return products

})