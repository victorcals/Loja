import styled from "styled-components";

export const Container = styled.div`
  h1 {
    text-align: center;
    margin: 4rem;
  }
`;

export const ProductsList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 2rem;
  justify-items: center;
  align-items: start;
`;

export const OrderByContainer = styled.div`
  margin-top: -50px;
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  h3 {
    flex-basis: 100%;
    text-align: center;
    margin-bottom: 1rem;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
  }

  input[type="text"],
  select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
  }
`;
