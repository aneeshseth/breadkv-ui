import TComponent from "@/app/components/terminal"
import React from "react"

export default async function Terminal({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
      <TComponent slug={slug}/>
  )
}

