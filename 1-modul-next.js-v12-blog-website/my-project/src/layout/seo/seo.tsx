import { Head } from "next/document";
import { SeoProps } from "./seo.props";

const SEO = ({ children, author, metaDescription, metaKeywords, metaTitle }: SeoProps) => {
    //seo dynamic
    return (
        <>
            <Head>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5" />
            <title>{metaTitle}</title>

            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            <meta name="keyword" content={metaKeywords} />
            <meta name="author" content={author} />
            <meta name="description" content={metaDescription} />
            <link rel="shortcut icon" href={"/versal.svg"} type="image/x-icon" />

16. SEO & NProgress

            </Head>

            {children}
        </>
    );
};

16. SEO & NProgress darsi 5 chi minutda qoldi

export default SEO;
