import { useQuery } from '@tanstack/react-query';
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
import { FiExternalLink } from "react-icons/fi";
const ShortLinks = () => {
    const [loadingData, setLoadingData] = useState(true);
    const [data, setData] = useState([]);
    const [modalData, setmodalData] = useState();
    const [showModal, setShowModal] = useState(false);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(6);
    let pages = Math.ceil(count / pageSize);
    const { user } = useContext(AuthProvider);
    const navigate = useNavigate();

    //get the data using transtack query
    useQuery({
        queryKey: [user?.email, page, pageSize],
        queryFn: () => fetch(`https://mitly.vercel.app/shortLinks?email=${user?.email}&page=${page}&size=${pageSize}`, {
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
                setData(data.data);
                setCount(data.count);
                console.log("data =>", data);
            })
            .catch(error => console.log(error))
    })

    //set data 
    const passData = (reciveData) => {
        setmodalData(reciveData);
        setShowModal(true);
    }


    //deleteUrl
    const deleteUrl = (id) => {

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
    //page loading
    if (loadingData) {
        return <PageLoader></PageLoader>
    }

    return (
        <>
            <Helmet><title>Short links </title></Helmet>

            {data?.length !== 0 && <div className="overflow-x-auto my-12 text-center h-96 w-full">
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
                                    <td>
                                        <a href={data?.shortUrl} target="_blank" rel="noopener noreferrer">
                                            {data?.shortUrl ?
                                                <>
                                                    <div className="flex justify-around"> {data?.shortUrl} <FiExternalLink></FiExternalLink> </div>
                                                </>
                                                : "short url not found"} </a>
                                    </td>
                                    <td title={`Total ${data?.clicks} times this link visited !!`}>{data?.clicks}</td>
                                    <td>{data?.time ? data?.time : "00/00/00"}</td>
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
                //show the modal for delete conformation 

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
            {/* pagination start  */}
            {
                 <div className="text-center my-8">

                    {
                        //page + 1 >=
                        page + 1 >= [...Array(pages).keys()].length &&
                        <button
                            className={`btn btn-primary text-white fs-5 fw-bold py-2 px-4 mx-3 ${pages === 1 && 'hidden'}`}
                            onClick={() => setPage(page - 1)}>
                          <i class="fa-solid fa-chevron-left text-white text-lg font-bold"></i>
                            <i class="fa-solid fa-chevron-left text-white text-lg font-bold"></i>
                        </button>
                    }

                    {
                        [...Array(pages).keys()].map(pageNumber =>
                            <button className={`
                             ${pageNumber === page ? 'btn btn-primary mx-2 px-4 py-2 fs-5 fw-bold my-3'
                              : 'btn px-4 fs-5 fw-bold py-2 btn-success mx-2'} `}
                                onClick={() => setPage(pageNumber)}
                            >{pageNumber + 1}</button>
                        )
                    }

                    {

                        [...Array(pages).keys()].length > page + 1  &&
                        <button
                            className={`btn btn-primary text-white fs-5 fw-bold py-2 px-4 mx-3 ${pages === 1 &&  'hidden'}`}
                            onClick={() => setPage(page + 1)}>
                             <i class="fa-solid fa-chevron-right text-white text-lg font-bold"></i>
                             <i class="fa-solid fa-chevron-right text-white text-lg font-bold"></i>
                        </button>
                    }

                    {/* page size set  */}
                    <select className='btn btn-success text-white  fw-bold py-2 px-4 mx-3' onChange={(e) => setPageSize(e.target.value)}>
                        <option className='text-info fw-bold' selected disabled> Select page size. </option>
                        <option value="2">2</option>
                        <option value="4">4</option>
                        <option value="6">6</option>
                        <option value="8">8</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                        <option value="60">60</option>
                        <option value="70">70</option>
                        <option value="80">80</option>
                        <option value="90">90</option>
                        <option value="100">100</option>
                        <option value="110">110</option>
                        <option value="120">120</option>
                        <option value="300">130</option>
                    </select>

                </div>

            }
            
            {/* pagination end  */}
        </>
    );
};

export default ShortLinks;