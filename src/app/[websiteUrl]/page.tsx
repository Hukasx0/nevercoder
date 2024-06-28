import Navbar from "@/components/navbar";
import TipTap from "@/components/tiptap/TipTap";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server"
import { notFound } from "next/navigation";
import "../../components/tiptap/styles.scss";
import Link from "next/link";
import { Github } from "lucide-react";

export default async function Page({ params }: { params: { websiteUrl: string } }) {
    const { websiteUrl } = params
    const website = await api.website.getPublicWebsite({ url: websiteUrl })
    if (!website) return notFound()

    const session = await getServerAuthSession();

    if (session && website.createdById === session?.user.id) {
      const websitesUrls = await api.website.getWebsitesUrls()
      return (
        <main className="w-full">
           <Navbar user={session.user} />
      <div className="w-full xl:w-2/3 flex flex-col items-center mt-16 mx-auto gap-5">
        <TipTap content={website.content} currentProject={website.url} projectsUrls={websitesUrls.map(website => website.url)} />
      </div>
    </main>
      )
    }
    return (
        <div className="w-full xl:w-2/3 flex flex-col items-center mx-auto gap-5">
            <Navbar user={undefined} />
            <div className="tiptap mt-10"  dangerouslySetInnerHTML={{ __html: website.content }} />
            <footer className="w-full flex flex-col sm:flex-row items-center justify-between p-6 mx-auto space-y-4 sm:space-y-0 mt-12">
              <div className="flex flex-col gap-3">
              <span className="text-sm text-center">Website created by <b>{website.authorName}</b></span>
 
              <span className="text-sm text-center">Built with <Link href={"/"} className="hover:text-primary"><b>Nevercoder</b></Link> by <Link href={"https://github.com/Hukasx0"} target="_blank" className="hover:text-primary"><b>Hubert Kasperek</b></Link></span>

              </div>
            <div className="flex items-center space-x-4">
              <Link href={"https://github.com/Hukasx0/nevercoder"} target="_blank">
                <Github width={30} height={30} className="hover:text-primary" />
              </Link>
       </div>
       </footer>
        </div>
    )
}

