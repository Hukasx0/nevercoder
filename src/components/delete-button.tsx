"use client";

import { api } from "@/trpc/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

import { useToast } from "@/components/ui/use-toast"

export default function DeleteButton({ url }: { url: string }) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const { toast } = useToast()

    const deleteWebsiteMutation = api.website.deleteWebsite.useMutation();

    function deleteWebsite() {
        deleteWebsiteMutation.mutate({url: url});
        toast({
          title: `'${url}' successfully deleted`,
        })
    }

    return (
        <>
      <Button onPress={onOpen} color={"danger"}>Delete</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Delete</ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this? (this cannot be undone)</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => {
                  deleteWebsite()
                  onClose()
                  window.location.href = "/";
                }
                }>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
    );
}
