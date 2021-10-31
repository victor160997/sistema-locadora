import React, { Component } from 'react'
import { connect } from 'react-redux';
import { deleteClientesAction, updateClientesAction } from '../redux/actions';
import { adcCliente, renderClientes, renderHeaderClientes } from '../services/Functions';

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

  render() {
    const { clientes, cpf, nascimento, nome } = this.state;
    const { updateClientes, clienteState, deleteClientes } = this.props;
    return (
      <div>
        { adcCliente(this.handleChange, cpf, nascimento, nome, updateClientes, clienteState) }
        <table border="1px">
          <tbody>
            { renderHeaderClientes() }
            { renderClientes(clientes, deleteClientes) }
          </tbody>
        </table>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateClientes: (payload) => dispatch(updateClientesAction(payload)),
  deleteClientes: (payload) => dispatch(deleteClientesAction(payload))
});

const mapStateToProps = ({ locadoraData }) => ({
  clienteState: locadoraData.clientes,
});

export default connect(mapStateToProps, mapDispatchToProps)(Clientes);