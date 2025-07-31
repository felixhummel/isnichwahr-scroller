#!/bin/bash
# shellcheck disable=SC2086
set -euo pipefail

web-ext sign --channel=listed --amo-metadata=metadata.json --api-key=$(pass addons.mozilla.org/api-key/jwt-issuer) --api-secret=$(pass addons.mozilla.org/api-key/jwt-secret)

