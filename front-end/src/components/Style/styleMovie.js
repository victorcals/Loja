import styled from "styled-components";


/* FR é uma unidade medida do css > chamada de fração 
  quando coloca 1 FR significa que pode pegar todo o espaço disponível
  ai tifca 1 do lado do outro
  */

export const Movie = styled.li`
display: flex;
flex-direction: column;

align-items: center;

img {
  
    width: 180px;
    border-radius: 1rem;
    margin-bottom: 2rem;
  }
  span {

    font-size: 120%;
    font-weight: bold;
  }
  
  a {
    transition: all 0.3s;
  }
  
  a:hover {
    transform: scale(1.2);
  }


`