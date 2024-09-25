import { IPost } from "@/interface/post.interface";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface Props {
  post: IPost;
}

export function Posts({ post }: Props): JSX.Element {
  const navigate = useNavigate();

  const postDate = (date: string) => {
    const today = new Date();
    const postDate = new Date(date);

    const diff = today.getTime() - postDate.getTime();
    const hours = diff / (1000 * 60 * 60);

    if (hours <= 1) {
      return "New";
    } else {
      const day = postDate.getDate().toString().padStart(2, "0");
      const month = (postDate.getMonth() + 1).toString().padStart(2, "0");
      const year = postDate.getFullYear().toString().slice(2);
      const hours = postDate.getHours().toString().padStart(2, "0");
      const minutes = postDate.getMinutes().toString().padStart(2, "0");

      return `${day}/${month}/${year} •${hours}:${minutes}`;
    }
  };

  return (
    <PostContainer onClick={() => navigate(`/post/${post.id}`)}>
      <PostImage>
        <img
          src={post.urlimage}
          alt={`Imagem da postagem sobre ${post.title}`}
        />
      </PostImage>
      <PostInfoWrapper>
        <PostInfo>
          <h2>{post.title}</h2>
          <PostNotification>
            {postDate(post.createdat) === "New" ? (
              <NewPostBadge>Novo!</NewPostBadge>
            ) : (
              <OldPostBadge>{postDate(post.createdat)}</OldPostBadge>
            )}
          </PostNotification>
        </PostInfo>
        <PostDescription>
          <p>{post.content.slice(0, 80)}...</p>
        </PostDescription>
      </PostInfoWrapper>
    </PostContainer>
  );
}

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 254px;
  height: auto;
  padding-bottom: 5px;
  gap: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  @media (min-width: 640px) {
    flex-direction: row;
    width: 676px;
    height: 229px;
    padding-bottom: 0;
  }

  @media (min-width: 768px) {
    width: 800px;
  }
`;

const PostImage = styled.div`
  height: 171px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px 10px 0 0;
    cursor: pointer;
  }

  @media (min-width: 768px) {
    width: 355px;
    height: 100%;

    img {
      width: 250px;
      border-radius: 10px 0 0 10px;
    }
  }

  @media (min-width: 1280px) {
    width: 355px;
  }

  @media (min-width: 1920px) {
    width: 400px;
  }
`;

const PostInfoWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 0 5px;

  @media (min-width: 640px) {
    padding: 10px 5px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

const PostInfo = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  h2 {
    width: 70%;
    font-family: "Helvetica", sans-serif;
    font-size: 18px;
    color: #219ebc;

    @media (min-width: 640px) {
      font-size: 28px;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    @media (min-width: 1280px) {
      font-size: 32px;
    }
  }
`;

const PostNotification = styled.div`
  width: 30%;
  height: auto;
  text-align: right;
  font-family: "Helvetica", sans-serif;
  font-size: 16px;
`;

const NewPostBadge = styled.span`
  color: #ecf0f1;
  background-color: #f39c12;
  padding: 3px 4px;
  border-radius: 30px;

  @media (min-width: 640px) {
    padding: 6px 8px;
  }
`;

const OldPostBadge = styled.span`
  color: #219ebc;
`;

const PostDescription = styled.div`
  display: none;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #219ebc;

  p {
    cursor: pointer;
  }

  @media (min-width: 640px) {
    display: flex;
  }
`;
