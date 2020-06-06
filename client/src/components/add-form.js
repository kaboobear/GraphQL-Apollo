import React, {useState} from 'react';
import {useMutation} from 'react-apollo';
import { ADD_COMMENT, COMMENT_QUERY } from "./queries";

const Form = () => {
    const [text,
        setText] = useState('');
    
    const [addComment] = useMutation(ADD_COMMENT);

    const onChange = (e) => {
        const {value} = e.target;
        setText(value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const newComment = {
            text,
            product_id: '5e7ca4591a384a0ff47f9b0b'
        };

        addComment({variables:newComment,update:(store,{data})=>{
            const newComment = data.addComment;
            const allComments = store.readQuery({
                query:COMMENT_QUERY
            });
            store.writeQuery({
                query:COMMENT_QUERY,
                data:{
                    comments: [newComment, ...allComments.comments]
                }
            })
        }});

        setText('');
    }

    return (
        <form onSubmit={onSubmit} className="add-form" autoComplete="off">
            <div className="simple-input">
                <input
                    type="text"
                    name="text"
                    value={text}
                    placeholder="Text..."
                    onChange={onChange}/>
                <div className="line"></div>
            </div>

            <button type="submit" className="btn">
                Add
            </button>
        </form>
    );
}

export default Form;
