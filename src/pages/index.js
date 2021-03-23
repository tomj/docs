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
                <p>Feeless is a command line tool which can work with wallets, keys, addresses.</p>
                <ul>
                    <li><a href="/docs/#command-line-interface">CLI features</a></li>
                    <li><a href="/docs/overview/installation/">Installation</a></li>
                    <li><a href="/docs/cli/examples/">Examples</a></li>
                </ul>
            </>
        ),
    },
    {
        title: 'Rust crate (programming library)',
        imageUrl: 'img/undraw_docusaurus_tree.svg',
        description: (
            <>
                <p>Feeless is a Rust crate which developers can use to integrate with Nano.</p>
                <ul>
                    <li><a href="https://docs.rs/feeless">Crate documentation</a></li>
                    <li><a href="https://github.com/feeless/feeless">Source code</a></li>
                </ul>
            </>
        ),
    },
    {
        title: 'A Nano node (🚸 WIP 🚸)',
        imageUrl: 'img/undraw_docusaurus_mountain.svg',
        description: (
            <>
                <p>Feeless (is planned to be) a fully working Nano node. Initially not a voting node, it will contain a
                    wallet and RPC compatible server.</p>
                {/*<ul>*/}
                {/*    <li><a href="/docs/node/goals">Node Goals</a></li>*/}
                {/*    <li><a href="/docs/node/features">Node features</a></li>*/}
                {/*</ul>*/}
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
            <div>{description}</div>
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
