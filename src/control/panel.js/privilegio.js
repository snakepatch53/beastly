let PrivilegioMain = async () => {
    await Privilegio.crud.selectUsuario();
    await Privilegio.crud.select();
    Privilegio.view.inputNewButton.onclick = () => Privilegio.fun.showForm(true, 0);
    Privilegio.view.formButtonCancel.onclick = () => Privilegio.fun.showForm(false, 0);
    Privilegio.view.formButtonSave.onclick = () => Privilegio.fun.submitForm();
    Privilegio.view.modalNo.onclick = () => Privilegio.fun.showConfirm(false, null);
    Privilegio.view.modalClose.onclick = () => Privilegio.fun.showConfirm(false, null);
    Privilegio.view.inputSearch.onkeyup = () => Privilegio.fun.search();
    Privilegio.view.selectReport.onchange = () => {
        let select = Privilegio.view.selectReport;
        switch (select.value) {
            case 'pdf':
                window.open('privilegio/pdf');
                break;
            case 'excel':
                window.open('privilegio/excel');
                break;
            case 'csv':
                window.open('privilegio/csv');
                break;
        }
        select.value = "";
    }
}

let Privilegio = {
    databasePrivilegio: [],
    databaseUsuario: [],
    view: {
        sectionHead: document.getElementById("sectionHead"),
        selectReport: document.getElementById("selectReport"),
        inputSearch: document.getElementById("inputSearch"),
        inputNewButton: document.getElementById("inputNewButton"),
        sectionTable: document.getElementById("sectionTable"),
        tableData: document.getElementById("tableData"),
        sectionForm: document.getElementById("sectionForm"),
        formData: document.getElementById("formData"),
        formButtonSave: document.getElementById("formButtonSave"),
        formButtonCancel: document.getElementById("formButtonCancel"),
        formMsg: document.getElementById("formMsg"),
        sectionModal: document.getElementById("sectionModal"),
        modalText: document.getElementById("modalText"),
        modalClose: document.getElementById("modalClose"),
        modalNo: document.getElementById("modalNo"),
        modalYes: document.getElementById("modalYes"),
        buttonShowPass: document.getElementById("buttonShowPass"),
        imgShowPass: document.getElementById("imgShowPass"),
        sectionProgress: document.getElementById("sectionProgress"),
        sectionProgressText: document.getElementById("sectionProgressText")
    },
    crud: {
        select: async () => {
            await fetch_query(null, "privilegio", "select").then(res => {
                Privilegio.databasePrivilegio = res;
                Privilegio.fun.loadTable(res);
                Privilegio.fun.showForm(false, 0);
            }).catch(res => console.log("Error de conexión: " + res));
        },
        insert: () => {
            Privilegio.fun.showProgress(true, "Guardando nuevo privilegio...");
            let formData = new FormData(Privilegio.view.formData);
            fetch_query(formData, "privilegio", "insert").then(res => {
                Privilegio.crud.select();
                Privilegio.fun.showProgress(false, "Privilegio guardado!");
            }).catch(res => console.log("Error de conexión: " + res));
        },
        update: () => {
            Privilegio.fun.showProgress(true, "Actualizando el privilegio...");
            let formData = new FormData(Privilegio.view.formData);
            fetch_query(formData, "privilegio", "update").then(res => {
                Privilegio.crud.select();
                Privilegio.fun.showProgress(false, "Privilegio actualizado!");
            }).catch(res => console.log("Error de conexión: " + res));
        },
        delete: (privilegio_id) => {
            Privilegio.fun.showProgress(true, "Eliminando el privilegio...");
            let formData = new FormData(Privilegio.view.formData);
            formData.append("privilegio_id", privilegio_id);
            fetch_query(formData, "privilegio", "delete").then(res => {
                Privilegio.crud.select();
                Privilegio.fun.showProgress(false, "Privilegio eliminado!");
            }).catch(res => console.log("Error de conexión: " + res));
        },
        selectUsuario: async () => {
            await fetch_query(null, "usuario", "select").then(res => {
                Privilegio.databaseUsuario = res;
            }).catch(res => console.log("Error de conexión: " + res));
        }
    },
    fun: {
        loadTable: (array) => {
            let html = '';
            for (let i of array) {
                let deleteable = isDeleteable(Privilegio.databaseUsuario, i.privilegio_id, "privilegio_id");
                html += `
                    <tr>
                        <td><span class="td-span">${ i.privilegio_nombre }</span></td>
                        <td class="td-action">
                            <div class="buttons-flex">
                                <button class="edit ideabutton" onclick="Privilegio.fun.showForm(true, ${ i.privilegio_id })">
                                    <img src="view/src/icon/edit.png">
                                    <span>Editar</span>
                                </button>
                                <button class="delete ideabutton ${ !deleteable ? "disabled" : "" }" onclick="Privilegio.fun.showConfirm(true, () => Privilegio.crud.delete(${ i.privilegio_id }))" ${ !deleteable ? "disabled" : "" }>
                                    <img src="view/src/icon/delete.png">
                                    <span>Eliminar</span>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            }
            Privilegio.view.tableData.innerHTML = html;
        },
        showForm: (bool, privilegio_id) => {
            if (bool) {
                Privilegio.view.sectionHead.classList.remove("open");
                Privilegio.view.sectionTable.classList.remove("open");
                Privilegio.view.sectionModal.classList.remove("open");
                Privilegio.view.sectionForm.classList.add("open");
                if (privilegio_id != 0) {
                    let privilegio = Privilegio.databasePrivilegio.find(element => element.privilegio_id == privilegio_id);
                    Privilegio.view.formData.privilegio_id.value = privilegio.privilegio_id;
                    Privilegio.view.formData.privilegio_nombre_view.value = privilegio.privilegio_nombre;
                    Privilegio.view.formData.privilegio_nombre.value = privilegio.privilegio_nombre;
                    Privilegio.view.formData.privilegio_informacion.value = privilegio.privilegio_informacion;
                    Privilegio.view.formData.privilegio_privilegio.value = privilegio.privilegio_privilegio;
                    Privilegio.view.formData.privilegio_usuario.value = privilegio.privilegio_usuario;
                    Privilegio.view.formData.privilegio_bodega.value = privilegio.privilegio_bodega;
                    Privilegio.view.formData.privilegio_proveedor.value = privilegio.privilegio_proveedor;
                    Privilegio.view.formData.privilegio_cliente.value = privilegio.privilegio_cliente;
                    Privilegio.view.formData.privilegio_producto.value = privilegio.privilegio_producto;
                    Privilegio.view.formData.privilegio_compra.value = privilegio.privilegio_compra;
                    Privilegio.view.formData.privilegio_venta.value = privilegio.privilegio_venta;
                }
            } else {
                Privilegio.view.sectionHead.classList.add("open");
                Privilegio.view.sectionTable.classList.add("open");
                Privilegio.view.sectionModal.classList.remove("open");
                Privilegio.view.sectionForm.classList.remove("open");
                Privilegio.fun.clearForm();
            }
        },
        submitForm: () => {
            if (Privilegio.view.formData.privilegio_nombre.value != "") {

                if (Privilegio.view.formData.privilegio_id.value == 0) {
                    Privilegio.crud.insert();
                } else {
                    Privilegio.crud.update();
                }
            } else {
                Privilegio.fun.showMsg("Debe llenar todos los campos!");
            }
        },
        search: () => {
            let txt = Privilegio.view.inputSearch.value.toLowerCase();
            if (txt.trim() == "") {
                Privilegio.fun.loadTable(Privilegio.databasePrivilegio);
            } else {
                let array = [];
                for (let i of Privilegio.databasePrivilegio) {
                    if (txt == i.privilegio_nombre.substring(0, txt.length).toLowerCase()) {
                        array.push(i);
                    }
                }
                Privilegio.fun.loadTable(array);
            }
        },
        // CAPSULA DE FUNCIONES
        clearForm: () => {
            Privilegio.view.formData.privilegio_id.value = 0;
            Privilegio.view.formData.privilegio_nombre_view.value = "Nuevo";
            Privilegio.view.formData.privilegio_nombre.value = "";
            Privilegio.view.formData.privilegio_informacion.value = "0";
            Privilegio.view.formData.privilegio_privilegio.value = "0";
            Privilegio.view.formData.privilegio_usuario.value = "0";
            Privilegio.view.formData.privilegio_bodega.value = "0";
            Privilegio.view.formData.privilegio_proveedor.value = "0";
            Privilegio.view.formData.privilegio_cliente.value = "0";
            Privilegio.view.formData.privilegio_producto.value = "0";
            Privilegio.view.formData.privilegio_compra.value = "0";
            Privilegio.view.formData.privilegio_venta.value = "0";
        },
        showMsg: (txt) => {
            Privilegio.view.formMsg.innerText = txt;
            setTimeout(() => {
                Privilegio.view.formMsg.innerText = "";
            }, 1000);
        },
        showConfirm: (bool, action) => {
            if (bool) {
                Privilegio.view.sectionModal.classList.add("open");
                Privilegio.view.modalYes.onclick = () => action();
            } else {
                Privilegio.view.sectionModal.classList.remove("open");
            }
        },
        showProgress: (bool, text) => {
            if (bool) {
                Privilegio.view.sectionProgressText.innerText = text;
                Privilegio.view.sectionProgress.classList.add("open");
            } else {
                Privilegio.view.sectionProgressText.innerText = text;
                setTimeout(() => {
                    Privilegio.view.sectionProgress.classList.remove("open");
                    Privilegio.view.sectionProgressText.innerText = "";
                }, 500);
            }
        }
    }
}

PrivilegioMain();