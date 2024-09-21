import { ITeacher } from './teacher.interface';

export interface IPost {
    id: string;
    title: string;
    content: string;
    urlimage?: string;
    createdat: string;
    teacher: ITeacher;
}