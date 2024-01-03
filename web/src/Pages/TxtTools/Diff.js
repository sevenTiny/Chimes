import { useEffect, useRef } from 'react';
import * as monaco from "monaco-editor"
import { PageBox } from '../../CustomComponents';

const Home = () => {
    const editorContainer = useRef(null);
    const isSet = useRef(false);

    const initEditor = () => {
        monaco.editor.setTheme("vs") //默认"vs", 支持"vs-dark"、"hc-black"

        const originalModel = monaco.editor.createModel(
            /* set from `originalModel`: */ ``,
            "text/plain"
        );
        const modifiedModel = monaco.editor.createModel(
            /* set from `modifiedModel`: */ ``,
            "text/plain"
        );

        const diffEditor = monaco.editor.createDiffEditor(
            editorContainer.current,
            {
                originalEditable: true,
                automaticLayout: true,
            }
        );
        diffEditor.setModel({
            original: originalModel,
            modified: modifiedModel,
        });

        diffEditor.updateOptions({
            renderSideBySide: true,
        });
    }

    useEffect(() => {
        if (isSet.current)
            return;

        initEditor()
        isSet.current = true;
    }, [])

    return <>
        <PageBox>
            <div ref={editorContainer} style={{ height: window.innerHeight - 180 }}></div>
        </PageBox>
    </>
}

export default Home;