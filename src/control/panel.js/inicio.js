const InicioMain = async () => {
    await Inicio.crud.selectProducto();
    await Inicio.crud.selectProductoCompra();
    await Inicio.crud.selectProductoVenta();
    await Inicio.crud.selectProductoSalida();
}

const Inicio = {
    databaseProducto_venta: [],
    databaseProducto_compra: [],
    databaseProducto_salida: [],
    databaseProducto: [],
    crud: {
        selectProductoVenta: async () => {
            await fetch_query(null, "producto_venta", "select").then(res => {
                Inicio.databaseProducto_venta = res;
                let data_array = Inicio.fun.groupBy(res, "producto_venta_fecha");
                let data_x = [];
                let data_y = [];
                for (let data_index in data_array) {
                    let sum = 0;
                    for (let producto_venta of data_array[data_index]) {
                        sum += parseFloat(producto_venta.producto_venta_total);
                    }
                    data_x.push(data_index);
                    data_y.push("$" + sum.toFixed(2));
                }
                let data = [{
                    x: data_x,
                    y: data_y,
                    mode: 'lines+text',
                    name: 'Lines and Text',
                    text: data_y,
                    textposition: 'bottom',
                    type: 'scatter'
                }];
                Inicio.fun.printGraphic("graphic_venta", "FACTURAS DE VENTA", data);
            }).catch(res => console.log("Error de conexión: " + res));
        },
        selectProductoCompra: async () => {
            await fetch_query(null, "producto_compra", "select").then(res => {
                Inicio.databaseProducto_compra = res;
                let data_array = Inicio.fun.groupBy(res, "producto_compra_fecha");
                let data_x = [];
                let data_y = [];
                for (let data_index in data_array) {
                    let sum = 0;
                    for (let producto_compra of data_array[data_index]) {
                        sum += parseFloat(producto_compra.producto_compra_total);
                    }
                    data_x.push(data_index);
                    data_y.push("$" + sum.toFixed(2));
                }
                let data = [{
                    x: data_x,
                    y: data_y,
                    mode: 'lines+text',
                    name: 'Lines and Text',
                    text: data_y,
                    textposition: 'bottom',
                    type: 'scatter'
                }];
                Inicio.fun.printGraphic("graphic_compra", "FACTURAS DE COMPRA", data);
            }).catch(res => console.log("Error de conexión: " + res));
        },
        selectProductoSalida: async () => {
            await fetch_query(null, "producto_salida", "select").then(res => {
                Inicio.databaseProducto_salida = res;
                // console.log(res);
                let data = [];

                let data_array_producto = Inicio.fun.groupBy(res, "producto_id");
                // console.log(data_array_producto);
                for (let data_array_producto_index in data_array_producto) {
                    let data_x = [];
                    let data_y = [];
                    let data_array_salida = Inicio.fun.groupBy(data_array_producto[data_array_producto_index], "producto_salida_fecha");
                    let product_name = "";
                    for (let producto_salida_index in data_array_salida) {
                        let date = '0000-00-00';
                        let sum = 0;
                        for (let producto_salida of data_array_salida[producto_salida_index]) {
                            product_name = Inicio.databaseProducto.find(element => element.producto_id == producto_salida.producto_id).producto_nombre;
                            date = producto_salida.producto_salida_fecha;
                            sum += parseFloat(producto_salida.producto_salida_precio) * parseFloat(producto_salida.producto_salida_cantidad);
                        }
                        data_x.push(date);
                        data_y.push(((sum / 100) * $informacion_r['informacion_iva']) + sum);
                    }
                    data.push({
                        x: data_x,
                        y: data_y,
                        mode: product_name,
                        name: "",
                        text: product_name,
                        textposition: 'bottom',
                        type: 'scatter'
                    });
                }
                Inicio.fun.printGraphic("graphic_producto", "VENTAS - PRODUCTOS", data);
            }).catch(res => console.log("Error de conexión: " + res));
        },
        selectProducto: async () => {
            await fetch_query(null, "producto", "select").then(res => {
                Inicio.databaseProducto = res;
            }).catch(res => console.log("Error de conexión: " + res));
        },
    },
    fun: {
        printGraphic: (html_id, tittle, data) => {
            // console.log(data);
            var layout = {
                title: tittle,
                showlegend: false
            };
            Plotly.newPlot(html_id, data, layout, {
                scrollZoom: true
            });
        },
        groupBy: (xs, key) => {
            return xs.reduce((rv, x) => {
                (rv[x[key]] = rv[x[key]] || []).push(x);
                return rv;
            }, {});
        }
    }
}


InicioMain();