import React, { Component } from 'react'

export default class Loading extends Component {
    render() {
        return (
            // centralizando nos dois eixos, borda e padding 
            <div className="d-flex justify-content-center align-items-center  border rounded p-3">
                {/* text-whatever troca a cor */}
                <div className="spinner-border text-primary" style={{
                    width: '3rem', height:
                        '3rem'
                }}>
                    {/* deve ser utilizado somente por dispositivos de acessibilidade, como leitores de 
tela  */}
                    <span className="visually-hidden">Carregando...</span>
                </div>

                <p className="text-primary">{this.props.mensagem || 'Carregando'}</p>
            </div>
        )
    }
} 

//fora da classe que define o coponente 
Loading.defaultProps = { 
    mensagem: "Carregando" 
}