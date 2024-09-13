import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { Pencil, Trash } from 'lucide-react';
import style from './listPosts.module.scss';
import { http } from '@/utils/axios';

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  useEffect(() => {
    http()
      .get('/admin/posts')
      .then((response) => {
        setPosts(response.data);
      });
  }, []);

  const deletePost = (postId: string) => {
    http()
      .delete(`/admin/posts/${postId}`)
      .then(() => {
        const listPost = posts.filter((post) => post.id !== postId);
        setPosts([...listPost]);
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
          {posts
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((post) => (
              <TableRow key={post.id} className={style.tableRowBody}>
                <TableCell>
                  <Link to={'/admin/update'} className={style.link}>
                    {post.title}
                  </Link>
                </TableCell>
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
            ))}
        </TableBody>
        <TablePagination
          component="div"
          count={posts.length} // Total de posts
          page={page} // Página atual
          onPageChange={handleChangePage} // Função que muda a página
          rowsPerPage={rowsPerPage} // Quantidade de itens por página
          onRowsPerPageChange={handleChangeRowsPerPage} // Função que muda quantos itens exibir por página
          labelRowsPerPage="Linhas por página:"
        />
      </Table>
    </TableContainer>
  );
}
