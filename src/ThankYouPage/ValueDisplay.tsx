import React from 'react';
import { ValueDisplayWrapper } from "./ValueDisplay.styled";

type ValueDisplayProps = {
    label: string;
    value: string;
};

export default function ValueDisplay({ label, value }: ValueDisplayProps) {
    return (
        <ValueDisplayWrapper>
            <span className="label">{label}</span>
            <span className="value">{value}</span>
        </ValueDisplayWrapper>
    )

}