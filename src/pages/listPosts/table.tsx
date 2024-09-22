import React, { useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from '@mui/material';
import { Pencil, Trash } from 'lucide-react';
import { http } from '@/utils/axios';
import style from './listPosts.module.scss';
import { useNavigate } from 'react-router-dom';

interface PostAdmin {
  id: string;
  title: string;
  content: string;
  createdat: string;
  name: string;
  school_subject: string;
}

export function TableComponent() {
  const [posts, setPosts] = useState<PostAdmin[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPosts, setTotalPosts] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage]);

  const fetchPosts = () => {
    http()
      .get(`/admin/posts?page=${page + 1}&limit=${rowsPerPage}`)
      .then((response) => {
        // Assumindo que a resposta é um array de posts e contém a quantidade total de posts
        if (Array.isArray(response.data)) {
          setPosts(response.data);
          // Se você tiver um endpoint separado para obter o total de posts, ajuste aqui
          setTotalPosts(response.data.length); // Ajuste conforme a resposta da API
        } else {
          console.error('Resposta da API não é um array:', response.data);
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar posts:', error);
      });
  };

  const deletePost = (postId: string) => {
    http()
      .delete(`/admin/posts/${postId}`)
      .then(() => {
        fetchPosts(); // Recarregar a lista de posts após exclusão
      })
      .catch((error) => {
        console.error('Erro ao excluir post:', error);
      });
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    event?.preventDefault();
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const dateFormatter = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  return (
    <TableContainer component={Paper} className={style.tableContainer}>
      <Table>
        <TableHead className={style.tableHead}>
          <TableRow>
            <TableCell className={style.tableCell}>
              Titulo da Postagem
            </TableCell>
            <TableCell className={style.tableCell} sx={{ textAlign: 'center' }}>
              Nome do professor
            </TableCell>
            <TableCell className={style.tableCell} sx={{ textAlign: 'center' }}>
              Disciplina
            </TableCell>
            <TableCell className={style.tableCell} sx={{ textAlign: 'center' }}>
              Data de criação
            </TableCell>
            <TableCell className={style.tableCell} sx={{ textAlign: 'center' }}>
              Ações
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.length > 0 ? (
            posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{post.name}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  {post.school_subject}
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  {dateFormatter(post.createdat)}
                </TableCell>
                <TableCell
                  sx={{ display: 'flex', justifyContent: 'space-around' }}
                >
                  <button
                    onClick={() => navigate(`/admin/update/${post.id}`)}
                    className={style.edit}
                  >
                    <Pencil />
                  </button>
                  {/* Criar modal de confirmação antes de apagar o post */}
                  <button
                    onClick={() => deletePost(post.id)}
                    className={style.delete}
                  >
                    <Trash />
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                Nenhum post encontrado
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TablePagination
          component="div"
          count={totalPosts}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Linhas por página:"
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Table>
    </TableContainer>
  );
}
