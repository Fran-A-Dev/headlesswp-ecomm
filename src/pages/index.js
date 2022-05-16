import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Fuse from "fuse.js";

import Layout from "@components/Layout";
import Container from "@components/Container";
import Button from "@components/Button";

import styles from "@styles/Home.module.scss";

export default function Home({ products, allegiances }) {
  const [activeAllegiance, setActiveAllegiance] = useState();
  const [query, setQuery] = useState();

  let activeProducts = products;

  if (activeAllegiance) {
    activeProducts = activeProducts.filter(({ allegiances }) => {
      const allegianceIds = allegiances.map(({ slug }) => slug);
      return allegianceIds.includes(activeAllegiance);
    });
  }

  const fuse = new Fuse(activeProducts, {
    keys: ["title", "allegiances.name"],
  });

  if (query) {
    const results = fuse.search(query);
    activeProducts = results.map(({ item }) => item);
  }

  function handleOnSearch(event) {
    const value = event.currentTarget.value;
    setQuery(value);
  }

  return (
    <Layout>
      <Head>
        <title>Headless WP Ecomm</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <Container>
        <h1 className="sr-only">Fran_The_Dev</h1>

        <div className={styles.discover}>
          <div className={styles.allegiances}>
            <h2>Filter by Code or Climb</h2>
            <ul>
              {allegiances.map((allegiance) => {
                const isActive = allegiance.slug === activeAllegiance;
                let allegianceClassName;
                if (isActive) {
                  allegianceClassName = styles.allegianceIsActive;
                }
                return (
                  <li key={allegiance.id}>
                    <Button
                      className={allegianceClassName}
                      color="yellow"
                      onClick={() => setActiveAllegiance(allegiance.slug)}
                    >
                      {allegiance.name}
                    </Button>
                  </li>
                );
              })}
              <li>
                <Button
                  className={!activeAllegiance && styles.allegianceIsActive}
                  color="yellow"
                  onClick={() => setActiveAllegiance(undefined)}
                >
                  View All
                </Button>
              </li>
            </ul>
          </div>
          <div className={styles.search}>
            <h2>Search</h2>
            <form>
              <input onChange={handleOnSearch} type="search" />
            </form>
          </div>
        </div>

        <h2 className="sr-only">Available Cards</h2>
        <ul className={styles.products}>
          {activeProducts.map((product) => {
            const { featuredImage } = product;
            return (
              <li key={product.id}>
                <Link href={`/products/${product.slug}`}>
                  <a>
                    <div className={styles.productImage}>
                      <Image
                        width={featuredImage.mediaDetails.width}
                        height={featuredImage.mediaDetails.height}
                        src={featuredImage.sourceUrl}
                        alt={featuredImage.altText}
                      />
                    </div>
                    <h3 className={styles.productTitle}>{product.title}</h3>
                    <p className={styles.productPrice}>
                      ${product.productPrice}
                    </p>
                  </a>
                </Link>
                <p>
                  <Button
                    className="snipcart-add-item"
                    data-item-id={product.productId}
                    data-item-price={product.productPrice}
                    data-item-url="/"
                    data-item-description=""
                    data-item-image={featuredImage.sourceUrl}
                    data-item-name={product.title}
                    data-item-max-quantity={1}
                  >
                    Add to Cart
                  </Button>
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://headlessecostg.wpengine.com/graphql",
    cache: new InMemoryCache(),
  });

  const response = await client.query({
    query: gql`
      query AllProductsAndAllegiances {
        products {
          edges {
            node {
              id
              content
              title
              uri
              product {
                productPrice
                productId
              }
              slug
              featuredImage {
                node {
                  altText
                  sourceUrl
                  mediaDetails {
                    height
                    width
                  }
                }
              }
              allegiances {
                edges {
                  node {
                    id
                    name
                    slug
                  }
                }
              }
            }
          }
        }
        allegiances {
          edges {
            node {
              id
              name
              slug
            }
          }
        }
      }
    `,
  });

  const products = response.data.products.edges.map(({ node }) => {
    const data = {
      ...node,
      ...node.product,
      featuredImage: {
        ...node.featuredImage.node,
      },
      allegiances: node.allegiances.edges.map(({ node }) => node),
    };
    return data;
  });

  const allegiances = response.data.allegiances.edges.map(({ node }) => node);

  return {
    props: {
      products,
      allegiances,
    },
  };
}
