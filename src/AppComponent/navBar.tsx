import { Globe,ChevronRight } from "lucide-react"

const navBar = () => {
    const date = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div>
            <div className="flex justify-between nav p-3">
                <div className="flex gap-1">
                    <Globe />
                    <h1>{date}</h1>
                </div>
                <div className="flex gap-1">
                    <h1 className="md:flex hidden">The Menu</h1>
                    <ChevronRight />
                </div>
            </div>
            <h1 className="text-5xl text-center font-bold title">BENO</h1>
            <div className="flex justify-center md:gap-8 gap-4 text-lg nav p-3 font-semibold ">
                <h1 className="cursor-pointer md:flex hidden hover:underline">World News</h1>
                <h1 className="cursor-pointer hover:underline">Politics</h1>
                <h1 className="cursor-pointer hover:underline">Technology</h1>
                <h1 className="cursor-pointer hover:underline">Health</h1>
                <h1 className="cursor-pointer hover:underline">Sports</h1>
            </div>
        </div>
    )
}

export default navBar