import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Human-friendly',
    Svg: require('@site/static/img/undraw-dreamer.svg').default,
    description: (
      <>
        Anti-bot protection that doesn't require your users to click cars or give up their privacy.
      </>
    ),
  },
  {
    title: 'Easy to integrate',
    Svg: require('@site/static/img/undraw-check-mobile.svg').default,
    description: (
      <>
        Friendly Captcha is easy and quick to integrate into any website or web app.
      </>
    ),
  },
  {
    title: 'It just works',
    Svg: require('@site/static/img/undraw-co-workers.svg').default,
    description: (
      <>
        The ideal captcha system is one that you forget is even in place. Friendly Captcha is just that.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
