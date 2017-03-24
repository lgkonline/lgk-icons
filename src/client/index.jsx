import React from "react";
import {render} from "react-dom";
import Superagent from "superagent";

import "./main.scss";

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            icons: null,
            searchWord: ""
        };
    }

    componentWillMount() {
        this.receiveSelection();
    }

    receiveSelection() {
        Superagent
            .get("https://lib.lgkonline.com/lgk-icons/selection.json")
            .end((error, response) => {
                if (error) throw error;

                console.log(response);
                console.log(response.body);

                this.setState({icons: response.body.icons});
            });
    }

    render() {
        
        return (
            <div>
                <div id="top">
                    <header>
                        <div className="container">
                            <h1>LGK Icons</h1>
                            <h2><span className="icon-lgk-filled"/></h2>
                        </div>
                    </header>

                    <section id="code-section">
                        <div className="container">
                            <code>https://lib.lgkonline.com/lgk-icons/style.min.css</code>
                        </div>
                    </section>

                    <section id="search-section">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4">

                                </div>
                                <div className="col-md-4">
                                    <input type="search" className="form-control" value={this.state.searchWord} placeholder="Search" onChange={(event) => {
                                        this.setState({searchWord: event.target.value});
                                    }}/>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="icons-section">
                        <div className="container">
                            {this.state.icons ? <div className="row">
                                {this.state.icons.map((icon, index) => {
                                    if (icon.properties.name.indexOf(this.state.searchWord) > -1) {
                                        return (
                                            <div key={index} className="col-lg-2 col-md-3 col-sm-6">
                                                <div className="icon-card card card-inverse card-primary">
                                                    <div className="card-block">
                                                        <div className="icon-preview"><span className={"icon-" + icon.properties.name}/></div>
                                                        <div><code>{"icon-" + icon.properties.name}</code></div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                })}
                            </div> : <div className="text-center card-inverse"><h1><span className="icon-spinner10 animation-spin"/></h1></div>}
                        </div>
                    </section>
                </div>

                <footer id="footer" className="jumbotron" style={{marginBottom: "0"}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                &copy; 2017 LGK // Made with <span className="icon-heart"></span> in Germany
                            </div>

                            <div className="col-md-4 text-center">
                                <a href="https://lgk.io" id="lgkLogo">
                                    <span className="icon-lgk-filled"/>
                                </a>
                            </div>
                            
                            <div className="col-md-4 text-right">
                                <a href="http://me.lgk.io/contact">Contact</a> // <a href="http://about.lgkonline.com/impressum">Imprint</a>
                            </div>
                        </div>
                    </div>
                </footer>                
            </div>
        );
    }
}

render(<App/>, document.getElementById("app"));