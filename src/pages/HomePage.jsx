import React, { Component } from 'react'
import { connect } from 'react-redux';
import Clientes from '../components/Clientes'
import Filmes from '../components/Filmes'
import Locacoes from '../components/Locacoes'
import { getClientesAction, getFilmesAction, getLocacoesAction } from '../redux/actions';
import getLocadoraInfo from '../services/fetchLocadora';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exibe: 'filmes',
      clientes: [],
      filmes: [],
    }
    this.handleRadio= this.handleRadio.bind(this);
  }

  componentDidMount() {
    this.fetchInfoLocadora('cliente');
    this.fetchInfoLocadora('filme');
    this.fetchInfoLocadora('locacao');
  }

  async fetchInfoLocadora(section) {
    const { getClientes, getFilmes, getLocacoes } = this.props;
    const response = await getLocadoraInfo(section);
    if(section === 'cliente') {
      this.setState({ clientes: response });
      getClientes(response);
    }
    if(section === 'filme') {
      this.setState({ filmes: response });
      getFilmes(response);
    }
    if(section === 'locacao') {
      this.setState({ locacoes: response });
      getLocacoes(response);
    }
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
            <label htmlFor="filmes">
              <input
                type="radio"
                name="gerenciamento"
                id="filmes"
                onChange={ (e) => this.handleRadio(e) }
                checked={ exibe === 'filmes' ? true : false }
              />
              Gerenciar Filmes
            </label>

            <label htmlFor="clientes">
              <input
                type="radio"
                name="gerenciamento"
                id="clientes"
                onChange={ (e) => this.handleRadio(e) }
              />
              Gerenciar Clientes
            </label>

            <label htmlFor="locacoes">
              <input
                type="radio"
                name="gerenciamento"
                id="locacoes"
                onChange={ (e) => this.handleRadio(e) }
              />
              Gerenciar Locações
            </label>
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
  getClientes: (payload) => dispatch(getClientesAction(payload)),
  getFilmes: (payload) => dispatch(getFilmesAction(payload)),
  getLocacoes: (payload) => dispatch(getLocacoesAction(payload))
});

export default connect(null, mapDispatchToProps)(HomePage);
