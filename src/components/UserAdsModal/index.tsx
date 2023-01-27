import { ModalArea } from './styled';

type Props = {
    open: boolean;
    children: JSX.Element;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    confirmDeletion: boolean;
}

export const UserAdsModal = (props: Props) => {
    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLDivElement).classList.contains('modalBg')) {
            props.setOpen(false);
        }
    }

    return (
        <ModalArea
            open={props.open ?? false}
            onClick={handleModalClick}
            className='modalBg'
            confirmDeletion={props.confirmDeletion ?? false}
        >
            <div className='container'>
                {props.children}
            </div>
        </ModalArea>
    );
}