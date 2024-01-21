
// Chave de API para acessar os dados meteorológicos
const chave = "45fb8d260a72b52a51968e7c73392e81";

// Função para exibir os dados meteorológicos na tela
function colocarDadosNaTela(dados) {
    // Log dos dados no console para fins de depuração
    console.log(dados);

    // Atualização do conteúdo HTML com informações da cidade
    window.document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name;

    // Atualização da temperatura no HTML, arredondada para a unidade mais próxima
    window.document.querySelector(".temperatura").innerHTML = Math.floor(dados.main.temp) + "°C";

    // Atualização do texto da previsão do tempo no HTML
    window.document.querySelector(".texto-previsao").innerHTML = dados.weather[0].description;

    // Atualização da umidade no HTML, acrescentando a unidade percentual
    window.document.querySelector(".Umidade").innerHTML = dados.main.humidity + "%" + " de umidade.";

    // Atualização da imagem de previsão do tempo no HTML usando a URL da API OpenWeatherMap
    window.document.querySelector(".img-previsao").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
}

// Função assíncrona para buscar dados meteorológicos de uma cidade
async function buscarCidade(cidade) {
    // Requisição assíncrona usando a API fetch para obter os dados meteorológicos
    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave}&lang=pt_br&units=metric`)
                          .then(resposta => resposta.json());

    // Chama a função para exibir os dados na tela
    colocarDadosNaTela(dados);
}

// Função chamada quando o botão é clicado
function cliqueiNoBotao() {
    // Obtém o valor da cidade a ser pesquisada
    const cidade = window.document.querySelector(".input-cidade").value;

    // Verifica se a cidade não está vazia antes de chamar a função para buscar dados meteorológicos
    if (cidade.trim() !== "") {
        // Chama a função para buscar os dados meteorológicos da cidade
        buscarCidade(cidade);
    } else {
        // Exibe uma mensagem de erro no console se a cidade estiver vazia
        console.error("Por favor, insira uma cidade antes de clicar no botão.");
    }
}