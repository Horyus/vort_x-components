import * as React from 'react';
import { Vortex } from 'vort_x';
import { Gatelock } from "./gatelock";
export class VortexGate extends React.Component {
    constructor(props) {
        super(props);
        this.vortex = Vortex.factory(this.props.contracts, this.props.loader, {
            reducer: this.props.reducers_map,
            custom_state: this.props.custom_state
        });
        if (this.props.network_contracts) {
            this.props.network_contracts.forEach((contract) => {
                this.vortex.networksOf(contract);
            });
        }
        this.vortex.run();
        this.vortex.loadWeb3();
    }
    render() {
        return (<Gatelock>
                {this.props.children}
            </Gatelock>);
    }
}
export { VortexWeb3Loaded, VortexWeb3Loading, VortexWeb3LoadError, VortexWeb3NetworkError } from './organizers';
