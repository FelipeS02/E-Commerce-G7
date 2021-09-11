export function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'Product-name is required';
    } else if (!(/([A-Z])/.test(input.name)&&!/([a-z])/.test(input.name)&&input.name.length>3)) {
        errors.name = 'Product-name is invalid';
    }
    else if (!input.price) {
        errors.price = 'Price is required';
    } else if (!(parseInt(input.price)>=0&&/^([0]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1][0-9][0-9][0-9][0-9])$/.test(input.price))) {
        errors.price = 'Price is invalid';
    }
    else if (!input.color) {
        errors.color = 'Color is required';
    } else if (!['negro', 'azul', 'marrón', 'gris', 'verde', 'naranja', 'rosa',
    'púrpura', 'rojo', 'blanco', 'amarillo', 'turquesa', 'verde oliva', 'verde menta',
    'borgoña', 'lavanda', 'magenta', 'salmón', 'cian', 'beige', 'rosado', 'verde oscuro',
    'verde oliva', 'lila', 'amarillo pálido', 'fucsia', 'mostaza', 'ocre', 'trullo',
    'malva', 'púrpura oscuro', 'verde lima', 'verde claro', 'ciruela', 'azul claro',
    'melocotón', 'violeta', 'tan', 'granate'].includes(input.color.toLowerCase())) {
        errors.color = 'Color is invalid';
    }
    else if (!input.genre) {
        errors.genre = 'Genre is required';
    } else if (!['Femenino', 'Masculino', 'Otro'].includes(input.genre)) {
        errors.genre = 'Genre is invalid';
    }
    else if (!input.detail) {
        errors.detail = 'Detail is required';
    } else if (!(/([A-Z]{1})/.test(input.detail)&&input.detail.length>50)) {
      errors.detail = 'Detail is invalid';
    }
    else if (!input.type) {
      errors.type = 'Type is required';
    } else if (!(/([A-Z]{1})/.test(input.type)&&input.type.length>3)) {
      errors.type = 'Type is invalid';
    }
    else if (!input.sizeStock.name) {
      errors.sizeStock.name = 'Talle is required';
    } else if (!["XS", "s", "M", "L", "XL", "XXL"].includes(input.sizeStock.name)) {
      errors.sizeStock.name = 'Talle is invalid';
    }
    return errors;
  };
  