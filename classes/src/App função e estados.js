import { useState } from "react"

function App() {

  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [estacao, setEstacao] = useState(null)
  const [data, setData] = useState(null)
  const [icone, setIcone] = useState(null)
  const [mensagemDeErro, setMensagemDeErro] = useState(null)

  var obterEstacao = (data, latitude) => {
    const anoAtual = data.getFullYear()
    //new Date(ano, mês(0 a 11), dia(1 a 31)) 
    //21/06 
    const d1 = new Date(anoAtual, 5, 23)
    //24/09 
    const d2 = new Date(anoAtual, 8, 24)
    //22/12 
    const d3 = new Date(anoAtual, 11, 22)
    //21/03 
    const d4 = new Date(anoAtual, 2, 21)
    const sul = latitude < 0;
    if (data >= d1 && data < d2)
      return sul ? 'Inverno' : 'Verão'
    if (data >= d2 && data < d3)
      return sul ? 'Primavera' : 'Outono'
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
      (posicao) => {
        let data = new Date()
        let estacao = obterEstacao(data, posicao.coords.latitude);
        let icone = icones[estacao]
        setLatitude(posicao.coords.latitude)
        setLongitude(posicao.coords.longitude)
        setEstacao(estacao)
        setData(data.toLocaleTimeString())
        setIcone(icone)
      },
      (erro) => {
        console.log(erro)
        setMensagemDeErro(`Tente novamente mais tarde`)
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
                <i className={`fas fa-5x ${icone}`}></i>
                {/* largura 75%, margem no à esquerda (start), fs aumenta a fonte */}
                <p className=" w-75 ms-3 text-center fs-1">{estacao}</p>
              </div>
              <div>
                <p className="text-center">
                  {/* renderização condicional */}
                  {
                    latitude ?
                      `Coordenadas: ${latitude}, ${longitude}. Data: ${data}`
                      :
                      mensagemDeErro ?
                        `${mensagemDeErro}`
                        :
                        'Clique no botão para saber a sua estação climática'
                  }
                </p>
              </div>
              {/* botão azul (outline, 100% de largura e margem acima) */}
              <button onClick={obterLocalizacao}
                className="btn btn-outline-primary w-100 mt-2">
                Qual a minha estação?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default App