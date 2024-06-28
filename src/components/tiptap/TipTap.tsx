"use client";

import { Button, ButtonGroup } from '@nextui-org/react';
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import Image from '@tiptap/extension-image'
import Youtube from '@tiptap/extension-youtube'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import './styles.scss'
import DeployButton from '../deploy-button';
import ProjectsSelect from '../projects-select';
import DeleteButton from '../delete-button';
import { api } from '@/trpc/react';

import { useToast } from "@/components/ui/use-toast"

const MenuBar = ({ currentProject, projectsUrls }: { currentProject: string | undefined, projectsUrls: string[]}) => {
  const { editor } = useCurrentEditor()
  const { toast } = useToast()

  const updateWebsite = api.website.updateWebsite.useMutation();
  
  if (!editor) {
    return null
  }


  async function updateLayout() {
    await updateWebsite.mutateAsync({ url: currentProject ?? "", content: editor?.getHTML() ?? "" })
    toast({
      title: 'Website successfully updated',
    })
  }
  
  return (
    <>
      <div className="flex w-full flex-row gap-5 justify-center flex-wrap">
        {currentProject ? (
          <>
            <ProjectsSelect currentProject={currentProject} projectsList={projectsUrls} />
            <Button color={"primary"} onPress={() => updateLayout()}>Update</Button>
            <DeleteButton url={currentProject} />
          </>
        ) :
        (
          <>
            <ProjectsSelect currentProject={currentProject} projectsList={projectsUrls} />
            <DeployButton editor={editor} />
          </>
        )}
      </div>
      <div className="control-group flex flex-col gap-3">
        <ButtonGroup className='w-full flex-wrap'>
          <Button
            color={"secondary"}
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleBold()
                .run()
            }
            className={editor.isActive('bold') ? 'is-active' : ''}
          >
            Bold
          </Button>
          <Button
            color={"secondary"}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleItalic()
                .run()
            }
            className={editor.isActive('italic') ? 'is-active' : ''}
          >
            Italic
          </Button>
          <Button
            color={"secondary"}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleStrike()
                .run()
            }
            className={editor.isActive('strike') ? 'is-active' : ''}
          >
            Strike
          </Button>
          <Button
            color={"secondary"}
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleCode()
                .run()
            }
            className={editor.isActive('code') ? 'is-active' : ''}
          >
            Code
          </Button>
        </ButtonGroup>
        <ButtonGroup className='w-full flex-wrap'>
          <Button color={"secondary"} onClick={() => editor.chain().focus().unsetAllMarks().run()}>
            Clear marks
          </Button>
          <Button color={"secondary"} onClick={() => editor.chain().focus().clearNodes().run()}>
            Clear nodes
          </Button>
          <Button
            color={"secondary"}
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive('paragraph') ? 'is-active' : ''}
          >
            Paragraph
          </Button>
        </ButtonGroup>
        <ButtonGroup className='w-full flex-wrap'>
          <Button
            color={"secondary"}
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
          >
            H1
          </Button>
          <Button
            color={"secondary"}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
          >
            H2
          </Button>
          <Button
            color={"secondary"}
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
          >
            H3
          </Button>
          <Button
            color={"secondary"}
            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
          >
            H4
          </Button>
          <Button
            color={"secondary"}
            onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
            className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
          >
            H5
          </Button>
          <Button
            color={"secondary"}
            onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
            className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
          >
            H6
          </Button>
        </ButtonGroup>
        <ButtonGroup className='w-full flex-wrap'>
          <Button
            color={"secondary"}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
          >
            Bullet list
          </Button>
          <Button
            color={"secondary"}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'is-active' : ''}
          >
            Ordered list
          </Button>
          <Button
            color={"secondary"}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('codeBlock') ? 'is-active' : ''}
          >
            Code block
          </Button>
          <Button
            color={"secondary"}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'is-active' : ''}
          >
            Blockquote
          </Button>
          <Button color={"secondary"} onClick={() => editor.chain().focus().setHorizontalRule().run()}>
            Horizontal rule
          </Button>
          <Button color={"secondary"} onClick={() => editor.chain().focus().setHardBreak().run()}>
            Hard break
          </Button>
        </ButtonGroup>
        <ButtonGroup className='w-full flex-wrap'>
          <Button
            color={"secondary"}
            onClick={() => editor.chain().focus().undo().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .undo()
                .run()
            }
          >
            Undo
          </Button>
          <Button
            color={"secondary"}
            onClick={() => editor.chain().focus().redo().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .redo()
                .run()
            }
          >
            Redo
          </Button>
        </ButtonGroup>
        <ButtonGroup className='w-full flex-wrap'>
          <Button
            color={"secondary"}
            onClick={() => {
              const url = window.prompt('Image URL');
              if (url) {
                editor.chain().focus().setImage({ src: url }).run()
              }
            }}>
            Add image
          </Button>
          <Button
            color={"secondary"}
            onClick={() => {
              const url = window.prompt('Video URL');
              if (url) {
                editor.commands.setYoutubeVideo({
                  src: url,
                  width: 640,
                  height: 480,
                })
              }
            }}>
            Add YouTube video
          </Button>
        </ButtonGroup>
      </div>
    </>
  )
}
  
const extensions = [
  TextStyle.configure({}),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  Image,
  Youtube.configure({
    controls: false,
    nocookie: true,
  }),
]

export default function TipTap({ content, currentProject, projectsUrls }: { content: string, currentProject: string | undefined, projectsUrls: string[] }) {
  return (
    <EditorProvider slotBefore={<MenuBar currentProject={currentProject} projectsUrls={projectsUrls} />} extensions={extensions} content={content}></EditorProvider>
  )
}
