import styled from "styled-components";

export const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: ${props => props.theme.colors.primary };
`;

export const FormValuesDisplay = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    border: 1px solid ${props => props.theme.colors.border };
    border-radius: 3px;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px 40px;
`;

export const ValueDisplayGroup = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;

    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
        flex-direction: column;
    }
`;
