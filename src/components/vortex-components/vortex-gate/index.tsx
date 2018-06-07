import * as React from 'react';
import {Vortex, State} from 'vort_x';
import PropTypes from 'prop-types';
import {Gatelock} from "./gatelock";
import {DeepPartial, ReducersMapObject} from "redux";

export interface VortexGateProps<T extends State> {
    loader: Promise<any>,
    contracts: any,
    network_contracts?: any[],
    reducers_map?: ReducersMapObject<T>,
    custom_state?: DeepPartial<T>,
    custom_sagas?: any[]
}

export interface VortexGateChildContext {
    vortex: Vortex<any>
}

export class VortexGate<T extends State = State> extends React.Component<VortexGateProps<T>> {

    vortex: Vortex<T>;

    constructor(props: VortexGateProps<T>) {
        super(props);

        this.vortex = Vortex.factory<T>(this.props.contracts, this.props.loader, {
            reducer: this.props.reducers_map,
            custom_state: this.props.custom_state,
            account_refresh_rate: 10000,
            custom_sagas: this.props.custom_sagas});
        if (this.props.network_contracts) {
            this.props.network_contracts.forEach((contract: any): void => {
                this.vortex.networksOf(contract);
            });
        }
        this.vortex.run();
        this.vortex.loadWeb3();
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
