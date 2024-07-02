import Link from "next/link"

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-12 w-full">
        <div className="container mx-auto flex justify-between items-center">
          <p className="text-sm">© 2024 Be-The-Donor. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link href="#" className="text-sm hover:underline">Privacy</Link>
            <Link href="#" className="text-sm hover:underline">Terms of Services</Link>
          </div>
        </div>
      </footer>
    )
}
export default Footer