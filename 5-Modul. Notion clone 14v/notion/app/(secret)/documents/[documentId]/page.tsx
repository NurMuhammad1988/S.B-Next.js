"use client"
import { Id } from '@/convex/_generated/dataModel'
import React from 'react'

interface DocumentIdPageProps{

    params: {
        documentId: Id<"documents">//convexda convex/schema.tsda schema bilan nastroyka qilingan convex/document.tsda yozilgan createDocument functionida adress (ssilka) sifatida berib qo'yilgan "documents" ga convexda genereted qilib j=kelingan userni va doxumentlarni idsi global convex Id 
    }

}

const DocumentIdPage = ({params}: DocumentIdPageProps) => {
  return (
    <div>{params.documentId}</div>
  )
}

export default DocumentIdPage