import {connect as _connect} from 'react-redux';
import * as React from 'react';
import {Vortex} from 'vort_x';

interface VortexComponentProps {
   store: any
}

// TODO Typings everywhere !

export function connect(comp: any, ...args: any[]): any {
    const any_connect: any = _connect;
    const _VortexComponent: React.ComponentClass<VortexComponentProps> = any_connect(...args)(comp);

    const VortexComponent = (props: any): React.ReactNode => {
        const complete_props = {
            ...props,
            store: Vortex.get().Store
        };
        return <_VortexComponent {...complete_props}/>
    };

    return VortexComponent;
}
