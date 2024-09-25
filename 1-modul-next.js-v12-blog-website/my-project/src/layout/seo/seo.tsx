// import { Head } from "next/document";//bu seo uchun kerak head emas ekan etiborli bo'lish kerak pastdagi seo uchun kerak bo'lgan head hissoblanadi
import Head from "next/head";//se uchun kerak bo'ladigan head componenti head document bilan adashtirilmasin
import { SeoProps } from "./seo.props";
import { siteConfig } from "src/config/site.config";

const SEO = ({
    // default qiymatlar
    children,
    author = siteConfig.author,
    metaDescription = siteConfig.metaDescription,
    metaKeywords = siteConfig.metaKeywords,
    metaTitle = siteConfig.metaTitle,
}: SeoProps) => {
    //seo dynamic
    return (
        <>
            <Head>
                {/* meta teglar yani seo uchun kerakli teglar dynamic shunday yoziladi */}
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=5"
                />
                <title>{metaTitle}</title>

                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <meta name="keyword" content={metaKeywords} />
                <meta name="author" content={author} />
                <meta name="description" content={metaDescription} />
                <link
                    rel="shortcut icon"
                    href={"/favicon.svg"}
                    // href={"/vercel.svg"} bu joydagi svg o'rniga saytni logo rasimni import qilib qo;yish mumkun shudna browserda sahifa titelidan oldinda saytni logo rasimi chiqib turadi
                    type="image/x-icon"
                />
            </Head>

            {children}
            {/* bu children reactni hamma htmli yani ReactNodega teng Headdan pastda yozilishini sababi???????????????????????????????????????????????? */}
        </>
    );
};

// 16. SEO & NProgress darsi 5 chi minutda qoldi hato bor SEO componentdan keyin hato bosib ketdi

export default SEO;
