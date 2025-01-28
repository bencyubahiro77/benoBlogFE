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
    users: User[];
    currentPage: number;
    totalPages: number;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export interface blogsState{
    blogs: Blogs[];
    currentPage: number;
    totalPages: number;
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
    authorID: string;
    comments: string [];
    createdAt?: string;
    updatedAt?: string;
}