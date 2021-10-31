import React, { Component } from 'react'
import Clientes from '../components/Clientes'
import Filmes from '../components/Filmes'
import Locacoes from '../components/Locacoes'

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exibe: 'filmes',
    }
    this.handleRadio= this.handleRadio.bind(this);
  }

  handleRadio({ target }) {
    return this.setState({ exibe: target.id })
  }

  render() {
    const { exibe } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="gerenciamento">
            Gerenciar Filmes
            <input
              type="radio"
              name="gerenciamento"
              id="filmes"
              onChange={ (e) => this.handleRadio(e) }
              checked={ exibe === 'filmes' ? true : false }
            />

            Gerenciar Clientes
            <input
              type="radio"
              name="gerenciamento"
              id="clientes"
              onChange={ (e) => this.handleRadio(e) }
            />

            Gerenciar Locações
            <input
              type="radio"
              name="gerenciamento"
              id="locacoes"
              onChange={ (e) => this.handleRadio(e) }
            />
          </label>
        </form>
        { exibe === 'filmes' && <Filmes /> }
        { exibe === 'clientes' && <Clientes />}
        { exibe === 'locacoes' && <Locacoes />}
      </div>
    )
  }
}
