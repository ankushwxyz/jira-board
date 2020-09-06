import React, { Component } from 'react';

class EditCard extends Component {
    render() {
        let { title, content, onTitleChange, onContentChange } = this.props;
        return (
            <>
                <div>
                    <div> Title of Card </div>
                    <input type='text' value={title} onChange={onTitleChange} />
                </div>
                <div>
                    <div> Content of Card </div>
                    <input type='textArea' value={content} onChange={onContentChange} />
                </div>
            </>
        )
    }
}

export default EditCard;