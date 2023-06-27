import { ArrowLeftIcon } from "@/components/icons/arrows";
import FileTree from "@/components/ui/editor/filetree";
import EditorNavbar from "@/components/ui/editor/navbar";
import TableOfContent from "@/components/ui/editor/toc";
import Editor from "~/editor/Editor";

export default function CustomProjectPage() {
    return <>
        <div id="editor" className="h-full w-full flex flex-col">
            <EditorNavbar/>
            <div id="main" className="flex h-full w-full">
                <FileTree/>
                <TableOfContent/>
                <div id="editor" className="flex-grow max-h-fit mb-24 overflow-y-auto">
                <Editor/>
                </div>
            </div>

        </div>

    </>
}