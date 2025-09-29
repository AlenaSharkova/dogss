
export async function getCommentsListUsers(user, UsersModel) {
    const comments = await Promise.all(
        user.UserAdList?.map(async (ad) => {
            if (!ad.rating_commenter) return null;
            const userCommenter = await UsersModel.findOne({ where: { id: ad.id_user_commenter } });
            console.log('userCommenter', userCommenter);
            return {
                ad_info: {
                    id: ad.id,
                    name: ad.name,
                    status: ad.status,
                    created_at: ad.created_at
                },
                commenter: {
                    id: ad.id_user_commenter,
                    full_name: `${userCommenter?.first_name || ''} ${userCommenter?.last_name || ''}` || 'Неизвестный пользователь'
                },
                text: ad.text_comment || '',
                rating: ad.rating_commenter,
            };
        })
    );
    return comments.filter(Boolean);
}