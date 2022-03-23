import styled from 'styled-components';

export const FormStyles = styled.div`
  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin-bottom: 1rem;
    font-size: 1rem;
    outline: none;
    &:focus {
      border-color: #000;
    }
  }
  textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin-bottom: 1rem;
    font-size: 1rem;
    outline: none;
    &:focus {
      border-color: #000;
    }
  }
`;
