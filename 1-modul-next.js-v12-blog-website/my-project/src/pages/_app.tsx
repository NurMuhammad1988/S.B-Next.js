import "src/styles/globals.css";
import "nprogress/nprogress.css";
import NProgress from "nprogress";
import type { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "src/helpers/create-emotion-cache";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import theme from "src/helpers/theme";
import { CssBaseline } from "@mui/material";
import { useEffect } from "react";
import { Router } from "next/router";
//bu loyiha next.jsni oages router usulidan foydalanib router qilingan yani router pagelarga qarab bo'ladi
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
    const {
        Component,
        emotionCache = clientSideEmotionCache,
        pageProps,
    } = props;

    // next js SSR progress bar (nprogress)
    useEffect(() => {
        const handleRouteStart = () => NProgress.start();
        const handleRouteDone = () => NProgress.done();

        Router.events.on("routeChangeStart", handleRouteStart);
        Router.events.on("routeChangeComplete", handleRouteDone);
        Router.events.on("routeChangeError", handleRouteDone);

        return () => {
            Router.events.off("routeChangeStart", handleRouteStart);
            Router.events.off("routeChangeComplete", handleRouteDone);
            Router.events.off("routeChangeError", handleRouteDone);
        };
    }, []);
    // next js SSR progress bar (nprogress)

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                />
            </Head>

            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </CacheProvider>
    );
}

export default MyApp;
//nprogress va yarn add -D@types/nprogress bilan next ssrni progress loaderi o'rnatildi
