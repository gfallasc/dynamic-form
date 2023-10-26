import styled, { css } from "styled-components";

const baseInputStyles = css<{ $error: boolean}>`
    padding: 0.5em;
    background: white;
    border-radius: 3px;
    border: 1px solid ${props => (props.$error ? props.theme.colors.error: props.theme.colors.border )};
    width: 100%;
    box-sizing: border-box;
    font-size: 14px;
    outline: none;
    height: 40px;

    &:focus {
        border-color: ${props => props.theme.colors.borderFocus };
    }
`;

export const FormFieldWrapper = styled.div<{ flex?: string }>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: ${props => props.flex || '1'};
`;

export const Label = styled.label`
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    color: #3f3f3f;
`;

export const RequiredMark = styled.span`
    color: ${props => props.theme.colors.error};
    margin-left: 4px;
    font-size: 14px;
    position: absolute;
`;

export const Input = styled.input<{ $error: boolean}>`
    ${baseInputStyles}
`;

export const TextArea = styled.textarea<{ $error: boolean}>`
    ${baseInputStyles}
    max-width: 100%;
    min-width: 100%;
`;

export const Select = styled.select<{ $error: boolean}>`
  ${baseInputStyles}
`;

export const FormFieldError = styled.span`
    color: ${props => props.theme.colors.error};
    line-height: 30px;
    font-size: 13px;
`;
