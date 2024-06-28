import { Github } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full flex flex-col sm:flex-row items-center justify-between p-6 mx-auto space-y-4 sm:space-y-0 mt-12">
        <span className="text-sm text-center">Nevercoder © {new Date().getFullYear()} by <Link href={"https://github.com/Hukasx0"} target="_blank" className="hover:text-primary"><b>Hubert Kasperek</b></Link></span>
        <div className="flex items-center space-x-4">
           <Link href={"https://github.com/Hukasx0/nevercoder"} target="_blank">
             <Github width={30} height={30} className="hover:text-primary" />
           </Link>
       </div>
       </footer>
    )
}