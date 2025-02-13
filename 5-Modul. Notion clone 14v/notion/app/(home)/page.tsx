
// asosiy sahifa yuqorida homelayout chunki sitebar pastda esa kontent joylashadi

//>>>(home)<<< bu dumaloq skopka ichidagi page.tsx shuni anglatadiku bu asosiy sahifa hissoblanadi yani next js ishlaganda appni ichidan asosiy sahifani yani failni izlaydi papkani emas failni yani page.tsx failini izlaydi agar app papkani ichidan page.tsx failni topolmasa (home) papkani ichidan izlaydi va topsa shu page.tsx failni asosiy sahifa qiladi va agar (home)ni ichiga yana (home2) qilinsa shunday skopkalarni ichidan kirib kirib page.tsxni topib shuni asosiy sahifa qiladi

export default function Home() {
    return <div>Hello page</div>;
}
