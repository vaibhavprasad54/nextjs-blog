import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import { Toolbar } from '../Toolbar/Toolbar'
import Heading from '@tiptap/extension-heading'

const TipTap = ({ onChange, data }) => {

    const editor = useEditor({
        extensions: [ StarterKit.configure({}) ],
        content: data ? data : '',
        editorProps: {
            attributes: {
                class: "outline-none bg-[#1b1b1f] text-slate-300 text-base sm:text-lg py-3 my-2 font-semibold px-5 w-full h-40 overflow-y-auto rounded-[7px] border-[1px] border-[#7770e02f] text-left"
            },
        },
        onUpdate({ editor }){
            onChange(editor.getHTML());
            console.log("Txttt:", editor.getHTML());
        }
    })

  return (
    <div className='mt-2'>
        <Toolbar editor={editor} />
        <EditorContent editor={editor} />
    </div>
  )
}

export default TipTap