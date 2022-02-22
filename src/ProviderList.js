import React, { Component } from "react";
import { Button, ButtonGroup, Container, Table } from "reactstrap";
import AppNavbar from "./AppNavbar";
import { Link } from "react-router-dom";

class ProviderList extends Component {
  constructor(props) {
    super(props);
    this.state = { providers: [], isLoading: true };
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch("api/providers")
      .then((response) => response.json())
      .then((data) => this.setState({ providers: data, isLoading: false }));
  }

  async remove(id) {
    await fetch(`/api/providers/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      let updatedproviders = [...this.state.providers].filter(
        (i) => i.id !== id
      );
      this.setState({ providers: updatedproviders });
    });
  }

  render() {
    const { providers, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const ProviderList = providers.map((provider) => {
      const address = `${provider.addressLineOne || ""} ${
        provider.addressLineTwo || ""
      } ${provider.town || ""} ${provider.county || ""} ${
        provider.eircode || ""
      }`;
      return (
        <tr key={provider.id}>
          <td style={{ whiteSpace: "nowrap" }}>{provider.name}</td>
          <td>{address}</td>
          <td>
            {provider.service.map((service) => {
              return (
                <div key={service.id}>
                  {service.name}: {service.description}: {service.price}
                </div>
              );
            })}
          </td>
          <td>
            <ButtonGroup>
              <Button
                size="sm"
                color="primary"
                tag={Link}
                to={"/providers/" + provider.id}
              >
                Edit
              </Button>
              <Button
                size="sm"
                color="danger"
                onClick={() => this.remove(provider.id)}
              >
                Delete
              </Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/providers/new">
              Add provider
            </Button>
          </div>
          <h3>Providers</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">Name</th>
                <th width="20%">Location</th>
                <th>Services</th>
                <th width="10%">Actions</th>
              </tr>
            </thead>
            <tbody>{ProviderList}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default ProviderList;
