export function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'Product-name is required';
    } else if (!(/([A-Z])/.test(input.name)&&!/([a-z])/.test(input.name)&&input.name.length>3)) {
        errors.name = 'Product-name is invalid';
    }
    if (!input.price) {
        errors.price = 'Price is required';
    } else if (!(parseInt(input.price)>=0&&/^([1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1][0-9][0-9][0-9][0-9])$/.test(input.price))) {
        errors.price = 'Price is invalid';
    }
    if (!input.color) {
        errors.color = 'Color is required';
    } else if (!['negro', 'azul', 'marrón', 'gris', 'verde', 'naranja', 'rosa',
    'púrpura', 'rojo', 'blanco', 'amarillo', 'turquesa', 'verde oliva', 'verde menta',
    'borgoña', 'lavanda', 'magenta', 'salmón', 'cian', 'beige', 'rosado', 'verde oscuro',
    'verde oliva', 'lila', 'amarillo pálido', 'fucsia', 'mostaza', 'ocre', 'trullo',
    'malva', 'púrpura oscuro', 'verde lima', 'verde claro', 'ciruela', 'azul claro',
    'melocotón', 'violeta', 'tan', 'granate'].includes(input.color.toLowerCase())) {
        errors.color = 'Color is invalid';
    }
    if (!input.genre) {
        errors.genre = 'Genre is required';
    } else if (!['Femenino', 'Masculino', 'Otro'].includes(input.genre)) {
        errors.genre = 'Genre is invalid';
    }
    if (!input.detail) {
        errors.detail = 'Detail is required';
    } else if (!(/(^[A-Z])/.test(input.detail)&&input.detail.length>50)) {
      errors.detail = 'Detail is invalid';
    }
    if (!input.type) {
      errors.type = 'Type is required';
    } else if (!(input.type.length>3)) {
      errors.type = 'Type is invalid';
    } if(!input.sizeStock.length>0){
      errors.sizeStock= 'Talle is required'
    }
    if(input.sizeStock.length>0){
      for(let i=0; i<input.sizeStock.length;i++){
        if(input.sizeStock[i].name===''){
          errors[`size${i}`]= 'Define Talle'
        } if(input.sizeStock[i].stock<0){
          errors[`stock${i}`]= "The stock can't less than zero"
        }
      }
    }
    if(!input.categories.length>0){
      errors.categories= 'Select a category'
    }

    if(input.newCategories.length>0){
      for(let i=0; i<input.newCategories.length;i++){
        if(input.newCategories[i].name===''){
          errors[`newCategory${i}`]= 'Define new category'
        }
      }
    }

    if(!(input.mediaArray&&input.mediaArray.length>0)){
      errors.mediaArray= 'Select a file'
    }
    return errors;
};
  