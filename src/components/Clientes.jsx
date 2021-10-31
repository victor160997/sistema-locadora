import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getClientesAction } from '../redux/actions';
import getLocadoraInfo from '../services/fetchLocadora';

class Clientes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientes: [],
    }
  }

  componentDidMount() {
    this.fetchInfoLocadora('cliente');
  }

  async fetchInfoLocadora(section) {
    const { updateClientes } = this.props;
    const response = await getLocadoraInfo(section);
    this.setState({ clientes: response });
    updateClientes(response);
  }

  render() {
    return (
      <div>
        Clientes
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateClientes: (payload) => dispatch(getClientesAction(payload))
});

export default connect(null, mapDispatchToProps)(Clientes);