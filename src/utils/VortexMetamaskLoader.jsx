export const VortexMetamaskLoader = (_class) => {
    return new Promise((ok, ko) => {
        window.addEventListener('load', () => {
            const _window = window;
            let web3 = _window.web3;
            if (typeof web3 !== 'undefined') {
                web3 = new _class(web3.currentProvider);
                ok(web3);
            }
            else {
                ko(new Error("Unable to load Web3"));
            }
        });
    });
};
