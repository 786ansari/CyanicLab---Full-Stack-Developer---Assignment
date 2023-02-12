import React, { useEffect, useRef, useState } from 'react'
import Navbar from './comman/Navbar';

function Speed() {
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [matchedValue, setMatchedValue] = useState([]);
    const [unMatchedValue, setUnMatchedValue] = useState([]);
    const [typingSpeed, setTypingSpeed] = useState(0);
    const [paragraph, setParagraph] = useState("The sun rises slowly");
    const [typedValue, setTypedValue] = useState('');
    const ref = useRef()
    useEffect(() => {
        if (startTime && endTime) {
          const typingDuration = (endTime - startTime) / 1000;
          setTypingSpeed(typedValue.length / typingDuration);
        }
      }, [startTime, endTime, typedValue]);
    
      const handleFocus = () => {
        setStartTime(new Date());
      };
    
      const handleBlur = () => {
        setEndTime(new Date());
      };
    
      const handleChange = (event) => {
        let value = event.target.value
        setTypedValue(value); 
        let char =  paragraph.charAt(ref.current.value.length-1)
        let matchChar =  value.charAt(value.length-1);
        // console.log("sdjbfhjfsdfsd",char,matchChar)
        var para = document.getElementById("paragraph").innerHTML;
        let arrMatch = []
        let arrUnMatch = []
        var regex = /<\/?span[^>]*>/g;
    var result = para.replace(regex, "");
    for(let i=0;i<value.length;i++){
        if(value[i] === paragraph[i]){
          arrMatch.push(paragraph[i])
     
        }
        else{
          arrUnMatch.push(paragraph[i])
          setUnMatchedValue(arrMatch)
        }
  
      }
      let stringMethod = arrMatch.toString()
      console.log("value",arrMatch)


        if(char !== matchChar){
            const matchChnage =  result.replace(result[value.length-1], `<span style='color:red;'>${result[value.length-1]}</span>`)
            document.getElementById("paragraph").innerHTML= matchChnage
            }
            else{
              const matchChnage =  result.replace(result[value.length-1], `<span style='color:green;'>${result[value.length-1]}</span>`)
              document.getElementById("paragraph").innerHTML= matchChnage
            }
        


      }
    return (
        <>
        <div className='main-cls'>
        <Navbar/>
       
        <div className='paragraph'>
        <p id="paragraph">{paragraph}</p>
        </div>
        <div className='speed-main'>
          <textarea
          ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {/* {typingSpeed ? (
            <div>Your typing speed is: {typingSpeed.toFixed(2)} characters per second.</div>
          ) : null} */}
        </div>
        <button className='btn btn primary' >Submit</button>
        </div>
        </>
      );
}

export default Speed