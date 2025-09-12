import { UserButton } from '@clerk/nextjs'
import React from 'react'

//bu fail ()dumaloq scopka ichida yaratilgan yani next js shundan biladiki dumaloq qavus ichida (home) papka yaratilsa va ichida page.tsx yaratilsa bu aftamatik bosh sahifa bo'ladi yani next js aynan shu failni ui uchun asosiy sahifa qiladi yani home deb yozilishi va shunday tartibda yozilishi shart chunki next js shundan (home)/page.tsx home page ekanligini tanib qoladi

//bu fail userni clerldan keladigan buttoni yani saytdan ro'yhatdan o'tgan user shu button ichida keladi masalan rasimi gmaili

const HomePage = () => {
  return (
    <div>{<UserButton/>}</div>
  )
}

export default HomePage