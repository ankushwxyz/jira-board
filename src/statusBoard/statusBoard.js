import React, { Component } from 'react';
import Pool from '../pool/pool';
import EditCard from '../editCard/editCard';
import './statusBoard.css';

class StatusBoard extends Component {
    constructor(props) {
        super(props);
        this.defaultLaneId = 'swimLaneNew';
        this.state = {
            'title': '', // temporarily holds text written in title field
            'content': '', // temporarily holds text written in content field
            'laneId': '', // temporarily holds value of laneId to be added to
            'swimLanes': {
                'swimLaneNew': [
                    { id: '1', title: 'title1', content: 'content1' },
                    { id: '2', title: 'title2', content: 'content2' },
                    { id: '3', title: 'title3', content: 'content3' }
                ],
                'swimLaneInProgress': [],
                'swimLaneDone': [],
            },
            'laneIdNameMap' : {
                'swimLaneNew': {'title': 'TO DO', isEditing: false},
                'swimLaneInProgress': {'title': 'In Progress', isEditing: false},
                'swimLaneDone' : {'title': 'Done', isEditing: false}
            },
            'modal': {
                show: false,
                item: {},
                laneId: null
            }
        }
    }
    onTitleChange = (event) => {
        this.setState({ 'title': event.target.value });
    }
    onContentChange = (event) => {
        this.setState({ 'content': event.target.value });
    }
    onLaneChange = (event) => {
        this.setState({ 'laneId': event.currentTarget.value });
    }
    onItemUpdate = (event, key) => {
        let modal = { ...this.state.modal };
        modal.item[key] = event.target.value;
        this.setState({ modal });
    }
    addCard = () => {
        if (this.state.title && this.state.content) {
            let updatedState = { ...this.state };
            let lane = updatedState.swimLanes[this.state.laneId || this.defaultLaneId]
            lane.push({
                id: (Date.now()).toString(),
                title: this.state.title,
                content: this.state.content,
            });
            updatedState.title = '';
            updatedState.content = '';
            updatedState.laneId = '';
            this.setState({ ...updatedState });
        }
    }
    onDragEnd = (result) => {
        const { source, destination } = result;
        let updatedState = { ...this.state };
        if (!destination) {
            return;
        }
        if (source.droppableId === destination.droppableId) {
            let list = [...this.state.swimLanes[source.droppableId]]
            const item = list.splice(source.index, 1)
            list.splice(destination.index, 0, item[0]);
            updatedState.swimLanes[source.droppableId] = list;
        } else {
            let sourceLlist = [...this.state.swimLanes[source.droppableId]];
            let destinationList = [...this.state.swimLanes[destination.droppableId]]
            const item = sourceLlist.splice(source.index, 1);
            destinationList.splice(destination.index, 0, item[0]);

            updatedState.swimLanes[source.droppableId] = sourceLlist;
            updatedState.swimLanes[destination.droppableId] = destinationList
        }
        this.setState({ ...updatedState });
    }
    onEdit = (item, laneId) => {
        let updatedState = { ...this.state };
        let lane = updatedState.swimLanes[laneId];

        this.setState({
            modal: {
                show: true,
                item: { ...item },
                laneId
            }
        })
    }
    onDelete = (item, laneId) => {
        let stateT = { ...this.state };
        let index = this.state.swimLanes[laneId].findIndex((itemT) => itemT.id === item.id);
        stateT.swimLanes[laneId].splice(index, 1);
        this.setState({ ...stateT });
    }
    updateCard = () => {
        let stateT = { ...this.state };
        const { laneId, item } = stateT.modal;
        const { id } = item;
        let index = this.state.swimLanes[laneId].findIndex((item) => item.id === id);
        stateT.swimLanes[laneId].splice(index, 1, stateT.modal.item);
        stateT.modal = {
            show: false,
            item: {},
            laneId: null
        }
        this.setState({ ...stateT });
    }
    onColChange = (laneId, value) => {
        let laneIdNameMap = { ...this.state.laneIdNameMap};
        if(!value) {
            return
        }
        laneIdNameMap[laneId].title = value;
        this.setState({laneIdNameMap})
    }
    onColEdit = (laneId, bool) => {
        let laneIdNameMap = { ...this.state.laneIdNameMap};
        laneIdNameMap[laneId].isEditing = bool;
        this.setState(laneIdNameMap);
    }
    render() {
        return <>
            <div className='board-container'>
                <div className='add-card-container'>
                    <EditCard
                        title={this.state.title}
                        content={this.state.content}
                        onContentChange={this.onContentChange}
                        onTitleChange={this.onTitleChange}
                    />
                    <div>
                        <div> Status </div>
                        <div>
                            <select
                                onChange={this.onLaneChange}
                                value={this.state.laneId}
                            >
                                {
                                    Object.keys(this.state.swimLanes).map((laneId) => (
                                        <option value={laneId} key={laneId}>{this.state.laneIdNameMap[laneId].title}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div>
                        <button onClick={this.addCard} >Add</button>
                    </div>
                </div>
                <div>
                    <Pool
                        {...this.state}
                        onColEdit={this.onColEdit}
                        onColChange={this.onColChange}
                        onItemEdit={this.onEdit}
                        onItemDelete={this.onDelete}
                        onDragEnd={this.onDragEnd}
                    />
                </div>
            </div>
            {
                this.state.modal.show ?
                    <div className='update-modal'>
                        <EditCard
                            title={this.state.modal.item.title}
                            content={this.state.modal.item.content}
                            onContentChange={(content) => this.onItemUpdate(content, 'content')}
                            onTitleChange={(title) => this.onItemUpdate(title, 'title')}
                        />
                        <button onClick={this.updateCard} >Update</button>
                    </div>
                    : ''
            }
        </>
    }
}

export default StatusBoard;