import { BasketItemControl } from '@/components/basket';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { BasketItemProps } from './interface';

const BasketItem: React.FC<BasketItemProps> = ({ product }) => {

  return (
    <div className="basket-item">
      <BasketItemControl product={product} />
      <div className="basket-item-wrapper">
        <div className="basket-item-img-wrapper">
          <Image
            alt={product.name}
            className="basket-item-img"
            src={product.image}
            width={200}
            height={200}
          />
        </div>
        <div className="basket-item-details">
          <Link href={`/product/${product.id}`} onClick={() => document.body.classList.remove('is-basket-open')}>
            <h4 className="underline basket-item-name">
              {product.name}
            </h4>
          </Link>
          <div className="basket-item-specs">
            <div>
              <span className="spec-title">Quantity</span>
              <h5 className="my-0">{product.quantity}</h5>
            </div>
            <div>
              <span className="spec-title">Size</span>
              <h5 className="my-0">
                {product.selectedSize}
                {' '}
                mm
              </h5>
            </div>
            <div>
              <span className="spec-title">Color</span>
              <div style={{
                backgroundColor: product.selectedColor || product.availableColors[0],
                width: '15px',
                height: '15px',
                borderRadius: '50%'
              }}
              />
            </div>
          </div>
        </div>
        <div className="basket-item-price">
          <h4 className="my-0">{product.price * product.quantity}</h4>
        </div>
        <button
          className="basket-item-remove button button-border button-border-gray button-small"
     
          type="button"
        >
          <XMarkIcon className='w-6 h-6' />
        </button>
      </div>
    </div>
  );
};



export default BasketItem;
