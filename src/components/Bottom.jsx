import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Bottom() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-12">
      {/* Newsletter */}
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h3 className="text-sm tracking-widest mb-4">SUBSCRIBE FOR NEWSLETTER</h3>
        <div className="flex justify-center items-center gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-md bg-transparent border border-gray-500 focus:outline-none w-64"
          />
          <button className="bg-white text-black px-6 py-2 rounded-md font-semibold hover:bg-gray-200 transition">
            SUBMIT »
          </button>
        </div>
      </div>

      <hr className="border-gray-600 mb-10" />

      {/* Footer content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        {/* Address */}
        <div>
          <p className="font-semibold">Araliya Hotels & Resorts</p>
          <p>No 07 - Liberty Plaza, Colpetty, Colombo 03, Sri Lanka.</p>
          <p className="mt-3">info@araliyaresorts.com</p>
          <p>+9471 334 1686</p>
        </div>

        {/* Links */}
        <div>
          <ul className="space-y-2">
            <li><a href="/" className="hover:underline">HOME</a></li>
            <li><a href="/" className="hover:underline">EXPERIENCES</a></li>
            <li><a href="/" className="hover:underline">WEDDINGS</a></li>
            <li><a href="/" className="hover:underline">GALLERY</a></li>
          </ul>
        </div>

        <div>
          <ul className="space-y-2">
            <li><a href="/" className="hover:underline">OUR HOTELS</a></li>
            <li><a href="/" className="hover:underline">OFFERS</a></li>
            <li><a href="/" className="hover:underline">MEETINGS & CONFERENCES</a></li>
            <li><a href="/" className="hover:underline">ABOUT</a></li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <ul className="space-y-2">
            <li><a href="/" className="hover:underline">GDPR Compliance</a></li>
            <li><a href="/" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/" className="hover:underline">Terms & Conditions</a></li>
            <li><a href="/" className="hover:underline">Sitemap</a></li>
          </ul>
        </div>
      </div>

      {/* Socials */}
      <div className="max-w-6xl mx-auto text-center mt-10">
        <p className="mb-4">Let's get social with <span className="font-semibold">#AraliyaHotelsAndResorts</span></p>
        <div className="flex justify-center gap-4 text-xl">
          <a href="/" className="bg-gray-700 p-3 rounded-full hover:bg-gray-600"><FaFacebookF /></a>
          <a href="/" className="bg-gray-700 p-3 rounded-full hover:bg-gray-600"><FaInstagram /></a>
          <a href="/" className="bg-green-600 p-3 rounded-full hover:bg-green-500"><FaWhatsapp /></a>
        </div>
      </div>
    </footer>
  );
}
