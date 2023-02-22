import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { BsTrash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthProvider } from '../../../UserContext/UserContext';
import DeleteConformation from '../../Share/DeleteConformation/DeleteConformation';
import errorDeleteMessage from '../../Share/deleteMessage/errorDeleteMessage';
import successDeleteMessage from '../../Share/deleteMessage/successDeleteMessage';
import PageLoader from '../../Share/PageLoader/PageLoader';

const ShortLinks = () => {
    const [loadingData, setLoadingData] = useState(true);
    const [data, setData] = useState([]);
    const [modalData, setmodalData] = useState();
    const [showModal, setShowModal] = useState(false);
    console.log(data);
    const { user } = useContext(AuthProvider);
    const navigate = useNavigate();
    //get the data 
    React.useEffect(() => {
        fetch(`https://mitly.vercel.app/shortLinks?email=${user?.email}`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem("link-shortner")}`,
            }
        })
            .then(res => {
                if (res.status === 403) {
                    return navigate("/login");
                } else {
                    return res.json();
                }
            })
            .then(data => {
                setLoadingData(false);
                setData(data);
            })
            .catch(error => console.log(error));
    }, [user?.email, navigate]);
    if (loadingData) {
        return <PageLoader></PageLoader>
    }

    //set data 
    const passData = (reciveData) => {
        setmodalData(reciveData);
        setShowModal(true);
    }


    //deleteUrl
    const deleteUrl = (id) => {
        console.log(id);
        fetch(`https://mitly.vercel.app/shortLinks/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${localStorage.getItem("link-shortner")} `
            }
        })
            .then(res => {

                if (res.status === 403) {
                    toast.warning("  😩 😩 You do have not access to delete this data. 😩 😩 ");
                } else {
                    return res.json();
                }
            })
            .then(getData => {
                if (getData.deletedCount > 0) {
                    const restData = data?.filter(getData => getData._id !== id);
                    setData(restData);
                    successDeleteMessage();
                }
            }).catch(error => errorDeleteMessage(error))

    }
    return (
        <>
            <Helmet><title>Short links </title></Helmet>

            {data?.length !== 0 && <div className="overflow-x-auto my-12 text-center h-screen w-full">
                <table className="table w-full align-middle justify-center">

                    <thead>
                        <tr className='mx-8'>
                            <th>Serial</th>
                            <th>Original url</th>
                            <th>Short url</th>
                            <th>Clicks</th>
                            <th>Time</th>
                            <th>Date</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            data?.map((data, i) =>
                                <tr key={data?._id} className="text-start">
                                    <th>{i + 1}</th>
                                    <td>{data?.origUrl ? data?.origUrl?.length > 50 ? data?.origUrl.slice(0, 49) + "..." : data?.origUrl : "url not found"}</td>
                                    <td>{data?.shortUrl ? data?.shortUrl : "short url not found"}</td>
                                    <td title={`Total ${data?.clicks} times url visited !!`}>{data?.clicks}</td>
                                    <td>{data?.time ? data?.time : "00/00/00" }</td>
                                    <td>{data?.month ? data?.month : "00/00/00"}</td>
                                    <td><BsTrash className='text-red-600 text-2xl hover:cursor-pointer'
                                        onClick={() => passData(data)}></BsTrash></td>
                                </tr>

                            )
                        }

                    </tbody>
                </table>
            </div>}
            {
                data?.length === 0 && <div className='h-screen mt-40'>
                    <h2 className='text-center text-5xl font-bold text-info'> Short links not found <br /> please short some url !! </h2>
                </div>
            }

            {
                data?.length !== 0 && <>

                    <>
                        {showModal && <DeleteConformation
                            modalData={modalData}
                            setShowModal={setShowModal}
                            deleteFunction={deleteUrl}
                        >
                        </DeleteConformation>
                        }
                    </>
                </>
            }
        </>
    );
};

export default ShortLinks;