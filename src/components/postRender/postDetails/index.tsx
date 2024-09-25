import { IPost } from '@/interface/post.interface';
import styled from 'styled-components';

interface Props {
  post: IPost;
}

export function Post({ post }: Props): JSX.Element {
  const dateFormatted = (date: string) => {
    const postDate = new Date(date);

    const day = postDate.getDate().toString().padStart(2, '0');
    const month = (postDate.getMonth() + 1).toString().padStart(2, '0');
    const year = postDate.getFullYear().toString().slice(2);
    const hours = postDate.getHours().toString().padStart(2, '0');
    const minutes = postDate.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} • ${hours}:${minutes}`;
  };

  return (
    <PostWrapper>
      <PostContent>
        <PostImage>
          <img src={post.urlimage} alt={post.title} />
        </PostImage>
        <PostTextWrapper>
          <PostTextContent>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </PostTextContent>
        </PostTextWrapper>
      </PostContent>

      <PostInfo>
        <p>Postado: {dateFormatted(post.createdat)}</p>
        {/* <p>Criado por: {post.teacher.name}</p> */}
      </PostInfo>
    </PostWrapper>
  );
}

const PostWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 105px;
`;

const PostContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const PostImage = styled.div`
  display: flex;
  justify-content: center;

  img {
    width: 100%;
    max-width: 700px;
    height: auto;
    max-height: 500px;
    object-fit: cover;
    border-radius: 10px;
  }

  @media (min-width: 1200px) {
    img {
      max-width: 1000px;
    }
  }
`;

const PostTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  @media (min-width: 1024px) {
    align-items: center;
  }
`;

const PostTextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  h2 {
    font-family: 'Helvetica', sans-serif;
    font-size: 24px;
    color: #219ebc; // $color-secondary
    font-weight: 500;
    line-height: auto;
  }

  p {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    color: #219ebc; // $color-secondary
    line-height: 24px;
    text-align: justify;
  }

  @media (min-width: 768px) {
    h2 {
      font-size: 40px;
    }

    p {
      font-size: 20px;
    }
  }

  @media (min-width: 1024px) {
    width: 700px;
  }

  @media (min-width: 1280px) {
    width: 1000px;
  }
`;

const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  p {
    font-family: 'Montserrat', sans-serif;
    font-size: 10px;
    color: #219ebc; // $color-secondary
    font-weight: 600;
    line-height: 15px;
  }

  @media (min-width: 768px) {
    p {
      font-size: 14px;
    }
  }
`;
