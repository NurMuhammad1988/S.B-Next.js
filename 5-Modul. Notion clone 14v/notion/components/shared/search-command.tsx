"use client"
import { useUser } from '@clerk/clerk-react'
import React from 'react'

export const SearchCommand = () => {

    const {user} = useUser()

  return (
    <div>SearchCommand</div>
  )
}

