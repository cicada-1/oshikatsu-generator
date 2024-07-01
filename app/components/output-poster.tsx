/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useRef } from 'react';
import Image from 'next/image';
import * as htmlToImage from 'html-to-image';
import template from '../assets/images/oshikatsu-template.jpg';
import cornerTag from '../assets/images/watashi-no-oshikatsu-corner-tag.png'

export default function OutputPoster(props: any) {

  const screenshotRef = useRef(props.this);

  function screenshotDownload() {
    htmlToImage.toJpeg(screenshotRef.current, { quality: 0.95 })
      .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'watashi-no-oshikatsu.jpeg';
        link.href = dataUrl;
        link.click();
      });
  };

  return (
    <div className="result mt-2">
      {props.submittedImage && (
        <div id="poster">
          <div id="template" className="template flex flex-col items-center max-w-5xl p-5">
            <h2 id="download-heading" className="download-heading font-bold align-center m-10">
              写真をクリックすると、ダウンロードが始まります。
            </h2>
            <div id="screenshot-div" ref={screenshotRef} className="screenshot-div flex flex-col items-center">
              <img
                className="template-base"
                id="template-base"
                alt="not found"
                src={template.src}
              />

              <Image
                className="picture"
                id="picture"
                width={646}
                height={424.5}
                alt="not found"
                src={URL.createObjectURL(props.submittedImage)}
              />

              <img
                className="corner-tag"
                id="corner-tag"
                alt="not found"
                src={cornerTag.src}
              />

              <p className="poster-oshikatsu" id="poster-oshikatsu">{props.submittedText.oshikatsu}</p>
              <p className="poster-mirai" id="poster-mirai">{props.submittedText.mirai}</p>
              <p className="poster-name-age" id="poster-name-age">{props.submittedText.penname}・{props.submittedText.age}歳</p>
              <a id="download-div" className="download-div w-full h-full" onClick={screenshotDownload}></a>
            </div>
            <button
              id="download-button"
              className="download-button rounded-md bg-green-600 my-10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={screenshotDownload}
            >
              保存する
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
