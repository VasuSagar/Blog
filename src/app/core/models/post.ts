import { Comment } from "./comment";

export interface Post {
    id: number;
    title: string;
    description: string;
    content: string;
    comments: Comment[];
    likes: any[];
    likesCount: number;
    createdDate: string;
    userId: number;
    userName: string;
    isLikedByMe:boolean;
}