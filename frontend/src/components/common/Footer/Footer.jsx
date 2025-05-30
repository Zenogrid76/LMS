import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-white py-3 mt-5">
      <div className="max-w-[700px] mx-auto flex flex-col items-center">
        <h1 className="text-lg font-bold text-gray-800 mb-4">Made By Mahmud Reza Mahim</h1>
        <ul className="flex gap-8 mb-3 text-sm text-gray-500">
          <li>
            <a href="#" className="hover:underline">About Us</a>
          </li>
          <li>
            <a href="#" className="hover:underline">Contact</a>
          </li>
          <li>
            <a href="#" className="hover:underline">Privacy Policy</a>
          </li>
          <li>
            <a href="#" className="hover:underline">Terms of Service</a>
          </li>
        </ul>
        <div className="text-xs text-gray-400">&copy; 2025 Mahmud Reza Mahim. All rights reserved.</div>
      </div>
    </footer>
  );
}
