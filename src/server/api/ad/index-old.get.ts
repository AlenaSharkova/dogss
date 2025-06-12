

export default defineEventHandler<{query: {
        breeds?: string;
        'max-price'?: string;
        'min-price'?: string;
        regions?: string;
        type?: string;
        gender?: string;
        city?: string;

        limit?: number;
        offset?: number;
    }
    }>(async (event)=>

{
    const sql = usePostgres()

    const query = getQuery(event)
    const queryFull = {
        breeds: null as any,
        regions: null as any,
    }

    let sqlQuery = 'SELECT * FROM ad_list WHERE';

    const conditions = [] as any[];// Начальное условие (пустое)

    if (query.type) {
        conditions.push(sql`type_ad = ${query.type}`);
    }
    if (query.breeds) {
       let breeds = []
        const queryBreedsArr = query.breeds.split(',')
        const breedsSql = queryBreedsArr.reduce((acc, breed, index) => {
            if (index == queryBreedsArr.length - 1) return sql`${acc}${breed}`
            return sql`${acc}${breed}, `
        }, sql``)
        conditions.push( sql`breed_id IN (${breedsSql})` );
        queryFull.breeds = await sql`SELECT * FROM breeds WHERE value IN (${breedsSql})`
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
        queryFull.regions = []
        let queryRegionsArr = query.regions.split(',')
        const regionsSql = queryRegionsArr.reduce((acc, reg, index) => {
            if(index == queryRegionsArr.length - 1) return sql`${acc}${reg}`
            return sql`${acc}${reg}, `
        }, sql``)
        conditions.push( sql`region_main IN (${regionsSql})` );
        queryFull.regions = await sql`SELECT * FROM geo_regions WHERE value IN (${regionsSql})`

    }
    if (query.city) {
        const citySql = query.city.split(',').reduce((acc, reg, index) => {
            if(index == (query.city as string).split(',').length - 1) return sql`${acc}${reg}`
            return sql`${acc}${reg}, `
        }, sql``)
        conditions.push( sql`city_main IN (${citySql})` );
    }

    // Добавляем LIMIT и OFFSET (пагинация - необязательно, но часто используется)
    let limit = 12; //значение по умолчанию
    let offset = 0; //значение по умолчанию
    if (query.limit) {
        limit = query.limit;
    }
    if (query.offset) {
        offset = query.offset;
    }

    let adListDB, countAdListDB
    console.log('sqlQuery', query, sqlQuery)
    if (conditions.length > 0) {
        console.log('adListDB2 conditions', conditions)

        try {
            let whereClause = sql``;
            let combinedConditions = sql``;

            for (let i = 0; i < conditions.length; i++) {
                if (i > 0) combinedConditions = sql`${combinedConditions} AND ${conditions[i]}`;
                else combinedConditions = conditions[i];
            }
            console.log('adListDB2 0', combinedConditions)
            whereClause = sql`WHERE ${combinedConditions}`;

            adListDB = await sql`
                SELECT * FROM ad_list ${whereClause} 
                LIMIT ${limit} OFFSET ${offset}`;

            countAdListDB = await sql`
                SELECT COUNT(*) FROM ad_list ${whereClause}`;

            console.log('adListDB2 result', adListDB)

            console.log('adListDB2', whereClause)

        } catch (error) {
            adListDB = []
            console.error('Error executing SQL query:', error); // Добавлено
            throw error; // Перебросить ошибку, чтобы ее можно было обработать выше
        }
    } else {
        adListDB = await sql`SELECT * FROM ad_list LIMIT ${limit} OFFSET ${offset}`
        countAdListDB = await sql`SELECT COUNT(*) FROM ad_list`;
    }

    //const adListDB2 = await sql`${sql.raw(baseQuery)} ${sql.raw(values.map((val, index) => `$${index+1} = ${sql.value(val)}`).join(' AND '))}`;
    //const { rows: adListDB2 } = await sql.query(baseQuery, values);


    console.log('ad 22', adListDB );
    let result = await Promise.all(adListDB.map(async (item) => {
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
            photos: item.photos,
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


    return {
        limit: Number(limit),
        queryDetails: queryFull,
        offset: Number(offset),
        count: Number(countAdListDB[0].count),
        result: result
    }

})