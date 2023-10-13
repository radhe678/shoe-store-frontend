import Image from "next/image";
import React from "react";

const Loader = () => {
    return (
        <div className="relative mt-52 mb-52 w-full h-full flex justify-center items-center">
            <Image
                width={100}
                height={100}
                alt="Loading..."
                src="/loader.svg"
            />
        </div>
    );
};

export default Loader;