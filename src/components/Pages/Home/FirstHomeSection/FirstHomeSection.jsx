import React, { useContext, useState } from 'react';
import BeatLoader from "react-spinners/BeatLoader";
import { AuthProvider } from '../../../../UserContext/UserContext';
import { IoCopy , IoSendSharp } from "react-icons/io5";
import { CopyToClipboard  } from 'react-copy-to-clipboard';
const FirstHomeSection = () => {
    const [formValue, setFormValue] = useState({});
    const [shortUrl, setShortUrl] = useState("");
    const [loadingRequest, setLoadingRequest] = useState(false);
    const [CopyCheck, setCopyCheck] = useState(false);
    const { user } = useContext(AuthProvider);
    //handle change feild
    const handleChangeFeild = (e) => {
        const keyName = e.target.name;
        const value = e.target.value;
        let newValue = { ...formValue };
        newValue[keyName] = value;
        setFormValue(newValue);
    }
    //hanle form submit
    const hanleFormSubmit = (e) => {
        e.preventDefault();
        setLoadingRequest(true);
        setCopyCheck(false);
        //submit form 
        fetch(`https://mitly.vercel.app/shortLinks`, {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ ...formValue, name: user?.displayName, email: user?.email })
        })
            .then(res => res.json())
            .then(data => {
                setShortUrl(data?.shortUrl);
                setLoadingRequest(false);
            })
            .catch(error => console.log(error));

    }

    return (
        <>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content justify-between flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left ml-9">
                        <h1 className="text-3xl font-bold w-full"> Short your url now !! </h1>
                        <p className="py-6  font-bold w-80">Enter your full url in the input feild <br /> 
                        and than click on short url button to get your short url.
                        After get the link click on copy icon to copy your url.</p>
                    </div>
                    <form onSubmit={hanleFormSubmit} autoComplete="off" className="card flex-shrink-0 text-md w-full px-2 max-w-sm shadow-md bg-base-100">
                        <div>
                            {

                                shortUrl && <CopyToClipboard text={shortUrl}>
                                    <p className='m-4 flex justify-end text-2xl font-bold text-success hover:cursor-pointer '
                                    onClick={() => setCopyCheck(true)} title="Copy the short url !!">{CopyCheck === true ? <p className='text-sucess text-xl font-bold' title='Url copied !!'> Copied !! </p> : <IoCopy></IoCopy>}</p>
                                </CopyToClipboard>
                            }
                        </div>
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text"> URL  </span>
                                </label>
                                <input type="url" name='url' onChange={handleChangeFeild} placeholder="Enter your full link here" className="input input-bordered border-info" required />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-success text-white font-bold"> {
                                    loadingRequest ? <BeatLoader color="white" /> : " Short url"
                                } </button>
                            </div>
                            <>
                                {
                                    shortUrl ?
                                        <>
                                            <a href={shortUrl} target="_blank" rel="noopener noreferrer"> {shortUrl ? <p className='flex my-2'> <IoSendSharp className='mt-1 mx-2 font-bold text-xl'> </IoSendSharp>  {shortUrl} </p>: undefined}</a>
                                        </>
                                        : undefined
                                }
                            </>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default FirstHomeSection;