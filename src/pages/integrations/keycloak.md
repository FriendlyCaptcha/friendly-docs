---
title: Keycloak Integration
description: Integrate Friendly Captcha into your Keycloak instance
hide_table_of_contents: true
---

# Keycloak Integration

Two high-quality Keycloak integrations are available to integrate Friendly Captcha into your Keycloak instance.

## [touqeershafi/keycloak-friendly-captcha](https://github.com/touqeershafi/keycloak-friendly-captcha)

Supports registration, login, and password reset flows.

### `Containerfile`

This `Containerfile` is referenced by the video tutorial on integrating Friendly Captcha with Keycloak.

```Dockerfile
FROM maven:3.9.16 AS plugin-builder
RUN git clone https://github.com/touqeershafi/keycloak-friendly-captcha.git /plugin
WORKDIR /plugin
RUN mvn clean package

FROM quay.io/keycloak/keycloak:26.7 AS builder
COPY --from=plugin-builder /plugin/target/keycloak-friendly-captcha-*-SNAPSHOT.jar /opt/keycloak/providers
RUN /opt/keycloak/bin/kc.sh build

FROM quay.io/keycloak/keycloak:26.7
COPY --from=builder /opt/keycloak /opt/keycloak
ENV KC_FEATURE_DECLARATIVE_UI=enabled
```

## [dsb-norge/keycloak-friendly-captcha](https://github.com/dsb-norge/keycloak-friendly-captcha)

Supports the registration flow only.

Both integrations are open source and free to use. Please refer to their respective GitHub repositories for installation instructions and documentation.
