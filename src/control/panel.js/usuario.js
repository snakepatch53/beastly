let UsuarioMain = async () => {
    await Usuario.crud.selectProductoVenta();
    await Usuario.crud.selectProductoCompra();
    await Usuario.crud.select();
    Usuario.crud.selectPrivilegio();
    Usuario.view.inputNewButton.onclick = () => Usuario.fun.showForm(true, 0);
    Usuario.view.formButtonCancel.onclick = () => Usuario.fun.showForm(false, 0);
    Usuario.view.formButtonSave.onclick = () => Usuario.fun.submitForm();
    Usuario.view.modalNo.onclick = () => Usuario.fun.showConfirm(false, null);
    Usuario.view.modalClose.onclick = () => Usuario.fun.showConfirm(false, null);
    Usuario.view.inputSearch.onkeyup = () => Usuario.fun.search();
    Usuario.view.buttonShowPass.onclick = () => Usuario.fun.showPass();
}

let Usuario = {
    databaseUsuario: [],
    databaseProducto_venta: [],
    databaseProducto_compra: [],
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
        sectionProgressText: document.getElementById("sectionProgressText"),
        field_password: document.getElementById("field_password")
    },
    crud: {
        select: () => {
            fetch_query(null, "usuario", "select").then(res => {
                Usuario.databaseUsuario = res;
                Usuario.fun.loadTable(res);
                Usuario.fun.showForm(false, 0);
            }).catch(res => console.log("Error de conexión: " + res));
        },
        insert: () => {
            Usuario.fun.showProgress(true, "Guardando nuevo usuario...");
            let formData = new FormData(Usuario.view.formData);
            fetch_query(formData, "usuario", "insert").then(res => {
                Usuario.crud.select();
                Usuario.fun.showProgress(false, "Usuario guardado!");
            }).catch(res => console.log("Error de conexión: " + res));
        },
        update: () => {
            Usuario.fun.showProgress(true, "Actualizando el usuario...");
            let formData = new FormData(Usuario.view.formData);
            fetch_query(formData, "usuario", "update").then(res => {
                Usuario.crud.select();
                Usuario.fun.showProgress(false, "Usuario actualizado!");
            }).catch(res => console.log("Error de conexión: " + res));
        },
        delete: (usuario_id) => {
            Usuario.fun.showProgress(true, "Eliminando el usuario...");
            let formData = new FormData(Usuario.view.formData);
            formData.append("usuario_id", usuario_id);
            fetch_query(formData, "usuario", "delete").then(res => {
                Usuario.crud.select();
                Usuario.fun.showProgress(false, "usuario eliminado!");
            }).catch(res => console.log("Error de conexión: " + res));
        },
        selectPrivilegio: () => {
            fetch_query(null, "privilegio", "select").then(res => {
                let html = '<option value="">Selecciona un perfil</option>';
                for (let i of res) {
                    html += `<option value="${ i.privilegio_id }">${ i.privilegio_nombre }</option>`;
                }
                Usuario.view.formData.privilegio_id.innerHTML = html;
            }).catch(res => console.log("Error de conexión: " + res));
        },
        selectProductoVenta: async () => {
            await fetch_query(null, "producto_venta", "select").then(res => {
                Usuario.databaseProducto_venta = res;
            }).catch(res => console.log("Error de conexión: " + res));
        },
        selectProductoCompra: async () => {
            await fetch_query(null, "producto_compra", "select").then(res => {
                Usuario.databaseProducto_compra = res;
            }).catch(res => console.log("Error de conexión: " + res));
        }
    },
    fun: {
        loadTable: (array) => {
            let html = '';
            for (let i of array) {
                let deleteable = isDeleteable(Usuario.databaseProducto_compra, i.usuario_id, "usuario_id") && isDeleteable(Usuario.databaseProducto_venta, i.usuario_id, "usuario_id");
                html += `
                    <tr>
                        <td>
                            ${ i.usuario_foto == null ? `
                                <img src="view/src/img/user.png" class="td-photo" />
                            ` : `
                                <img src="view/src/file/usuario_foto/${ i.usuario_foto }?date=${ $dateTime }"" class="td-photo" />
                            ` }
                        </td>
                        <td><span class="td-span">${ i.usuario_nombre }</span></td>
                        <td><span class="td-span">${ i.usuario_user }</span></td>
                        <td><span class="td-span">${ i.privilegio_nombre }</span></td>
                        <td class="td-action">
                            <div class="buttons-flex">
                                <button class="edit ideabutton" onclick="Usuario.fun.showForm(true, ${ i.usuario_id })">
                                    <img src="view/src/icon/edit.png">
                                    <span>Editar</span>
                                </button>
                                <button class="delete ideabutton ${ !deleteable ? "disabled" : "" }" onclick="Usuario.fun.showConfirm(true, () => Usuario.crud.delete(${ i.usuario_id }))" ${ !deleteable ? "disabled" : "" }>
                                    <img src="view/src/icon/delete.png">
                                    <span>Eliminar</span>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            }
            Usuario.view.tableData.innerHTML = html;
        },
        showForm: (bool, usuario_id) => {
            if (bool) {
                Usuario.view.sectionHead.classList.remove("open");
                Usuario.view.sectionTable.classList.remove("open");
                Usuario.view.sectionModal.classList.remove("open");
                Usuario.view.sectionForm.classList.add("open");
                if (usuario_id != 0) {
                    let usuario = Usuario.databaseUsuario.find(element => element.usuario_id == usuario_id);
                    Usuario.view.formData.usuario_id.value = usuario.usuario_id;
                    Usuario.view.formData.usuario_nombre.value = usuario.usuario_nombre;
                    Usuario.view.formData.usuario_nombre_view.value = usuario.usuario_nombre;
                    Usuario.view.formData.usuario_user.value = usuario.usuario_user;
                    // Usuario.view.formData.usuario_pass.value = usuario.usuario_pass;
                    // Usuario.view.formData.usuario_foto.value = usuario.usuario_foto;
                    Usuario.view.formData.privilegio_id.value = usuario.privilegio_id;
                    Usuario.view.field_password.innerHTML = `Cambiar contraseña:`;
                }
            } else {
                Usuario.view.sectionHead.classList.add("open");
                Usuario.view.sectionTable.classList.add("open");
                Usuario.view.sectionModal.classList.remove("open");
                Usuario.view.sectionForm.classList.remove("open");
                Usuario.view.field_password.innerHTML = `Contraseña<b>*</b>:`;
                Usuario.fun.clearForm();
            }
        },
        submitForm: () => {
            let form = Usuario.view.formData;
            if (
                form.usuario_nombre.value == "" ||
                form.usuario_user.value == "" ||
                form.privilegio_id.value == ""
            ) {
                Usuario.fun.showMsg("Debe llenar todos los campos!");
                return;
            } else if (form.usuario_pass.value == "" && form.usuario_id.value == 0) {
                Usuario.fun.showMsg("Llene el campo contraseña!");
                return;
            } else if (existData(Usuario.databaseUsuario, form.usuario_user.value, "usuario_user", form.usuario_id.value, "usuario_id")) {
                Usuario.fun.showMsg("Este usuario ya existe!");
                return;
            }
            if (form.usuario_id.value == 0) {
                Usuario.crud.insert();
            } else {
                Usuario.crud.update();
            }
        },
        search: () => {
            let txt = Usuario.view.inputSearch.value.toLowerCase();
            if (txt.trim() == "") {
                Usuario.fun.loadTable(Usuario.databaseUsuario);
            } else {
                let array = [];
                for (let i of Usuario.databaseUsuario) {
                    if (
                        txt == i.usuario_nombre.substring(0, txt.length).toLowerCase()
                    ) {
                        array.push(i);
                    }
                }
                Usuario.fun.loadTable(array);
            }
        },
        // CAPSULA DE FUNCIONES
        clearForm: () => {
            Usuario.view.formData.usuario_id.value = 0;
            Usuario.view.formData.usuario_nombre_view.value = "Nuevo";
            Usuario.view.formData.usuario_nombre.value = "";
            Usuario.view.formData.usuario_user.value = "";
            Usuario.view.formData.usuario_pass.value = "";
            Usuario.view.formData.usuario_foto.value = "";
            Usuario.view.formData.privilegio_id.value = "";
        },
        showMsg: (txt) => {
            Usuario.view.formMsg.innerText = txt;
            setTimeout(() => {
                Usuario.view.formMsg.innerText = "";
            }, 1000);
        },
        showConfirm: (bool, action) => {
            if (bool) {
                Usuario.view.sectionModal.classList.add("open");
                Usuario.view.modalYes.onclick = () => action();
            } else {
                Usuario.view.sectionModal.classList.remove("open");
            }
        },
        showProgress: (bool, text) => {
            if (bool) {
                Usuario.view.sectionProgressText.innerText = text;
                Usuario.view.sectionProgress.classList.add("open");
            } else {
                Usuario.view.sectionProgressText.innerText = text;
                setTimeout(() => {
                    Usuario.view.sectionProgress.classList.remove("open");
                    Usuario.view.sectionProgressText.innerText = "";
                }, 500);
            }
        },

        showPass: () => {
            if (Usuario.view.formData.usuario_pass.type == "password") {
                Usuario.view.formData.usuario_pass.type = "text";
                Usuario.view.imgShowPass.src = "view/src/icon/hide.png";
            } else {
                Usuario.view.formData.usuario_pass.type = "password";
                Usuario.view.imgShowPass.src = "view/src/icon/show.png";
            }
        }
    }
}

UsuarioMain();