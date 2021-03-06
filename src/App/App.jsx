import React from 'react'
import { Column } from '../components/Column';
import styled from "styled-components";
import {DragDropContext,Droppable} from 'react-beautiful-dnd'


const Container = styled.div`
  display: flex;
  margin-top: 0.5rem;
`;

const Header = styled.h1`
  font-size: 2rem;
  padding: 8px;
`;

class InnerColumns extends React.PureComponent {
    render() {
      const { index, column, taskMap } = this.props;
      const tasks = column.taskIds.map(taskId => taskMap[taskId]);
      return <Column index={index} column={column} tasks={tasks} />;
    }
  }
class App extends React.Component {
    static defaultProps = {initialData: {}};
    state = this.props.initialData;
    onDragEnd = result => {
      const { destination, source, draggableId, type } = result;
      if (!destination) {
        return;
      }
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }
  
      if (type === "column") {
        const newColumnOrder = Array.from(this.state.columnOrder);
        newColumnOrder.splice(source.index, 1);
        newColumnOrder.splice(destination.index, 0, draggableId);
        const newState = {
          ...this.state,
          columnOrder: newColumnOrder
        };
        this.setState(newState);
        return;
      }
      const start = this.state.columns[source.droppableId];
      const finish = this.state.columns[destination.droppableId];
      if (start === finish) {
        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);
        const newColumn = {
          ...start,
          taskIds: newTaskIds
        };
        const newState = {
          ...this.state,
          columns: {
            ...this.state.columns,
            [newColumn.id]: newColumn
          }
        };
  
        this.setState(newState);
        return;
      }
  
      const newStartTaskIds = Array.from(start.taskIds);
      newStartTaskIds.splice(source.index, 1);
      const newStartColumn = {
        ...start,
        taskIds: newStartTaskIds
      };
      const newFinishTaskIds = Array.from(finish.taskIds);
      newFinishTaskIds.splice(destination.index, 0, draggableId);
      const newFinishColumn = {
        ...finish,
        taskIds: newFinishTaskIds
      };
  
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newStartColumn.id]: newStartColumn,
          [newFinishColumn.id]: newFinishColumn
        }
      };
  
      this.setState(newState);
    };
    onDragUpdate = (result) => {
      console.log(result);
    };
    render() {
      const { columnOrder = [] , tasks = {}, columns = {}} = this.state; 
      
      return [<Header key="header">React lists</Header>, 
        <DragDropContext onDragUpdate={this.onDragUpdate} onDragEnd={this.onDragEnd} key="dnd-context">
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {provided => (
              <Container ref={provided.innerRef} {...provided.droppableProps}>
                {columnOrder.map((columnId, index) => {
                  const column = columns[columnId];
                  return (
                    <InnerColumns
                      key={columnId}
                      column={column}
                      taskMap={tasks}
                      index={index}
                    />
                  );
                })}
                {provided.placeholder}
              </Container>
            )}
          </Droppable>
        </DragDropContext>
      ];
    }
  }
  export default App;