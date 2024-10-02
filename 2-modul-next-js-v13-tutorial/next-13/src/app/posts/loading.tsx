//bu loading sahifasi ssr loading uchun qilindi lekin hech qayerda chaqirilmadi lekin shundaham ssr holatda Promiseda qilingan timeout ishlaganda yani serverdan datalar kelguncha suniy hosil qilingan vaqtda bu loader ishladi lekin hech qayerga chaqiirilmagan buni sababi next jsda loader.tsx kalit so'z agar biror bir ona papka ichida masalan bu holatda ona papka posts va psostsni ichidagi page.tsxda SSR kodlar bor yani server bilan muloqot bor loading.tsx next uchun kalit so'z loader.tsx bor papkada page.tsxda SSR qilinsa va SSR ishlagancha yani datalar fetch bo'lgancha next js bu loaderni aftamatik tarzda ishlatadi yani loading payti shu loading.tsx papkani ishlatadi agar loading.tsx yozilganda hato yozilsa ishlamaydi shu sabab nextda papkalar nomida hato qilish yahshimas 
const LoadingPost = () => {
  return (
    <div>Loading posts, waiting please......</div>
  )
}//bu loading serverda datalar SSR holatda kelsaham shu loading suniy qilindi lekin seo optimizatsa uchun html yo'q bo'ldi shu uchun seo qilinadigan sahifalar uchun SSR yahshi va bunaqa loading kerymas

export default LoadingPost