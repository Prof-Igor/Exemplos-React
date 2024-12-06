import React, { Component } from 'react'
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import env from 'react-dotenv'

export default class Busca extends Component {
    state = {
        termoDeBusca: ''
    }

    onTermoAlterado = (event) => {
        this.setState({ termoDeBusca: event.target.value })
        return true
    }

    onFormSubmit = (event) => {
        //não deixa o navegador submeter o form 
        event.preventDefault()
        this.props.onBuscaRealizada(this.state.termoDeBusca) 
    }

    render() {
        return (
            <form  onSubmit={this.onFormSubmit}>
                <div className="flex flex-column">
                    {/* ícone à esquerda, largura máxima */}
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-search"> </InputIcon>
                        <InputText className="w-full"
                            value={this.state.termoDeBusca}
                            onChange={this.onTermoAlterado}
                            placeholder={this.props.dica} />
                    </IconField>

                    <Button
                        label="OK"
                        className="p-button-outlined mt-2"
                    />
                </div>
            </form>
        )
    }
}

Busca.defaultProps = {
    dica: 'Digite algo que deseja ver...'
}