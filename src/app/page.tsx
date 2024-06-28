import { getServerAuthSession } from "@/server/auth";
import Tiptap from "@/components/tiptap/TipTap";
import Navbar from "@/components/navbar";
import { api } from "@/trpc/server";
import Hero from "@/components/hero/hero";

const content = `
<h2>
  Hi there, welcome to Nevercoder
</h2>
<img src="/icon.svg" />
<p><strong>Project created as a result of a challenge</strong> - <em>write a simple Fullstack web application with WYSIWYG editor in 1 day</em></p>
`

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) {
    return (
      <main>
        <Navbar user={undefined} />
        <Hero />
      </main>
    );
  }

  const websitesUrls = await api.website.getWebsitesUrls();

  return (
    <main className="w-full">
      <Navbar user={session.user} />
      <div className="w-full xl:w-2/3 flex flex-col items-center mt-16 mx-auto gap-5">
        <Tiptap content={content} currentProject={undefined} projectsUrls={websitesUrls.map(website => website.url)} />
      </div>
    </main>
  );
}
