import { ModalArea } from './styled';

type Props = {
    open: boolean;
    children: JSX.Element;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserInfoModal = ({ open, children, setOpen }: Props) => {
    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLDivElement).classList.contains('modalBg')) {
            setOpen(false);
        }
    }

    return (
        <ModalArea
            open={open ?? false}
            onClick={handleModalClick}
            className='modalBg'
        >
            <div className='container'>
                {children}
            </div>
        </ModalArea>
    );
}