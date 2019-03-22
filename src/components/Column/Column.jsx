import React from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Task } from "../Task";


const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgray;
  border-radius: 2px;
  width: 30%;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.isDragging? 'lightgreen': 'white'};
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  background-color: ${props => (props.isDraggingOver ? 'skyblue': 'inherit')};
  flex-grow:1;
  min-height: 100px;
`;

class InlineTasks extends React.PureComponent {
     
    render() {
        return  this.props.tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} />
          ))
    }
}
class Column extends React.Component {
  render() {
    return (
    <Draggable index={this.props.index} draggableId={this.props.column.id}> 
    {(provided, snapshot) => 
      <Container 
      ref={provided.innerRef}
       {...provided.draggableProps} 
       {...provided.dragHandleProps}
       isDragging={snapshot.isDragging}
       >
        <Title data-testid="column-title">{this.props.column.title}</Title>
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <TaskList 
            ref={provided.innerRef} 
            {...provided.droppableProps}
            type="task"
            isDraggingOver={snapshot.isDraggingOver}
            >
             <InlineTasks tasks={this.props.tasks}/>
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    }
      </Draggable>
    );
  }
}
export default Column;
