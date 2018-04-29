import * as React from 'react';
import { Vortex } from 'vort_x';
import { Gatelock } from "./gatelock";
export class VortexGate extends React.Component {
    constructor(props) {
        super(props);
        this.vortex = new Vortex(this.props.contracts, this.props.loader);
    }
    render() {
        return (React.createElement(Gatelock, null, this.props.children));
    }
}
