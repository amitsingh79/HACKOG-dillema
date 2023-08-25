import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import buildspaceLogo from "../assets/buildspace-logo.png";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  // const [userInput2, setUserInput2] = useState("");
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...");
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text);

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };
  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };
  // const onUserChangedText2 = (event) => {
  //   console.log(event.target.value);
  //   setUserInput2(event.target.value);
  // };
  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1 className="text-green-300 font-extrabold text-7xl text-center align-baseline font-sans">DILEMM.AI</h1>
          </div>
          <div className="header-subtitle font-mono text-lg text-neutral-400 text-center">
            <h2>
            <br/>
            Stuck in a moral dilemma, cannot make a decision? Weighing on your guilt? Fear not, DILEMM.AI is here to save the day!
            </h2>
          </div>
        </div>
        <div className="prompt-container">
          
          <textarea   rows={8} cols={80} className="block p-2.5 mx-auto text-sm py-5 text-gray-900
           bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500
           focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
           dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
           value={userInput}
           onChange={onUserChangedText}
            placeholder="Ask about your dilemma here" >

           </textarea>
          ;
        </div>
        
        <div className="prompt-buttons">
          <a className={ isGenerating ? 'generate-button loading' : 'generate-button'} onClick={callGenerateEndpoint}>
            <div className="generate">
              {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
            </div>
          </a>
        </div>
        {apiOutput && (
          <div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Output</h3>
              </div>
            </div>
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default Home;
