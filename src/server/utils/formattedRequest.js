
export const formattedUserGlobal = (userData) => {
    return {
        email: userData.email,
        first_name: userData.first_name,
        id: userData.id,
        last_name: userData.last_name,
        photo: userData.photo,
        status: userData.status,
        geo_main: {
            region: userData.LocationUserRegion,
            city: userData.LocationUserCity,
            address: userData.address,
        }
    };
}
export const formattedUserAuth = (user) => {
    return {
        id: user.id,
        status: user.status,
        personal_data: {
            email: user.email,
            id: user.id,
            last_name: user.last_name,
            photo: user.photo,
            first_name: user.first_name,
            status: user.status,
            geo_main: {
                city: user.LocationUserCity,
                region: user.LocationUserRegion,
                address: user.address,
            }
        }
    };
}

export const formattedAd = (item) => {
    return {
        id: item.id,
        created_at: item.created_at,
        date_birth: item.date_birth,
        gender: item.gender,
        name: item.name,
        price: item.price,
        quantitative: item.quantitative,
        photos: item.photos,
        region_main: item.region_main,
        city_main: item.city_main,
        geo_main: {
            region: item.LocationRegion,
            city: item.LocationCity,
            // city: adCityMain[0],
        },
        /*geo_main: {
            region: adRegionMain[0],
            city: adCityMain[0],
        },*/
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

        //breed: item.breeds,
        breed: item.Breed,
        exportRegions: {
            isExport: item.is_export,
            regionsList: item.ExportRegions
            //regionsList: item.GeoRegions
        },
        ownerDetails: item.Owner,
    }
}