import React from 'react';
import './style.css';

export default function App() {
  const ref = React.useRef(null);
  const [src, setSrc] = React.useState('');

  function fileToByteArray(file, callback) {
    const reader = new FileReader();

    reader.onload = function (event) {
      if (event.target.result instanceof ArrayBuffer) {
        const byteArray = new Uint8Array(event.target.result);
        callback(byteArray);
      }
    };

    reader.readAsArrayBuffer(file);
  }

  const onChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      fileToByteArray(event.target.files[0], function (byteArray) {
        console.log(JSON.stringify(Array.from(byteArray)));
        console.log(byteArray.length);

        let binaryString = '';
        byteArray.forEach((byte) => {
          binaryString += String.fromCharCode(byte);
        });

        console.log(btoa(binaryString));
        setSrc('data:image/png;base64,' + btoa(binaryString));
      });
    }
  };
  return (
    <div>
      <button onClick={() => ref.current.click()}>Upload</button>
      <input ref={ref} type="file" onChange={onChange} />
      <img src={src} />
    </div>
  );
}
