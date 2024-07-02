'use client'
import React, { useState } from 'react';

const Requests = (props) => {
    return (
        <div className="bg-[#051a39] p-5 h-full flex flex-wrap gap-8 justify-center">
            <div className="card h-fit rounded-lg border p-6 w-full max-w-lg shadow-sm text-white">
                <div className="flex items-center justify-between">
                    <div className="space-y-2 flex items-center">
                        <div className="logo-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path>
                                <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path>
                            </svg>
                        </div>
                        <div
                            className="flex flex-col">
                            <h3 className="text-2xl font-bold ml-3">Sovon Das</h3>
                            <h5 className="text font-bold ml-3">West Bengal | Kolkata</h5>

                        </div>
                    </div>
                    <div className="inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold border-green-600 bg-white text-green-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 -translate-x-1 text-green-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle className="blink" cx="12" cy="12" r="10"></circle>
                        </svg>
                        Open
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#e7eded]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path>
                            <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path>
                        </svg>
                        <span className="text-2xl font-bold">10</span>
                        <span className="text-sm text-gray-400">Blood Units</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        <span className="text-2xl font-bold">25</span>
                        <span className="text-sm text-gray-400">Acceptors</span>
                    </div>
                </div>
                <div className="mt-6 flex justify-between">
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-white text-black hover:bg-gray-300">
                        Accept Donation
                    </button>
                    <div className="flex items-center space-x-2 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span className="text-sm">2 hours ago</span>
                    </div>
                </div>
            </div>
            <div className="card h-fit rounded-lg border p-6 w-full max-w-lg shadow-sm text-white">
                <div className="flex items-center justify-between">
                    <div className="space-y-2 flex items-center">
                        <div className="logo-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path>
                                <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path>
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-2xl font-bold ml-3">Rahul Sharma</h3>
                            <h5 className="text font-bold ml-3">Maharashtra, Mumbai</h5>
                        </div>

                    </div>
                    <div className="inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold border-green-600 bg-white text-green-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 -translate-x-1 text-green-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle className="blink" cx="12" cy="12" r="10"></circle>
                        </svg>
                        Open
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#e7eded]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path>
                            <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path>
                        </svg>
                        <span className="text-2xl font-bold">10</span>
                        <span className="text-sm text-gray-400">Blood Units</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        <span className="text-2xl font-bold">25</span>
                        <span className="text-sm text-gray-400">Acceptors</span>
                    </div>
                </div>
                <div className="mt-6 flex justify-between">
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-white text-black hover:bg-gray-300">
                        Accept Donation
                    </button>
                    <div className="flex items-center space-x-2 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span className="text-sm">48 hours ago</span>
                    </div>
                </div>
            </div>
            <div className="card h-fit rounded-lg border p-6 w-full max-w-lg shadow-sm text-white">
                <div className="flex items-center justify-between">
                    <div className="space-y-2 flex items-center">
                        <div className="logo-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path>
                                <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path>
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-2xl font-bold ml-3">Priya Singh</h3>
                            <h5 className="text font-bold ml-3">Karnataka, Bangalore</h5>
                        </div>

                    </div>
                    <div className="inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold border-green-600 bg-white text-green-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 -translate-x-1 text-green-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle className="blink" cx="12" cy="12" r="10"></circle>
                        </svg>
                        Open
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#e7eded]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path>
                            <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path>
                        </svg>
                        <span className="text-2xl font-bold">1</span>
                        <span className="text-sm text-gray-400">Blood Units</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        <span className="text-2xl font-bold">22</span>
                        <span className="text-sm text-gray-400">Acceptors</span>
                    </div>
                </div>
                <div className="mt-6 flex justify-between">
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-white text-black hover:bg-gray-300">
                        Accept Donation
                    </button>
                    <div className="flex items-center space-x-2 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span className="text-sm">24 hours ago</span>
                    </div>
                </div>
            </div>
            <div className="card h-fit rounded-lg border p-6 w-full max-w-lg shadow-sm text-white">
                <div className="flex items-center justify-between">
                    <div className="space-y-2 flex items-center">
                        <div className="logo-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path>
                                <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path>
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-2xl font-bold ml-3">Amit Patel</h3>
                            <h5 className="text font-bold ml-3">Gujarat, Ahmedabad</h5>
                        </div>

                    </div>
                    <div className="inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold border-green-600 bg-white text-green-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 -translate-x-1 text-green-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle className="blink" cx="12" cy="12" r="10"></circle>
                        </svg>
                        Open
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#e7eded]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path>
                            <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path>
                        </svg>
                        <span className="text-2xl font-bold">10</span>
                        <span className="text-sm text-gray-400">Blood Units</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        <span className="text-2xl font-bold">18</span>
                        <span className="text-sm text-gray-400">Acceptors</span>
                    </div>
                </div>
                <div className="mt-6 flex justify-between">
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-white text-black hover:bg-gray-300">
                        Accept Donation
                    </button>
                    <div className="flex items-center space-x-2 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span className="text-sm">20 hours ago</span>
                    </div>
                </div>
            </div>
            <div className="card h-fit rounded-lg border p-6 w-full max-w-lg shadow-sm text-white">
                <div className="flex items-center justify-between">
                    <div className="space-y-2 flex items-center">
                        <div className="logo-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path>
                                <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path>
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-2xl font-bold ml-3">Anjali Verma</h3>
                            <h5 className="text font-bold ml-3">Uttar Pradesh, Lucknow</h5>
                        </div>

                    </div>
                    <div className="inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold border-green-600 bg-white text-green-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 -translate-x-1 text-green-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle className="blink" cx="12" cy="12" r="10"></circle>
                        </svg>
                        Open
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#e7eded]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path>
                            <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path>
                        </svg>
                        <span className="text-2xl font-bold">12</span>
                        <span className="text-sm text-gray-400">Blood Units</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        <span className="text-2xl font-bold">5</span>
                        <span className="text-sm text-gray-400">Acceptors</span>
                    </div>
                </div>
                <div className="mt-6 flex justify-between">
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-white text-black hover:bg-gray-300">
                        Accept Donation
                    </button>
                    <div className="flex items-center space-x-2 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span className="text-sm">5 hours ago</span>
                    </div>
                </div>
            </div>
            <div className="card h-fit rounded-lg border p-6 w-full max-w-lg shadow-sm text-white">
                <div className="flex items-center justify-between">
                    <div className="space-y-2 flex items-center">
                        <div className="logo-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path>
                                <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path>
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-2xl font-bold ml-3">Sandeep Kumar</h3>
                            <h5 className="text font-bold ml-3">Tamil Nadu, Chennai</h5>
                        </div>

                    </div>
                    <div className="inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold border-green-600 bg-white text-green-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 -translate-x-1 text-green-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle className="blink" cx="12" cy="12" r="10"></circle>
                        </svg>
                        Open
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#e7eded]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path>
                            <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path>
                        </svg>
                        <span className="text-2xl font-bold">8</span>
                        <span className="text-sm text-gray-400">Blood Units</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        <span className="text-2xl font-bold">2</span>
                        <span className="text-sm text-gray-400">Acceptors</span>
                    </div>
                </div>
                <div className="mt-6 flex justify-between">
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-white text-black hover:bg-gray-300">
                        Accept Donation
                    </button>
                    <div className="flex items-center space-x-2 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span className="text-sm">4 hours ago</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Requests
















