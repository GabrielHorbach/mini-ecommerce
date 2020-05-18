import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Stripe from 'stripe';

import Layout from '../components/Layout';
import Container from '../components/Container';

import stripeConfig from '../config/stripe';

interface Props {
  skus: Stripe.Sku[]
}

export const getServerSideProps: GetServerSideProps = async () => {
  const stripe = new Stripe(stripeConfig.secretKey, {
    apiVersion: "2020-03-02"
  });

  const skus = await stripe.skus.list();

  return {
    props: {
      skus: skus.data
    }
  }
}

const Home: React.FC<Props> = ({ skus }) => {
  return (
    <Layout>
      <Head>
        <title>Etholc Store</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <h1>Bem vindo a ETHOLC</h1>

        {skus.map(sku => (
          <div key={sku.id}>
            <h2>{sku.attributes.name}</h2>
            <p>{Number(sku.price / 100).toFixed(2)} {sku.currency.toUpperCase()}</p>
            <img
              src={sku.image}
              style={{
                width: '200px'
              }}
            />

            <Link href={`/${sku.id}`}>
              <a>Ver mais</a>
            </Link>
          </div>
        ))}
      </Container>
    </Layout>
  );
}

export default Home;