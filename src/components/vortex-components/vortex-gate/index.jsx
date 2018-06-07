import * as React from 'react';
import { Vortex } from 'vort_x';
import PropTypes from 'prop-types';
import { Gatelock } from "./gatelock";
export class VortexGate extends React.Component {
    constructor(props) {
        super(props);
        this.vortex = Vortex.factory(this.props.contracts, this.props.loader, {
            reducer: this.props.reducers_map,
            custom_state: this.props.custom_state,
            account_refresh_rate: 10000,
            custom_sagas: this.props.custom_sagas
        });
        if (this.props.network_contracts) {
            this.props.network_contracts.forEach((contract) => {
                this.vortex.networksOf(contract);
            });
        }
        this.vortex.run();
        this.vortex.loadWeb3();
    }
    getChildContext() {
        return {
            vortex: this.vortex
        };
    }
    render() {
        return (<Gatelock>
                {this.props.children}
            </Gatelock>);
    }
}
VortexGate.childContextTypes = {
    vortex: PropTypes.object
};
export { VortexWeb3Loaded, VortexWeb3Loading, VortexWeb3LoadError, VortexWeb3NetworkError, VortexWeb3Locked } from './organizers';
