import { Comment } from "./comment";

export interface Post{
    id:number;
    title:string;
    description:string;
    content:string;
    comments:Comment[];
}