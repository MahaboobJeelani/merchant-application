import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Application.css';

// Hook to parse query parameters
const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const FetchData = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [filteredData, setFilteredData] = useState([]);

    // == Pagination ==
    const [currentpage, setCurrentpage] = useState(1);
    const [itemsperpage] = useState(2);
    const [totalitems, setTotalitems] = useState(0);

    const query = useQuery();
    const search = query.get('search') || '';



    useEffect(() => {
        axios.get('http://localhost:8081/data')
            .then(res => {
                setData(res.data);
                setTotalitems(res.data.length);
            })
            .catch(err => {
                console.error('==>', err);
                setError('Failed to fetch data');
            });
    }, []);

    useEffect(() => {
        setFilteredData(
            data.filter(item =>
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.brand.toLowerCase().includes(search.toLowerCase()) ||
                item.category.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, data]);

    const indexOfLastItem = currentpage * itemsperpage;
    const indexOfFirstItem = indexOfLastItem - itemsperpage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentpage(pageNumber);

    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(filteredData.length / itemsperpage); i++) {
        pageNumber.push(i);
    }

    let handleDelete = (id) => {
        axios.delete(`http://localhost:8081/delete/${id}`)
            .then(() => {
                setData(
                    data.filter(item => item._id !== id)
                );
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='container'>
            <div>
                {error ? (
                    <h1 style={{ color: "red" }}>{error}</h1>
                ) : (
                    <div className='productcards'>
                        {currentItems.map((res) => (
                            <div className='datacontainer' key={res._id}>

                                <div className='imgtag'>
                                    <img src="https://m.media-amazon.com/images/I/41-2m5Oyv5L._SX300_SY300_QL70_FMwebp_.jpg" alt="" />
                                </div>

                                <div>
                                    <tr className='product name'>
                                        <td className='productname'> Product Name</td>
                                        <td>: {res.name}</td>
                                    </tr>
                                    <tr className='product price'>
                                        <td className='productname'> Product Price</td>
                                        <td>: {res.price}</td>
                                    </tr>
                                    <tr className='product brand'>
                                        <td className='productname'> Product Brand</td>
                                        <td>: {res.brand}</td>
                                    </tr>
                                    <tr className='product category'>
                                        <td className='productname'> Product Category</td>
                                        <td>: {res.category}</td>
                                    </tr>
                                    <tr className='product btns'>
                                        <td className='edit'>
                                            <Link to={`/edit/${res._id}`}><button>Edit</button></Link>
                                        </td>
                                        <td className='delete'>
                                            <button onClick={() => { handleDelete(res._id) }}>Delete</button>
                                        </td>
                                    </tr>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="pagination">

                {pageNumber.map((number) => (
                    <button key={number} onClick={() => paginate(number)} className={`page-number ${number === currentpage ? 'active' : ''}`}>
                        {number}
                    </button>
                ))}

            </div>
        </div>
    );
};

export default FetchData;