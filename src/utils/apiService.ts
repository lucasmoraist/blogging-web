import { IDataPagination } from '@/interface/pagination.interface';
import { IPostAdmin } from '@/interface/post-admin.interface';
import { IPost } from '@/interface/post.interface';
import { IRegisterPost } from '@/interface/register-post.interface';
import { ISearchResult } from '@/interface/search-result.interface';
import axios from 'axios';
import { redirect } from 'react-router-dom';

interface DataPagination {
  currentPage: number;
  itemsPerPage: number;
  posts: IPostAdmin[];
  totalNumberOfPages: number;
}

// Função para configurar a instância do Axios
const apiClient = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');

  if (!token) redirect('/login');

  return axios.create({
    baseURL: apiUrl,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

const apiService = {
  // Método para criar um post
  createPost: async (post: IRegisterPost | undefined) => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    const token = localStorage.getItem('token');

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else {
      console.error('Token não encontrado');
    }

    try {
      const response = await apiClient().post('/admin/posts', post, {
        headers,
      });
      return response;
    } catch (err) {
      console.error('Erro ao criar post:', err);
    }
  },

  // Método para obter um post por ID
  getPost: async (id: string | undefined) => {

    try {
      const response = await apiClient().get(`/posts/${id}`);
      return response;
    } catch (err) {
      console.error('Erro ao buscar post:', err);
    }
  },

  // Método para atualizar um post
  updatePost: async (id: string, post: IPost | undefined) => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    const token = localStorage.getItem('token');

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else {
      console.error('Token não encontrado');
    }

    try {
      const response = await apiClient().put(`/admin/posts/${id}`, post, {
        headers,
      });
      return response;
    } catch (err) {
      console.error('Erro ao atualizar post:', err);
    }
  },

  // Método para deletar um post
  deletePost: async (id: string) => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    const token = localStorage.getItem('token');

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else {
      console.error('Token não encontrado');
    }

    try {
      const response = await apiClient().delete(`/admin/posts/${id}`, {
        headers,
      });
      return response;
    } catch (err) {
      console.error('Erro ao deletar post:', err);
    }
  },

  // Método para listar posts para o admin
  listAdmin: async (currentPage: number, itemsPerPage: number) => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    const token = localStorage.getItem('token');

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else {
      console.error('Token não encontrado');
    }

    try {
      const response = await apiClient().get<DataPagination>(
        `/admin/posts?page=${currentPage + 1}&limit=${itemsPerPage}`,
        { headers }
      );
      return response;
    } catch (err) {
      console.error('Erro ao buscar posts:', err);
    }
  },

  // Método para listar posts
  listPosts: async (currentPage: number, itemsPerPage: number) => {
    try {
      const response = await apiClient().get<IDataPagination>(
        `/posts?page=${currentPage}&limit=${itemsPerPage}`
      );
      return response.data;
    } catch (err) {
      console.error('Erro ao buscar posts:', err);
    }
  },

  // Método para buscar posts por title
  searchPosts: async (term: string) => {
    try {
      const response = await apiClient().get<ISearchResult[]>(`/posts/search`, { params: { term } });
      return response;
    } catch (error) {
      console.error(error);
    }
  },

  // Método para cadastro de professor
  registerTeacher: async (data: any) => {
    try {
      const response = await apiClient().post('/teacher', data);
      return response;
    } catch (err) {
      console.error('Erro ao cadastrar professor:', err);
    }
  },

  // Método para cadastro de usuário
  registerUser: async (data: any) => {
    try {
      const response = await apiClient().post('/user', data);
      return response;
    } catch (err) {
      console.error('Erro ao cadastrar usuário:', err);
    }
  },

  // Método para login
  login: async (data: any) => {
    try {
      const response = await apiClient().post('/user/signin', data);
      return response;
    } catch (err) {
      console.error('Erro ao fazer login:', err);
    }
  },
};

export default apiService;
