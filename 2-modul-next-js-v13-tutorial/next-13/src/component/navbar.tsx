"use client";//bu holatda bu navbar componentni onasi bo'lgan asosiy layout.tsx fayili SSR lekin uni childreni yani bu navbar CSR qilindi
//next js13da app sistemada qilingan loyiha bu
//////bu holatda asosiy sahifa SSR yani seo uchun yahshi lekin  CHILDRENI HISSOBLANGAN Navbar CSR bo'ldi 
import { useRouter } from "next/navigation";//next navigation bilan next routerni ishlatishda joylarda farqi bor



const Navbar = () => {
    const router = useRouter();
    return (

        

        <div className="navbar-1">
            <button onClick={() => router.push("/")}>Bosh sahifa</button>
            <button onClick={() => router.push("/about")}>Men haqimda</button>
            <button onClick={() => router.push("/contact")}>Bog'lanish</button>
        </div>
    );
};

export default Navbar;
