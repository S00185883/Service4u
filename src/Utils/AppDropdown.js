import React from "react";

export const Dropdown = (props) => (
  <div className="form-group">
    <strong>{props.name}</strong>
    <select
      className="form-control"
      name="{props.name}"
      onChange={props.onChange}
    >
      <option defaultValue>Select {props.name}</option>
      {props.options.map((item, index) => (
        <option key={index} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  </div>
);

export default class DropdownList extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
      chosenValue: "",
    };
  }

  componentDidMount() {
    fetch("http://localhost:4567/providers/sector/")
      .then((response) => response.json())
      .then((item) => this.setState({ list: item }));
  }

  onDropdownChange = (e) => {
    this.setState({ chosenValue: e.target.value });
  };

  render() {
    return (
      <div>
        <h2>React Bootstrap Dropdown Select Box Example</h2>

        <Dropdown
          name={this.state.name}
          options={this.state.list}
          onDropdownChange={this.onDropdownChange}
        />
      </div>
    );
  }
}
