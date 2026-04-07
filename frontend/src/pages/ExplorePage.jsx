import React, { useEffect, useState } from 'react'
import { getExploreUsersApi } from '@/api/auth'
import Loader from '@/components/Loader'
import UserCard from '@/components/UserCard'
import ErrorMessage from '@/components/ErrorMessage'

export default function ExplorePage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")

    getExploreUsersApi(token)
      .then(setUsers)
      .catch(() => setError("No se pudo cargar la lista"))
      .finally(() => setLoading(false))
  }, [])

  /*const handleLike = async (userId) => {
    try {
      const token = localStorage.getItem("token")
      await fetch(`http://localhost:5000/api/users/like/${userId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setUsers((prev) => prev.filter((u) => u._id !== userId))
    } catch (err) {
      console.error(err)
    }
  }*/
const handleLike = async (userId) => {
  console.log("CLICK EN LIKE:", userId)

  try {
    const token = localStorage.getItem("token")
    console.log("TOKEN:", token)

   const res = await fetch(`http://localhost:4000/api/users/like/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    console.log("STATUS:", res.status)

    setUsers((prev) => prev.filter((u) => u._id !== userId))

  } catch (err) {
    console.error("ERROR LIKE:", err)
  }
}


  if (loading) return <Loader label="Cargando perfiles..." />

  return (
    <section>
      {users.map((u) => (
        <UserCard key={u._id} user={u} onLike={handleLike} />
      ))}
    </section>
  )
}
