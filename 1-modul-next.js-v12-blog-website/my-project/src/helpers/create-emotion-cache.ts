// import createCache from "@emotion/cache";
// import createCache from '@emotion/cache';

import createCache from "@emotion/cache";

const isBrowser = typeof document !== "undefined";

export default function createEmotionCache() {
    let insertionPoint;
    if (isBrowser) {
        const emotioninsertionPoint = document.querySelector<HTMLMeterElement>(
            'meta[name="emotion-insertion-point"]'
        );
        insertionPoint = emotioninsertionPoint ?? undefined;
    }

    return createCache({ key: "miu-style", insertionPoint });
}
