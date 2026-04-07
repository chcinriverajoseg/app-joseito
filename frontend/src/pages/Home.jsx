import React from 'react'
import { useUser } from '@/context/useUser'

export default function Home() {
  const { user } = useUser()
  return (
    <section className="space-y-3">
      <h1 className="text-2xl font-bold">Hola {user?.name ?? '👋'}</h1>
      <p className="text-cyan-600 dark:text-cyan-700">Bienvenido a app-joseito. Explora, haz match y chatea.</p>
    </section>
  )
}
