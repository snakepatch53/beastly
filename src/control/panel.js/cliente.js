let ClienteMain = async () => {
    await Cliente.crud.select();
    Cliente.view.inputNewButton.onclick = () => Cliente.fun.showForm(true, 0);
    Cliente.view.formButtonCancel.onclick = () => Cliente.fun.showForm(false, 0);
    Cliente.view.formButtonSave.onclick = () => Cliente.fun.submitForm();
    Cliente.view.modalNo.onclick = () => Cliente.fun.showConfirm(false, null);
    Cliente.view.modalClose.onclick = () => Cliente.fun.showConfirm(false, null);
    Cliente.view.inputSearch.onkeyup = () => Cliente.fun.search();
    Cliente.view.button_random_pass.onclick = () => Cliente.fun.randomPass();
}

let Cliente = {
    databaseCliente: [],
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
        sectionProgress: document.getElementById("sectionProgress"),
        sectionProgressText: document.getElementById("sectionProgressText"),
        field_password: document.getElementById("field_password"),
        button_random_pass: document.getElementById("generate-random-pass")
    },
    crud: {
        select: () => {
            fetch_query(null, "cliente", "select").then(res => {
                Cliente.databaseCliente = res;
                Cliente.fun.loadTable(res);
                Cliente.fun.showForm(false, 0);
            }).catch(res => console.log("Error de conexión: " + res));
        },
        insert: () => {
            Cliente.fun.showProgress(true, "Guardando nuevo cliente...");
            let formData = new FormData(Cliente.view.formData);
            fetch_query(formData, "cliente", "insert").then(res => {
                Cliente.crud.select();
                Cliente.fun.showProgress(false, "Cliente guardado!");
            })
        },
        update: () => {
            Cliente.fun.showProgress(true, "Actualizando el cliente...");
            let formData = new FormData(Cliente.view.formData);
            fetch_query(formData, "cliente", "update").then(res => {
                Cliente.crud.select();
                Cliente.fun.showProgress(false, "Cliente actualizado!");
            }).catch(res => console.log("Error de conexión: " + res));
        },
        delete: (cliente_id) => {
            Cliente.fun.showProgress(true, "Eliminando el cliente...");
            let formData = new FormData(Cliente.view.formData);
            formData.append("cliente_id", cliente_id);
            fetch_query(formData, "cliente", "delete").then(res => {
                Cliente.crud.select();
                Cliente.fun.showProgress(false, "cliente eliminado!");
            }).catch(res => console.log("Error de conexión: " + res));
        }
    },
    fun: {
        loadTable: (array) => {
            let html = '';
            for (let i of array) {
                html += `
                    <tr>
                        <td>
                            ${ i.cliente_foto == null ? `
                                <img src="view/general.img/user.png" class="td-photo" />
                            ` : `
                                <img src="view/general.file/cliente_foto/${ i.cliente_foto }?date=${ $dateTime }"" class="td-photo" />
                            ` }
                        </td>
                        <td><span class="td-span">${ i.cliente_nombre1 } ${ i.cliente_apellido1 }</span></td>
                        <td class="td-action">
                            <div class="buttons-flex">
                                <select class="cliente-select" id="${ i.cliente_id }">
                                    <option value="">Formato</option>
                                    <option value="city_bank.php">City Bank</option>
                                </select>
                                <button class="edit ideabutton" onclick="Cliente.fun.showForm(true, ${ i.cliente_id })">
                                    <i class="fas fa-user-edit"></i>
                                    <span>Editar</span>
                                </button>
                                <button class="delete ideabutton" onclick="Cliente.fun.showConfirm(true, () => Cliente.crud.delete(${ i.cliente_id }))">
                                    <i class="fas fa-user-times"></i>
                                    <span>Eliminar</span>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            }
            Cliente.view.tableData.innerHTML = html;
            Cliente.fun.defineSelectOptions();
        },
        showForm: (bool, cliente_id) => {
            if (bool) {
                Cliente.view.sectionHead.classList.remove("open");
                Cliente.view.sectionTable.classList.remove("open");
                Cliente.view.sectionModal.classList.remove("open");
                Cliente.view.sectionForm.classList.add("open");
                if (cliente_id != 0) {
                    let cliente = Cliente.databaseCliente.find(element => element.cliente_id == cliente_id);
                    Cliente.view.formData.cliente_id.value = cliente.cliente_id;
                    Cliente.view.formData.cliente_nombre_view.value = cliente.cliente_nombre1 + " " + cliente.cliente_apellido1;
                    // Cliente.view.formData.cliente.cliente_foto.value = cliente.cliente_foto;
                    Cliente.view.formData.cliente_nombre1.value = cliente.cliente_nombre1;
                    Cliente.view.formData.cliente_nombre2.value = cliente.cliente_nombre2;
                    Cliente.view.formData.cliente_apellido1.value = cliente.cliente_apellido1;
                    Cliente.view.formData.cliente_apellido2.value = cliente.cliente_apellido2;
                    Cliente.view.formData.cliente_nacimiento.value = cliente.cliente_nacimiento;
                    Cliente.view.formData.cliente_ticket.value = cliente.cliente_ticket;
                    Cliente.view.formData.cliente_calle1.value = cliente.cliente_calle1;
                    Cliente.view.formData.cliente_calle2.value = cliente.cliente_calle2;
                    Cliente.view.formData.cliente_ciudad.value = cliente.cliente_ciudad;
                    Cliente.view.formData.cliente_estado.value = cliente.cliente_estado;
                    Cliente.view.formData.cliente_postal.value = cliente.cliente_postal;
                    Cliente.view.formData.cliente_ojos_color.value = cliente.cliente_ojos_color;
                    Cliente.view.formData.cliente_ojos_problema.value = cliente.cliente_ojos_problema;
                    Cliente.view.formData.cliente_estatura.value = cliente.cliente_estatura;
                    Cliente.view.formData.cliente_cita_lugar.value = cliente.cliente_cita_lugar;
                    Cliente.view.formData.cliente_cita_hora.value = cliente.cliente_cita_hora;
                    Cliente.view.formData.cliente_pass.value = cliente.cliente_pass;
                    Cliente.view.field_password.innerHTML = `Cambiar clave de consulta: `;
                }
            } else {
                Cliente.view.sectionHead.classList.add("open");
                Cliente.view.sectionTable.classList.add("open");
                Cliente.view.sectionModal.classList.remove("open");
                Cliente.view.sectionForm.classList.remove("open");
                Cliente.view.field_password.innerHTML = `Clave de consulta<b>*</b>: `;
                Cliente.fun.clearForm();
            }
        },
        submitForm: () => {
            let form = Cliente.view.formData;
            if (
                form.cliente_nombre1.value == "" ||
                form.cliente_nombre2.value == "" ||
                form.cliente_apellido1.value == "" ||
                form.cliente_apellido2.value == "" ||
                form.cliente_nacimiento.value == "" ||
                form.cliente_ticket.value == "" ||
                form.cliente_calle1.value == "" ||
                form.cliente_calle2.value == "" ||
                form.cliente_ciudad.value == "" ||
                form.cliente_estado.value == "" ||
                form.cliente_postal.value == "" ||
                form.cliente_ojos_color.value == "" ||
                form.cliente_ojos_problema.value == "" ||
                form.cliente_estatura.value == "" ||
                form.cliente_cita_lugar.value == "" ||
                form.cliente_cita_hora.value == "" ||
                form.cliente_pass.value == ""
            ) {
                Cliente.fun.showMsg("Debe llenar todos los campos!");
                return;
            } else if (form.cliente_pass.value == "" && form.cliente_id.value == 0) {
                Cliente.fun.showMsg("Llene el campo contraseña!");
                return;
            }
            if (form.cliente_id.value == 0) {
                Cliente.crud.insert();
            } else {
                Cliente.crud.update();
            }
        },
        search: () => {
            let txt = Cliente.view.inputSearch.value.toLowerCase();
            if (txt.trim() == "") {
                Cliente.fun.loadTable(Cliente.databaseCliente);
            } else {
                let array = [];
                for (let i of Cliente.databaseCliente) {
                    if (
                        txt == i.cliente_nombre.substring(0, txt.length).toLowerCase()
                    ) {
                        array.push(i);
                    }
                }
                Cliente.fun.loadTable(array);
            }
        },
        // CAPSULA DE FUNCIONES
        clearForm: () => {
            Cliente.view.formData.cliente_id.value = 0;
            Cliente.view.formData.cliente_nombre_view.value = "Nuevo";
            Cliente.view.formData.cliente_foto.value = ""
            Cliente.view.formData.cliente_nombre1.value = "";
            Cliente.view.formData.cliente_nombre2.value = "";
            Cliente.view.formData.cliente_apellido1.value = "";
            Cliente.view.formData.cliente_apellido2.value = "";
            Cliente.view.formData.cliente_nacimiento.value = "";
            Cliente.view.formData.cliente_ticket.value = "";
            Cliente.view.formData.cliente_calle1.value = "";
            Cliente.view.formData.cliente_calle2.value = "";
            Cliente.view.formData.cliente_ciudad.value = "";
            Cliente.view.formData.cliente_estado.value = "";
            Cliente.view.formData.cliente_postal.value = "";
            Cliente.view.formData.cliente_ojos_color.value = "";
            Cliente.view.formData.cliente_ojos_problema.value = "";
            Cliente.view.formData.cliente_estatura.value = "";
            Cliente.view.formData.cliente_cita_lugar.value = "";
            Cliente.view.formData.cliente_cita_hora.value = "";
            Cliente.view.formData.cliente_pass.value = "";
            Cliente.fun.randomPass();
        },
        showMsg: (txt) => {
            Cliente.view.formMsg.innerText = txt;
            setTimeout(() => {
                Cliente.view.formMsg.innerText = "";
            }, 1000);
        },
        showConfirm: (bool, action) => {
            if (bool) {
                Cliente.view.sectionModal.classList.add("open");
                Cliente.view.modalYes.onclick = () => action();
            } else {
                Cliente.view.sectionModal.classList.remove("open");
            }
        },
        showProgress: (bool, text) => {
            if (bool) {
                Cliente.view.sectionProgressText.innerText = text;
                Cliente.view.sectionProgress.classList.add("open");
            } else {
                Cliente.view.sectionProgressText.innerText = text;
                setTimeout(() => {
                    Cliente.view.sectionProgress.classList.remove("open");
                    Cliente.view.sectionProgressText.innerText = "";
                }, 500);
            }
        },
        randomPass: () => {
            Cliente.view.formData.cliente_pass.value = Math.random().toString(36).substr(2);
        },
        defineSelectOptions: () => {
            const cliente_select = document.querySelectorAll(".cliente-select");
            cliente_select.forEach(element => {
                element.onchange = () => {
                    window.open(`${ $proyect.root }model/script/cliente/pdf/${ element.value }?cliente_id=${ element.id }`);
                    element.value = "";
                }
            });
        }
    }
}

ClienteMain();