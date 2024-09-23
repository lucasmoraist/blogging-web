import styled from 'styled-components';
import PostCard from './posts-card';
import { IPost } from '@/interface/post.interface';
import { schoolSubjects } from '../scripts/constants';
import { useEffect, useState } from 'react';
import { http } from '@/utils/axios';

interface DataPagination {
  currentPage: number;
  itemsPerPage: number;
  posts: IPost[];
  totalNumberOfPages: number;
}

const PostsContainer = (): JSX.Element => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [currentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPosts = async (signal: AbortSignal) => {
    try {
      const response = await http().get<DataPagination>(
        `/posts?page=${currentPage}&limit=${itemsPerPage}`,
        { signal }
      );
      return response.data.posts;
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          console.log('Request canceled');
        } else {
          throw new Error('Error when searching for posts: ' + error.message);
        }
      } else {
        throw new Error('Unexpected error');
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchPosts(controller.signal)
      .then((data) => {
        if (data) setPosts(data);
        setLoading(true);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      })
      .finally(() => setLoading(false));

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <StyledPostsContainer>
      {schoolSubjects.map((subject) => (
        <>
          <StyledSubjectName>{subject.label}</StyledSubjectName>
          <StyledSubjectSubtitle>{subject.description}</StyledSubjectSubtitle>
        </>
      ))}
      <StyledPostsContainerUl>
        {loading ? <p>loading...</p> : posts.length > 0 &&
          posts.map((item, index) => (
            <li key={index}>
              <PostCard post={item} />
            </li>
          )) }
      </StyledPostsContainerUl>
      <div>
        {loading ? <p>loading...</p> : error ? <p>{error}</p> : null}
      </div>
    </StyledPostsContainer>
  );
};

export default PostsContainer;

const StyledPostsContainer = styled.div`
  font-family: Helvetica, sans-serif;
  width: 75%;
  background-color: #ecf0f1;
  padding: 0 16px 16px 16px;
  height: fit-content;
  border-radius: 12px;

  @media (max-width: 600px) {
    margin-left: -16px;
    margin-right: -16px;
  }
`;

const StyledSubjectName = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  display: inline-flex;
  margin: 0;
  padding-left: 16px;
  color: #e36414;
`;

const StyledSubjectSubtitle = styled.p`
  font-size: 0.875rem;
  margin: 0;
  padding-left: 16px;
  color: #219ebc;
  padding-top: 8px;
`;

const StyledPostsContainerUl = styled.ul`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  height: auto;
  padding: 8px;
  gap: 16px;
  align-items: center;
  display: flex;
  list-style-type: none;

  li:last-child {
    margin-right: 16px;
  }

  li:first-child {
    margin-left: 16px;
  }

  ::-webkit-scrollbar {
    height: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: grey;
    border-radius: 5px;
    height: 8px;

    @media (max-width: 600px) {
      background-color: transparent;
    }
  }
`;
