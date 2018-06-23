import * as React from 'react';
import {Vortex, State, IPFSConfig} from 'vort_x';
import PropTypes from 'prop-types';
import {Gatelock} from "./gatelock";
import {DeepPartial, ReducersMapObject} from "redux";

export interface VortexGateProps<T extends State> {
    loader: Promise<any>,
    contracts: any,
    reducers_map?: ReducersMapObject<T>,
    custom_state?: DeepPartial<T>,
    custom_sagas?: any[],
    ipfs_config?: IPFSConfig,
    account_refresh_rate?: number
}

export interface VortexGateChildContext {
    vortex: Vortex<any>
}

export class VortexGate<T extends State = State> extends React.Component<VortexGateProps<T>> {

    vortex: Vortex<T>;

    constructor(props: VortexGateProps<T>) {
        super(props);

        if (!Vortex.get() || !this.props.contracts  || !this.props.loader) {
            this.vortex = Vortex.factory<T>(this.props.contracts, this.props.loader, {
                reducer: this.props.reducers_map,
                custom_state: this.props.custom_state,
                account_refresh_rate: this.props.account_refresh_rate,
                custom_sagas: this.props.custom_sagas,
                ipfs_config: this.props.ipfs_config,
            });
            this.vortex.run();
            this.vortex.loadWeb3();
        } else {
            this.vortex = Vortex.get<T>();
        }
    }

    static childContextTypes: React.ValidationMap<VortexGateChildContext> = {
        vortex: PropTypes.object
    };

    getChildContext(): VortexGateChildContext {
        return {
            vortex: this.vortex
        };
    }

    render(): React.ReactNode {
        return (
            <Gatelock>
                {this.props.children}
            </Gatelock>
        )
    }

}

export {VortexWeb3Loaded, VortexWeb3Loading, VortexWeb3LoadError, VortexWeb3NetworkError, VortexWeb3Locked} from './organizers';
