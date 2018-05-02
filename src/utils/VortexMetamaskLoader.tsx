export const VortexMetamaskLoader =  (_class: any): Promise<any> => {
    return new Promise<any>((ok: (arg?: any)=> void, ko: (arg?: any)=> void): void => {
        window.addEventListener('load', (): void => {
            const _window: any = window;
            let web3 = _window.web3;
            if (typeof web3 !== 'undefined') {
                web3 = new _class(web3.currentProvider);
                ok(web3)
            } else {
                ko(new Error("Unable to load Web3"));
            }
        });
    });
}
