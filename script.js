
function converter() {
    let valorConverter = Number(document.getElementById("valorConverter").value)
    if(!valorConverter) {
        alert("Digite um valor para converter")
        return
    }

    let moedaOrigemSelect = document.getElementById("moedaOrigem")
    let nomeMoedaOrigem = moedaOrigemSelect.options[moedaOrigemSelect.selectedIndex].value

    let moedaDestinoSelect = document.getElementById("moedaDestino")
    let nomeMoedaDestino = moedaDestinoSelect.options[moedaDestinoSelect.selectedIndex].value

    let dvResultado = document.getElementById("resultado")

    const url = `https://cors.iamnd.eu.org/?url=` + encodeURIComponent(`https://www.xe.com/pt/currencyconverter/convert/?Amount=${valorConverter}&From=${nomeMoedaOrigem}&To=${nomeMoedaDestino}`)
    fetch(url)
    .then(response => response.text())
    .then(html => {
        let parser = new DOMParser()
        let doc = parser.parseFromString(html, "text/html")
        let resultadoParcial = doc.getElementsByClassName("result__BigRate-sc-1bsijpp-1")[0].textContent
        resultadoParcial = resultadoParcial.split(" ")
        resultadoParcial[0] = resultadoParcial[0].replace(",", ".")
        let resultadoConversao = Number(resultadoParcial[0]).toFixed(2)
        dvResultado.innerHTML = `${valorConverter} ${nomeMoedaOrigem} = ${resultadoConversao} ${nomeMoedaDestino}`
    })
}