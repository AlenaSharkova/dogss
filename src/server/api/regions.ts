
export default defineEventHandler<{query: { regionValue: number, onlyRegions: boolean  } }>(async (event)=>
{

    const sql = usePostgres()
    const query = getQuery(event)
    //const id = getRouterParam(event, 'name')
    let res
    let regionsList
    let cityList
    let regionsListFull
    try {
        console.log('query api', query)
        if(query && query?.regionValue) {
            cityList = await sql`SELECT * FROM geo_city WHERE region_id=${query?.regionValue}`
            event.waitUntil(sql.end())
            console.log('cityList', cityList)
            return cityList
        }
        regionsList = await sql`SELECT * FROM geo_regions`
        if(query && query?.onlyRegions === true) {
            console.log('regionsList', regionsList)

            event.waitUntil(sql.end())

            return regionsList
        }
        console.log('regionsListFull', regionsList)
        await Promise.all(regionsList.map(async (region) => {
            return {
                ...region,
                children: await sql`SELECT * FROM geo_city WHERE region_id=${region.value}`
            }
        })).then(res =>
            regionsListFull = res
        )
        console.log('regionsListFull', regionsListFull)

        event.waitUntil(sql.end())

        return regionsListFull
    } catch (e) {}

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