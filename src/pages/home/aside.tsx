import { IPost } from '@/interface/post.interface';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  posts: IPost[];
}

// Idéia:
// De início os posts que irão aparecer na lateral podem ser apenas posts aleatórios
// Mas pode-se mudar o objetivo e mostrar apenas os posts melhores avaliados
export function Aside({ posts }: Props): JSX.Element {
  const [randomPosts, setRandomPosts] = useState<IPost[]>([]);
  const navigate = useNavigate();

  const getRandomPosts = (postList: IPost[], count: number): IPost[] => {
    return postList.sort(() => Math.random() - 0.5).slice(0, count);
  };

  useEffect(() => {
    const selectedPosts = getRandomPosts(posts, 4);
    setRandomPosts(selectedPosts);
  }, [posts]);

  const trimText = (text: string, maxLength: number = 160): string => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <StyledLatestPostsContainer>
      <StyledLatestPostsTitle>
        Nossos últimos posts!
      </StyledLatestPostsTitle>
      <StyledPostWrapper>
        {randomPosts.map((post, index) => (
          <StyledPostCard
            key={index}
            onClick={() => navigate(`/post/${post.id}`)}
          >
            <StyledPostCardTitle>{post.title}</StyledPostCardTitle>
            <StyledPostContent>{trimText(post.content)}</StyledPostContent>
          </StyledPostCard>
        ))}
      </StyledPostWrapper>
    </StyledLatestPostsContainer>
  );
}

const StyledLatestPostsContainer = styled.div`
  position: sticky;
  top: 16px;
  align-self: flex-start;
  background-color: #023047;
  padding: 12px;
  border-radius: 12px;
`;

const StyledPostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledPostCard = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 0 16px 0;
  padding: 16px;
  width: 264px;
  background-color: #d3edf5;
  border-radius: 8px;
  box-shadow: 0px 1px 2px rgba(47, 46, 46, 0.3);
  position: relative;
  display: flex;
  gap: 15px;
  cursor: pointer;
  height: 160px;
`;

const StyledPostCardTitle = styled.a`
  font-size: 0.875rem;
  display: inline-block;
  color: #03045e;
  font-weight: bold;
  text-decoration-line: underline;
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: clip;
  width: 240px;
  cursor: pointer;
  margin: 0;
  font-family: Helvetica, sans-serif;
`;

const StyledPostContent = styled.div`
  font-size: 0.875rem;
  font-weight: 400;
  text-align: left;
  width: 230px;
  margin-top: 0px;
  cursor: pointer;
  padding: 2px;
  font-family: Helvetica, sans-serif;
`;
 
 const StyledLatestPostsTitle = styled.p`
  font-weight: 600;
  color: #e36414;
  display: flex;
  text-align: center;
  align-self: self-end;
  font-family: Helvetica, sans-serif;
  margin-left: 36px;
 `;
