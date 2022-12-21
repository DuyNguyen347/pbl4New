const expand = document.getElementById("btn-expand");
const superWrap = document.getElementsByClassName("super-wrap")[0]
expand.onclick =async () => {
    if (superWrap.classList.contains('thugon')){
        window.thugon()
        await sleep(1)
        superWrap.classList.toggle("thugon")
    }
    else {
        superWrap.classList.toggle("thugon")
        await sleep(1)
        window.thugon()
    }
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}