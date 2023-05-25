import styled from 'styled-components'

export const CabinetStyled = styled.div`
  display: grid;
  row-gap: 20px;
  width: max-content;
  padding: 20px 0 0 30px;
`;
export const CabinetStyledAvatar = styled.span<{avatar_code: null | number, avatars: string[]}>`
  ${(p) => {
    return {
      backgroundImage: `url(${p.avatar_code !== null ? p.avatars[p.avatar_code] : 'https://vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png'})`
    }
  }};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100px;
  width: 100px;
  cursor: pointer;
  border-radius: 50%;
  margin: 0 auto;
`;

export const CabinetStyledBox = styled.div`
  display: grid;
  row-gap: 10px;
`;

export const CabinetModalListOfAvatars = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 0;
  padding: 10px;
  
  .avatar-radio {
    margin: 0;
    position: relative;
    width: 60px;
    height: 60px;
  }
  
  .ant-radio {
    position: absolute;
    top: 5px;
    left: 5px;
    & + span {
      padding: 0;
    }
  }
`;

export const CabinetModalListItem = styled.li<{img: string}>`
  width: 60px;
  height: 60px;
  background-image: url("${({img}) => img || 'https://vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png'}");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
`;