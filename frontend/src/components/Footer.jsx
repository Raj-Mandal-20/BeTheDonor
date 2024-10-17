import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-[#151515] text-white p-24 nano:px-8 nano:py-12 border-t border-gray-800 w-full z-30">
      <div className="flex micro:flex-col micro:gap-8 justify-between items-center">
        <p className="text-sm nano:text-xs">© 2024 Be-The-Donor. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="#" className="text-sm nano:text-xs hover:underline">Privacy</Link>
          <Link href="#" className="text-sm nano:text-xs hover:underline">Terms of Services</Link>
        </div>
      </div>
    </footer>
  )
}
export default Footer