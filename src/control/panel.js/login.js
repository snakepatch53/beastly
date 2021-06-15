let LoginMain = () => {
    Login.view.form.onsubmit = (evt) => {
        evt.preventDefault();
        Login.fun.submit();
    }
    // Load session credentials
    let session = localStorage.getItem("save_session");
    if (session != null) {
        session = JSON.parse(session);
        Login.view.form.usuario_user.value = session.user;
        Login.view.form.usuario_pass.value = session.pass;
        Login.view.form.save_pass.checked = true;
    }
}

let Login = {
    view: {
        form: document.getElementById("element_form"),
        msg: document.getElementById("element_msg")
    },
    fun: {
        submit: () => {
            let form = Login.view.form;
            let user = form.usuario_user.value;
            let pass = form.usuario_pass.value;
            if (
                user != "" &&
                pass != ""
            ) {
                let formData = new FormData(form);
                fetch_query(formData, "usuario", "login", "POST").then(res => {
                    if (res != false) {
                        if (form.save_pass.checked == true) {
                            localStorage.setItem("save_session", JSON.stringify({
                                user: user,
                                pass: pass
                            }));
                        } else {
                            localStorage.removeItem("save_session");
                        }
                        window.location.href = "./inicio";
                    } else {
                        Login.fun.showMsg("Credenciales incorrectos!", 1000)
                    }
                }).catch(res => {
                    Login.fun.showMsg("Credenciales incorrectos!", 1000)
                })
            } else {
                Login.fun.showMsg("Ingrese todos los campos!", 1000)
            }
        },
        showMsg: (txt, time) => {
            Login.view.msg.innerText = txt;
            setTimeout(() => {
                Login.view.msg.innerText = "";
            }, time);
        }
    }
}

LoginMain();