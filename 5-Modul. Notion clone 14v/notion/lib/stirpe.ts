import Stripe from "stripe";

//stripe constructor shu Stripe constructor objectda hamma narsa keladi

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {//yani bu holatda Stripe constructordagi metodlar shu key bilan ishlaydi yani bu bitta loyiha uchun qilingan stripe keyi strioe shu keyga va domenga qarab ishlaydi agar birirtasi hato bo'lsa ishlamaydi yani stripe constructor va shu constructor bilan qilingan stripe kodlar shu key bilan bitta loyihada ishga tushadi bo'lmasa stripe tanimay qoladi //bu stripe constructor app/api/stripe/subscription/route.tsx failida chaqirlib ishlatilgan yani stripe kodlar o'sha joyda
 
    apiVersion: "2025-05-28.basil",
});

export default stripe;
