import * as React from 'react';
import { Vortex } from 'vort_x';
import { Gatelock } from "./gatelock";
export class VortexGate extends React.Component {
    constructor(props) {
        super(props);
        this.vortex = Vortex.factory(this.props.contracts, this.props.loader);
        // TODO take separate argument for this one => Maybe array of contracts ?
        this.vortex.networksOf(this.props.contracts[0]);
        this.vortex.run();
        this.vortex.loadWeb3();
    }
    render() {
        return (<Gatelock>
                {this.props.children}
            </Gatelock>);
    }
}
