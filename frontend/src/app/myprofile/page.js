import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const Page = async () => {
    if (!cookies().has("usertoken")) {
        redirect("/login");
    }

    return (
        <div class="bg-[#051a39] flex items-start p-4 justify-center min-h-screen">
            <div class="bg-white w-2/3 p-6 rounded-lg shadow-lg ">
                <div class="flex items-center mb-4">
                    <div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                        <span class="text-gray-500 text-2xl font-bold">JD</span>
                    </div>
                    <div class="ml-4">
                        <h2 class="text-xl font-semibold text-gray-900">John Doe</h2>
                        <p class="text-gray-500">john@example.com</p>
                    </div>
                </div>
                <div class="flex items-center justify-between mb-4">
                    <span class="flex items-center text-green-600">
                        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                        Available
                    </span>
                    <button class="text-blue-500 font-semibold">Update</button>
                </div>
                <div class="mb-4">
                    <h3 class="text-gray-700">Phone</h3>
                    <p class="text-gray-900">+1 (123) 456-7890</p>
                </div>
                <div class="mb-4">
                    <h3 class="text-gray-700">Address</h3>
                    <p class="text-gray-900">123 Main St, Anytown USA 12345</p>
                </div>
                <div>
                    <h3 class="text-gray-700">Blood Group</h3>
                    <p class="text-gray-900 flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 10a7 7 0 1114 0 7 7 0 01-14 0zm4-1h6a1 1 0 000-2H7a1 1 0 100 2zM5 11a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                        A+
                    </p>
                </div>

                <h1 class="text-lg text-black  p-6 font-bold">Request History</h1>

                <div class="h-fit p-4 flex items-center justify-center bg-gray-100">
                    <div class="w-full max-w-md p-4 text-white rounded-lg shadow-lg card-gradient flex items-center">
                        <div class="flex-shrink-0">
                            <svg class="h-12 w-12 rounded-full bg-white p-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#17c9d2" />
                            </svg>
                        </div>
                        <div class="ml-4 flex-1">
                            <h2 class="text-xl font-bold">San Francisco, CA</h2>
                            <p class="text-gray-200">Request Location</p>
                            <div class="flex items-center mt-2">
                                <div class="flex -space-x-1">
                                    <svg class="h-6 w-6 rounded-full border-2 border-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="10" fill="#E6E6E6" />
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" fill="#B3B3B3" />
                                        <path d="M18 20c0-3.31-2.69-6-6-6s-6 2.69-6 6h12z" fill="#B3B3B3" />
                                    </svg>
                                    <svg class="h-6 w-6 rounded-full border-2 border-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="10" fill="#E6E6E6" />
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" fill="#B3B3B3" />
                                        <path d="M18 20c0-3.31-2.69-6-6-6s-6 2.69-6 6h12z" fill="#B3B3B3" />
                                    </svg>
                                    <svg class="h-6 w-6 rounded-full border-2 border-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="10" fill="#E6E6E6" />
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" fill="#B3B3B3" />
                                        <path d="M18 20c0-3.31-2.69-6-6-6s-6 2.69-6 6h12z" fill="#B3B3B3" />
                                    </svg>
                                </div>
                                <span class="text-gray-200 ml-2">+2 more</span>
                            </div>
                        </div>
                        <div class="ml-auto text-right">
                            <span class="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">Active</span>
                            <p class="mt-2 text-gray-200">3 Acceptors</p>
                        </div>
                    </div>
                </div>
                <div class="h-fit p-4 flex items-center justify-center bg-gray-100">
                    <div class="w-full max-w-md p-4 text-white rounded-lg shadow-lg card-gradient flex items-center">
                        <div class="flex-shrink-0">
                            <svg class="h-12 w-12 rounded-full bg-white p-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#17c9d2" />
                            </svg>
                        </div>
                        <div class="ml-4 flex-1">
                            <h2 class="text-xl font-bold">San Francisco, CA</h2>
                            <p class="text-gray-200">Request Location</p>
                            <div class="flex items-center mt-2">
                                <div class="flex -space-x-1">
                                    <svg class="h-6 w-6 rounded-full border-2 border-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="10" fill="#E6E6E6" />
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" fill="#B3B3B3" />
                                        <path d="M18 20c0-3.31-2.69-6-6-6s-6 2.69-6 6h12z" fill="#B3B3B3" />
                                    </svg>
                                    <svg class="h-6 w-6 rounded-full border-2 border-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="10" fill="#E6E6E6" />
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" fill="#B3B3B3" />
                                        <path d="M18 20c0-3.31-2.69-6-6-6s-6 2.69-6 6h12z" fill="#B3B3B3" />
                                    </svg>
                                    <svg class="h-6 w-6 rounded-full border-2 border-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="10" fill="#E6E6E6" />
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" fill="#B3B3B3" />
                                        <path d="M18 20c0-3.31-2.69-6-6-6s-6 2.69-6 6h12z" fill="#B3B3B3" />
                                    </svg>
                                </div>
                                <span class="text-gray-200 ml-2">+2 more</span>
                            </div>
                        </div>
                        <div class="ml-auto text-right">
                            <span class="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">Active</span>
                            <p class="mt-2 text-gray-200">3 Acceptors</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Page;
