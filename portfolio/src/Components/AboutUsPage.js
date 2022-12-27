import React from "react";

export default function AboutUsPage() {

    const customeStyles = {
        backgroundImage: "url('https://wallpaperaccess.com/full/295661.jpg')"
         
    }
    return <>

        <div style={customeStyles} className="flex items-center justify-center bg-gradient-to-t h-screen p-6 bg-no-repeat bg-center">
            <div className="w-full md:w-1/2 lg:w-1/3">
                <div className="flex flex-col space-y-4">
                    <div className="flex justify-between py-6 px-4 bg-white/30 rounded-lg">
                        <div className="flex items-center space-x-4">
                            <img src="https://flowbite.com/docs/images/people/profile-picture-1.jpg" className="rounded-full h-14 w-14" alt=""/>
                                <div className="flex flex-col space-y-1">
                                    <span className="font-bold">Leonard Krashner</span>
                                    <span className="text-sm">Yeah same question here too 🔥</span>
                                </div>
                        </div>
                        <div className="flex-none px-4 py-2 text-stone-600 text-xs md:text-sm">
                            17m ago
                        </div>
                    </div>

                    <div className="flex justify-between py-6 px-4 bg-white/30 rounded-lg">
                        <div className="flex items-center space-x-4">
                            <img src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" className="rounded-full h-14 w-14" alt=""/>
                                <div className="flex flex-col space-y-1">
                                    <span className="font-bold">Yao</span>
                                    <span className="text-sm">Lorem ipsum dolor sit</span>
                                </div>
                        </div>
                        <div className="flex-none px-4 py-2 text-stone-600 text-xs md:text-sm">
                            40m ago
                        </div>
                    </div>

                    <div className="flex justify-between py-6 px-4 bg-white/30 rounded-lg">
                        <div className="flex items-center space-x-4">
                            <img src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" className="rounded-full h-14 w-14" alt=""/>
                                <div className="flex flex-col space-y-1">
                                    <span className="font-bold">Lesine</span>
                                    <span className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, provident</span>
                                </div>
                        </div>
                        <div className="flex-none px-4 py-2 text-stone-600 text-xs md:text-sm">
                            50m ago
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>

};

