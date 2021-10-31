import React, { Component } from 'react'
import { connect } from 'react-redux';
import Clientes from '../components/Clientes'
import Filmes from '../components/Filmes'
import Locacoes from '../components/Locacoes'
import { getClientesAction } from '../redux/actions';
import getLocadoraInfo from '../services/fetchLocadora';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exibe: 'filmes',
      clientes: [],
    }
    this.handleRadio= this.handleRadio.bind(this);
  }

  componentDidMount() {
    this.fetchInfoLocadora('cliente');
  }

  async fetchInfoLocadora(section) {
    const { getClientes } = this.props;
    const response = await getLocadoraInfo(section);
    this.setState({ clientes: response });
    getClientes(response);
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

const mapDispatchToProps = (dispatch) => ({
  getClientes: (payload) => dispatch(getClientesAction(payload))
});

export default connect(null, mapDispatchToProps)(HomePage);
