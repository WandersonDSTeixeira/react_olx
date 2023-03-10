import { Link } from 'react-router-dom'
import { AdThumbType } from '../../types/AdThumbType';
import { SingleImgType } from '../../types/SingleImgType';
import { Item } from './styled'

type Props = {
    data: AdThumbType;
    img?: SingleImgType;
}

export const AdItem = (props: Props) => {

    const formatPrice = (price: number) => (
        price.toLocaleString('pt-br', {
            minimumFractionDigits: 2,
            style: 'currency',
            currency: 'BRL'
    }));

    let price = '';
    (props.data.priceNegotiable) ? price = 'Preço Negociável' : price = formatPrice(parseInt(props.data.price)).toString();
        
    return (
        <Item className='adItem'>
            <Link to={`/ad/${props.data._id}`}>
                {props.data.image &&
                    <div className='itemImage'>
                        <img src={props.data.image.url} alt='' />
                    </div>
                }
                {props.img &&
                    <div className='itemImage'>
                        <img src={props.img.url} alt='' />
                    </div>
                }
                <div className='itemName'>{props.data.title}</div>
                <div className='itemPrice'>{price}</div>
            </Link>
        </Item>
    );
}