// asosiy sahifa yuqorida homelayout chunki sitebar pastda esa kontent joylashadi

import { Clients, Heroes } from "./components";
import { Pricing } from "./components/pricing";

//>>>(home)<<< bu dumaloq skopka ichidagi page.tsx shuni anglatadiku bu asosiy sahifa hissoblanadi yani next js ishlaganda appni ichidan asosiy sahifani yani failni izlaydi papkani emas failni yani page.tsx failini izlaydi agar app papkani ichidan page.tsx failni topolmasa (home) papkani ichidan izlaydi va topsa shu page.tsx failni asosiy sahifa qiladi va agar (home)ni ichiga yana (home2) qilinsa shunday skopkalarni ichidan kirib kirib page.tsxni topib shuni asosiy sahifa qiladi

export default function Home() {
    return (
        <div className="min-h-full flex flex-col">
            <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
                <Heroes />
                <Clients/>
            </div>

<Pricing/>

        </div>
    );
}
