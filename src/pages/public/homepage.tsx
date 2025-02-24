import NavBar from "@/AppComponent/navBar";
import Footer from "@/AppComponent/footer";

const homepage = () => {
    return (
        <div>
            <NavBar />
            <div className="md:mx-12 m-1 my-4 h-[80vh]">
                <h1>homepage</h1>
            </div>
            <Footer />
        </div>
    );
};

export default homepage;