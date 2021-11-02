import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteFilmesAction, updateFilmesAction, updateOnlyFilmeAction } from '../redux/actions';
import { adcFilmes, renderFilmes, renderHeaderFilmes } from '../services/FunctionsFilmesComponent';
import './filmes.css';

class Filmes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filmes: [],
      idFilme: '',
      titulo: '',
      classificacaoIndicativa: '',
      lancamento: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.setToUpdate = this.setToUpdate.bind(this);
  }

  componentDidMount() {
    this.fetchInfoLocadora();
  }

  componentDidUpdate(p) {
    const { filmeState } = this.props;
    if (p.filmeState !== filmeState) {
      this.setState({ 
        filmes: [],
        idFilme: '',
        titulo: '',
        classificacaoIndicativa: '',
        lancamento: '',
        atualizando: false,
      });
    }
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value })
  }

  fetchInfoLocadora() {
    const { filmeState } = this.props;
    this.setState({ filmes: filmeState });
  }

  setToUpdate(info) {
    return this.setState(info);
  }

  render() {
    const { deleteFilmes, filmeState, locacaoState } = this.props;
    return (
      <div className="body-filmes">
        { adcFilmes(this) }
        <table border="1px">
          <tbody>
            { renderHeaderFilmes() }
            { filmeState ? renderFilmes(filmeState, deleteFilmes, this.setToUpdate, locacaoState) : <tr><td>...loading</td></tr>}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateFilmes: (payload) => dispatch(updateFilmesAction(payload)),
  deleteFilmes: (payload) => dispatch(deleteFilmesAction(payload)),
  updateOnlyFilme: (payload) => dispatch(updateOnlyFilmeAction(payload))
});

const mapStateToProps = ({ locadoraDataFilme, locadoraDataLocacao }) => ({
  filmeState: locadoraDataFilme.filmes,
  locacaoState: locadoraDataLocacao.locacoes,
});

export default connect(mapStateToProps, mapDispatchToProps)(Filmes);