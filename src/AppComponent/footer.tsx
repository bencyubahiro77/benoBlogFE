import { Mail, Instagram, Youtube, LinkedinIcon, Twitter} from "lucide-react";
const footer = () => {
    const year = new Date().getFullYear();
    return (
        <div className=" md:mx-12 m-1 my-4">
            <h1 className="text-3xl font-bold title footTiltle p-2">BENO</h1>
            <div className="md:flex md:justify-between nav p-3">
                <div className="flex gap-1 justify-center items-center">
                    <h1 className="flex">Copyright<span className="px-1"> &copy; </span>{year} - Beno All right reserved</h1>
                </div>
                <div className="flex gap-1 justify-center items-center">
                    <div className="flex gap-3">
                        <Mail  />
                        <Instagram  />
                        <LinkedinIcon />
                        <Youtube />
                        <Twitter />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default footer