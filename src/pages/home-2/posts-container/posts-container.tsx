import styled from 'styled-components';
import PostCard from './posts-card';
import strings from '../scripts/strings';
import { IPost } from '@/interface/post.interface';
import { schoolSubjects } from '../scripts/constants';

interface Props {
  posts: IPost[];
}


const PostsContainer = ({ posts }: Props): JSX.Element => {
    return (
      <StyledPostsContainer>

        {schoolSubjects.map((subject) => ( 
          <>
          <StyledSubjectName>{subject.label}</StyledSubjectName>
          <StyledSubjectSubtitle>{subject.description}</StyledSubjectSubtitle>
          </>
        ))}
      <StyledPostsContainerUl>
          {posts.length > 0 && posts.map((item, index) => (
            <li key={index}>
              <PostCard
                post={item} />
            </li>
          ))}
        </StyledPostsContainerUl>
        </StyledPostsContainer>
    );
};

export default PostsContainer;

const StyledPostsContainer = styled.div`
  font-family: Helvetica, sans-serif;
  width: 75%;
  background-color: #ECF0F1;
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