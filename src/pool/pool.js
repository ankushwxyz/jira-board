import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import SwimLane from '../swimLane/swimLane';
import './pool.css';

class Pool extends Component {
    render() {
        return (
            <>
                <DragDropContext onDragEnd={this.props.onDragEnd}>
                    <div className='lane-container'>
                        {
                            Object.keys(this.props.swimLanes).map((laneId) => {
                                let lane = this.props.laneIdNameMap[laneId]
                                return (
                                    <div key={laneId}>
                                        <span>
                                            {
                                                lane.isEditing
                                                    ? <div>
                                                        <input type='text' onChange={(event) => this.props.onColChange(laneId, event.target.value)} value={lane.title} />
                                                        <button onClick={() => this.props.onColEdit(laneId, false)}> OK</button>
                                                    </div>
                                                    : <div>
                                                        {this.props.laneIdNameMap[laneId].title}
                                                        <sub onClick={() => this.props.onColEdit(laneId, true)}>Edit</sub>
                                                    </div>
                                            }

                                        </span>
                                        <SwimLane
                                            id={laneId}
                                            items={this.props.swimLanes[laneId]}
                                            onItemEdit={this.props.onItemEdit}
                                            onItemDelete={this.props.onItemDelete}
                                        />
                                    </div>
                                )
                            })

                        }
                    </div>
                </DragDropContext>
            </>
        )
    }
}
export default Pool;