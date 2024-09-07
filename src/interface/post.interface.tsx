import { ITeacher } from "./teacher.interface";

export interface IPost {
    id: number;
    title: string;
    content: string;
    image?: string;
    createdAt: string;
    teacher: ITeacher;
}