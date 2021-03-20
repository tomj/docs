import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
    {
        title: 'Command line tool',
        imageUrl: 'img/undraw_docusaurus_react.svg',
        description: (
            <>
                Feeless is also a command line tool which can work with wallets, keys, addresses.
            </>
        ),
    },
    {
        title: 'Rust Node (🚸 Work in progress! 🚸)',
        imageUrl: 'img/undraw_docusaurus_mountain.svg',
        description: (
            <>
                Feeless is planned to be a fully working Nano node.
            </>
        ),
    },
    {
        title: 'Rust crate (library)',
        imageUrl: 'img/undraw_docusaurus_tree.svg',
        description: (
            <>
                <p>Feeless is a Rust crate which developers can use to integrate with Nano.</p>
                <p><a href="https://docs.rs/feeless">Crate docs</a> <a
                    href="https://github.com/feeless/feeless">Repository</a></p>
            </>
        ),
    },
];

function Feature({imageUrl, title, description}) {
    const imgUrl = useBaseUrl(imageUrl);
    return (
        <div className={clsx('col col--4', styles.feature)}>
            {imgUrl && (
                <div className="text--center">
                    <img className={styles.featureImage} src={imgUrl} alt={title}/>
                </div>
            )}
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}

export default function Home() {
    const context = useDocusaurusContext();
    const {siteConfig = {}} = context;
    return (
        <Layout
            title={`${siteConfig.title}`}
            description="Feeless is an implementation of Nano (cryptocurrency) in Rust.">
            <header className={clsx('hero hero--primary', styles.heroBanner)}>
                <div className="container">
                    <h1 className="hero__title">{siteConfig.title}</h1>
                    <p className="hero__subtitle">{siteConfig.tagline}</p>
                    <div className={styles.buttons}>
                        <Link
                            className={clsx(
                                'button button--outline button--secondary button--lg',
                                styles.getStarted,
                            )}
                            to={useBaseUrl('docs/')}>
                            Get Started
                        </Link>
                    </div>
                </div>
            </header>
            <main>
                {features && features.length > 0 && (
                    <section className={styles.features}>
                        <div className="container">
                            <div className="row">
                                {features.map((props, idx) => (
                                    <Feature key={idx} {...props} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </Layout>
    );
}
