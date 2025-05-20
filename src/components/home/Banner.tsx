export default function Banner() {
    return (
        <div className="flex flex-col p-6 sm:p-10 lg:p-20 py-16 sm:py-24 lg:py-32 rounded-2xl mt-4 sm:mt-8 mx-4 sm:mx-10 w-[92%] sm:w-[95%] items-center bg-gradient-to-r from-green to-light-green">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[raleway] text-white text-center">ZentriLink</h1>
            <p className="text-lg sm:text-xl lg:text-2xl mt-3 sm:mt-5 font-[raleway] text-white text-center px-4 sm:px-0">
                Your one-stop solution for all your centralization needs
            </p>
        </div>
    );
}
