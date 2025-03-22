export default async function ErrorInstance({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return (
    <div className="min-h-screen bg-black text-white w-screen flex justify-center items-center">
        Looks like this instance with id <span className="text-red-500 m-2"> {slug} </span>  wasn't found, try creating another instance. LOL.
    </div>
  )
}

