import { ModalArea } from './styled';

type Props = {
    open: boolean;
    children: JSX.Element;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    confirmDeletion: boolean;
}

export const UserAdsModal = ({ open, children, setOpen, confirmDeletion }: Props) => {
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
            confirmDeletion={confirmDeletion ?? false}
        >
            <div className='container'>
                {children}
            </div>
        </ModalArea>
    );
}