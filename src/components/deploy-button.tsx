"use client";

import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { api } from "@/trpc/react";
import { Editor  } from "@tiptap/react";

import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  url: z.string().min(1).max(64)
})

export default function DeployButton({ editor }: { editor: Editor }) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const deployWebsiteMutation = api.website.deployWebsite.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: ""
    }
  })

  const { toast } = useToast()

  const onSubmit = form.handleSubmit(async (values: z.infer<typeof formSchema>) => {
    try {
      await deployWebsiteMutation.mutateAsync({url: values.url, content: editor.getHTML()})
      toast({
        title: 'Website successfully deployed',
      })
      window.location.href += values.url;
    } catch (error) {
      toast({
        title: 'Error while deploying website',
        description: (error as Error)?.message || 'Unknown error'
      })
    }
  })

  return (
    <>
      <Button onPress={onOpen} color="primary">Deploy</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="bottom-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
            <form onSubmit={onSubmit}>
              <ModalHeader className="flex flex-col gap-1">Deploy website</ModalHeader>
              <ModalBody>
                  <Input
                    autoFocus
                    endContent={
                      null
                    }
                    label=""
                    placeholder="Enter your website URL"
                    variant="bordered"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">{`${window.location.hostname}/`}</span>
                      </div>
                    }
                    {...form.register("url")}
                  />
              </ModalBody>
              <ModalFooter>
                  <Button color="primary" type="submit">
                    Deploy
                  </Button>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

