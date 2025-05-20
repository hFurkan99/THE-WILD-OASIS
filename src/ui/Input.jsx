import styled from "styled-components";

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  &:focus {
    border-color: blue;
    outline: none;
  }
`;

export default Input;
