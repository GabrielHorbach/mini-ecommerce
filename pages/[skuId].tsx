import Link from 'next/link';
import { GetServerSideProps, GetStaticPaths } from 'next';
import { Stripe } from 'stripe';
import stripeConfig from '../config/stripe';

import ButtonCheckout from '../components/ButtonCheckout';

interface Props {
  sku: Stripe.Sku
}

export const getStaticPaths: GetStaticPaths = async () => {
  const stripe = new Stripe(stripeConfig.secretKey, {
    apiVersion: "2020-03-02"
  });

  const skus = await stripe.skus.list();

  const paths = skus.data.map(sku => ({
    params: {
      skuId: sku.id,
    }
  }));

  return {
    paths,
    fallback: false
  }
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const stripe = new Stripe(stripeConfig.secretKey, {
    apiVersion: "2020-03-02"
  });

  const { skuId } = params;
  const sku = await stripe.skus.retrieve(skuId as string);

  return {
    props: {
      sku
    }
  }
}

const Product: React.FC<Props> = ({ sku }) => {
  return (
    <>
      <h1>{sku.attributes.name}</h1>
      <h2>{Number(sku.price / 100).toFixed(2)} {sku.currency.toUpperCase()}</h2>
      <img
        src={sku.image}
        style={{
          width: '200px'
        }}
      />

      <ButtonCheckout skuId={sku.id} itemName={sku.attributes.name} />

      <Link href="/"><a>Go back</a></Link>
    </>
  )
}

export default Product;