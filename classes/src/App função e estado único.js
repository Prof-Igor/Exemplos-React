import { useState } from "react";

var App = ({nome}) => {

  const [estado, setEstado] = useState({
    longitude: null,
    latitude: null,
    estacao: null,
    data: null,
    icone: null
  })
  const [mensagemDeErro, setMensagemDeErro] = useState(null)

  var obterEstacao = (data, latitude) => {
    const anoAtual = data.getFullYear()
    //21/06 
    const d1 = new Date(anoAtual, 5, 21)
    //24/09 
    const d2 = new Date(anoAtual, 8, 24)
    //22/12 
    const d3 = new Date(anoAtual, 11, 22)

    const sul = latitude < 0

    if (data >= d1 && data < d2)
      if (sul)
        return "Inverno"
      else
        return "Verão"
    if (data >= d2 && data < d3)
      return sul ? "Primavera" : "Outono"
    if (data >= d3 || data < d1)
      return sul ? 'Verão' : 'Inverno'
    return sul ? 'Outono' : 'Primavera'
  }

  var icones = {
    'Primavera': 'fa-seedling',
    'Verão': 'fa-umbrella-beach',
    'Outono': 'fa-tree',
    'Inverno': 'fa-snowman'
  }

  var obterLocalizacao = () => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {

        let estacaoNova = obterEstacao(new Date(), position.coords.latitude)
        let iconeNovo = icones[estacaoNova]

        setEstado(
          (prev) => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            estacao: estacaoNova,
            data: new Date().toLocaleDateString(),
            icone: iconeNovo
          })
        )

      },
      (erro) => {
        console.log(erro)
        setMensagemDeErro("Não foi possivel obter a localização. Tente novamente mais tarde!")
      }
    )
  }

  return (
    // responsividade, margem acima 
    <div className="container mt-2">
      {/* uma linha, conteúdo centralizado, display é flex */}
      <div className="row justify-content-center">
        {/* oito colunas das doze disponíveis serão usadas para telas médias em diante */}
        <div className="col-md-8">
          {/* um cartão Bootstrap */}
          <div className="card">
            {/* o corpo do cartão */}
            <div className="card-body">
              {/* centraliza verticalmente, margem abaixo */}
              <div className="d-flex align-items-center border rounded mb-2"
                style={{ height: '6rem' }}>
                {/* ícone obtido do estado do componente */}
                <i className={`fas fa-5x ${estado.icone}`}></i>
                {/* largura 75%, margem no à esquerda (start), fs aumenta a fonte */}
                <p className=" w-75 ms-3 text-center fs-1">{estado.estacao}</p>
              </div>
              <div>
                <p className="text-center">
                  {/* renderização condicional */}
                  {
                    estado.latitude ?
                      `Coordenadas: ${estado.latitude}, ${estado.longitude}. Data: ${estado.data}` :
                      mensagemDeErro ?
                        `${mensagemDeErro}` :
                        `${nome}! Clique no botão para saber a sua estação climática!`
                  }
                </p>
              </div>
              <button onClick={obterLocalizacao} className="btn btn-outline-primary w-100 mt-2">
                Qual a minha estação?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App