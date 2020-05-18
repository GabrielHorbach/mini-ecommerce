import { loadStripe } from '@stripe/stripe-js';

import stripeConfig from '../../config/stripe';
const stripePromise = loadStripe(stripeConfig.publicKey);

interface Props {
  skuId: string,
  itemName: string
}

const ButtonCheckout: React.FC<Props> = ({ skuId, itemName }) => {
  async function handleClick() {
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      items: [
        { sku: skuId, quantity: 1 }
      ],
      successUrl: `http://localhost:3000/success?itemName=${itemName}`,
      cancelUrl: 'http://localhost:3000/cancel'
    });

    if (error) {
      console.error(error);
    }
  }

  return (
    <button role="link" onClick={handleClick}>
      Checkout
    </button>
  );
}

export default ButtonCheckout;