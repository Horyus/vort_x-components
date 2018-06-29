import * as React from 'react';
import { Vortex } from 'vort_x';
import { Gatelock } from "./gatelock";
export class VortexGate extends React.Component {
    constructor(props) {
        super(props);
        if (!Vortex.get() || !this.props.contracts || !this.props.loader) {
            this.vortex = Vortex.factory(this.props.contracts, this.props.loader, {
                reducer: this.props.reducers_map,
                custom_state: this.props.custom_state,
                account_refresh_rate: this.props.account_refresh_rate,
                custom_sagas: this.props.custom_sagas,
                ipfs_config: this.props.ipfs_config,
                backlink_config: this.props.backlink_config
            });
            this.vortex.run();
            this.vortex.loadWeb3();
        }
        else {
            this.vortex = Vortex.get();
        }
    }
    render() {
        return (<Gatelock>
                {this.props.children}
            </Gatelock>);
    }
}
export { VortexWeb3Loaded, VortexWeb3Loading, VortexWeb3LoadError, VortexWeb3NetworkError, VortexWeb3Locked } from './organizers';
