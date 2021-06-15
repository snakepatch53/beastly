(() => {
    let toggle_tool = localStorage.getItem("toggle_tool");
    if (toggle_tool != null) {
        toggle_tool = JSON.parse(toggle_tool);
        let tool_menu = document.getElementById("tool_toggle_menu");
        if (toggle_tool == false) {
            tool_menu.classList.add("close");
        } else {
            tool_menu.classList.remove("close");
        }
    }
})();

document.getElementById("tool_toggle_button").onclick = () => {
    let tool_menu = document.getElementById("tool_toggle_menu");
    if (tool_menu.classList.contains("close")) {
        tool_menu.classList.remove("close");
        localStorage.setItem("toggle_tool", "true");
    } else {
        tool_menu.classList.add("close");
        localStorage.setItem("toggle_tool", "false");
    }
}

document.getElementById("element_button_logout").onclick = () => {
    fetch_query(null, "usuario", "logout").then(res => {
        window.location.href = "./login";
    }).catch(res => {
        window.location.href = "./login";
    })
}