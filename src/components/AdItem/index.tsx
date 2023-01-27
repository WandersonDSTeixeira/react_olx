import { Link } from 'react-router-dom'
import { AdThumbType } from '../../types/AdThumbType';
import { SingleImgType } from '../../types/SingleImgType';
import { Item } from './styled'

type Props = {
    data: AdThumbType;
    img?: SingleImgType;
}

export const AdItem = ({ data, img }: Props) => {

    const formatPrice = (price: number) => (
        price.toLocaleString('pt-br', {
            minimumFractionDigits: 2,
            style: 'currency',
            currency: 'BRL'
    }));

    let price = '';
    (data.priceNegotiable) ? price = 'Preço Negociável' : price = formatPrice(parseInt(data.price)).toString();
        
    return (
        <Item className='adItem'>
            <Link to={`/ad/${data._id}`}>
                {data.image &&
                    <div className='itemImage'>
                        <img src={data.image.url} alt='' />
                    </div>
                }
                {img &&
                    <div className='itemImage'>
                        <img src={img.url} alt='' />
                    </div>
                }
                <div className='itemName'>{data.title}</div>
                <div className='itemPrice'>{price}</div>
            </Link>
        </Item>
    );
}