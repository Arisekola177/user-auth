interface Props{
  title: string
}

const Nulldata = ({title}: Props) => {
  return (
    <div className="w-full h-screen text-white flex items-center justify-center text-4xl md:text-2xl">
       <p className="font-medium"> {title}</p>
    </div>
  )
}

export default Nulldata