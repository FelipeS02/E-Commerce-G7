import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { withRouter } from "react-router-dom";

const SearchBar = (props) => {
  const [userInput, setUserInput] = useState(" ");
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${userInput}`);
  };
  return (
    <Form className="d-flex" onSubmit={submitHandler}>
      <FormControl
        type="search"
        placeholder="Buscar..."
        className="mr-2"
        aria-label="Search"
        onChange={(e) => {
          setUserInput(e.target.value);
        }}
      />
      <Button variant="outline-success" type="submit">
        <FaSearch color="white" />
      </Button>
    </Form>
  );
};

export default withRouter(SearchBar);
