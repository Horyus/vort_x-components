import * as React from 'react';
import {Vortex, State} from 'vort_x';
import {Gatelock} from "./gatelock";

export interface VortexGateProps<T extends State> {
    loader: Promise<any>,
    contracts: any[],
    network_contracts?: any[]
}

export class VortexGate<T extends State = State> extends React.Component<VortexGateProps<T>> {

    vortex: Vortex<T>;

    constructor(props: VortexGateProps<T>) {
        super(props);

        this.vortex = Vortex.factory<T>(this.props.contracts, this.props.loader);
        if (this.props.network_contracts) {
            this.props.network_contracts.forEach((contract: any): void => {
                this.vortex.networksOf(contract);
            });
        }
        this.vortex.run();
        this.vortex.loadWeb3();
    }

    render(): React.ReactNode {
        return (
            <Gatelock>
                {this.props.children}
            </Gatelock>
        )
    }

}

export * from './organizers';
