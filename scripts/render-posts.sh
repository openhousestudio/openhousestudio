#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
export LD_LIBRARY_PATH=/tmp/opencode/clibs/usr/lib/x86_64-linux-gnu

for name in post-01-listing post-02-open-home post-03-just-sold post-04-review post-05-story; do
  node scripts/render-design.mjs "designs/$name.html" "designs/$name.png"
done
