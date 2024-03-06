"use client"

import { Toggle } from "@/components/ui/toggle";
import { Editor } from "@tiptap/react";
import { Bold, Strikethrough, Italic, List, ListOrdered, Heading2 } from "lucide-react";

export const Toolbar = ({ editor }) => {

    if (!editor) {
        return null
    }

    return (
        <div className="bg-[#1b1b1f] rounded-md">
        <Toggle size="sm" pressed={editor.isActive("heading")} onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className="selection:bg-red" >
            <Heading2 className="h-4 w-4" />
        </Toggle>
        <Toggle size="sm" pressed={editor.isActive("bold")} onPressedChange={() => editor.chain().focus().toggleBold().run()} >
            <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle size="sm" pressed={editor.isActive("italic")} onPressedChange={() => editor.chain().focus().toggleItalic().run()} >
            <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle size="sm" pressed={editor.isActive("strike")} onPressedChange={() => editor.chain().focus().toggleStrike().run()} >
            <Strikethrough className="h-4 w-4" />
        </Toggle>
        <Toggle size="sm" pressed={editor.isActive("bulletList")} onPressedChange={() => editor.chain().focus().toggleBulletList().run()} >
            <List className="h-4 w-4" />
        </Toggle>
        <Toggle size="sm" pressed={editor.isActive("orderedList")} onPressedChange={() => editor.chain().focus().toggleOrderedList().run()} >
            <ListOrdered className="h-4 w-4" />
        </Toggle>
        </div>
    )

}