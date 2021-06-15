/**
 * Convierte un FormData a un objeto JSON
 * @param { FormData } formData - Formulario en FormData
 * @param { string } entity - Nombre de la tabla
 * @param { string } operation - operacion del CRUD
 * @param { string } method - Metodo HTTP
 * @returns { promise } Promesa con el resultado
 */
const fetch_query = (formData, entity, operation, method) => {
    const body = parseFormToJson(formData);
    // headers.append('Accept', 'application/json');
    return fetch(`/service/${ entity }/${ operation }`, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    }).then(res => res.json()).then(res => res);
}

// const ajax_query = (body, method, route) => {
//     return new Promise((resolve, reject) => {
//         const xhttp = new XMLHttpRequest();
//         xhttp.onload = resolve(this.responseText);
//         xhttp.onerror = reject(false);
//         xhttp.open(method, route, true);
//         xhttp.setRequestHeader("Content-type", "application/json");
//         xhttp.send(JSON.stringify(body));
//     });
// }