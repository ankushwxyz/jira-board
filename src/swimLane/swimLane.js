import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import './swimLane.css';
class SwimLane extends Component {
    render() {
        return (
            <>
                <Droppable droppableId={this.props.id}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            className='column'
                        >
                            {this.props.items.map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className='draggable-item'
                                        >
                                            <div>{item.title}</div>
                                            <div>{item.content}</div>
                                            <div>
                                                <button
                                                    onClick={() => this.props.onItemEdit(item, this.props.id)}
                                                >
                                                    Edit
                                            </button>
                                            &nbsp;&nbsp;
                                            <button
                                                    onClick={() => this.props.onItemDelete(item, this.props.id, index)}
                                                >
                                                    Delete
                                            </button>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </>
        )
    }
}

export default SwimLane;