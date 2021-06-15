const isCedula = (num) => {
    if (num.length == 10) {
        let sum = 0;
        let cedula = num.split("");
        for (let i = 0; i < cedula.length; i++) {
            let temp = parseInt(cedula[i]);
            if (i % 2 == 0) {
                if (temp * 2 > 9) {
                    sum += (temp * 2) - 9;
                } else {
                    sum += temp * 2;
                }
            } else {
                sum += temp;
            }
        }
        if (sum % 10 == 0) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }

}

const isRuc = (num) => {
    if (num.length == 13) {
        let sum = 0;
        let cedula = num.split("");
        for (let i = 0; i < 10; i++) {
            let temp = parseInt(cedula[i]);
            if (i % 2 == 0) {
                if (temp * 2 > 9) {
                    sum += (temp * 2) - 9;
                } else {
                    sum += temp * 2;
                }
            } else {
                sum += temp;
            }
        }
        if (sum % 10 == 0) {
            if (cedula[10] == 0 && cedula[11] == 0 && cedula[12] > 0 && cedula[12] < 4) {
                return true;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }

}

const isEmail = (email) => {
    let mail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (mail.test(email)) {
        return true;
    } else {
        return false;
    }
}

const isCelular = (Ncelular) => {
    let celular = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    if (celular.test(Ncelular)) {
        return true;
    } else {
        return false;

    }

}

const isTelefono = (Ncelular) => {
    let celular = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    if (celular.test("593" + Ncelular)) {
        return true;
    } else {
        return false;

    }

}

const existData = (dataBase, dataCol, dataColName, dataCol_id, dataCol_name_id) => {
    for (let i of dataBase) {
        if (i[dataColName] == dataCol && i[dataCol_name_id] != dataCol_id) {
            return true;
        }
    }
    return false;
}

const isDeleteable = (databaseTable, dataValue, dataName) => {
    for(let i of databaseTable) {
        if(i[dataName] == dataValue) {
            return false;
        }
    }
    return true;
}

const isDeleteableCompra = (databaseProducto, producto_entrada_array) => {
    for (let producto_entrada of producto_entrada_array) {
        let producto = databaseProducto.find(element => element.producto_id == producto_entrada.producto_id);
        if (producto.producto_cantidad < producto_entrada.producto_entrada_cantidad) {
            return false;
        }
    }
    return true;
}