/**
 * Convierte un FormData a un objeto JSON
 * @param { FormData } formData - Formulario en FormData
 * @returns { object } Objeto Json
 */
const parseFormToJson = (formData) => {
    var object = {};
    formData.forEach((value, key) => object[key] = value);
    console.log(object);
    return object;
}