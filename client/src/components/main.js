import React from 'react';
import axios from 'axios'

class Main extends React.Component {
    state = {
        mails: [
            'kaboo.bear@gmail.com', 'kaboowork1@gmail.com', 'ivanloboza@gmail.com'
        ],
        text1: '',
        price1: '',
        mail: '',
        text2: '',
        price2: ''
    }

    onChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value})
    }

    onSubmit1 = (e) => {
        e.preventDefault();

        if (this.state.text1 !== '' && this.state.price1 !== '') {
            const data = {
                mails: this.state.mails,
                text: this.state.text1,
                price: this.state.price1
            }

            axios.post('/mail',data).then(res => {
                console.log(res.data);
            });
        }
    }

    onSubmit2 = (e) => {
        e.preventDefault();

        if (this.state.mail !== '' && this.state.text2 !== '' && this.state.price2 !== '') {
            const data = {
                mails: [this.state.mail],
                text: this.state.text2,
                price: this.state.price2
            }

            axios.post('/mail',data).then(res => {
                console.log(res.data);
            });
        }
    }

    render() {
        return (
            <div className="container">
                <div className="main-title">Mailing Test</div>
                <div className="flex-wrap">
                    <form onSubmit={this.onSubmit1} className="main-form left-form">
                        <div className="list-of-mails">
                            <div className="mails-list-title">
                                Mails Group
                            </div>

                            {this
                                .state
                                .mails
                                .map(elem => (
                                    <div className="mail-elem">
                                        {elem}
                                    </div>
                                ))}
                        </div>

                        <div className="simple-input">
                            <input
                                type="text"
                                placeholder="Text"
                                value={this.text1}
                                onChange={this.onChange}
                                name="text1"/>
                        </div>

                        <div className="simple-input">
                            <input
                                type="text"
                                placeholder="Price"
                                value={this.price1}
                                onChange={this.onChange}
                                name="price1"/>
                        </div>

                        <button type="submit" className="btn">Send</button>
                    </form>

                    <form onSubmit={this.onSubmit2} className="main-form right-form">
                    <div className="mails-list-title">
                                Singe Mail
                            </div>

                        <div className="simple-input">
                            <input
                                type="mail"
                                placeholder="Mail"
                                value={this.mail}
                                onChange={this.onChange}
                                name="mail"/>
                        </div>

                        <div className="simple-input">
                            <input
                                type="text"
                                placeholder="Text"
                                value={this.text2}
                                onChange={this.onChange}
                                name="text2"/>
                        </div>

                        <div className="simple-input">
                            <input
                                type="text"
                                placeholder="Price"
                                value={this.price2}
                                onChange={this.onChange}
                                name="price2"/>
                        </div>

                        <button type="submit" className="btn">Send</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Main;
