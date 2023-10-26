import styled from "styled-components";

export const ValueDisplayWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    flex: 1;
    gap: 3px;

    .label {
        font-weight: bold;
    }

    .value {
        text-align: justify;
    }
`;