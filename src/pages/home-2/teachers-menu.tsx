import React, { useState } from 'react';
import styled from 'styled-components';
import { ITeacher } from '@/interface/teacher.interface';
import strings from './scripts/strings';

interface BlogPost {
  title: string;
  content: string;
}

interface Teacher {
  id: number;
  name: string;
  blogPosts: BlogPost[];
}

interface TeachersMenuProps {
  teachers: Teacher[];
}

const TeachersMenu: React.FC<TeachersMenuProps> = ({ teachers }): JSX.Element => {
  const [selectedTeacher, setSelectedTeacher] = useState<ITeacher[]>([]);

  const handleTeacherSelect = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
  };

  return (
    <StyledMenuContainer>
      
    <StyledTeachersMenu>
      <StyledTeachersMenuTitle>{strings.TEACHER_MENU_TITLE}</StyledTeachersMenuTitle>
        <StyledTeacherCard>
          <StyledTeacherImage src='/assets/img/profile.webp' />
          <StyledTeacherName>Prof Lalala </StyledTeacherName>
        </StyledTeacherCard>
        <StyledTeacherCard>
          <StyledTeacherImage src='/assets/img/profile.webp' />
          <StyledTeacherName>Prof KitKat</StyledTeacherName>
        </StyledTeacherCard>
        <StyledTeacherCard>
          <StyledTeacherImage src='/assets/img/profile.webp' />
          <StyledTeacherName>Prof Etc etc</StyledTeacherName>
        </StyledTeacherCard>
    </StyledTeachersMenu>
    </StyledMenuContainer>
    //   {/* Teachers List */}
    //   <div style={{ marginRight: '20px' }}>
    //     <h2>Teachers</h2>
    //     <ul>
    //       {teachers.map(teacher => (
    //         <li key={teacher.id}>
    //           <button onClick={() => handleTeacherSelect(teacher)}>
    //             {teacher.name}
    //           </button>
    //         </li>
    //       ))}
    //     </ul>
    //   </div>

    //   {/* Blog Posts of the Selected Teacher */}
    //   <div>
    //     {selectedTeacher ? (
    //       <>
    //         <h2>{selectedTeacher.name}'s Blog Posts</h2>
    //         <ul>
    //           {selectedTeacher.blogPosts.map((post, index) => (
    //             <li key={index}>
    //               <h3>{post.title}</h3>
    //               <p>{post.content}</p>
    //             </li>
    //           ))}
    //         </ul>
    //       </>
    //     ) : (
    //       <p>Please select a teacher to view their blog posts.</p>
    //     )}
    //   </div>
    // </StyledTeachersMenu>
  );
};

export default TeachersMenu;

const StyledMenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 200vh;
  margin-left: 12px;
`;  
const StyledTeachersMenuTitle = styled.span`
  color: #e36414;
  font-size: 1.2rem;
  padding: 8px;
  font-weight: bolder;
  text-align: center;
`;  
const StyledTeachersMenu = styled.div`
  font-family: Helvetica, sans-serif;
  background-color: #023047;
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 16px;
  width: 320px;
  border-radius: 12px;
  cursor: pointer;
`;

const StyledTeacherCard = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 10px 0;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.09);
  }
`;

const StyledTeacherImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 12px;
  object-fit: cover;
  margin-left: 0;
`;

const StyledTeacherName = styled.p`
  font-size: 0.875;
  font-weight: bold;
  margin: 0;
  color: #F39C12;
  cursor: pointer;
`;