import { Post } from "./post";

export interface PostPagingResponse{
    currentPage:number;
    last:boolean;
    pageSize:number;
    posts:Post[];
    totalElements:number;
    totalPages:number;
}