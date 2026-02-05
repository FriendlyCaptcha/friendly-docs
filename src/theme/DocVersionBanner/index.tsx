import React, {type ComponentType} from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import {
  useActivePlugin,
  type GlobalVersion,
} from '@docusaurus/plugin-content-docs/client';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {
  useDocsPreferredVersion,
  useDocsVersion,
  useActiveDocContext,
  useVersions,
} from '@docusaurus/plugin-content-docs/client';
import type {Props} from '@theme/DocVersionBanner';
import type {
  VersionBanner,
  PropVersionMetadata,
} from '@docusaurus/plugin-content-docs';

type BannerLabelComponentProps = {
  siteTitle: string;
  versionMetadata: PropVersionMetadata;
};

function UnreleasedVersionLabel({
  siteTitle,
  versionMetadata,
}: BannerLabelComponentProps) {
  return (
    <Translate
      id="theme.docs.versions.unreleasedVersionLabel"
      description="The label used to tell the user that he's browsing an unreleased doc version"
      values={{
        siteTitle,
        versionLabel: <b>{versionMetadata.label}</b>,
      }}>
      {
        'This is documentation for Friendly Captcha {versionLabel}.'
      }
    </Translate>
  );
}

function UnmaintainedVersionLabel({
  siteTitle,
  versionMetadata,
}: BannerLabelComponentProps) {
  return (
    <Translate
      id="theme.docs.versions.unmaintainedVersionLabel"
      description="The label used to tell the user that he's browsing an unmaintained doc version"
      values={{
        siteTitle,
        versionLabel: <b>{versionMetadata.label}</b>,
      }}>
      {
        'This is documentation for Friendly Captcha {versionLabel}.'
      }
    </Translate>
  );
}

const BannerLabelComponents: {
  [banner in VersionBanner]: ComponentType<BannerLabelComponentProps>;
} = {
  unreleased: UnreleasedVersionLabel,
  unmaintained: UnmaintainedVersionLabel,
};

function BannerLabel(props: BannerLabelComponentProps) {
  const BannerLabelComponent =
    BannerLabelComponents[props.versionMetadata.banner!];
  return <BannerLabelComponent {...props} />;
}

function LatestVersionSuggestionLabel({
  currentLabel,
  alternateLabel,
  to,
  onClick,
}: {
  to: string;
  onClick: () => void;
  currentLabel: string;
  alternateLabel: string;
}) {
  return (
    <Translate
      id="theme.docs.versions.latestVersionSuggestionLabel"
      description="The label used to tell the user to check the latest version"
      values={{
        learn: (
          <b>
            <Link to={`/docs/${currentLabel}/versions`}>
              <Translate
                id="theme.docs.versions.latestVersionLinkLabel"
                description="The label used for the latest version suggestion link label">
                learn more
              </Translate>
            </Link>
          </b>
        ),
        alternate: (
          <b>
            <Link to={to} onClick={onClick}>
              <Translate
                id="theme.docs.versions.latestVersionLinkLabel"
                description="The label used for the latest version suggestion link label"
                values={{ alternateLabel }}>
                {
                  '{alternateLabel} docs'
                }
              </Translate>
            </Link>
          </b>
        ),
      }}>
      {
        'You can {learn} about v1 and v2, or you can switch to the {alternate}.'
      }
    </Translate>
  );
}

function DocVersionBannerEnabled({
  className,
  versionMetadata,
}: Props & {
  versionMetadata: PropVersionMetadata;
}): JSX.Element {
  const {
    siteConfig: {title: siteTitle},
  } = useDocusaurusContext();
  const {pluginId} = useActivePlugin({failfast: true})!;

  const getVersionMainDoc = (version: GlobalVersion) =>
    version.docs.find((doc) => doc.id === version.mainDocId)!;

  const {savePreferredVersionName} = useDocsPreferredVersion(pluginId);
  const [ v2, v1 ] = useVersions(pluginId);

  const isV2 = versionMetadata.label === 'v2';

  const alternateVersion = isV2 ? v1 : v2;
  const alternateLabel = isV2 ? 'v1' : 'v2';
  const alternateVersionName = isV2 ? 'v1' : 'current';
  const activeDocContext = useActiveDocContext(pluginId);
  const alternateDoc =
    activeDocContext.alternateDocVersions[alternateVersionName] ?? getVersionMainDoc(alternateVersion);

  return (
    <div
      className={clsx(
        className,
        ThemeClassNames.docs.docVersionBanner,
        'alert margin-bottom--md',
        versionMetadata.label === 'v2' ? 'alert--info' : 'alert--warning',
      )}
      role="alert">
      <div>
        <BannerLabel siteTitle={siteTitle} versionMetadata={versionMetadata} />
      </div>
      <div className="margin-top--md">
        <LatestVersionSuggestionLabel
          currentLabel={versionMetadata.label}
          alternateLabel={alternateLabel}
          to={alternateDoc.path}
          onClick={() => savePreferredVersionName(alternateVersionName)}
        />
      </div>
    </div>
  );
}

export default function DocVersionBanner({
  className,
}: Props): JSX.Element | null {
  const versionMetadata = useDocsVersion();
  
  // Disable banner on v2 pages
  if (versionMetadata.label === 'v2') {
    return null;
  }
  
  if (versionMetadata.banner) {
    return (
      <DocVersionBannerEnabled
        className={className}
        versionMetadata={versionMetadata}
      />
    );
  }
  return null;
}
