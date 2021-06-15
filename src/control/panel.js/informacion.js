let InformacionMain = () => {
    Informacion.crud.select();
    Informacion.view.formButtonEdit.onclick = () => Informacion.fun.setEditMode(true);
    Informacion.view.formButtonCancel.onclick = () => Informacion.fun.setEditMode(false);
    Informacion.view.formButtonSave.onclick = () => Informacion.fun.submitForm();
    Informacion.view.modalNo.onclick = () => Informacion.fun.showConfirm(false, null);
    Informacion.view.modalClose.onclick = () => Informacion.fun.showConfirm(false, null);
}

let Informacion = {
    databaseInformacion: {},
    view: {
        sectionForm: document.getElementById("sectionForm"),
        formData: document.getElementById("formData"),
        formButtonSave: document.getElementById("formButtonSave"),
        formButtonCancel: document.getElementById("formButtonCancel"),
        formButtonEdit: document.getElementById("formButtonEdit"),
        formMsg: document.getElementById("formMsg"),
        sectionModal: document.getElementById("sectionModal"),
        modalText: document.getElementById("modalText"),
        modalClose: document.getElementById("modalClose"),
        modalNo: document.getElementById("modalNo"),
        modalYes: document.getElementById("modalYes"),
        sectionProgress: document.getElementById("sectionProgress"),
        sectionProgressText: document.getElementById("sectionProgressText")
    },
    crud: {
        select: () => {
            Informacion.fun.showProgress(true, "Cargando información...");
            let formData = new FormData(Informacion.view.formData);
            fetch_query(formData, "informacion", "selectById").then(res => {
                Informacion.databaseInformacion = res[0];
                Informacion.fun.loadDataToForm(res[0]);
                Informacion.fun.setEditMode(false);
                Informacion.fun.showConfirm(false, null);
                Informacion.fun.showProgress(false, "Información cargada!");
            }).catch(res => console.log("Error de conexión: " + res));
        },
        update: () => {
            Informacion.fun.showProgress(true, "Actualizando información...");
            let formData = new FormData(Informacion.view.formData);
            fetch_query(formData, "informacion", "update").then(res => {
                Informacion.crud.select();
                Informacion.fun.showProgress(false, "Información cargada!");
            }).catch(res => console.log("Error de conexión: " + res));
        }
    },
    fun: {
        loadDataToForm: (data) => {
            Informacion.view.formData.informacion_nombre.value = data.informacion_nombre;
            Informacion.view.formData.informacion_sigla.value = data.informacion_sigla;
            Informacion.view.formData.informacion_ciudad.value = data.informacion_ciudad;
            Informacion.view.formData.informacion_direccion.value = data.informacion_direccion;
            Informacion.view.formData.informacion_telefono.value = data.informacion_telefono;
            Informacion.view.formData.informacion_celular.value = data.informacion_celular;
            Informacion.view.formData.informacion_email.value = data.informacion_email;
            Informacion.view.formData.informacion_iva.value = data.informacion_iva;
            Informacion.view.formData.informacion_primary_background.value = data.informacion_primary_background;
            Informacion.view.formData.informacion_primary_background_hover.value = data.informacion_primary_background_hover;
            Informacion.view.formData.informacion_primary_color.value = data.informacion_primary_color;
            Informacion.view.formData.informacion_primary_color_hover.value = data.informacion_primary_color_hover;
            Informacion.view.formData.informacion_secondary_background.value = data.informacion_secondary_background;
            Informacion.view.formData.informacion_secondary_background_hover.value = data.informacion_secondary_background_hover;
            Informacion.view.formData.informacion_secondary_color.value = data.informacion_secondary_color;
            Informacion.view.formData.informacion_secondary_color_hover.value = data.informacion_secondary_color_hover;
            Informacion.view.formData.informacion_tertiary_background.value = data.informacion_tertiary_background;
            Informacion.view.formData.informacion_tertiary_background_hover.value = data.informacion_tertiary_background_hover;
            Informacion.view.formData.informacion_tertiary_color.value = data.informacion_tertiary_color;
            Informacion.view.formData.informacion_tertiary_color_hover.value = data.informacion_tertiary_color_hover;
            Informacion.view.formData.informacion_success.value = data.informacion_success;
            Informacion.view.formData.informacion_info.value = data.informacion_info;
            Informacion.view.formData.informacion_warnning.value = data.informacion_warnning;
            Informacion.view.formData.informacion_error.value = data.informacion_error;
        },
        setEditMode: (bool) => {
            Informacion.view.formData.informacion_nombre.disabled = !bool;
            Informacion.view.formData.informacion_sigla.disabled = !bool;
            Informacion.view.formData.informacion_logo.disabled = !bool;
            Informacion.view.formData.informacion_icon.disabled = !bool;
            Informacion.view.formData.informacion_ciudad.disabled = !bool;
            Informacion.view.formData.informacion_direccion.disabled = !bool;
            Informacion.view.formData.informacion_telefono.disabled = !bool;
            Informacion.view.formData.informacion_celular.disabled = !bool;
            Informacion.view.formData.informacion_email.disabled = !bool;
            Informacion.view.formData.informacion_iva.disabled = !bool;
            Informacion.view.formData.informacion_primary_background.disabled = !bool;
            Informacion.view.formData.informacion_primary_background_hover.disabled = !bool;
            Informacion.view.formData.informacion_primary_color.disabled = !bool;
            Informacion.view.formData.informacion_primary_color_hover.disabled = !bool;
            Informacion.view.formData.informacion_secondary_background.disabled = !bool;
            Informacion.view.formData.informacion_secondary_background_hover.disabled = !bool;
            Informacion.view.formData.informacion_secondary_color.disabled = !bool;
            Informacion.view.formData.informacion_secondary_color_hover.disabled = !bool;
            Informacion.view.formData.informacion_tertiary_background.disabled = !bool;
            Informacion.view.formData.informacion_tertiary_background_hover.disabled = !bool;
            Informacion.view.formData.informacion_tertiary_color.disabled = !bool;
            Informacion.view.formData.informacion_tertiary_color_hover.disabled = !bool;
            Informacion.view.formData.informacion_success.disabled = !bool;
            Informacion.view.formData.informacion_info.disabled = !bool;
            Informacion.view.formData.informacion_warnning.disabled = !bool;
            Informacion.view.formData.informacion_error.disabled = !bool;
            if (bool) {
                Informacion.view.formButtonCancel.style.display = "flex";
                Informacion.view.formButtonSave.style.display = "flex";
                Informacion.view.formButtonEdit.style.display = "none";
            } else {
                Informacion.view.formButtonCancel.style.display = "none";
                Informacion.view.formButtonSave.style.display = "none";
                Informacion.view.formButtonEdit.style.display = "flex";
                Informacion.fun.loadDataToForm(Informacion.databaseInformacion);
            }
        },
        submitForm: () => {
            if (
                Informacion.view.formData.informacion_id.value == "" ||
                Informacion.view.formData.informacion_nombre.value == "" ||
                Informacion.view.formData.informacion_sigla.value == "" ||
                Informacion.view.formData.informacion_ciudad.value == "" ||
                Informacion.view.formData.informacion_direccion.value == "" ||
                Informacion.view.formData.informacion_telefono.value == "" ||
                Informacion.view.formData.informacion_celular.value == "" ||
                Informacion.view.formData.informacion_email.value == "" ||
                Informacion.view.formData.informacion_iva.value == "" ||
                Informacion.view.formData.informacion_primary_background.value == "" ||
                Informacion.view.formData.informacion_primary_background_hover.value == "" ||
                Informacion.view.formData.informacion_primary_color.value == "" ||
                Informacion.view.formData.informacion_primary_color_hover.value == "" ||
                Informacion.view.formData.informacion_secondary_background.value == "" ||
                Informacion.view.formData.informacion_secondary_background_hover.value == "" ||
                Informacion.view.formData.informacion_secondary_color.value == "" ||
                Informacion.view.formData.informacion_secondary_color_hover.value == "" ||
                Informacion.view.formData.informacion_tertiary_background.value == "" ||
                Informacion.view.formData.informacion_tertiary_background_hover.value == "" ||
                Informacion.view.formData.informacion_tertiary_color.value == "" ||
                Informacion.view.formData.informacion_tertiary_color_hover.value == "" ||
                Informacion.view.formData.informacion_success.value == "" ||
                Informacion.view.formData.informacion_info.value == "" ||
                Informacion.view.formData.informacion_warnning.value == "" ||
                Informacion.view.formData.informacion_error.value == ""
            ) {
                Informacion.fun.showMsg("Llena los campos obligatorios!");
                return;
            } else if (!isCelular(Informacion.view.formData.informacion_telefono.value)) {
                Informacion.fun.showMsg("Numero de teléfono no válido!");
                return;
            } else if (!isCelular(Informacion.view.formData.informacion_celular.value)) {
                Informacion.fun.showMsg("Numero de celular no válido!");
                return;
            } else if (!isEmail(Informacion.view.formData.informacion_email.value)) {
                Informacion.fun.showMsg("Correo electronico no válido!");
                return;
            } else {
                Informacion.fun.showConfirm(true, () => Informacion.crud.update());
            }
        },
        showMsg: (txt) => {
            Informacion.view.formMsg.innerText = txt;
            setTimeout(() => {
                Informacion.view.formMsg.innerText = "";
            }, 1500);
        },
        showConfirm: (bool, action) => {
            if (bool) {
                Informacion.view.sectionModal.classList.add("open");
                Informacion.view.modalYes.onclick = () => action();
            } else {
                Informacion.view.sectionModal.classList.remove("open");
            }
        },
        showProgress: (bool, text) => {
            if (bool) {
                Informacion.view.sectionProgressText.innerText = text;
                Informacion.view.sectionProgress.classList.add("open");
            } else {
                Informacion.view.sectionProgressText.innerText = text;
                setTimeout(() => {
                    Informacion.view.sectionProgress.classList.remove("open");
                    Informacion.view.sectionProgressText.innerText = "";
                }, 400);
            }
        }
    }
}

InformacionMain();