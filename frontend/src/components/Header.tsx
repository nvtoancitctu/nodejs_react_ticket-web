import { useState } from "react";
import { Search } from "lucide-react";

export default function Header() {
  const [langOpen, setLangOpen] = useState(false);

  return (
    <header className="w-full">
      {/* Banner quốc khánh 2/9 */}
      <div className="w-full">
        <img src="/image/quockhanh.webp" alt="Banner chào mừng" className="w-full object-cover" />
      </div>

      {/* Navbar chính */}
      <div className="bg-green-500 flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <a href="/" className="flex items-center text-white font-bold bg-white px-2 py-1 rounded" title="Trang chủ">
          <span className="text-green-500 text-2xl">tickfy</span>
          <span className="text-green-500" role="img" aria-label="vn">
            .🇻🇳
          </span>
        </a>

        {/* Ô tìm kiếm */}
        <div className="flex items-center bg-white rounded-lg overflow-hidden w-1/2">
          <input type="text" placeholder="Bạn tìm gì hôm nay?" className="flex-1 px-3 py-2 outline-none text-sm" />
          <button className="px-3">
            <Search className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Menu phải */}
        <div className="flex items-center gap-4 text-white">
          <button className="border border-white px-3 py-1 rounded-full hover:bg-white hover:text-green-600 transition">Tạo sự kiện</button>
          <a href="#" className="hover:underline">
            Vé của tôi
          </a>
          <a href="#" className="hover:underline">
            Đăng nhập
          </a>
          <span>|</span>
          <a href="#" className="hover:underline">
            Đăng ký
          </a>

          {/* Dropdown chọn ngôn ngữ */}
          <div className="relative">
            <button onClick={() => setLangOpen(!langOpen)} className="bg-red-600 w-8 h-8 rounded-full flex items-center justify-center">
              ⭐
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow rounded">
                <button className="block w-full px-3 py-2 text-sm hover:bg-gray-100">🇻🇳 Tiếng Việt</button>
                <button className="block w-full px-3 py-2 text-sm hover:bg-gray-100">🇺🇸 English</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
