import { SensmotorStore } from './SensmotorStore'


class DiagStore {

    constructor(){
        this.SensoMotorStore = new SensmotorStore()
    }
}

export default new DiagStore()