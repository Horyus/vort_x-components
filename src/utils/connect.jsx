import { connect as _connect } from 'react-redux';
import * as React from 'react';
import { Vortex } from 'vort_x';
// TODO Typings everywhere !
export function connect(comp, ...args) {
    const any_connect = _connect;
    const _VortexComponent = any_connect(...args)(comp);
    const VortexComponent = (props) => {
        const complete_props = Object.assign({}, props, { store: Vortex.get().Store });
        return <_VortexComponent {...complete_props}/>;
    };
    return VortexComponent;
}
