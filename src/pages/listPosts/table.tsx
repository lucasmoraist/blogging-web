import { useEffect, useState } from 'react';
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
import { ConfirmModal } from './confirmModal';

interface PostAdmin {
  id: string;
  title: string;
  createdat: string;
  name: string;
  school_subject: string;
}

interface DataPagination {
  currentPage: number;
  itemsPerPage: number;
  posts: PostAdmin[];
  totalNumberOfPages: number;
}

export function TableComponent() {
  const [posts, setPosts] = useState<PostAdmin[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [toggleModal, setToggleModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, [currentPage, itemsPerPage]);

  const fetchPosts = () => {
    http()
      .get<DataPagination>(
        `/admin/posts?page=${currentPage + 1}&limit=${itemsPerPage}`
      )
      .then((response) => {
        console.log(response);
        setPosts(response.data.posts);
        setTotalPages(response.data.totalNumberOfPages);
      })
      .catch((error) => {
        console.error('Erro ao buscar posts:', error);
      });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    event;
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
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
            posts.map((post, index) => (
              <TableRow key={index}>
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
                  <button
                    onClick={() => setToggleModal(true)}
                    className={style.delete}
                  >
                    <Trash />
                  </button>

                  {toggleModal && (
                    <ConfirmModal
                      id={post.id}
                      fetchPosts={fetchPosts}
                      setToggleModal={setToggleModal}
                    />
                  )}
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
          count={totalPages * itemsPerPage} // Total de posts
          page={currentPage}
          onPageChange={handleChangePage}
          rowsPerPage={itemsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Linhas por página:"
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Table>
    </TableContainer>
  );
}
