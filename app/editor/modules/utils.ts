import { Editor, Node, Transforms } from "slate"
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
    deleteAtOffset(editor: Editor, offset: number, distance: number) {
        let path = editor.selection.anchor.path;
        Transforms.delete(editor, {
            at: {path, offset},
            distance: distance,
        })
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

export const ComboHandler = {
    currentEditingNodeText: "",
    matchValue: "",
    match: undefined,
    handleKeyDown: (editor: Editor) => {
        //@ts-ignore
        ComboHandler.currentEditingNodeText = Node.string(Editor.node(editor, editor.selection)[0])

    },
    isComboPressed: (combo: string | RegExp, index?: number) => {
        let comboRegx: RegExp;
    
        if (typeof(combo) == "string") {
            comboRegx = new RegExp(combo)
        } else {
            comboRegx = combo
        }

        //@ts-ignore
        let match = comboRegx.exec(ComboHandler.currentEditingNodeText)
        if (match) {
            ComboHandler.matchValue = match[index ? index : 0]
            ComboHandler.match = match
            return true
        }
        return false    

    }
}