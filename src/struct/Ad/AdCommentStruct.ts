export interface AdCommentSend {
    hash_link_comment: string;
    text_comment: string;
    rating_commenter: number;
    id_user_commenter: number;
}
export interface AdCommentView {
    text: string;
    rating: number;
    id_user: number;
    ad_info: {
        id: number;
        name: string;
    }
}