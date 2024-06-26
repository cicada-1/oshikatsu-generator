/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useState, useRef } from 'react';
import Image from 'next/image';
import * as htmlToImage from 'html-to-image';
import template from '../assets/images/oshikatsu-template.jpg';
import cornerTag from '../assets/images/watashi-no-oshikatsu-corner-tag.png'

export default function Form(this: any) {

  const [formData, setFormData] = useState({
    oshikatsu: '',
    mirai: '',
    penname: '',
    age: '',
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const [submittedImage, setSubmittedImage] = useState(null);

  const [submittedText, setSubmittedText] = useState({
    oshikatsu: '',
    mirai: '',
    penname: '',
    age: '',
  });

  const changeHandler = (e: any) => {
    e.target.name === "image" ? (
      setSelectedImage(e.target.files[0])
    ) : (
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    )
    e.target.setCustomValidity("");
  };

  const existenceValidity = (e: any) => {
    e.target.name === "image" ? e.target.setCustomValidity("写真を選択してください") : e.target.setCustomValidity("入力してください")
  };

  const ageLimitValidity = (e: any) => {
      e.target.setCustomValidity("0から120まで入力できます")
  };

  function autoScroll() {
    window.location.replace("/#poster");
  };

  async function handleSubmit(e: any) {
    e.preventDefault();
    setSubmittedImage(e.target.image.files[0]);
    setSubmittedText({
      ...submittedText,
      [e.target.oshikatsu.name]: e.target.oshikatsu.value,
      [e.target.mirai.name]: e.target.mirai.value,
      [e.target.penname.name]: e.target.penname.value,
      [e.target.age.name]: e.target.age.value,
    });
    setTimeout(autoScroll, 500);
  };

  const screenshotRef = useRef(this);

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
    <div>
      <form onSubmit={handleSubmit} className="p-5">
        <div className="space-y-5 flex flex-col items-center">
          <div className="form mt-5 grid grid-cols-1 gap-x-6 gap-y-8">
            <div className="col-span-full">
              <label htmlFor="oshikatsu" className="form-heading block font-semibold leading-6 text-gray-900">
                あなたの「推し勝★」を教えてください！
              </label>
              <p className="form-note">※7字まで入力できます。</p>
              <div className="mt-2">
                <div className="form-field flex mt-4 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset">
                  <input
                    type="text"
                    name="oshikatsu"
                    id="oshikatsu"
                    value={formData.oshikatsu}
                    maxLength={7}
                    className="oshikatsu block flex-1 rounded-md border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0"
                    placeholder="山"
                    required={true}
                    onInvalid={existenceValidity}
                    onChange={changeHandler}
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="mirai" className="form-heading block font-semibold  leading-6 text-gray-900">
                「推し勝★」でどんな未来を創る？
              </label>
              <p className="form-note">※36字まで入力できます。</p>
              <div className="form-field mt-2">
                <textarea
                  name="mirai"
                  id="mirai"
                  value={formData.mirai}
                  maxLength={36}
                  className="mirai block w-full mt-4 rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset"
                  placeholder="勝山が山に囲まれて、守ってくれてるような感じです。登るのも楽しいです！"
                  required={true}
                  onInvalid={existenceValidity}
                  onChange={changeHandler}
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="penname" className="form-heading block font-semibold leading-6 text-gray-900">
                あなたのペンネームは何ですか？（任意）
              </label>
              <p className="form-note">※15字まで入力できます。</p>
              <div className="mt-2">
                <div className="form-field flex mt-4 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset">
                  <input
                    type="text"
                    name="penname"
                    id="penname"
                    value={formData.penname}
                    maxLength={15}
                    className="pen-name block flex-1 rounded-md border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0"
                    placeholder="勝山たろう"
                    onChange={changeHandler}
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="age" className="form-heading block font-semibold leading-6 text-gray-900">
                おいくつですか？（任意）
              </label>
              <p className="form-note"></p>
              <div className="mt-2">
                <div className="age-container flex mt-4 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset">
                  <input
                    type="number"
                    name="age"
                    id="age"
                    value={formData.age}
                    min={0}
                    max={120}
                    placeholder="70"
                    className=" age block flex-1 rounded-md border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0"
                    onInvalid={ageLimitValidity}
                    onChange={changeHandler}
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="image" className="form-heading block font-semibold  leading-6 text-gray-900">
                写真を選択してください。
              </label>
              <p className="form-note">※テンプレートの写真スペースは横になっているので、縦の写真をアップする場合、全部が表示されない可能性があります。</p>
              <div className="form-field mt-4">
                {selectedImage && (
                  <div>
                    <Image
                      width={250}
                      height={140}
                      alt="not found"
                      src={URL.createObjectURL(selectedImage)}
                    />
                  </div>
                )}

                <div className="image-input mt-1">
                  <input
                    style={{ maxWidth: 250 }}
                    type="file"
                    id="image"
                    name="image"
                    className="py-1.5"
                    onChange={changeHandler}
                    required={true}
                    onInvalid={existenceValidity}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-6 flex flex-col items-center gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-green-600 px-14 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquoise-600"
          >
            「推し勝★」を創る！
          </button>
        </div>
      </form>

      <div className="result mt-2">
        {submittedImage && (
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
                  src={URL.createObjectURL(submittedImage)}
                />

                <img
                  className="corner-tag"
                  id="corner-tag"
                  alt="not found"
                  src={cornerTag.src}
                />

                <p className="poster-oshikatsu" id="poster-oshikatsu">{submittedText.oshikatsu}</p>
                <p className="poster-mirai" id="poster-mirai">{submittedText.mirai}</p>
                <p className="poster-name-age" id="poster-name-age">{submittedText.penname}・{submittedText.age}歳</p>
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
    </div>

  );
}
