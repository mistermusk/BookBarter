import React from 'react';

export default function Book_description(props) {
    return (
        <div>
            <p className="sub_title"><b>{props.name}</b></p>
                <p className="sub_title"><b>posted by:</b> {props.createdBy}</p>
                <p className="sub_title"><b>rating:</b> {props.rating} of 5</p>
                {props.onTrade ? 
                    <p className='highlighted'>Currently on Trade</p>:
                    
                    <button className='btn btn-info'
                    onClick={() => {
                       props.handleRequest(props) }}
                        >Request trade</button>
                    }
        </div>
    )
}