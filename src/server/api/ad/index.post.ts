import {getUserAuth} from "~/server/services/auth.service";

export default defineEventHandler(async (event)=>
{
    const authHeader = getHeader(event, 'authorization')
    const token = authHeader && authHeader.split(' ')[1];// Bearer <token>

    const body = await readBody(event)

    const AdList = event.context.AdList;
    const Users = event.context.Users;
    const AdExportRegions = event.context.AdExportRegions;

    let adItemCreateResult
    //TODO: валидация

    try {
        let user
        await getUserAuth(token, Users)
            .then(res => user = res)
            .catch(err => {
                throw err
            })

        if (!user) {
            console.error(`Пользователь с ID ${body.owner} не найден!`);
            throw createError({
                statusCode: 500,
                message: `Пользователь с ID ${body.owner} не найден!`,
            });
        }
        adItemCreateResult = await AdList.create(body);

        if (body.is_export && body.regionsExport && body.regionsExport.length ) {
            for (const regionId of body.regionsExport) {
                await AdExportRegions.create({
                    ad_id: adItemCreateResult.id,
                    region_id: regionId
                });
            }
        }

        //await adItemCreateResult.reload()

        /*adItemCreateResult = await sql`
            INSERT INTO ad_list (
                    img, name, owner, price,
                    count_image, date_birth, breed_id, type_ad, 
                    description, is_export, parents_mum, parents_dad,
                    region_main, city_main, gender, quantitative,
                    status
                ) 
                VALUES (
                    ${body.img}, ${body.name}, ${body.owner}, ${body.price},
                    ${body.count_image}, ${body.date_birth}, ${body.breed_id}, ${body.type_ad},
                    ${body.description}, ${body.is_export}, ${body.parents_mum}, ${body.parents_dad},
                    ${body.region_main}, ${body.city_main}, ${body.gender}, ${body.quantitative},
                    'active'
                    )
                RETURNING *
                `
        console.log('adItemCreateResult', adItemCreateResult)
        if (body.is_export && body.regionsExport && body.regionsExport.length ) {
            for (const regionId of body.regionsExport) {
                await sql`
                INSERT INTO ad_export_regions (ad_id, region_id) 
                VALUES (${adItemCreateResult[0].id}, ${regionId})
                RETURNING *;
            `;
            }
        }

        event.waitUntil(sql.end())*/

        return adItemCreateResult
    }
    catch (error) {
        console.log('Ошибка при создании объявления ', error )
        throw createError({
            statusCode: 400,
            message: error,
            statusMessage: 'Ошибка при создании объявления',
        })

    }

    /*
    const { title, description, category, price, location, contact_phone, images } = req.body;

  // 1. Валидация данных (очень важна!)
  if (!title || !description || !category || !contact_phone) {
    return res.status(400).json({ error: 'Не все обязательные поля заполнены' });
  }

  // 2. Создание нового объявления в таблице ad_list
  const adData = {
    title: title,
    description: description,
    category: category,
    price: price || null, // Если цена не указана, ставим NULL
    location: location || null,
    contact_phone: contact_phone,
  };

  db.query('INSERT INTO ad_list SET ?', adData, (err, result) => {
    if (err) {
      console.error('Ошибка при создании объявления:', err);
      return res.status(500).json({ error: 'Ошибка при создании объявления' });
    }

    const adId = result.insertId; // Получаем ID созданного объявления

    // 3. Добавление изображений в таблицу ad_images (если они есть)
    if (images && images.length > 0) {
      const imageValues = images.map((imageUrl) => [adId, imageUrl]);  // Формируем массив значений для вставки

      db.query('INSERT INTO ad_images (ad_id, image_url) VALUES ?', [imageValues], (err, result) => {
        if (err) {
          console.error('Ошибка при добавлении изображений:', err);
          // ВАЖНО: Здесь нужно откатить транзакцию, если произошла ошибка! (см. ниже)
          return res.status(500).json({ error: 'Ошибка при добавлении изображений' });
        }

        // 4. Успешный ответ
        res.status(201).json({ message: 'Объявление успешно создано', adId: adId });
      });
    } else {
      // Если нет изображений, просто отправляем успешный ответ
      res.status(201).json({ message: 'Объявление успешно создано', adId: adId });
    }
  });*/

    /*var results = await Promise.all(ad.map(async (item) => {
        const adOwner =  await sql`SELECT * FROM users WHERE id=${item.owner}`
        console.log('ad 22 owner', `SELECT * FROM users WHERE id=${item.owner}`, adOwner);
        return {
            ...item,
            ownerDetails: adOwner.length? adOwner[0] : null,
        }
    }));
*/


    // //  INSERT INTO

    // Ensure the database connection is closed after the request is processed




})