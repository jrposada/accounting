import {
    Button,
    Checkbox,
    FormControlLabel,
    Menu,
    MenuItem,
} from '@mui/material';
import React, { useState } from 'react';

type FilterButtonProps<TOption extends string> = {
    id: string;
    label: string;
    options: {
        label: string;
        name: TOption;
        value: boolean;
    }[];
    onChange: React.Dispatch<React.SetStateAction<Record<TOption, boolean>>>;
};

function FilterButton<TOption extends string>({
    id,
    label,
    options,
    onChange,
}: FilterButtonProps<TOption>) {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOptionClick: React.MouseEventHandler<HTMLLIElement> = (
        event,
    ) => {
        onChange((prev) => {
            const key = event.currentTarget?.dataset?.option as
                | TOption
                | undefined;
            if (!key) return prev;

            return {
                ...prev,
                [key]: !prev[key],
            };
        });
    };

    const open = Boolean(anchorEl);
    const count = Object.values(options).filter((item) => item.value).length;

    return (
        <>
            <Button
                id={id}
                variant={count ? 'contained' : 'outlined'}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {!!count && count} {label}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': id,
                }}
            >
                {options.map(({ label, name, value }) => (
                    <MenuItem
                        key={name}
                        onClick={handleOptionClick}
                        data-option={name}
                    >
                        <FormControlLabel
                            name={name}
                            checked={value}
                            control={<Checkbox />}
                            label={label}
                        />
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}

export default FilterButton;
export type { FilterButtonProps };
