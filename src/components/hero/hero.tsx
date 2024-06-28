import Link from "next/link";
import SlightFlip from "../ui/flip-text";
import { Github } from "lucide-react";
import { Button } from "@nextui-org/react";
import Footer from "./footer";
import { ContainerScroll } from "../ui/container-scroll-animation";
import Image from "next/image";

import nevercoderss from "../../assets/nevercoder_ss.png";

export default function Hero() {
    return (
        <>
            <div className="px-3">
                <div className="mx-auto max-w-screen-lg">
                    <ContainerScroll titleComponent={<div className="mb-3 text-center text-4xl font-bold tracking-tight">Empower Your Creativity with <SlightFlip className="text-primary text-5xl py-2" word={"Nevercoder"} /></div>}>
        <Image
          src={nevercoderss}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
                    <div className="mx-auto max-w-screen-md text-center text-xl text-muted-foreground">Project created as a result of a challenge - write a simple Fullstack web application with WYSIWYG editor in 1 day</div>
                    <div className="mt-8 flex justify-center gap-x-5 gap-y-3 max-sm:flex-col">
                        <Link href={"/api/auth/signin"} className="inline-flex items-center justify-center whitespace-nowrap text-sm"><Button color={"primary"} className="w-full">Get started</Button></Link>
                        <Link href={"https://github.com/Hukasx0/nevercoder"} target="_blank" className="inline-flex items-center justify-center whitespace-nowrap text-sm"><Button  className="w-full"><Github className="mr-2 h-4 w-4" /> Star on GitHub</Button></Link>
                    </div>
                </div>
            </div>
            <div className="relative rounded-xl">
    </div>
            <Footer />
        </>
    )
}