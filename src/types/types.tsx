export interface paginationProps{
    currentPage: number,
    totalPages: number,
    onPageCHange: (page: number) => void
}

export interface SearchProps {
    query: string; 
    onSearch: (value: string) => void; 
}

export interface ToastProps {
    message: any;
    type:any
}
export interface User {
    _id: string;
    uuid: string;
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export interface UsersState {
    usersByPage:  Record<number, User[]>;
    currentPage: number;
    totalPages: number;
    totalUsers:number
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export interface blogsState{
    blogsByPage: Record<number,Blogs[]>;
    currentPage: number;
    totalBlogs: number;
    totalComments:number;
    totalPages: number;
    totalComment:number;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export interface Blogs {
    _id: string;
    uuid: string;
    title: string;
    coverImage: string;
    description: string;
    category: string;
    author: string;
    authorId: string;
    comments: string [];
    createdAt?: string;
    updatedAt?: string;
}