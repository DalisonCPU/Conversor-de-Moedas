
async function converter() {
    let valorConverter = Number(document.getElementById("valorConverter").value)
    if (!valorConverter) {
        alert("Digite um valor para converter")
        return
    }

    let nomeMoedaOrigem = pegaValorElemento("moedaOrigem")
    let nomeMoedaDestino = pegaValorElemento("moedaDestino")

    const resultadoConversao = await obterConversao(nomeMoedaOrigem, nomeMoedaDestino, valorConverter)
    if(!resultadoConversao) {
        alert("Erro ao obter resultado da conversão")
        return
    }

    let dvResultado = document.getElementById("resultado")
    dvResultado.innerHTML = `${valorConverter} ${nomeMoedaOrigem} = ${resultadoConversao} ${nomeMoedaDestino}`

}

function pegaValorElemento(elementoId) {
    const elemento = document.getElementById(elementoId)
    return elemento.options[elemento.selectedIndex].value
}

async function obterConversao(moedaOrigem, moedaDestino, valor) {

    const url = `https://cors.iamnd.eu.org/?url=` + encodeURIComponent(`https://www.xe.com/pt/currencyconverter/convert/?Amount=${valor}&From=${moedaOrigem}&To=${moedaDestino}`)
    const response = await fetch(url)
    const html = await response.text()
    let parser = new DOMParser()
    let doc = parser.parseFromString(html, "text/html")

    const elementoResultado = doc.getElementsByClassName("result__BigRate-sc-1bsijpp-1")
    if (elementoResultado.length !== 1) {
        return null
    }

    let resultadoParcial = elementoResultado[0].textContent
    resultadoParcial = resultadoParcial.split(" ")
    resultadoParcial[0] = resultadoParcial[0].replace(",", ".")

    let resultadoConversao = Number(resultadoParcial[0]).toFixed(2)
    return resultadoConversao
}
