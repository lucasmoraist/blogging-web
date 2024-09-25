import { IPost } from "@/interface/post.interface";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface Props {
  posts?: IPost[];
}

export function Aside({ posts }: Props): JSX.Element {
  const [randomPosts, setRandomPosts] = useState<IPost[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (posts) {
      const selectedPosts = getRandomPosts(posts, 4);
      setRandomPosts(selectedPosts);
    }
  }, [posts]);

  const getRandomPosts = (postList: IPost[], count: number): IPost[] => {
    return postList?.sort(() => Math.random() - 0.5).slice(0, count);
  };

  const trimText = (text: string, maxLength: number = 160): string => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <StyledLatestPostsContainer>
      <StyledLatestPostsTitle>Nossos últimos posts!</StyledLatestPostsTitle>
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
  top: 120px;
  align-self: center;
  background-color: #023047;
  height: 60%;
  padding: 12px;
  border-radius: 12px;
`;

const StyledPostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const StyledPostCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: 350px;
  background-color: #d3edf5;
  border-radius: 8px;
  box-shadow: 0px 1px 2px rgba(47, 46, 46, 0.3);
  position: relative;
  display: flex;
  gap: 30px;
  cursor: pointer;
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
  cursor: pointer;
  margin: 0;
  font-family: Helvetica, sans-serif;
`;

const StyledPostContent = styled.div`
  font-size: 0.875rem;
  font-weight: 400;
  text-align: left;
  margin-top: 0px;
  cursor: pointer;
  padding: 2px;
  font-family: Helvetica, sans-serif;
`;

const StyledLatestPostsTitle = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  color: #e36414;
  font-family: Helvetica, sans-serif;
  text-align: center;
  margin: 20px 0;
`;
