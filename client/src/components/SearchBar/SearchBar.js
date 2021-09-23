import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SearchBar = (props) => {
  const [userInput, setUserInput] = useState("");
  const [t, i18n] = useTranslation("global");
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${userInput}`);
  };
  return (
    <Form className="d-flex" onSubmit={submitHandler}>
      <FormControl
        type="search"
        placeholder={t("Buscar.Buscar")}
        aria-label="Search"
        onChange={(e) => {
          setUserInput(e.target.value);
        }}
        style={{ borderTopRightRadius: "0px", borderBottomRightRadius: "0px" }}
      />
      <Button
        variant="outline-success"
        type="submit"
        style={{ borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px" }}
      >
        <FaSearch color="white" />
      </Button>
    </Form>
  );
};

export default withRouter(SearchBar);
