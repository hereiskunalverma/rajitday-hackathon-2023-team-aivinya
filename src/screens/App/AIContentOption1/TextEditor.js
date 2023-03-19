import React from 'react';
import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MUIRichTextEditor from 'mui-rte';
import { EditorState, ContentState, RawDraftContentState } from 'draft-js';
import { convertToRaw } from 'draft-js';
import { Tooltip } from '@mui/material';
import { Save } from '@mui/icons-material';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const TextEditor = ({ value, postDoc, useCase }) => {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [outputText, setOutputText] = useState(value);
  const [editorVal, setEditorVal] = useState(
    JSON.stringify(convertToRaw(ContentState.createFromText(value)))
  );

  useEffect(() => {
    changeStyles();
    setOutputText(value);
    setPlaceholder(useCase);
    setEditorVal(JSON.stringify(convertToRaw(ContentState.createFromText(value))));

    // setEditorVal(JSON.stringify(convertToRaw(ContentState.createFromText(useCase))))
  }, [value, useCase]);

  const changeStyles = () => {
    let h2Icon = document.getElementById('mui-rte-H2-button');
    let boldIcon = document.getElementById('mui-rte-Bold-button');
    let italicIcon = document.getElementById('mui-rte-Italic-button');
    let underlineIcon = document.getElementById('mui-rte-Underline-button');
    let strikethroughIcon = document.getElementById('mui-rte-Strikethrough-button');
    let highlightIcon = document.getElementById('mui-rte-Highlight-button');
    let undoIcon = document.getElementById('mui-rte-Undo-button');
    let redoIcon = document.getElementById('mui-rte-Redo-button');
    let linkIcon = document.getElementById('mui-rte-link-control-button');
    let mediaIcon = document.getElementById('mui-rte-media-control-button');
    let ULIcon = document.getElementById('mui-rte-UL-button');
    let OLIcon = document.getElementById('mui-rte-OL-button');
    let quoteIcon = document.getElementById('mui-rte-Blockquote-button');
    let codeIcon = document.getElementById('mui-rte-Code Block-button');
    let clearIcon = document.getElementById('mui-rte-Clear-button');
    let saveIcon = document.getElementById('mui-rte-Save-button');

    // h2Icon.innerHTML = `<tooltip title="H2"><svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="TitleIcon"><path d="M5 4v3h5.5v12h3V7H19V4z"></path></svg></tooltip>`
    // italicIcon.innerHTML=`<Tooltip title="Italic"><svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="FormatItalicIcon"><path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"></path></svg></Tooltip>`
    // underlineIcon.innerHTML=`<Tooltip title="Underline"><svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="FormatUnderlinedIcon"><path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"></path></svg></Tooltip>`
    // strikethroughIcon.innerHTML=`<Tooltip title="Strikethrough"><svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="StrikethroughSIcon"><path d="M6.85 7.08C6.85 4.37 9.45 3 12.24 3c1.64 0 3 .49 3.9 1.28.77.65 1.46 1.73 1.46 3.24h-3.01c0-.31-.05-.59-.15-.85-.29-.86-1.2-1.28-2.25-1.28-1.86 0-2.34 1.02-2.34 1.7 0 .48.25.88.74 1.21.38.25.77.48 1.41.7H7.39c-.21-.34-.54-.89-.54-1.92zM21 12v-2H3v2h9.62c1.15.45 1.96.75 1.96 1.97 0 1-.81 1.67-2.28 1.67-1.54 0-2.93-.54-2.93-2.51H6.4c0 .55.08 1.13.24 1.58.81 2.29 3.29 3.3 5.67 3.3 2.27 0 5.3-.89 5.3-4.05 0-.3-.01-1.16-.48-1.94H21V12z"></path></svg></Tooltip>`
    // highlightIcon.innerHTML=`<Tooltip title="Highlight"><svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="HighlightIcon"><path d="m6 14 3 3v5h6v-5l3-3V9H6v5zm5-12h2v3h-2V2zM3.5 5.88l1.41-1.41 2.12 2.12L5.62 8 3.5 5.88zm13.46.71 2.12-2.12 1.41 1.41L18.38 8l-1.42-1.41z"></path></svg></Tooltip>`
    // undoIcon.innerHTML=`<Tooltip title="Undo"><svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="UndoIcon"><path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"></path></svg></Tooltip>`
    // redoIcon.innerHTML=`<Tooltip title="Redo"><svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="RedoIcon"><path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"></path></svg></Tooltip>`
    // linkIcon.innerHTML=`<Tooltip title="Link"><svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="InsertLinkIcon"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path></svg></Tooltip>`
    // mediaIcon.innerHTML=`<Tooltip title="Media"><svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="PhotoLibraryIcon"><path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4 2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z"></path></svg></Tooltip>`
    // ULIcon.innerHTML=`<Tooltip title="Unordered List"><svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="FormatListBulletedIcon"><path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"></path></svg></Tooltip>`
    // OLIcon.innerHTML=`<Tooltip title="Ordered List"><svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="FormatListNumberedIcon"><path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"></path></svg></Tooltip>`
    // quoteIcon.innerHTML=`<Tooltip title="Blockquote"><svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="FormatQuoteIcon"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"></path></svg></Tooltip>`
    // codeIcon.innerHTML=`<Tooltip title="Code Block"><svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CodeIcon"><path d="M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path></svg></Tooltip>`
    // clearIcon.innerHTML=`<Tooltip title="Clear"><svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="FormatClearIcon"><path d="M3.27 5 2 6.27l6.97 6.97L6.5 19h3l1.57-3.66L16.73 21 18 19.73 3.55 5.27 3.27 5zM6 5v.18L8.82 8h2.4l-.72 1.68 2.1 2.1L14.21 8H20V5H6z"></path></svg></Tooltip>`
    // boldIcon.innerHTML=`<Tooltip title="Bold"><svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="FormatBoldIcon"><path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"></path></svg></Tooltip>`
    // saveIcon.innerHTML=`<Tooltip title="Save"><svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="SaveIcon"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"></path></svg></Tooltip>`
  };

  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(ContentState.createFromText(outputText))
  );

  const [placeholder, setPlaceholder] = useState(useCase);

  const customCountFunction = (str) => {
    const wordArray = str.match(/\S+/g); // matches words according to whitespace
    return wordArray ? wordArray.length : 0;
  };

  const save = (data) => {
    postDoc;
  };

  const myTheme = createTheme({
    // Set up your custom MUI theme here
  });

  return (
    <ThemeProvider theme={myTheme}>
      <div className="flex justify-end px-3">
        Characters: {editorState.getCurrentContent().getPlainText('\u0001').length} &nbsp; Words:{' '}
        {editorState.getCurrentContent().getPlainText('\u0001').trim() === ''
          ? 0
          : editorState.getCurrentContent().getPlainText('\u0001').trim().split(/\s+/).length}
      </div>

      <div className="min-h-[500px] bg-white">
        <b>
          <MUIRichTextEditor
            onSave={(data) => postDoc(data)}
            editorState={editorState}
            value={outputText.startsWith('{"blocks"') ? outputText : editorVal}
            onChange={setEditorState}
            maxLength={150}
            label={placeholder}
            inlineToolbar={true}
            // controls={["bold", "italic", "underline", "strikethrough", "highlight", "link", "clear", "my-save"]}
            // customControls={[
            //   {
            //       name: "my-save",
            //       icon: <Tooltip title="Save"><Save /></Tooltip>,
            //       type: "callback",
            //       onClick: (editorState, name, anchor) => {
            //           save()
            //       }
            //   }]}
          />
        </b>
      </div>
    </ThemeProvider>
  );
};

export default TextEditor;
