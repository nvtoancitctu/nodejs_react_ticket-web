// src/components/Footer.tsx
import React from "react";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 pt-10 pb-6">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand / About */}
        <div className="space-y-4 md:col-span-2">
          <h2 className="text-xl font-bold text-white">Tickfy.vn</h2>
          <p className="text-gray-400">Nền tảng đặt vé sự kiện hàng đầu Việt Nam. Cập nhật nhanh nhất các sự kiện âm nhạc, hội thảo và lễ hội.</p>
          <p className="text-gray-400 text-sm italic">Tầng 12, Tòa nhà Viettel, 285 Cách Mạng Tháng Tám, Phường Hòa Hưng, TP. Hồ Chí Minh</p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4 md-col-span-1">
          {/* <h3 className="text-lg font-semibold text-white mb-2">Liên kết nhanh</h3> */}
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-white transition-colors duration-300">
                Trang chủ
              </a>
            </li>
            <li>
              <a href="/events" className="hover:text-white transition-colors duration-300">
                Sự kiện
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white transition-colors duration-300">
                Về chúng tôi
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white transition-colors duration-300">
                Liên hệ
              </a>
            </li>
          </ul>
        </div>

        {/* Social / Contact */}
        <div className="space-y-4 md:col-span-1">
          <h3 className="text-lg font-semibold text-white mb-2">Kết nối với chúng tôi</h3>
          <div className="flex space-x-4">
            <a href="#" className="bg-gray-700 p-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="bg-gray-700 p-3 rounded-full hover:bg-pink-500 hover:text-white transition-colors duration-300">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="bg-gray-700 p-3 rounded-full hover:bg-white hover:text-black transition-colors duration-300">
              <FaTiktok size={20} />
            </a>
          </div>
          <p className="text-gray-400 text-sm">
            Hỗ trợ: support@tickfy.com
            <br />
            Hotline: 1900 1234
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-6 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">&copy; {new Date().getFullYear()} Tickfy. Bản quyền thuộc về Tickfy.</div>
    </footer>
  );
};

export default Footer;
