import React from 'react'
import { ChildProps } from '@/types'
//bu preview/[documentId]/page.tsx failni asosiy ildiz papkasi
const Layout = ({children}:ChildProps) => {
  return (
    <div className='h-full'>{children}</div>
  )
}

export default Layout

//bu layout preview papkani asosiy sahifasi yani ildiz sahifasi nima uchun preview papkaga alohida layout fail ochildi chunki preview papkadagi [documentId]/page.tsxda real user o'zi dynamic  yaratadigan documentlarni edit, publish yoki blocnotejsdan foydalanib editor.tsxni chaqirib document create qiladigan documentni idit qiladigan yani o'zi yaratgan documentga cover imagelar qo'shadigan preview qiymati bor faillar bor yani faqat real user uchun aktive qolganlar uchun esa deaktive shu sabab real user uchun alohida papka qilindi va papkadagi elemetlarni aksariga preview qiymati berildi