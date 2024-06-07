import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './PaginationComponent.css';

const PaginationComponent = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
            setData(res.data);
            setTotalItems(res.data.length);
        };
        fetchData();
    }, []);

    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination-container">
            <ul className="items-list">
                {currentItems.map(item => (
                    <li key={item.id} className="item">
                        {item.title}
                    </li>
                ))}
            </ul>
            <div className="pagination">
                {pageNumbers.map(number => (
                    <button key={number} onClick={() => paginate(number)} className={`page-number ${number === currentPage ? 'active' : ''}`}>
                        {number}
                    </button>
                ))}
            </div>
        </div>
    )
};

export default PaginationComponent;
