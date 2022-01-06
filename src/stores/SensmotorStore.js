import {makeAutoObservable} from "mobx";

class SensmotorStore {

  subsectionsData = {
    artic: {
      activeId: 0,
    },
    phonemics: {
      activeId: 0,
    },
    sounds: {
      activeId: 0,
    },
    syllable: {
      activeId: 0,
    }
  }

  constructor(){
    makeAutoObservable(this)
  }

  setActive = (subsectionName, activeItem) => {
    this.subsectionsData[subsectionName].activeId = Number(activeItem)
  }
}

export { SensmotorStore }