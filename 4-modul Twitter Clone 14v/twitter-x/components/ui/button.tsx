import { cn } from "@/lib/utils";

interface ButtonProps {
    label: string;
    secondary?: boolean;
    fullWidth?: boolean;
    large?: boolean;
    disabled?: boolean;
    outlined?: boolean;
    type?: "button" | "submit";
    onClick?: () => void;
}

export default function Button({
    label,
    disabled,
    fullWidth,
    large,
    onClick,
    outlined,
    secondary,
    type,
}: ButtonProps) {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            type={type}
            className={cn(
                "rounded-full font-semibold border transition hover:opacity-80 disabled:opacity-70 disabled:cursor-not-allowed "
            )}
        >
            {label}
        </button>
    );
}
