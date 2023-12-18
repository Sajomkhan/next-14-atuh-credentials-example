"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";


export default function DashboardLayout({children}) {
  const router = useRouter()
  const session = useSession()

  if(session.status === "loading"){
    return <p>Loading...</p>
  }
  
  if(session.status === "unauthenticated"){
    return router.push("/login")
  }

  return (
    <section>
      {children}
    </section>
  )
}
