# Versioning and Immutability

How we version and publish the Friendly Captcha browser SDK, and how you can pin and verify the exact code that runs on your website.

This applies to both our v2 package [`@friendlycaptcha/sdk`](https://www.npmjs.com/package/@friendlycaptcha/sdk) and our v1 package [`friendly-challenge`](https://www.npmjs.com/package/friendly-challenge). For how long v1 will be supported, see [**v1 and v2**](../introduction/v1-and-v2.md#whats-going-to-happen-to-v1).

## Versioning

Our browser SDK follows [Semantic Versioning](https://semver.org/). In practice we have never shipped a release that wasn't backwards compatible.

## Immutable Releases

**We never re-release a version.** Once published, the files served under a version number never change. This is also enforced by the npm registry itself, which permanently reserves a version number once it has been used.

We have never unpublished a version, and we have no plans to. Old pins should keep working indefinitely.

## CDN

### Version Pinning

Always reference an exact version in your script tags:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@friendlycaptcha/sdk@1.0.2/site.min.js" async defer></script>
<script nomodule src="https://cdn.jsdelivr.net/npm/@friendlycaptcha/sdk@1.0.2/site.compat.min.js" async defer></script>
```

::::tip
Pinning means you decide when to upgrade, but also that you don't automatically receive fixes. We recommend that you update your pinned version periodically, with reference to [the changelog](https://github.com/FriendlyCaptcha/friendly-captcha-sdk/blob/main/CHANGELOG.md).
::::

### Subresource Integrity

[Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) (SRI) pins the file's *contents* with an integrity hash, rather than just its URL. Because the CDN is operated by a third party, this is how you verify on every page load that the code reaching your users is the code you reviewed.

::::info
Our site scripts don't load any further JavaScript at runtime, so the two integrity hashes cover all of the JavaScript that the SDK executes on your page.
::::

```html
<!-- Replace both placeholder hashes using the command below. -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@friendlycaptcha/sdk@1.0.2/site.min.js" integrity="sha384-<hash of site.min.js>" crossorigin="anonymous" async defer></script>
<script nomodule src="https://cdn.jsdelivr.net/npm/@friendlycaptcha/sdk@1.0.2/site.compat.min.js" integrity="sha384-<hash of site.compat.min.js>" crossorigin="anonymous" async defer></script>
```

You can run this from the command-line to calculate the integrity hash for a specific file and version.

```shell
curl -sSLf https://cdn.jsdelivr.net/npm/@friendlycaptcha/sdk@1.0.2/site.min.js \
  | openssl dgst -sha384 -binary | openssl base64 -A
```

Alternatively, there are some websites that will do this for you, like https://srihash.org/.

## Self-hosting

Using `cdn.jsdelivr.net` is optional. You can [download the release files](../getting-started/install.md#using-the-scripts-without-a-cdn-ie-self-hosting) and serve them from your own infrastructure, removing the third-party CDN from your supply chain entirely.
