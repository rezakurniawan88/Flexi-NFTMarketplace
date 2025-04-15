export default function Footer() {
    return (
        <footer className="text-sm bg-[#13082a]/50 backdrop-blur-xl border-t border-purple-900/30 text-gray-400 py-6 sm:py-10 px-10">
            <div className="w-full">
                <div className="flex flex-col sm:flex-row justify-between">
                    <div className="w-[40%] mt-3 space-y-2 sm:space-y-4">
                        <h2 className="text-3xl sm:text-4xl font-bold">Flexi.</h2>
                        <h2 className="text-lg sm:text-xl font-semibold">Follow us on</h2>
                        <div className="mt-[40px] flex items-center justify-start gap-2">
                            <a href="#" className="group" target="_blank" aria-label="Tiktok" rel="noreferrer noopener">
                                <svg width="35" height="35" viewBox="0 0 40 40" fill="none" className="fill-gray-300 group-hover:fill-zinc-100  group-hover:transition-all group-hover:duration-300 group-hover:scale-105">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40ZM25.0683 9.04696C25.3743 10.6191 26.3551 11.9678 27.714 12.8107C28.6603 13.3977 29.7886 13.7403 31 13.7403V17.8664C28.7511 17.8664 26.667 17.1819 24.9659 16.0204V24.4056C24.9659 28.5932 21.3849 32 16.983 32C15.2819 32 13.7047 31.4896 12.408 30.6236C10.3494 29.2487 9 26.9749 9 24.4056C9 20.2179 12.5811 16.8109 16.983 16.8109C17.3483 16.8109 17.7063 16.8394 18.0587 16.8851V21.0974C17.7182 20.9959 17.3582 20.937 16.983 20.937C14.9727 20.937 13.3372 22.493 13.3372 24.4056C13.3372 25.7372 14.1313 26.8944 15.2918 27.4754C15.7978 27.7287 16.3726 27.8739 16.983 27.8739C18.9469 27.8739 20.5489 26.3877 20.6218 24.536L20.6288 8H24.9659C24.9659 8.35769 25.0022 8.70727 25.0683 9.04696Z"></path>
                                </svg>
                            </a>

                            <a href="#" className="group" target="_blank" aria-label="Facebook" rel="noreferrer noopener">
                                <svg width="35" height="35" viewBox="0 0 40 40" fill="none" className="fill-gray-300 group-hover:fill-zinc-100  group-hover:transition-all group-hover:duration-300 group-hover:scale-105">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40ZM25.6594 17.2355L25.0114 21.4583H21.6076V31.6667H17.0425V21.4583H13.3333V17.2355H17.0425V14.0172C17.0425 10.3559 19.2236 8.33333 22.5605 8.33333C24.1587 8.33333 25.8303 8.61862 25.8303 8.61862V12.2139H23.9883C22.1736 12.2139 21.6076 13.34 21.6076 14.4952V17.2355H25.6594Z"></path>
                                </svg>
                            </a>

                            <a href="#" className="group" target="_blank" aria-label="X" rel="noreferrer noopener">
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 33 32" fill="none" className="fill-gray-300 group-hover:fill-zinc-100  group-hover:transition-all group-hover:duration-300 group-hover:scale-105">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M16.333 32C25.1696 32 32.333 24.8366 32.333 16C32.333 7.16344 25.1696 0 16.333 0C7.49645 0 0.333008 7.16344 0.333008 16C0.333008 24.8366 7.49645 32 16.333 32ZM23.8773 8.14748H21.2535L16.9299 13.0897L13.1917 8.14748H7.77753L14.2466 16.6067L8.11542 23.6143H10.7408L15.4729 18.2073L19.6085 23.6143H24.8886L18.1451 14.6991L23.8773 8.14748ZM21.7865 22.0439H20.3327L10.8416 9.63548H12.4017L21.7865 22.0439Z"></path>
                                </svg>
                            </a>

                            <a href="#" className="group" target="_blank" aria-label="Instagram" rel="noreferrer noopener">
                                <svg width="35" height="35" viewBox="0 0 40 40" fill="none" className="fill-gray-300 group-hover:fill-zinc-100  group-hover:transition-all group-hover:duration-300 group-hover:scale-105">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40ZM14.0228 20C14.0228 16.6886 16.6938 14.0176 20.0052 14.0176C23.3166 14.0176 25.9876 16.6886 25.9876 20C25.9876 23.3114 23.3166 25.9824 20.0052 25.9824C16.6938 25.9824 14.0228 23.3114 14.0228 20ZM16.1159 20C16.1159 22.1451 17.8653 23.8893 20.0052 23.8893C22.1451 23.8893 23.8945 22.1451 23.8945 20C23.8945 17.8549 22.1503 16.1107 20.0052 16.1107C17.8601 16.1107 16.1159 17.8549 16.1159 20ZM26.2323 15.1683C27.0029 15.1683 27.6277 14.5487 27.6277 13.7729C27.6277 13.0023 27.0029 12.3776 26.2323 12.3776C25.4617 12.3776 24.8369 13.0023 24.8369 13.7729C24.8369 14.5435 25.4565 15.1683 26.2323 15.1683ZM29.7051 10.3001C31.0744 11.6642 31.5014 13.3199 31.5899 15.1891C31.6992 17.1155 31.6992 22.8844 31.5899 24.8109C31.4962 26.6801 31.0692 28.3357 29.7051 29.6999C28.341 31.0692 26.6853 31.4961 24.8161 31.5847C22.8897 31.694 17.1155 31.694 15.1891 31.5847C13.3199 31.4909 11.6695 31.064 10.3001 29.6999C8.93079 28.3357 8.50385 26.6801 8.41534 24.8109C8.306 22.8844 8.306 17.1103 8.41534 15.1839C8.50906 13.3147 8.93079 11.659 10.3001 10.2949C11.6695 8.93079 13.3252 8.50385 15.1891 8.41534C17.1155 8.306 22.8897 8.306 24.8161 8.41534C26.6853 8.50906 28.341 8.936 29.7051 10.3001ZM26.8831 29.0959C27.9088 28.6846 28.695 27.8984 29.1011 26.8779C29.6236 25.565 29.5945 22.693 29.5757 20.8313C29.5726 20.5225 29.5697 20.2415 29.5697 20C29.5697 19.7585 29.5726 19.4775 29.5757 19.1688C29.5945 17.3081 29.6236 14.4395 29.1011 13.1221C28.6898 12.0964 27.9036 11.3102 26.8831 10.9041C25.566 10.3844 22.6802 10.4121 20.819 10.43C20.5171 10.4329 20.2421 10.4355 20.0052 10.4355C19.7637 10.4355 19.4827 10.4326 19.174 10.4295C17.3133 10.4107 14.4447 10.3816 13.1273 10.9041C12.1016 11.3154 11.3154 12.1016 10.9093 13.1221C10.3896 14.4392 10.4173 17.325 10.4352 19.1862C10.4381 19.4881 10.4407 19.7631 10.4407 20C10.4407 20.2415 10.4379 20.5225 10.4347 20.8312C10.4159 22.6919 10.3868 25.5605 10.9093 26.8779C11.3206 27.9036 12.1068 28.6898 13.1273 29.0959C14.4444 29.6156 17.3302 29.5879 19.1914 29.57C19.4933 29.5671 19.7683 29.5645 20.0052 29.5645C20.2467 29.5645 20.5277 29.5674 20.8364 29.5705C22.6971 29.5893 25.5657 29.6184 26.8831 29.0959Z"></path>
                                </svg>
                            </a>

                            <a href="#" className="group" target="_blank" aria-label="Reddit" rel="noreferrer noopener">
                                <svg width="35" height="35" viewBox="0 0 40 40" fill="none" className="fill-gray-300 group-hover:fill-zinc-100  group-hover:transition-all group-hover:duration-300 group-hover:scale-105">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20ZM30.3958 17.2817C31.9936 17.2817 33.3047 18.5694 33.3047 20.1906C33.3047 21.3827 32.5895 22.408 31.5883 22.8614C31.6359 23.1531 31.6599 23.4481 31.6598 23.7436C31.6598 28.2499 26.438 31.8742 20.0002 31.8742C13.5625 31.8742 8.34063 28.2258 8.34063 23.7436C8.33961 23.4481 8.36354 23.1529 8.41219 22.8614C7.41047 22.408 6.69531 21.4067 6.69531 20.2147C6.69531 18.6169 7.98281 17.3058 9.60422 17.3058C10.359 17.3047 11.0851 17.5951 11.6309 18.1164C13.6575 16.6617 16.4473 15.732 19.5469 15.6364L21.0256 8.67423C21.0492 8.53111 21.1206 8.41204 21.2398 8.34048C21.3353 8.26892 21.4784 8.24486 21.6216 8.26892L26.4616 9.29423C26.7953 8.60267 27.5109 8.12579 28.3216 8.12579C29.4661 8.12579 30.3958 9.05564 30.3958 10.2C30.3958 11.345 29.4659 12.2747 28.3216 12.2747C27.2006 12.2747 26.2948 11.3924 26.2469 10.2955L21.9073 9.36579L20.5723 15.6128C23.6242 15.732 26.3664 16.6617 28.3692 18.0925C28.915 17.5712 29.641 17.2807 30.3958 17.2817ZM15.3984 20.1906C14.2534 20.1906 13.3238 21.1205 13.3238 22.2649C13.3238 23.4094 14.2536 24.363 15.3984 24.3395C16.543 24.3395 17.4727 23.4094 17.4727 22.2649C17.4727 21.1203 16.5428 20.1906 15.3984 20.1906ZM20.0002 29.2991C20.7869 29.2991 23.5052 29.2036 24.9358 27.7728C25.1264 27.5583 25.1264 27.2244 24.9358 27.0099C24.7211 26.7956 24.3873 26.7956 24.1727 27.0099C23.2905 27.916 21.3592 28.2258 20.0002 28.2258C18.6411 28.2258 16.7336 27.9161 15.8273 27.0099C15.6127 26.7956 15.2789 26.7956 15.0642 27.0099C14.85 27.2244 14.85 27.5583 15.0642 27.7728C16.4714 29.1795 19.1895 29.2991 20.0002 29.2991ZM22.4798 22.2889C22.4798 23.4334 23.4095 24.3631 24.5541 24.3631C25.6989 24.3631 26.6286 23.4092 26.6286 22.2889C26.6286 21.1444 25.6989 20.2147 24.5541 20.2147C23.4095 20.2147 22.4798 21.1444 22.4798 22.2889Z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-wrap w-[60%] gap-8 sm:gap-24 mt-10 sm:mt-0">
                        <div className="mb-3">
                            <h5 className="font-bold text-xl sm:text-2xl">Company</h5>
                            <ul className="space-y-2 mt-4 text-sm sm:text-base">
                                <li><a href="#!" className="hover:text-gray-200 hover:font-semibold">About us</a></li>
                                <li><a href="#!" className="hover:text-gray-200 hover:font-semibold">Contact us</a></li>
                                <li><a href="#!" className="hover:text-gray-200 hover:font-semibold">Pricing</a></li>
                                <li><a href="#!" className="hover:text-gray-200 hover:font-semibold">Blog</a></li>
                                <li><a href="#!" className="hover:text-gray-200 hover:font-semibold">Help Center</a></li>
                            </ul>
                        </div>

                        <div className="mb-3">
                            <h5 className="font-bold text-xl sm:text-2xl">Learn</h5>
                            <ul className="space-y-2 mt-4 text-sm sm:text-base">
                                <li><a href="#!" className="hover:text-gray-200 hover:font-semibold">What is Blockchain?</a></li>
                                <li><a href="#!" className="hover:text-gray-200 hover:font-semibold">What is NFT?</a></li>
                                <li><a href="#!" className="hover:text-gray-200 hover:font-semibold">What is Metaverse?</a></li>
                                <li><a href="#!" className="hover:text-gray-200 hover:font-semibold">What is Crypto?</a></li>
                            </ul>
                        </div>

                        <div className="mb-3">
                            <h5 className="font-bold text-xl sm:text-2xl">Solution For</h5>
                            <ul className="space-y-2 mt-4 text-sm sm:text-base">
                                <li><a href="#!" className="hover:text-gray-200 hover:font-semibold">Artist</a></li>
                                <li><a href="#!" className="hover:text-gray-200 hover:font-semibold">Influencer</a></li>
                                <li><a href="#!" className="hover:text-gray-200 hover:font-semibold">Gamers</a></li>
                                <li><a href="#!" className="hover:text-gray-200 hover:font-semibold">Event</a></li>
                                <li><a href="#!" className="hover:text-gray-200 hover:font-semibold">Communities</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center border-t border-gray-600 mt-10 pt-6">
                    <div className="flex gap-4">
                        <h1 className="font-bold hover:text-gray-200 hover:underline cursor-pointer">Privacy Policy</h1>
                        <h1 className="font-bold hover:text-gray-200 hover:underline cursor-pointer">License</h1>
                        <h1 className="hidden text-xs">Copyright © {new Date().getFullYear()} All right reserved.</h1>
                    </div>
                    <h1 className="text-xs font-bold text-gray-200 hover:text-gray-300 cursor-pointer">By Flexi Team.</h1>
                </div>
            </div>
        </footer>
    )
}
