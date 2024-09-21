import { IPost } from '@/interface/post.interface';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
    post: IPost, 
};

const PostCard = ({ post } : Props): JSX.Element => {
  const navigate = useNavigate();

  const trimText = (text: string, maxLength: number = 160): string => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  const trimmedContent = trimText(post.content);
  
  const onClickPostDetailPage = () => {
    navigate(post.id);
  };
  console.log('POST TEST', post);
  return (
    <StyledPostCard post={post}>
        <StyledPostCardTitle onClick={() => onClickPostDetailPage()}>
            {post.title}
        </StyledPostCardTitle>
        <StyledPostContent>
            {trimmedContent}
        </StyledPostContent>
    </StyledPostCard>
  );
};
export default PostCard;

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
  justify-content: space-between;
  min-height: 170px;
`;

const StyledPostCardTitle = styled.a`
    font-size: 1rem;
    display: inline-block;
    color:#03045e;
    font-weight: bold;
    text-decoration-line: underline;
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 242px;
    cursor: pointer;
    margin-top: 0px;
`;

const StyledPostContent = styled.div`
    font-size: 0.875rem;
    font-weight: 400;
    text-align: left;
    padding-top: 12px;
    width: 230px;
    cursor: pointer;
    margin-top: 0px;
`;