import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import { Toolbar } from '../Toolbar/Toolbar'
import Heading from '@tiptap/extension-heading'

const TipTap = ({ onChange }) => {

    const editor = useEditor({
        extensions: [ StarterKit.configure({}) ],
        content: '',
        editorProps: {
            attributes: {
                class: "outline-none bg-[#fff] text-base sm:text-lg py-3 my-1 font-semibold px-5 w-full h-40 rounded-[7px] border-2 border-slate-200"
            },
        },
        onUpdate({ editor }){
            onChange(editor.getHTML());
            console.log("Txttt:", editor.getHTML());
        }
    })

  return (
    <div>
        <Toolbar editor={editor} />
        <EditorContent editor={editor} />
    </div>
  )
}

export default TipTap