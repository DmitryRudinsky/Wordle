import { windowType } from '@/app/interfaces/window.ts';

interface SelectPageFromHeaderProps {
    window: windowType | null;
    option: windowType;
    setWindowValue: (window: windowType) => void;
}

export const selectPageFromHeader = ({
    window,
    option,
    setWindowValue,
}: SelectPageFromHeaderProps) => {
    if (window === 'game' || window !== option) {
        setWindowValue(option);
    } else if (window === option) {
        setWindowValue('game');
    }
};
