"use client"; //bu holatda bu navbar componentni onasi bo'lgan asosiy layout.tsx fayili SSR lekin uni childreni yani bu navbar CSR qilindi
//next js13da app sistemada qilingan loyiha bu
//////bu holatda asosiy sahifa SSR yani seo uchun yahshi lekin  CHILDRENI HISSOBLANGAN Navbar CSR bo'ldi
import { useRouter } from "next/navigation"; //next navigation bilan next routerni ishlatishda joylarda farqi bor

const Navbar = () => {
    const router = useRouter();
    return (
        <div className="navbar-1">
            <button onClick={() => router.push("/")}>Bosh sahifa</button>
            <button onClick={() => router.push("/about")}>Men haqimda</button>
            <button onClick={() => router.push("/contact")}>Bog'lanish</button>
            <button onClick={() => router.push("/posts")}>Post</button>
            {/* navigate posts papkaga yani ona papkaga qilingan posts ona papkani ichida page.tsx bor bu page.tsx kalit so'z userouter postsni ichidagi nomi page.tsx bo'lgan failga boradi bshqa nomli papkaga emas bu next jsni default funksiyasi yani routerlashda kalit so'zlari */}
        </div>
    );
};

export default Navbar;
