export interface AdCommentSend {
    hash_link_comment: string;
    text_comment: string;
    rating_commenter: number;
    id_user_commenter: number;
}
export interface AdCommentView {
    text: string;
    rating: number;
    commenter: {
        id: number;
        full_name: string;
    }
    ad_info: {
        id: number;
        name: string;
        status: string,
        created_at: string
    }
}