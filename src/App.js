import { useEffect, useState } from 'react';
import './App.css';
import logo from './logo.png'

function App() {
  let [html, setHtml] = useState('');
  let [css, setCss] = useState('');
  let [js, setJS] = useState('');
  let [hover, setHover] = useState(false);
  let [hover2, setHover2] = useState(false);
  let [hover3, setHover3] = useState(false);
  let [dark, setDark] = useState(false);

  let handlechage = (e) => {
    let value = e.target.value;
    setHtml(value);
    localStorage.setItem('Html_value', value)
    changing(value, css, js);
  }
  useEffect(()=>{
    let still_val = localStorage.getItem('Html_value')
    if (still_val){
      setHtml(still_val)
    }
  },[])
  let handlechagecss = (e) => {
    let value = e.target.value;
    setCss(value);
    localStorage.setItem('Css_value', value)
    changing(html, value, js);
  }

  useEffect(()=>{
    let still_val = localStorage.getItem('Css_value')
    if (still_val){
      setCss(still_val)
    }
  },[])

  let handleJS = (e) => {
    let value = e.target.value;
    setJS(value);
    localStorage.setItem('Js_value', value)
    changing(html, css, value);
  }
  
  useEffect(()=>{
    let still_val = localStorage.getItem('Js_value')
    if (still_val){
      setJS(still_val)
    }
  },[])

  let hadleTextArea = (index, value) => {
    if (index === 0) {
      setHtml(value);
      setHover(true);
      changing(value, css, js);
    }
    else if (index === 1) {
      setCss(value);
      setHover2(true);
      changing(html, value, js);
    }
    else if (index === 2) {
      setJS(value);
      setHover3(true);
      changing(html, css, value);
    }
  }


  let changing = (htmlContent, cssContent, jsContent) => {
    let iframe = document.getElementById("lop");
    if (iframe) {
      let iframeDocument = iframe.contentDocument;
      iframeDocument.body.innerHTML = htmlContent;
      iframeDocument.head.innerHTML = `<style>${cssContent}</style>`;
      try {
        iframe.contentWindow.eval(jsContent);
      } catch (error) {
        console.error('Error in evaluating JavaScript:', error);
      }
    }
  }

  let handleHover = () => {
    setHover(!hover);
    setHover2(false);
    setHover3(false);
  }

  let handleHover2 = () => {
    setHover2(!hover2);
    setHover(false);
    setHover3(false);
  }

  let handleHover3 = () => {
    setHover3(!hover3);
    setHover2(false);
    setHover(false);
  }

  let handleDarkMode = () => {
    setDark(!dark);
  }


  return (
    <>
      <nav className='flex justify-between items-center p-1 bg-slate-700'>
        <img src={logo} alt="logo" width={50} className='border border-white rounded-[8px]' />
        <button onClick={handleDarkMode} className='border border-white text-white text-[20px] flex p-1 rounded-[8px]'>
          {
            dark ?
              <ion-icon name="sunny-outline"></ion-icon>
              :
              <ion-icon name="moon-outline"></ion-icon>
          }
        </button>
      </nav>

      <div className="dark:bg-black flex-col lg:flex lg:flex-row  h-screen font-kedo-mono">
        <div className='w-auto lg:w-[40%] flex flex-col gap-2 bg-slate-700 p-2'>

          <textarea className={hover ? "border bg-[#333] outline-none text-[white] h-80 lg:h-[32%] p-2 hover:border border-white rounded-[10px]" : "bg-[#333] outline-none text-[white] h-80 lg:h-[32%] p-2 hover:border border-white  rounded-[10px]"} onChange={handlechage} onKeyUp={(e) => hadleTextArea(0, e.target.value)} value={html} onClick={handleHover} placeholder='HTML code...'>
          </textarea>

          <textarea className={hover2 ? 'border bg-[#333] outline-none text-[white] h-80 lg:h-[32%] p-2 hover:border border-white  rounded-[10px]' : "bg-[#333] outline-none text-[white] h-80 lg:h-[32%] p-2 hover:border border-white  rounded-[10px]"} onChange={handlechagecss} onKeyUp={(e) => hadleTextArea(1, e.target.value)} value={css} onClick={handleHover2} placeholder='CSS code...'>
          </textarea>

          <textarea className={hover3 ? 'border bg-[#333] outline-none text-[white] h-80 lg:h-[32%] p-2 hover:border border-white rounded-[10px]' : "bg-[#333] outline-none text-[white] h-80 lg:h-[32%] p-2 hover:border border-white rounded-[10px]"} onChange={handleJS} onKeyUp={() => hadleTextArea((e) => hadleTextArea(2, e.target.value))} value={js} onClick={handleHover3} placeholder='Java Script code...'>
          </textarea>

        </div>

        <div className='flex flex-col w-auto lg:w-[60%] '>
            <h1 className='bg-slate-700 text-left text-white font-semibold'>OutPut</h1>
            <iframe className={dark ? 'bg-black h-screen transition-all duration-500' : 'bg-white h-screen transition-all duration-500'} id='lop' title='editor'>
            </iframe>
            
        </div>
      </div>
    </>
  );
}

export default App;
