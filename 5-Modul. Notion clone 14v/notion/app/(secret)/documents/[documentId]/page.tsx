"use client"
import { Id } from '@/convex/_generated/dataModel'
import React from 'react'

interface DocumentIdPageProps{

    params: {
        documentId: Id<"documents">//convexda convex/schema.tsda schema bilan nastroyka qilingan convex/document.tsda yozilgan createDocument functionida adress (ssilka) sifatida berib qo'yilgan "documents" ga convexda genereted qilib kelingan userni va documentlarni idsi global convex Id
        
        //yani convex documents papkada yani app/(secret)/documents/page.tsx failida uiga tayyorlangan document functionlarda failni dynamic yaratadigan functionlar bor shu dynamic yaratiladigan sahifalarni shu failida DocumentIdPage functionda bu keladigan dynamik sahifar returnda divga o'ralgan yani jsx ga o'ralgan shu sabab app/covex/documents.tsdagi server functionlar app/(secret)/documents/page.tsx failida ishlatilib uiga beriladi va bu fail esa shu bajarilgan ishlardagi dynamic sahifalarni jsxga o'girib beradi
    }

}

const DocumentIdPage = ({params}: DocumentIdPageProps) => {
  return (
    <div className='mt-12'>{params.documentId}</div>
    // bu paramsda kelgan documentId document dynamic yaratilganda yaratiladi
  )
}

export default DocumentIdPage