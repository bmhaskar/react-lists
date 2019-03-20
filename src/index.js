import React from "react";
import ReactDOM from "react-dom";
import "@atlaskit/css-reset";
import styled from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Column } from "./components/Column";
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

import intialData from "./intial-data";

const Container = styled.div`
  display: flex;
`;

class InnerColumns extends React.PureComponent {
  render() {
    const { index, column, taskMap } = this.props;
    const tasks = column.taskIds.map(taskId => taskMap[taskId]);
    return <Column index={index} column={column} tasks={tasks} />;
  }
}
class App extends React.Component {
  state = intialData;
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
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {provided => (
            <Container ref={provided.innerRef} {...provided.droppableProps}>
              {this.state.columnOrder.map((columnId, index) => {
                const column = this.state.columns[columnId];
                return (
                  <InnerColumns
                    key={columnId}
                    column={column}
                    taskMap={this.state.tasks}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
