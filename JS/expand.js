const expand = document.getElementById("btn-expand");
expand.onclick = () => {
    document.getElementsByClassName("super-wrap")[0].classList.toggle("thugon")
    window.thugon()
}