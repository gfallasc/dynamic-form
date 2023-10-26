import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: 3px;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px 40px;
`;

export const SubmitButton = styled.button`
  padding: 0.5em 1em;
  color: white;
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 3px;
  border: none;
  cursor: pointer;
  width: 100px;
  backface-visibility: hidden;
  height: 40px;

  transition: filter 0.3s ease, transform 0.1s ease;

  &:hover {
    filter: brightness(0.7);
    transform: scale(1.05);
  }

  &:active {
    filter: brightness(1);
    transform: scale(1);
  }

  &:focus {
    outline: none;
  }
`;

export const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: ${props => props.theme.colors.primary};
`;

export const FormFieldGroup = styled.fieldset`
  display: flex;
  gap: 20px;
  border: none;
  padding: 0;
  margin: 0;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      flex-direction: column;
  }
`;