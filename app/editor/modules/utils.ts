import { KeyboardEvent } from "react"
import { Descendant, Editor, Element, Node } from "slate"
import { ReactEditor } from "slate-react"

export const EditorUtils =  {
    isLineBegining: (editor: Editor, offset?: number) => {
        let position = Editor.start(editor, editor.selection)
        return (position.offset == (offset || 0))
    },
    getCaretXY: (editor: Editor): DOMRect => {
        let selection = ReactEditor.toDOMRange(editor, editor.selection)
        return selection.getBoundingClientRect()
    },
    getToc: (editor: Editor) => {
        let children = editor.children;
        let toc = [];
        function findOrCreateParentSection(parent, level) {
            if (level == 1) {
                return parent
            }
            let sect = parent
            for (let x = 1; x < level; x += 1) {
                let tmpSect = sect.subSections[sect.subSections.length - 1]
                if (tmpSect == undefined) {
                    sect.subSections.push({title: `Missing level ${x+1} section`, level: x+1, subSections: []})
                }
                sect = sect.subSections[sect.subSections.length - 1]
            }
            return sect
          }
          for (var i = 0; i < children.length; i++) {
            var item = children[i];
            if (item.type != "title") {
                continue;
            }
            var section = { title: Node.string(item), elem: item, level: item.level, subSections: [] };
        
            // Determine the appropriate parent section based on the level
            if (item.level === 1) {
              toc.push(section);
            } else {
              var parentLevel = item.level - 1;
              var parentSection = findOrCreateParentSection(toc[toc.length - 1], parentLevel);
              parentSection.subSections.push(section);
            }
          }
        return toc
    }
}


const BANNED = ["Alt", "Control","AltLeft","AltGraph", "ShiftLeft","ShiftRight","Tab","Backspace","Delete"]

export const ComboHandler = {
    pressed: [],
    handleKeyDown: (editor: Editor, event: KeyboardEvent) => {
        if (!BANNED.includes(event.key)) {
            ComboHandler.pressed.push(event.key)
        }
        if (event.key == "Enter") {
            ComboHandler.pressed = []
        }
        if (event.key == "Backspace") {
            ComboHandler.pressed.splice(-1,1)
        }
    },
    isComboPressed: (combo: string) => {
        if (ComboHandler.pressed.slice(-combo.length).toString() == combo.split("").toString()){
            ComboHandler.pressed = []
            return true
        }
        return false    
    }
}