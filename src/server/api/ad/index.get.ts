

export default defineEventHandler<{query: {
    breeds?: string;
    'max-price'?: string;
    'min-price'?: string;
    regions?: string;
    type?: string;
    gender?: string;
    city?: string;
    }
    }>(async (event)=>

{
    const sql = usePostgres()

    const query = getQuery(event)

    let sqlQuery = 'SELECT * FROM ad_list WHERE'; // Базовый запрос.  1=1 чтобы было удобно добавлять условия

    const conditions = [] as any[];// Начальное условие (пустое)

    if (query.type) {
        conditions.push(sql`type_ad = ${query.type}`);
    }
    if (query.breeds) {

        conditions.push(sql`breed_id = ${query.breeds}`);
    }
    if (query.gender) {
        conditions.push(sql`gender = ${query.gender}`);
    }
    if (query['max-price']) {
        conditions.push(sql`price <= ${query['max-price']}`);
    }
    if (query['min-price']) {
        conditions.push(sql`price >= ${query['min-price']}`);
    }
    if (query.regions) {
        const regionsSql = query.regions.split(',').reduce((acc, reg, index) => {
            if(index == (query.regions as string).split(',').length - 1) return sql`${acc}${reg}`
            return sql`${acc}${reg}, `
        }, sql``)
        conditions.push( sql`region_main IN (${regionsSql})` );
    }
    if (query.city) {
        const citySql = query.city.split(',').reduce((acc, reg, index) => {
            if(index == (query.city as string).split(',').length - 1) return sql`${acc}${reg}`
            return sql`${acc}${reg}, `
        }, sql``)
        conditions.push( sql`city_main IN (${citySql})` );
    }

    // Добавляем LIMIT и OFFSET (пагинация - необязательно, но часто используется)
    const limit = 20; //значение по умолчанию
    const offset = 0; //значение по умолчанию
    let adListDB
    console.log('sqlQuery', query, sqlQuery)
    if (conditions.length > 0) {
        console.log('adListDB2 conditions', conditions)

        try {
            let whereClause = sql``;
            let combinedConditions = sql``;

            for (let i = 0; i < conditions.length; i++) {
                if (i > 0) {
                    combinedConditions = sql`${combinedConditions} AND ${conditions[i]}`;
                } else {
                    combinedConditions = conditions[i]; // Первое условие
                }
            }
            console.log('adListDB2 0', combinedConditions)

            whereClause = sql`WHERE ${combinedConditions}`;
            adListDB = await sql`SELECT * FROM ad_list ${whereClause}`;
            console.log('adListDB2 result', adListDB)

            console.log('adListDB2', whereClause)

        } catch (error) {
            adListDB = []
            console.error('Error executing SQL query:', error); // Добавлено
            throw error; // Перебросить ошибку, чтобы ее можно было обработать выше
        }
    } else {
        adListDB = await sql`SELECT * FROM ad_list`
    }

    //const adListDB2 = await sql`${sql.raw(baseQuery)} ${sql.raw(values.map((val, index) => `$${index+1} = ${sql.value(val)}`).join(' AND '))}`;
    //const { rows: adListDB2 } = await sql.query(baseQuery, values);


    console.log('ad 22', adListDB );
    let results = await Promise.all(adListDB.map(async (item) => {
        const adOwner =  await sql`SELECT * FROM users WHERE id=${item.owner}`
        const adBreed = await sql`SELECT * FROM breeds WHERE value=${item.breed_id}`
        const adRegionMain = await sql`SELECT * FROM geo_regions WHERE value=${item.region_main}`
        const adCityMain = await sql`SELECT * FROM geo_city WHERE value=${item.city_main}`
        console.log('ad 22 owner', adBreed);
        const regionsExport = await sql`
            SELECT r.value, r.text
            FROM regions r
            JOIN ad_export_regions ar ON r.value = ar.region_id
            WHERE ar.ad_id = ${item.id}`

        return {
            id: item.id,
            created_at: item.created_at,
            date_birth: item.date_birth,
            gender: item.gender,
            name: item.name,
            price: item.price,
            quantitative: item.quantitative,
            region_main: item.region_main,
            city_main: item.city_main,
            geo_main: {
                region: adRegionMain[0],
                city: adCityMain[0],
            },

            status: item.status,
            type_ad: item.type_ad,

            //необязательно для листинга
            description: item.description,
            parents: {
                parents_dad: item.parents_dad,
                parents_mum: item.parents_mum,
            },
            //временнно
            count_image: item.count_image,
            img: item.img,
            //

            breed: adBreed[0],
            exportRegions: {
                isExport: item.is_export,
                regionsList: regionsExport
            },
            ownerDetails: adOwner.length ? adOwner[0] : null,
        }

    }));

    // //  INSERT INTO

    // Ensure the database connection is closed after the request is processed
    event.waitUntil(sql.end())


    return results

})