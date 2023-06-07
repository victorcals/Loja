import styled from "styled-components";

export const Container = styled.div`

h1 {
    margin: 3rem 0;
  }


  .movies {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  img {
    width: 300px;
    border-radius: 1rem;
  }
  
  .details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 6rem;
    max-width: 50%;


    
button {
    font-size: 0.8rem;
    padding: 1rem 2rem;
    border: none;
    outline: none;
    border-radius: 0.4rem;
    cursor: pointer;
    margin: 1rem;
    background-color: rgb(14, 14, 26);
    color: rgb(234, 234, 234);
    font-weight: 700;
    transition: 0.6s;
    box-shadow: 0px 0px 30px #1f4c65;
 
  }

  
  button:active {
    scale: 0.92;
  }
 
  button:hover {
    background: rgb(2, 29, 78);
    background: linear-gradient(270deg, rgba(2, 29, 78, 0.681) 0%, rgba(31, 215, 232, 0.873) 40%);
    color: rgb(4, 4, 38);
  }


  
span {
    line-height: 130%;
    margin-bottom: 1rem;
  }
`


export const Fina = styled.div`
h2{
  text-align: center;
}



div{
  text-align: center;
  margin: 2rem;
}
`






