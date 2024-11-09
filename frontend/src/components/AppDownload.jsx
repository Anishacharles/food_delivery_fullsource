import React from 'react'
import { assets } from '../../assets/assets'

const AppDownload = () => {
    <div class="app-download text-center mx-auto my-[100px] text-[max(3vw,20px)] font-medium">
    <p>Download Our App</p>
    <div class="app-download-platforms flex justify-center gap-[max(2vw,10px)] mt-10">
        <img
            src="appstore.png"
            alt="App Store"
            class="w-[max(30vw,120px)] max-w-[180px] transition duration-500 cursor-pointer hover:scale-105"
        />
        <img
            src="google-play.png"
            alt="Google Play"
            class="w-[max(30vw,120px)] max-w-[180px] transition duration-500 cursor-pointer hover:scale-105"
        />
    </div>
</div>
};

export default AppDownload
