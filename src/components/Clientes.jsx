import React, { Component } from 'react'
import { connect } from 'react-redux';
import { deleteClientesAction, updateClientesAction,
  updateOnlyClienteAction } from '../redux/actions';
import { adcCliente, renderClientes,
  renderHeaderClientes } from '../services/FunctionsClientesComponent';

class Clientes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientes: [],
      cpf: '',
      nascimento: '',
      idCliente: '',
      nome: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.setToUpdate = this.setToUpdate.bind(this);
  }

  componentDidMount() {
    this.fetchInfoLocadora();
  }

  componentDidUpdate(p) {
    const { clienteState } = this.props;
    if (p.clienteState !== clienteState) {
      this.setState({ 
        clientes: clienteState,
        cpf: '',
        nascimento: '',
        idCliente: '',
        nome: '',
        atualizando: false,
      });
    }
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value })
  }

  fetchInfoLocadora() {
    const { clienteState } = this.props;
    this.setState({ clientes: clienteState });
  }

  setToUpdate(info) {
    return this.setState(info);
  }

  render() {
    const { clientes } = this.state;
    const { deleteClientes } = this.props;
    return (
      <div>
        { adcCliente(this) }
        <table border="1px">
          <tbody>
            { renderHeaderClientes() }
            { renderClientes(clientes, deleteClientes, this.setToUpdate) }
          </tbody>
        </table>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateClientes: (payload) => dispatch(updateClientesAction(payload)),
  deleteClientes: (payload) => dispatch(deleteClientesAction(payload)),
  updateOnlyCliente: (payload) => dispatch(updateOnlyClienteAction(payload))
});

const mapStateToProps = ({ locadoraData }) => ({
  clienteState: locadoraData.clientes,
});

export default connect(mapStateToProps, mapDispatchToProps)(Clientes);