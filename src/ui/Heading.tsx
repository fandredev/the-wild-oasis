import styled, { css } from 'styled-components';

interface HeadingProps {
  as: string;
}

const Heading = styled.h1<Partial<HeadingProps>>`
  line-height: 1.4rem;

  ${(props) =>
    props.as === 'h1' &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === 'h2' &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === 'h3' &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}
`;

export default Heading;
