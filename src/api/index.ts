import {FirestoreProductEventManager, FirestoreProductsApi} from "./Firestore/ProductApi";
import FakeApi from "./Fake/FakeApi";

const Api = new FakeApi();
//const Api = new FirestoreProductsApi();
const eventManager = new FirestoreProductEventManager();
//TODO: Move Event Manager to FirestoreApi
//it should be accessible when Api.supportsEvents = true

export {Api as ProductsApi};
export {eventManager as ProductEventManager};
