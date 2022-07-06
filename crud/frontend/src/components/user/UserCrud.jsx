import React, { Component } from "react";
import axios from "axios"
import Main from "../template/Main";

const headerProps = {
    icon: 'users',
    title: 'Usuário',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = 'http://localhost:3001/users'
const initialState = {
    user: {name: '', email: ''},
    list: []
}

export default class UserCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({list: resp.data})
        })
    }

    clear() {
        this.setState({ user: initialState.user })
    }

    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({user: initialState.user, list})
            })
    }

    getUpdatedList(user) {
        const list = this.state.list.filter(u => u.id !== user.id)
        // list.unshift(user)
        if (user) list.unshift(user)
        return list
    }

    updateField(event){
        const user = { ...this.state.user }
        user[event.target.name] = event.target.name
        this.setState({user})
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <label>Nome</label>
                        <input type="text" name="name" className="form-control"
                        value={this.state.user.name.id} 
                        onChange={e => this.updateField(e)} 
                        placeholder="Digite o nome..." />
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" name="email" className="form-control"
                            value={this.state.user.email.id} 
                            onChange={e => this.updateField(e)} 
                            placeholder="Digite o Email..." />
                        </div>
                    </div>
                </div>

                <hr />

                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <botton className="btn btn-prymary"
                        onClick = {e => this.save(e)}>
                            Salvar
                        </botton>

                        <botton className="btn btn-secondary ml-2"
                        onClick = {e => this.clear(e)}>
                            cancelar
                        </botton>
                    </div>
                </div>
            </div>
        )
    }

    load(user) {
        this.setState({user})
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            // const list = this.state.list.filter(u => u !== user)
            const list = this.getUpdatedList(null)
            this.setState({list})
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        )
    }

    render() {
        console.log(this.state.list)

        return (
            <Main { ...headerProps}>
                {this.renderForm()}
            </Main>
        )
    }
}