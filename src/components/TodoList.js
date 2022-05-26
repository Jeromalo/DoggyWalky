import React, { Component } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import "../components/TodoList.css";

class Todolist extends Component {
  constructor() {
    super();
    this.state = {
      userInput: "",
      items: [],
    };
  }

  // rentrée une info dans ma barre
  onChange(event) {
    this.setState({
      userInput: event.target.value,
    });
  }

  // insérez un new items dans ma liste & creez  un tableau pour insérez un new items
  addTodo(event) {
    event.preventDefault();
    this.setState({
      userInput: "",
      items: [...this.state.items, this.state.userInput],
    });
  }

  // supprimmer un élément de ma liste
  deleteTodo(item) {
    const array = this.state.items;
    const index = array.indexOf(item);
    array.splice(index, 1);
    this.setState({
      items: array,
      background: "red",
    });
  }

  // voir un élément de ma liste
  renderTodos() {
    return this.state.items.map((item) => {
      return (
        <div key={item}>
          {item} | <button onClick={this.deleteTodo.bind(this, item)}>x</button>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="ComposantInputAdd">
        <form className="SearbarContacts">
          <input
            value={this.state.userInput}
            type="text"
            placeholder="Search"
            onChange={this.onChange.bind(this)}
          />
        </form>
        <Button onClick={this.addTodo.bind(this)}>
          <AddIcon style={{ background: "#ffc331" }}></AddIcon>
        </Button>
        <div className="ListeContacts">
          <div className="NameContacts">{this.renderTodos()}</div>
        </div>
      </div>
    );
  }
}
export default Todolist;
