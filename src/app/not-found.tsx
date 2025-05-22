import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className={`flex flex-col p-6 sm:p-10 lg:p-20 
                rounded-2xl mx-8 sm:mx-10 w-[92%] sm:w-[95%] items-center 
                relative bg-cover bg-center overflow-hidden`}
                style={{
                    backgroundImage: `url("/assets/texture.jpg")`
                }}>
                <div className="absolute inset-0 bg-gradient-to-r from-green to-light-green" style={{ opacity: 0.88 }} />
                <div className="relative z-10 flex flex-col items-center">
                    <Image
                        src="/zentrilink-logo.png"
                        alt="ZentriLink Logo"
                        width={200}
                        height={200}
                        className="h-22 lg:h-30 w-auto image-brightness transition-all mb-8"
                    />
                    <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold font-[raleway] text-white mb-4">404</h1>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-[raleway] text-white text-center mb-6">
                        Page Not Found
                    </h2>
                    <p className="text-lg sm:text-xl lg:text-2xl font-[raleway] text-white text-center mb-8">
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </p>
                    <Link 
                        href="/" 
                        className="px-8 py-3 bg-white text-green hover:bg-opacity-90 transition-colors 
                            rounded-lg font-[raleway] font-semibold text-lg"
                    >
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
