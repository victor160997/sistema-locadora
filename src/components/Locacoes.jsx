import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteLocacoesAction, updateLocacoesAction, updateOnlyLocacaoAction } from '../redux/actions';
import { adcLocacoes, renderHeaderLocacoes, renderLocacoes } from '../services/FunctionsLocacoesComponent';

class Locacoes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locacoes: [],
      idLocacao: '',
      idCliente: '',
      idFilme: '',
      dataLocacao: '',
      dataDevolucao: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.setToUpdate = this.setToUpdate.bind(this);
  }

  componentDidMount() {
    this.fetchInfoLocadora();
  }

  componentDidUpdate(p) {
    const { locacaoState } = this.props;
    if (p.locacaoState !== locacaoState) {
      this.setState({ 
        locacoes: [],
        idLocacao: '',
        idCliente: '',
        idFilme: '',
        dataLocacao: '',
        dataDevolucao: '',
        atualizando: false,
      });
    }
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value })
  }

  setToUpdate(info) {
    return this.setState(info);
  }

  fetchInfoLocadora() {
    const { locacaoState } = this.props;
    this.setState({ locacoes: locacaoState });
  }

  render() {
    const { deleteLocacoes, locacaoState } = this.props;
    return (
      <div>
        { adcLocacoes(this) }
        <table border="1px">
          <tbody>
            { renderHeaderLocacoes() }
            { renderLocacoes(locacaoState, deleteLocacoes, this.setToUpdate) }
          </tbody>
        </table>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateLocacoes: (payload) => dispatch(updateLocacoesAction(payload)),
  deleteLocacoes: (payload) => dispatch(deleteLocacoesAction(payload)),
  updateOnlyLocacao: (payload) => dispatch(updateOnlyLocacaoAction(payload))
});

const mapStateToProps = ({ locadoraDataLocacao, locadoraDataCliente, locadoraDataFilme }) => ({
  locacaoState: locadoraDataLocacao.locacoes,
  filmeState: locadoraDataFilme.filmes,
  clienteState: locadoraDataCliente.clientes,
});

export default connect(mapStateToProps, mapDispatchToProps)(Locacoes);
