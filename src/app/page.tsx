import NavBar from "@/components/common/NavBar";
import Banner from "@/components/home/Banner";

export default function Home() {
    return (
        <main className="flex flex-col items-center w-full min-h-screen text-white bg-background">
            <NavBar />
            <Banner
                backgroundImage="/assets/texture.jpg"
                opacity={88}
            />
        </main>
    );
}
