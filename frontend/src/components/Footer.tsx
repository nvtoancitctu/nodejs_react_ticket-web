// src/components/Footer.tsx
import React from "react";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { MapPin, Mail, Phone } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 pt-10 pb-6 px-6">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand / About */}
        <div className="space-y-4 md:col-span-2">
          <h2 className="text-xl font-bold text-white">Tickfy.vn</h2>
          <p className="text-gray-400 text-sm">Nền tảng đặt vé sự kiện hàng đầu Việt Nam. Cập nhật nhanh nhất các sự kiện âm nhạc, hội thảo và lễ hội.</p>
          <p className="text-gray-400 text-sm flex items-start gap-2 italic">
            <MapPin className="mt-0.5 text-red-400" size={18} />
            Tầng 1, Tòa nhà Viva, 285 Hoàng Văn Thụ, Phường Hòa Hưng, TP. Hồ Chí Minh
          </p>{" "}
          <p className="text-gray-400 text-sm">
            Tham khảo dữ liệu từ{" "}
            <a href="https://ticketbox.vn/" className="underline hover:text-white">
              ticketbox.vn
            </a>
          </p>
        </div>

        {/* Terms / Quick Links */}
        <div className="space-y-2 md:col-span-1 grid grid-cols-1 gap-6">
          {/* Customer Terms */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-white">Dành cho Khách hàng</h3>
            <ul className="space-y-1">
              <li>
                <a href="/customer/terms" className="text-gray-400 hover:text-white hover:underline transition-colors duration-300 text-sm">
                  Điều khoản sử dụng cho khách hàng
                </a>
              </li>
            </ul>
          </div>

          {/* Organizer Terms */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-white">Dành cho Ban Tổ chức</h3>
            <ul className="space-y-1">
              <li>
                <a href="/organizer/terms" className="text-gray-400 hover:text-white hover:underline transition-colors duration-300 text-sm">
                  Điều khoản sử dụng cho Ban Tổ chức
                </a>
              </li>
            </ul>
          </div>
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

          <div className="space-y-2 text-gray-400 text-sm">
            <p className="flex items-center gap-2">
              <Mail className="text-blue-400" size={18} />
              support@tickfy.com
            </p>
            <p className="flex items-center gap-2">
              <Phone className="text-green-400" size={18} />
              1900 1234
            </p>
          </div>

          {/* Bottom */}
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Tickfy. Bản quyền thuộc về Tickfy.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
