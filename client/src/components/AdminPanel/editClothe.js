import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetail,
  editClothe,
  getCategories,
  deleteClothe,
} from "../../actions/ProductActions";
import { Link, useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { validate } from "./validateCreate";
import swal from "sweetalert";

export default function EditClothe(props) {
  const { id } = props.match.params;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProductDetail(id));
  }, [dispatch, id]);

  const prenda = useSelector((state) => state.detailState.detail);
  const {
    name: nombre,
    price: precio,
    color: colores,
    genre: genero,
    detail: detalle,
    types: tipos,
    sizes: talles,
    categories: categorias,
  } = prenda;
  console.log(prenda);
  console.log(tipos);

  const [input, setInput] = useState({
    name: "",
    price: 0,
    color: "",
    genre: "",
    detail: "",
    type: "",
    sizeStock: [],
    categories: [],
    newCategories: [],
    mediaArray: null,
  });
  console.log(input);

  const category = categorias?.map((e) => e.name);

  const getDetail = () => {
    dispatch(getProductDetail(id));

    console.log("talles", talles);
    talles?.forEach((e) => {
      console.log("aqui vamos", e);
      handleAddSizeStock(e.size, e.stock);
    });

    detalle &&
      setInput({
        ...input,
        name: nombre,
        price: precio,
        color: colores,
        genre: genero,
        detail: detalle,
        type: tipos[0]?.name,
        sizeStock: talles?.map((t) => ({ name: t.size, stock: t.stock })),
        categories: [],
      });
  };

  let history = useHistory();
  let sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  let genres = ["Masculino", "Femenino", "Otro"];

  const arrayCategories = useSelector(
    (state) => state.productCategories.categories?.categories
  );
  const arrayTypes = useSelector(
    (state) => state.productCategories.categories?.types
  );

  //--------------------------------------------------------------------------------------------
  function handleInput(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  const [errors, setErrors] = useState({});

  const handleNewCategory = (idx) => (e) => {
    const newCategory = input.newCategories.map((newCat, cidx) => {
      if (idx !== cidx) return newCat;
      return { ...newCat, name: e.target.value };
    });
    setInput({
      ...input,
      newCategories: newCategory,
    });
    setErrors(
      validate({
        ...input,
        newCategories: newCategory,
      })
    );
  };

  const handleAddNewCategory = () => {
    setInput({
      ...input,
      newCategories: input.newCategories.concat({ name: "" }),
    });
    setErrors(
      validate({
        ...input,
        newCategories: input.newCategories.concat({ name: "" }),
      })
    );
  };

  const handleRemoveNewCategory = (idx) => () => {
    setInput({
      ...input,
      newCategories: input.newCategories.filter((c, cidx) => idx !== cidx),
    });
    setErrors(
      validate({
        ...input,
        newCategories: input.newCategories.filter((c, cidx) => idx !== cidx),
      })
    );
  };

  const deletePrenda = () => {
    swal({
      title: "¿Estás seguro de querer eliminar este producto?",
      text: "Una vez eliminado, no hay manera de recuperarlo",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteClothe(id));
        swal("¡Hecho! Tu producto ha sido eliminado");
        history.push("/admin");
      } else {
        swal("Tu producto NO ha sido borrado");
        history.push("/admin");
      }
    });
  };

  function handleCheckBox(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        categories: [...input.categories, e.target.value],
      });
      setErrors(
        validate({
          ...input,
          categories: [...input.categories, e.target.value],
        })
      );
    } else {
      setInput({
        ...input,
        categories: input.categories.filter(
          (categorie) => categorie !== e.target.value
        ),
      });
      setErrors(
        validate({
          ...input,
          categories: input.categories.filter(
            (categorie) => categorie !== e.target.value
          ),
        })
      );
    }
  }

  const handleSize = (idx) => (e) => {
    const newsizeStock = input.sizeStock.map((talle, tidx) => {
      if (idx !== tidx) return talle;
      return { ...talle, name: e.target.value };
    });
    setInput({
      ...input,
      sizeStock: newsizeStock,
    });
    setErrors(
      validate({
        ...input,
        sizeStock: newsizeStock,
      })
    );
  };

  const handleStock = (idx) => (e) => {
    const newsizeStock = input.sizeStock.map((talle, tidx) => {
      if (idx !== tidx) return talle;
      return { ...talle, stock: e.target.value };
    });
    setInput({
      ...input,
      sizeStock: newsizeStock,
    });
    setErrors(
      validate({
        ...input,
        sizeStock: newsizeStock,
      })
    );
  };

  const handleAddSizeStock = (tal = "", sto = 0) => {
    console.log("al llegar aaddsizeStock", tal, sto);
    setInput({
      ...input,
      sizeStock: input.sizeStock.concat({ name: tal, stock: sto }),
    });
    setErrors(
      validate({
        ...input,
        sizeStock: input.sizeStock.concat({ name: "", stock: 0 }),
      })
    );
  };

  const handleRemoveSizeStock = (idx) => () => {
    setInput({
      ...input,
      sizeStock: input.sizeStock.filter((t, tidx) => idx !== tidx),
    });
    setErrors(
      validate({
        ...input,
        sizeStock: input.sizeStock.filter((t, tidx) => idx !== tidx),
      })
    );
  };

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("name", input.name);
    data.append("price", input.price);
    data.append("color", input.color);
    data.append("genre", input.genre);
    data.append("detail", input.detail);
    data.append("type", input.type);
    input.categories?.forEach((c) => {
      data.append("categories", c);
    });
    input.newCategories?.forEach((c) => {
      data.append("categories", c.name);
    });
    input.sizeStock?.forEach((talle) => {
      data.append("sizeName", talle.name);
      data.append("sizeStock", talle.stock);
    });
    dispatch(editClothe(data, id));
    swal({
      title: "¡Hecho!",
      text: "Tu producto se ha actualizado de manera correcta.",
      icon: "success",
    });
    setInput({
      name: "",
      price: 0,
      color: "",
      genre: "",
      detail: "",
      type: "",
      sizeStock: [],
      categories: [],
      newCategories: [],
      mediaArray: null,
    });
    history.push("/admin/listproducts");
  }

  return (
    <div style={{ display: "flexbox", width: "70%", margin: "2.5%" }}>
      <div style={{ backgroundColor: "#D3D7D2" }}>
        <button onClick={getDetail}></button>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={input.name}
              onChange={handleInput}
            />
            {/* {errors.name && (<p className="danger">{errors.name}</p>)} */}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio:</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={input.price}
              onChange={handleInput}
            />
            {/* {errors.price && (<p className="danger">{errors.price}</p>)} */}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Color:</Form.Label>
            <Form.Control
              type="text"
              name="color"
              value={input.color}
              onChange={handleInput}
            />
            {/* {errors.color && (<p className="danger">{errors.color}</p>)} */}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Género:</Form.Label>
            <div>
              <select
                style={{ padding: "0.6rem" }}
                name="genre"
                onChange={handleInput}
                default={input.genre}
              >
                <option></option>
                {genres.map((g, i) => {
                  if (g === input.genre)
                    return (
                      <option value={g} key={i} selected>
                        {g}
                      </option>
                    );
                  return (
                    <option value={g} key={i}>
                      {g}
                    </option>
                  );
                })}
              </select>
              {/* {errors.genre && (<p className="danger">{errors.genre}</p>)} */}
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Detalles:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              type="text"
              name="detail"
              value={input.detail}
              onChange={handleInput}
            />
            {/* {errors.detail && (<p className="danger">{errors.detail}</p>)} */}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tipos:</Form.Label>
            <div>
              <select
                style={{ padding: "0.6rem" }}
                name="type"
                onChange={handleInput}
                defaultValue={input.type}
              >
                <option></option>
                {arrayTypes?.map((type, i) => {
                  if (type === input.type)
                    return (
                      <option value={type} key={i} selected>
                        {type}
                      </option>
                    );
                  return (
                    <option value={type} key={i}>
                      {type}
                    </option>
                  );
                })}
              </select>
              {/* {errors.type && (<p className="danger">{errors.type}</p>)} */}
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Talles:</Form.Label>
            {/* {errors.sizeStock && (<p className="danger">{errors.sizeStock}</p>)} */}
            {input.sizeStock.map((talle, idx) => (
              <Form.Group className="mb-3" key={`talle${idx}`}>
                <select
                  style={{ padding: "0.6rem", marginRight: "1rem" }}
                  value={talle.name}
                  onChange={handleSize(idx)}
                >
                  <option></option>
                  {sizes.map((size, i) => (
                    <option value={size} key={i}>
                      {size}
                    </option>
                  ))}
                </select>
                <input
                  style={{
                    padding: ".37rem",
                    width: "7rem",
                    marginRight: "1rem",
                  }}
                  type="number"
                  value={talle.stock}
                  onChange={handleStock(idx)}
                />
                <Button
                  variant="dark"
                  type="button"
                  onClick={handleRemoveSizeStock(idx)}
                >
                  -
                </Button>
                {/* {errors[`size${idx}`] && (<p className="danger">{errors[`size${idx}`]}</p>)} */}
                {/* {errors[`stock${idx}`]&& (<p className="danger">{errors[`stock${idx}`]}</p>)} */}
              </Form.Group>
            ))}
            <Button variant="dark" type="button" onClick={handleAddSizeStock}>
              Agregar talle
            </Button>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Categorias:</Form.Label>
            {category?.map((cat) => (
              <span style={{ padding: "1rem" }} key={cat}>
                <label>{cat}</label>
              </span>
            ))}
            <Form.Group className="mb-3" style={{ padding: ".5rem" }}>
              {arrayCategories?.map((cat) => (
                <span style={{ padding: "1rem" }} key={cat}>
                  <input
                    type="checkbox"
                    name="categories"
                    value={cat}
                    onChange={handleCheckBox}
                  />
                  <label>{cat}</label>
                </span>
              ))}
              {/* {errors.categories&& (<p className="danger">{errors.categories}</p>)} */}
            </Form.Group>
            <Form.Group className="mb-3">
              {input.newCategories?.map((cat, idx) => (
                <Form.Group className="mb-3" key={`cat${idx}`}>
                  <Form.Group className="mb-3" style={{ display: "flex" }}>
                    <Form.Control
                      style={{ width: "7rem", marginRight: "1rem" }}
                      autoComplete="off"
                      className={errors.newCategory && "danger"}
                      type="text"
                      name="newCategorie"
                      value={cat.name}
                      onChange={handleNewCategory(idx)}
                      // checked={handleChecked(cat, input.categories)}
                    />
                    <Button
                      variant="dark"
                      type="button"
                      onClick={handleRemoveNewCategory(idx)}
                    >
                      -
                    </Button>
                  </Form.Group>
                  {/* {errors[`newCategory${idx}`] && (<p className="danger">{errors[`newCategory${idx}`]}</p>)} */}
                </Form.Group>
              ))}
              <Button
                variant="dark"
                type="button"
                onClick={handleAddNewCategory}
              >
                Agregar nueva categoria
              </Button>
            </Form.Group>
          </Form.Group>
          <Button variant="dark" type="submit">
            SUBMIT
          </Button>
          <Link style={{ marginLeft: "2rem" }} to="/admin">
            <Button variant="danger" type="submit">
              CANCEL
            </Button>
          </Link>

          <Button
            variant="danger"
            onClick={deletePrenda}
            style={{ marginTop: "2rem", display: "block" }}
          >
            Eliminar Prenda
          </Button>
        </Form>
      </div>
    </div>
  );
}
