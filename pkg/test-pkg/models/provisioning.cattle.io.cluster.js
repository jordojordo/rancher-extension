/**
* The name of this file has a 1-1 relationship with a Kubernetes resource -
* Rancher automatically goes into the `models`, looks for the type, and binds
* the model to that type. The name of the model ***MUST*** match the type.
*/
import SteveModel from '@shell/plugins/steve/steve-class';

/**
* A model is Rancher specific way to specify new fields, getters,
* setters, etc. to a kubernetes resource that otherwise wouldn't exist.
*/
export default class Model extends SteveModel {
  get myProp() {
    return `Property - ${ this.id.split('.')[0] }`;
  }
}
