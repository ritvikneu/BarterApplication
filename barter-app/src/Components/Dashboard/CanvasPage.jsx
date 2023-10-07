import React from 'react';
import './CanvasPage.css';

const products = [
    {
        name: 'Product 1',
        details: 'Details for Product 1',
        color: '#FF9800',
    },
    {
        name: 'Product 2',
        details: 'Details for Product 2',
        color: '#2196F3',
    },
    {
        name: 'Product 3',
        details: 'Details for Product 3',
        color: '#FF9800',
    },
    {
        name: 'Product 4',
        details: 'Details for Product 4',
        color: '#2196F3',
    },
    {
        name: 'Product 5',
        details: 'Details for Product 5',
        color: '#FF9800',
    },
    {
        name: 'Product 6',
        details: 'Details for Product 6',
        color: '#2196F3',
    },
    {
        name: 'Product 7',
        details: 'Details for Product 7',
        color: '#FF9800',
    },
    {
        name: 'Product 8',
        details: 'Details for Product 8',
        color: '#2196F3',
    },
    {
        name: 'Product 9',
        details: 'Details for Product 9',
        color: '#FF9800',
    },
    {
        name: 'Product 10',
        details: 'Details for Product 10',
        color: '#2196F3',
    },
];

const ProductCard = ({ product }) => (
    <div
        style={{
            backgroundColor: product.color,
            borderRadius: '5px',
            color: '#FFF',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'space-between',
            padding: '16px',
            marginBottom: '16px', // Add margin bottom to create space at bottom of card
        }}
    >
        <div>
            <h2 style={{ margin: '0' }}>{product.name}</h2>
            <p style={{ margin: '0', opacity: '0.8' }}>{product.details}</p>
        </div>
        <button style={{ padding: '8px', borderRadius: '3px', border: 'none' }}>Trade Now</button>

    </div>
);

const CanvasPage = () => (

    <div
        style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gridGap: '40px',
        }}
    >
        {/*<div className="header">*/}
        {/*    <input type="text" placeholder="Search products..." />*/}
        {/*    <button>Menu</button>*/}
        {/*</div>*/}

        {products.map((product, index) => (
            <div key={index} style={{ height: '300px', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
                <ProductCard product={product} />
            </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
            <button>Home</button>
            <button>Loops</button>
            <button>Post</button>
            <button>Haves or Needs</button>
            <button>Inbox</button>
        </div>
    </div>
);

export default CanvasPage;

// import React from 'react';
//
// const products = [
//     {
//         name: 'Product 1',
//         details: 'Details for Product 1',
//         color: '#FF9800',
//     },
//     {
//         name: 'Product 2',
//         details: 'Details for Product 2',
//         color: '#2196F3',
//     },
//     {
//         name: 'Product 3',
//         details: 'Details for Product 3',
//         color: '#FF9800',
//     },
//     {
//         name: 'Product 4',
//         details: 'Details for Product 4',
//         color: '#2196F3',
//     },
//     {
//         name: 'Product 5',
//         details: 'Details for Product 5',
//         color: '#FF9800',
//     },
//     {
//         name: 'Product 6',
//         details: 'Details for Product 6',
//         color: '#2196F3',
//     },
//     {
//         name: 'Product 7',
//         details: 'Details for Product 7',
//         color: '#FF9800',
//     },
//     {
//         name: 'Product 8',
//         details: 'Details for Product 8',
//         color: '#2196F3',
//     },
//     {
//         name: 'Product 9',
//         details: 'Details for Product 9',
//         color: '#FF9800',
//     },
//     {
//         name: 'Product 10',
//         details: 'Details for Product 10',
//         color: '#2196F3',
//     },
// ];
//
// const ProductCard = ({ product }) => (
//     <div
//         style={{
//             backgroundColor: product.color,
//             borderRadius: '5px',
//             color: '#FFF',
//             display: 'flex',
//             flexDirection: 'column',
//             height: '100%',
//             justifyContent: 'space-between',
//             padding: '16px',
//             marginBottom: '16px',
//         }}
//     >
//         <div>
//             <h2 style={{ margin: '0' }}>{product.name}</h2>
//             <p style={{ margin: '0', opacity: '0.8' }}>{product.details}</p>
//         </div>
//         <button
//             style={{
//                 padding: '8px',
//                 borderRadius: '3px',
//                 border: 'none',
//                 backgroundColor: 'rgba(255, 255, 255, 0.2)',
//                 color: '#FFF',
//                 fontWeight: 'bold',
//                 cursor: 'pointer',
//                 transition: 'background-color 0.3s ease',
//                 alignSelf: 'flex-end',
//             }}
//         >
//             Trade
//         </button>
//     </div>
// );
//
// const CanvasPage = () => (
//
//     <div
//         style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(5, 1fr)',
//             gridGap: '16px',
//         }}
//     >
//
//         {products.map((product, index) => (
//             <div key={index} style={{ height: '300px', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
//                 <ProductCard product={product} />
//             </div>
//         ))}
//         <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
//                            <button>Home</button>
//                              <button>Loops</button>
//                              <button>Post</button>
//                              <button>Haves or Needs</button>
//                              <button>Inbox</button>
//                          </div>
//         </div>
//
//     </div>
// );
// export default CanvasPage;