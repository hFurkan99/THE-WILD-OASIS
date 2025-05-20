import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-weight: 600;
      font-size: 3rem;
      color: var(--color-brand-600);
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-weight: 600;
      font-size: 2rem;
    `}

    ${(props) =>
    props.as === "h3" &&
    css`
      font-weight: 400;
      font-size: 2rem;
    `}
`;

export default Heading;
