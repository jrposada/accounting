import { ValueFormatterFunc } from 'ag-grid-community';

export const emptyValueFormatter: ValueFormatterFunc = ({ value }) => {
    return value || '-';
};
